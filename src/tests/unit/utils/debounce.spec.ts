import { describe, it, expect, vi } from "vitest";
import { debounce } from "../../../utils/debounce";

describe("debounce", () => {
  vi.useFakeTimers();

  it("debounces a function call", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 200);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(199);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("passes arguments to the debounced function", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 200);

    debouncedFunc(1, 2, 3);
    vi.advanceTimersByTime(200);

    expect(func).toHaveBeenCalledWith(1, 2, 3);
  });

  it("resets the timeout if called again within the wait time", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 200);

    debouncedFunc();
    vi.advanceTimersByTime(100);
    debouncedFunc();
    vi.advanceTimersByTime(100);
    debouncedFunc();
    vi.advanceTimersByTime(200);

    expect(func).toHaveBeenCalledTimes(1);
  });
});
