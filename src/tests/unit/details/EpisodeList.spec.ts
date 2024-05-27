import { mount } from '@vue/test-utils';
import EpisodeList from '../../../components/details/EpisodeList.vue';
import { Episode } from '../../../types/episode';
import { describe, it, expect } from 'vitest';

const episodes: Episode[] = [
  {
    id: 1,
    name: 'Pilot',
    season: 1,
    number: 1,
    summary: '<p>This is the pilot episode.</p>',
    airdate: '2021-01-01',
  },
  {
    id: 2,
    name: 'Episode 2',
    season: 1,
    number: 2,
    summary: '<p>This is the second episode.</p>',
    airdate: '2021-01-02',
  },
];

describe('EpisodeList.vue', () => {
  it('renders a list of episodes', () => {
    const wrapper = mount(EpisodeList, {
      props: { episodes },
    });

    expect(wrapper.findAllComponents({ name: 'EpisodeItem' })).toHaveLength(
      episodes.length
    );
  });

  it('renders empty message when there are no episodes', () => {
    const wrapper = mount(EpisodeList, {
      props: { episodes: [] },
    });

    expect(wrapper.find('.episode-list__empty').exists()).toBe(true);
    expect(wrapper.find('.episode-list__empty').text()).toBe(
      'No episodes available.'
    );
  });
});
