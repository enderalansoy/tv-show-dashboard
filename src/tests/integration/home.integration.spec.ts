import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import HomeView from '../../views/Home.vue';
import { fetchShows } from '../../services/showService';

vi.mock('../../services/showService', () => ({
  fetchShows: vi.fn(),
}));

describe('Home.vue', () => {
  beforeEach(() => {
    (fetchShows as Mock).mockReset();
  });

  it('fetches and displays a list of shows', async () => {
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 8.5 } },
      { id: 2, name: 'Show 2', genres: ['Comedy'], rating: { average: 7.0 } },
    ];

    (fetchShows as Mock).mockResolvedValue(mockShows);

    const wrapper = mount(HomeView);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchShows).toHaveBeenCalled();
    expect(wrapper.findAll('.show-list__item').length).toBe(mockShows.length);

    // Verify content
    const showItems = wrapper.findAll('.show-list__item');
    expect(showItems[0].text()).toContain('8.5');
    expect(showItems[1].text()).toContain('7');
  });
});
