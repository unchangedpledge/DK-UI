import { TagInput } from './TagInput';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    defaultValue: ['抖音', '测试', 'abc', '123'],
    maxTagCount: 2,
    showRestTagsPopover: true
  },
};

