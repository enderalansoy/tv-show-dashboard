import { mount } from "@vue/test-utils";
import DetailSummary from "../../../components/details/DetailSummary.vue";
import { describe, it, expect } from "vitest";

describe("DetailSummary.vue", () => {
  it("renders summary correctly", () => {
    const wrapper = mount(DetailSummary, {
      props: {
        summary: "<p>Summary text</p>",
      },
    });
    expect(wrapper.html()).toContain("<p>Summary text</p>");
  });
});
