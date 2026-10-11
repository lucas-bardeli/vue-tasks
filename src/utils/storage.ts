export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
      throw error;
    }
  },

  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
      throw error;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
      throw error;
    }
  },
};
