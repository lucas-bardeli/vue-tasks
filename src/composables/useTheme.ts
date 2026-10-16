import { ref, onMounted } from "vue";
import { storage } from "@/utils/storage";

export function useTheme() {
  const isDark = ref(false);

  const initializeTheme = () => {
    const savedTheme = storage.get("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    } else {
      isDark.value = false;
      document.documentElement.classList.remove("dark");
    }
  };

  onMounted(() => {
    initializeTheme();
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;

    if (isDark.value) {
      document.documentElement.classList.add("dark");
      storage.set("theme", "dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    storage.set("theme", "light");
  };

  return { isDark, toggleTheme, initializeTheme };
}
