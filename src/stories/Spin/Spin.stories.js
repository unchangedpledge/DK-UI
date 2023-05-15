import { Spin } from './Spin';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Spin',
  component: Spin,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    defaultValue: 3,
    spinning: true,
    size: '',
    tip: '这是一段测试文字',
    children: '123'
  },
};

