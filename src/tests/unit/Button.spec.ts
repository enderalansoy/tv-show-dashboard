import { mount } from "@vue/test-utils";
import Button from "../../components/Button.vue";
import { describe, it, expect } from "vitest";

describe("Button.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click Me",
      },
    });
    expect(wrapper.text()).toContain("Click Me");
  });

  it("emits click event", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
