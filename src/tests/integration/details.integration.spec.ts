import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ShowDetail from "../../views/Details.vue";
import { fetchShowById } from "../../services/showService";

vi.mock("../../services/showService", () => ({
  fetchShowById: vi.fn(),
}));

describe("Details.vue", () => {
  beforeEach(() => {
    (fetchShowById as any).mockReset();
  });

  it("fetches and displays show details", async () => {
    // Mock data
    const mockShow = {
      id: 1,
      name: "Test Show",
      image: { medium: "medium.jpg", original: "original.jpg" },
      genres: ["Drama"],
      rating: { average: 8.5 },
      premiered: "2022-01-01",
      language: "English",
      summary: "<p>Test Summary</p>",
    };

    (fetchShowById as any).mockResolvedValue(mockShow);

    const wrapper = mount(ShowDetail, {
      props: {
        id: "1",
      },
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchShowById).toHaveBeenCalledWith("1");

    expect(wrapper.find(".show-detail-header__title").text()).toBe("Test Show");
    expect(wrapper.find(".show-detail-summary").html()).toContain(
      "Test Summary"
    );
  });
});
