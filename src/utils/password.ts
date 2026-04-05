import { ref } from "vue";

export const showPassword = ref(false);

export const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  if (passwordInput) {
    passwordInput.type = showPassword.value ? "text" : "password";
  }
};
