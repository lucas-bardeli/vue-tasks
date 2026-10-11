import { useAuthStore as useApiAuthStore } from "./api/auth";
import { useTasksStore as useApiTasksStore } from "./api/tasks";
import { useAuthStore as useLocalAuthStore } from "./local/auth";
import { useTasksStore as useLocalTasksStore } from "./local/tasks";

const useApi = import.meta.env.VITE_DATA_MODE === "api";

export const useAuthStore = useApi ? useApiAuthStore : useLocalAuthStore;
export const useTasksStore = useApi ? useApiTasksStore : useLocalTasksStore;
