import Collapse from './index';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Example1 = {
  name: '基本使用',
  render: () => (
    <div>
      <Collapse
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
        defaultActiveKey={['1']}
      >
        <Collapse.Panel header='Header' cKey='1'>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
        </Collapse.Panel>
        <Collapse.Panel header='Header2' cKey='2'>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
};

export const Example2 = {
  name: '手风琴模式',
  render: () => (
    <div>
      <Collapse
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
        defaultActiveKey={['1']}
        accordion
      >
        <Collapse.Panel header='Header' cKey='1'>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
        </Collapse.Panel>
        <Collapse.Panel header='Header2' cKey='2'>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
          <p style={{margin: 0, padding: 0}}>Collapse content</p>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
};

const text = (
  <p style={{ paddingLeft: 24, margin: 0}}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

export const Example3 = {
  name: '无边框',
  render: () => (
    <div>
      <Collapse
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
        defaultActiveKey={['1']}
        bordered={false}
      >
        <Collapse.Panel header='Header' cKey='1'>
          { text }
        </Collapse.Panel>
        <Collapse.Panel header='Header2' cKey='2'>
          { text }
        </Collapse.Panel>
      </Collapse>
    </div>
  )
};

export const Example4 = {
  name: '隐藏箭头',
  render: () => (
    <div>
      <Collapse
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
        defaultActiveKey={['1']}
      >
        <Collapse.Panel showArrow={false} header='Header' cKey='1'>
          { text }
        </Collapse.Panel>
        <Collapse.Panel header='Header2' cKey='2'>
          { text }
        </Collapse.Panel>
      </Collapse>
    </div>
  )
};

export const Example5 = {
  name: '指定不可折叠',
  render: () => (
    <div>
      <Collapse
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
        defaultActiveKey={['1']}
      >
        <Collapse.Panel header='Header' cKey='1'>
          { text }
        </Collapse.Panel>
        <Collapse.Panel collapsible={false} header='Header2' cKey='2'>
          { text }
        </Collapse.Panel>
      </Collapse>
    </div>
  )
};

