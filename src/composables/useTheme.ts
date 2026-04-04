import { ref, onMounted } from "vue";

export function useTheme() {
  const isDark = ref(false);

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    }
  };

  onMounted(() => {
    initializeTheme();
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;

    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  };

  return { isDark, toggleTheme, initializeTheme };
}
