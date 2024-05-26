import { App, reactive } from "vue";

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error";
  timeout?: number;
}

const state = reactive({
  messages: [] as ToastMessage[],
});

let nextId = 1;

const toast = {
  show(
    message: string,
    type: "success" | "error" = "success",
    timeout: number = 3000
  ) {
    state.messages.push({ id: nextId++, message, type });
    setTimeout(() => {
      state.messages.shift();
    }, timeout);
  },
  install(app: App) {
    app.config.globalProperties.$toast = this;
    app.provide("toast", this);
  },
};

export const useToast = () => {
  return toast;
};

export const toastState = state;
export default toast;
