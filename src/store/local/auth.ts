import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authService } from "@/services/authService";
import { storage } from "@/utils/storage";
import { useRouter } from "vue-router";
import type {
  AuthCredentials,
  AuthError,
  AuthResponse,
  User,
} from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref<User | null>(null);
  const token = ref<string | null | undefined>(storage.get("token"));
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value);
  const userName = computed(() => user.value?.username || "");

  const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      token.value = response.token;

      user.value = {
        id: response.userId,
        username: response.username,
      };

      storage.set("token", response.token);
      storage.set("user", JSON.stringify(user.value));
      router.push("/tasks");

      return response;
    } catch (err) {
      const authErr = err as AuthError;
      if (authErr.isAuthError) {
        error.value = authErr.message;
        throw authErr;
      }
      error.value =
        (authErr.response as { data?: { message?: string } })?.data?.message ||
        "Erro ao fazer login";
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
      const response = await authService.register(credentials);
      token.value = response.token;

      user.value = {
        id: response.userId,
        username: response.username,
      };

      storage.set("token", response.token);
      storage.set("user", JSON.stringify(user.value));
      router.push("/tasks");

      return response;
    } catch (err: any) {
      const authErr = err as AuthError;
      if (authErr.isAuthError) {
        error.value = authErr.message;
        throw authErr;
      }
      error.value =
        (authErr.response as { data?: { message?: string } })?.data?.message ||
        "Erro ao criar conta";
      throw authErr;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    error.value = null;
    storage.remove("token");
    storage.remove("user");
    router.push("/login");
  };

  const checkAuth = () => {
    const savedToken = storage.get("token");
    const savedUser = storage.get("user");
    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

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
