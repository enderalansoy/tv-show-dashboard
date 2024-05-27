/**
 * Debounces a function that accepts an event or any other arguments.
 * It will delay the execution of the function until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @template T - The type of the function to debounce.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay execution.
 * @returns A debounced function that will only execute once `wait` milliseconds have elapsed.
 *
 */
export function debounce<T extends (...args: Event[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function executedFunction(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
