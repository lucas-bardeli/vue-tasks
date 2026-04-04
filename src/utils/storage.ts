export const storage = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Erro ao acessar o localStorage: ${error}`);
    }
  },

  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Erro ao salvar no localStorage: ${error}`);
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover do localStorage: ${error}`);
    }
  },
};
