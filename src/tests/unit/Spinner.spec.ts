import { mount } from "@vue/test-utils";
import Spinner from "../../components/Spinner.vue";
import { describe, it, expect } from "vitest";

describe("Spinner.vue", () => {
  it("is visible when isLoading is true", () => {
    const wrapper = mount(Spinner, {
      props: {
        isLoading: true,
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it("is not visible when isLoading is false", () => {
    const wrapper = mount(Spinner, {
      props: {
        isLoading: false,
      },
    });
    expect(wrapper.isVisible()).toBe(false);
  });
});
