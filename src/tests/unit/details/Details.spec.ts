import { mount, flushPromises } from "@vue/test-utils";
import ShowDetail from "../../../views/Details.vue";
import { fetchShowById } from "../../../services/showService";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../services/showService", () => ({
  fetchShowById: vi.fn(),
}));

describe("Details.vue", () => {
  beforeEach(() => {
    (fetchShowById as any).mockReset();
  });

  it("fetches show data on mount and renders it", async () => {
    (fetchShowById as any).mockResolvedValue({
      id: 1,
      name: "Test Show",
      image: { medium: "medium.jpg", original: "original.jpg" },
      genres: ["Drama"],
      rating: { average: 8.5 },
      premiered: "2022-01-01",
      language: "English",
      summary: "<p>Test Summary</p>",
    });

    const wrapper = mount(ShowDetail);
    await flushPromises();

    expect(fetchShowById).toHaveBeenCalledWith("1");
    expect(wrapper.text()).toContain("Test Show");
    expect(wrapper.html()).toContain("<p>Test Summary</p>");
  });
});
