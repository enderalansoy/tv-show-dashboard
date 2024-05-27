import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import ShowDetail from '../../views/Details.vue';
import { fetchShowById, fetchEpisodes } from '../../services/showService';

vi.mock('../../services/showService', () => ({
  fetchShowById: vi.fn(),
  fetchEpisodes: vi.fn(),
}));

describe('Details.vue', () => {
  beforeEach(() => {
    (fetchShowById as Mock).mockReset();
    (fetchEpisodes as Mock).mockReset();
  });

  it('fetches and displays show details and episodes', async () => {
    // Mock data
    const mockShow = {
      id: 1,
      name: 'Test Show',
      image: { medium: 'medium.jpg', original: 'original.jpg' },
      genres: ['Drama'],
      rating: { average: 8.5 },
      premiered: '2022-01-01',
      language: 'English',
      summary: '<p>Test Summary</p>',
    };

    const mockEpisodes = [
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
    ];

    (fetchShowById as Mock).mockResolvedValue(mockShow);
    (fetchEpisodes as Mock).mockResolvedValue(mockEpisodes);

    const wrapper = mount(ShowDetail, {
      props: {
        id: '1',
      },
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchShowById).toHaveBeenCalledWith('1');
    expect(fetchEpisodes).toHaveBeenCalledWith('1');

    expect(wrapper.find('.show-detail-header__title').text()).toBe('Test Show');
    expect(wrapper.find('.show-detail-summary').html()).toContain(
      'Test Summary'
    );

    // Check if episodes are rendered
    const episodes = wrapper.findAllComponents({ name: 'EpisodeItem' });
    expect(episodes).toHaveLength(2);
    expect(episodes[0].text()).toContain('Pilot');
    expect(episodes[1].text()).toContain('Episode 2');
  });
});
