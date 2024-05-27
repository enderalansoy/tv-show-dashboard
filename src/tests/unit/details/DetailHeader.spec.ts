import { mount } from '@vue/test-utils';
import DetailHeader from '../../../components/details/DetailHeader.vue';
import { describe, it, expect } from 'vitest';

describe('DetailHeader.vue', () => {
  it('renders title correctly', () => {
    const wrapper = mount(DetailHeader, {
      props: {
        title: 'Test Show',
      },
    });
    expect(wrapper.text()).toContain('Test Show');
  });

  it('emits goBack event when button is clicked', async () => {
    const wrapper = mount(DetailHeader, {
      props: {
        title: 'Test Show',
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('goBack');
  });
});
