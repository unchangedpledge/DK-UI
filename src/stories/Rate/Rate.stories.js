import { Rate } from './Rate';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Rate',
  component: Rate,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    defaultValue: 3,
  },
};

