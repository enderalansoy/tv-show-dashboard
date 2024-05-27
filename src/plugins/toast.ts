import { App, reactive } from 'vue';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
  timeout?: number;
}

const state = reactive({
  messages: [] as ToastMessage[],
});

let nextId = 1;

const toast = {
  /**
   * Displays a toast message.
   * @param {string} message - The message to display.
   * @param {'success' | 'error'} [type='success'] - The type of the message.
   * @param {number} [timeout=3000] - The duration to display the message in milliseconds.
   */
  show(
    message: string,
    type: 'success' | 'error' = 'success',
    timeout: number = 3000
  ) {
    state.messages.push({ id: nextId++, message, type });
    setTimeout(() => {
      state.messages.shift();
    }, timeout);
  },
  /**
   * Installs the toast plugin into a Vue application.
   * @param {App} app - The Vue application instance.
   */
  install(app: App) {
    app.config.globalProperties.$toast = this;
    app.provide('toast', this);
  },
};

/**
 * Composable function to use the toast functionality.
 * @returns {typeof toast} The toast instance.
 */
export const useToast = () => {
  return toast;
};

export const toastState = state;

export default toast;
