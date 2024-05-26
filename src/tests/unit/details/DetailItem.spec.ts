import { mount } from "@vue/test-utils";
import DetailItem from "../../../components/details/DetailItem.vue";
import { describe, it, expect } from "vitest";

describe("DetailItem.vue", () => {
  it("renders label and value correctly", () => {
    const wrapper = mount(DetailItem, {
      props: {
        label: "Genre",
        value: "Drama",
      },
    });
    expect(wrapper.text()).toContain("Genre");
    expect(wrapper.text()).toContain("Drama");
  });
});
