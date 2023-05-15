import Button from './Button';
import BtnMD from './Button.mdx'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args

export const testForMDX = {
  name: 'mdx',
  render: () => <BtnMD />
}

export const Example1 = {
  name: '基本使用',
  render: () => (
    <div>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
    </div>
  )
};

export const Example2 = {
  name: '文本按钮',
  render: () => (
    <div>
      <Button text>Default</Button>
      <Button text type="primary">Primary</Button>
      <Button text type="success">Success</Button>
      <Button text type="warning">Warning</Button>
      <Button text type="danger">Danger</Button>
      <Button text type="link">Link</Button>
    </div>
  )
};

export const Example3 = {
  name: '大小',
  render: () => (
    <div>
      <div>
        <Button size="small">Default</Button>
        <Button size="small" type="primary">
          Primary
        </Button>
        <Button size="small" type="success">
          Success
        </Button>
        <Button size="small" type="warning">
          Warning
        </Button>
        <Button size="small" type="danger">
          Danger
        </Button>
        <Button size="small" type="link">
          Link
        </Button>
      </div>
      <br />
      <div>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
      <br />
      <div>
        <Button size="large">Default</Button>
        <Button size="large" type="primary">
          Primary
        </Button>
        <Button size="large" type="success">
          Success
        </Button>
        <Button size="large" type="warning">
          Warning
        </Button>
        <Button size="large" type="danger">
          Danger
        </Button>
        <Button size="large" type="link">
          Link
        </Button>
      </div>
    </div>
  )
};

export const Example4 = {
  name: '不可用',
  render: () => (
    <div>
      <Button disabled>Default</Button>
      <Button disabled type="primary">
        Primary
      </Button>
      <Button disabled type="success">
        Success
      </Button>
      <Button disabled type="warning">
        Warning
      </Button>
      <Button disabled type="danger">
        Danger
      </Button>
      <Button disabled type="link">
        Link
      </Button>
    </div>
  )
};

export const Example5 = {
  name: '加载中',
  render: () => (
    <div>
      <Button loading size="small" type="primary">
        Small
      </Button>
      <Button loading type="primary">
        Default
      </Button>
      <Button loading size="large" type="primary">
        Large
      </Button>
    </div>
  )
};

export const Example6 = {
  name: '形状',
  render: () => (
    <div>
      <Button type="primary">
        Default
      </Button>
      <Button shape="round" type="primary">
        Round
      </Button>
      <Button shape="circle" type="primary">
        Hi
      </Button>
    </div>
  )
};
