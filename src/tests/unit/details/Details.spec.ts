import { mount, flushPromises } from '@vue/test-utils';
import ShowDetail from '../../../views/Details.vue';
import { fetchShowById, fetchEpisodes } from '../../../services/showService';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../services/showService', () => ({
  fetchShowById: vi.fn(),
  fetchEpisodes: vi.fn(),
}));

describe('Details.vue', () => {
  beforeEach(() => {
    (fetchShowById as Mock).mockReset();
    (fetchEpisodes as Mock).mockReset();
  });

  it('fetches show data and episodes on mount and renders them', async () => {
    (fetchShowById as Mock).mockResolvedValue({
      id: 1,
      name: 'Test Show',
      image: { medium: 'medium.jpg', original: 'original.jpg' },
      genres: ['Drama'],
      rating: { average: 8.5 },
      premiered: '2022-01-01',
      language: 'English',
      summary: '<p>Test Summary</p>',
    });

    (fetchEpisodes as Mock).mockResolvedValue([
      {
        id: 1,
        name: 'Pilot',
        season: 1,
        number: 1,
        summary: '<p>This is the pilot episode.</p>',
      },
      {
        id: 2,
        name: 'Episode 2',
        season: 1,
        number: 2,
        summary: '<p>This is the second episode.</p>',
      },
    ]);

    const wrapper = mount(ShowDetail, {
      props: {
        id: '1',
      },
    });
    await flushPromises();

    expect(fetchShowById).toHaveBeenCalledWith('1');
    expect(fetchEpisodes).toHaveBeenCalledWith('1');
    expect(wrapper.text()).toContain('Test Show');
    expect(wrapper.html()).toContain('<p>Test Summary</p>');

    // Check if episodes are rendered
    const episodes = wrapper.findAllComponents({ name: 'EpisodeItem' });
    expect(episodes).toHaveLength(2);
    expect(episodes[0].text()).toContain('Pilot');
    expect(episodes[1].text()).toContain('Episode 2');
  });
});
