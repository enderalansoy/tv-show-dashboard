import { mount } from '@vue/test-utils';
import BaseButton from '../../components/BaseButton.vue';
import { describe, it, expect } from 'vitest';

describe('BaseButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click Me',
      },
    });
    expect(wrapper.text()).toContain('Click Me');
  });

  it('emits click event', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
