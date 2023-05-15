import DKPagination from './index';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Pagination',
  component: DKPagination,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Example1 = {
  args: {
    defaultCurrent: 10,
    total: 1000,
  },
};

export const Example2 = {
  args: {
    defaultCurrent: 10,
    total: 1000,
    span: 10
  },
};

export const Example3 = {
  args: {
    total: 1000,
    size: 'small'
  },
};

export const Example4 = {
  args: {
    total: 1000,
    layout: ['links', 'jumper']
  },
};

