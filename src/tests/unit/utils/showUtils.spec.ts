import { describe, it, expect } from "vitest";
import { categorizeAndSortShows } from "../../../utils/showUtils";
import { Show } from "../../../types/show";

describe("categorizeAndSortShows", () => {
  it("categorizes and sorts shows by genre", () => {
    const mockShows: Partial<Show>[] = [
      { id: 1, name: "Show 1", genres: ["Drama"], rating: { average: 8.5 } },
      { id: 2, name: "Show 2", genres: ["Comedy"], rating: { average: 7.0 } },
      { id: 3, name: "Show 3", genres: ["Drama"], rating: { average: 9.0 } },
    ];

    const categorizedShows = categorizeAndSortShows(mockShows as Show[]);

    expect(Object.keys(categorizedShows)).toEqual(["Drama", "Comedy"]);
    expect(categorizedShows["Drama"]).toEqual([
      { id: 3, name: "Show 3", genres: ["Drama"], rating: { average: 9.0 } },
      { id: 1, name: "Show 1", genres: ["Drama"], rating: { average: 8.5 } },
    ]);
    expect(categorizedShows["Comedy"]).toEqual([
      { id: 2, name: "Show 2", genres: ["Comedy"], rating: { average: 7.0 } },
    ]);
  });
});
