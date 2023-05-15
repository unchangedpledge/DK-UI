import React from 'react'
import { Carousel } from './Carousel';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Carousel',
  component: Carousel,
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
  args: {
    test: true
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  render: () => (
    <Carousel animation='slide' >
      <div className="item" style={{width: '700px', height: '100%'}}>
        <img src="./src/assets/1.jpg" style={{width: '100%', height: '100%'}} alt="" />
      </div>
      <div className="item" style={{width: '700px', height: '100%'}}>
        <img src="./src/assets/2.jpg" style={{width: '100%', height: '100%'}} alt="" />
      </div>
      <div className="item" style={{width: '700px', height: '100%'}}>
        <img src="./src/assets/3.jpg" style={{width: '100%', height: '100%'}} alt="" />
      </div>
      <div className="item" style={{width: '700px', height: '100%'}}>
        <img src="./src/assets/4.jpg" style={{width: '100%', height: '100%'}} alt="" />
      </div>
    </Carousel>
  )
};

