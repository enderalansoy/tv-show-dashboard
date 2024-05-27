import { mount } from '@vue/test-utils';
import EpisodeItem from '../../../components/details/EpisodeItem.vue';
import { Episode } from '../../../types/episode';
import { describe, it, expect } from 'vitest';

const episode: Episode = {
  id: 1,
  name: 'Pilot',
  season: 1,
  number: 1,
  summary: '<p>This is the pilot episode.</p>',
  airdate: '2021-01-01',
};

describe('EpisodeItem.vue', () => {
  it('renders episode details correctly', () => {
    const wrapper = mount(EpisodeItem, {
      props: { episode },
    });

    expect(wrapper.find('.episode-item__title').text()).toBe(
      'S1E1 ' + episode.name
    );
    expect(wrapper.find('.episode-item__number').text()).toBe('S1E1');
    expect(wrapper.find('.episode-item__summary').exists()).toBe(false);
  });

  it('toggles summary visibility when button is clicked', async () => {
    const wrapper = mount(EpisodeItem, {
      props: { episode },
    });

    const toggleButton = wrapper.find('.episode-item__toggle');
    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');

    const summary = wrapper.find('.episode-item__summary');
    expect(summary.exists()).toBe(true);
    expect(summary.html()).toContain(episode.summary);

    await toggleButton.trigger('click');

    expect(wrapper.find('.episode-item__summary').exists()).toBe(false);
  });
});
