import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { storage } from "@/utils/storage";
import type {
  AuthCredentials,
  AuthResponse,
  LocalAccount,
  User,
} from "@/types/auth";

const accountsKey = "local:accounts";
const tokenKey = "local:token";
const userKey = "local:user";
const passwordIterations = 310_000;

const isLocalAccount = (value: unknown): value is LocalAccount =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  "username" in value &&
  "salt" in value &&
  "passwordHash" in value &&
  typeof value.id === "string" &&
  typeof value.username === "string" &&
  typeof value.salt === "string" &&
  typeof value.passwordHash === "string";

const getAccounts = (): LocalAccount[] => {
  const savedAccounts = storage.get(accountsKey);
  if (!savedAccounts) return [];

  const parsed: unknown = JSON.parse(savedAccounts);
  if (!Array.isArray(parsed) || !parsed.every(isLocalAccount)) {
    throw new Error("Os dados das contas locais estão inválidos.");
  }
  return parsed;
};

const createRandomValue = (byteLength = 16): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
};

const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: passwordIterations,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return Array.from(new Uint8Array(derivedBits), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
};

const isUser = (value: unknown): value is User =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  "username" in value &&
  typeof value.id === "string" &&
  typeof value.username === "string";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const currentUser = computed(() => user.value);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value);
  const userName = computed(() => user.value?.username || "");

  const checkAuth = (): void => {
    try {
      const savedToken = storage.get(tokenKey);
      const savedUser = storage.get(userKey);
      if (!savedToken || !savedUser) {
        token.value = null;
        user.value = null;
        return;
      }

      const parsedUser: unknown = JSON.parse(savedUser);
      if (!isUser(parsedUser)) {
        throw new Error("Os dados da sessão local estão inválidos.");
      }

      token.value = savedToken;
      user.value = parsedUser;
    } catch (err) {
      token.value = null;
      user.value = null;
      error.value =
        err instanceof Error ? err.message : "Erro ao recuperar sessão local.";
    }
  };

  const startSession = async (account: LocalAccount): Promise<AuthResponse> => {
    const sessionToken = createRandomValue();
    const sessionUser: User = {
      id: account.id,
      username: account.username,
    };

    storage.set(tokenKey, sessionToken);
    storage.set(userKey, JSON.stringify(sessionUser));
    token.value = sessionToken;
    user.value = sessionUser;
    await router.push("/tasks");

    return {
      token: sessionToken,
      userId: account.id,
      username: account.username,
    };
  };

  const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    loading.value = true;
    error.value = null;

    try {
      const username = credentials.username.trim();
      const account = getAccounts().find(
        (savedAccount) =>
          savedAccount.username.toLowerCase() === username.toLowerCase(),
      );
      if (
        !account ||
        (await hashPassword(credentials.password, account.salt)) !==
          account.passwordHash
      ) {
        throw new Error("Usuário e/ou senha inválidos.");
      }

      return await startSession(account);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Erro ao fazer login.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (
    credentials: AuthCredentials,
  ): Promise<AuthResponse> => {
    loading.value = true;
    error.value = null;

    try {
      const username = credentials.username.trim();
      if (!username || !credentials.password) {
        throw new Error("Informe um usuário e uma senha.");
      }

      const accounts = getAccounts();
      if (
        accounts.some(
          (account) =>
            account.username.toLowerCase() === username.toLowerCase(),
        )
      ) {
        throw new Error("Este nome de usuário já está em uso.");
      }

      const salt = createRandomValue();
      const account: LocalAccount = {
        id: createRandomValue(),
        username,
        salt,
        passwordHash: await hashPassword(credentials.password, salt),
      };

      storage.set(accountsKey, JSON.stringify([...accounts, account]));
      return await startSession(account);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Erro ao criar conta local.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = (): void => {
    token.value = null;
    user.value = null;
    error.value = null;
    storage.remove(tokenKey);
    storage.remove(userKey);
    void router.push("/login");
  };

  checkAuth();

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    currentUser,
    isLoading,
    hasError,
    userName,
    login,
    checkAuth,
    register,
    logout,
  };
});
