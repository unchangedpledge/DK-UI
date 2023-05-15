import React from 'react'
import { Progress } from './Progress';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    label: {
      name: 'label',
      type: { name: 'string', required: false },
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Hello123' },
      },
    }
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    status: 'success',
    type: 'line',
    percent: 30,
    // size: [300, 20]
  },
};

export const Circle = {
  args: {
    status: 'success',
    type: 'circle',
    percent: 20,
    size: 20
  },
};

