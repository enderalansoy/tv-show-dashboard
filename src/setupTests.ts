import { config } from "@vue/test-utils";
import { vi } from "vitest";

config.global.components = {
  "router-link": {
    template: "<a><slot /></a>",
  },
  "router-view": {
    template: "<div><slot /></div>",
  },
  "font-awesome-icon": {
    template: '<svg class="mocked-icon"><slot /></svg>',
  },
};

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "1" },
  }),
  useRouter: () => ({
    back: vi.fn(),
  }),
}));
