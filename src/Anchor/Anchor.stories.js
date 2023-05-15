import { Anchor } from './Anchor';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    defaultValue: 3,
    items: [
      {
        key: 'part-1',
        href: '#part-1',
        title: 'Part 1',
      },
      {
        key: 'part-2',
        href: '#part-2',
        title: 'Part 2',
      },
      {
        key: 'part-3',
        href: '#part-3',
        title: 'Part 3',
      },
    ]
  },
};

