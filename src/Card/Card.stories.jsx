import Card from './index';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Card',
  component: Card,
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
      <Card
        extra={<a href="#">More</a>}
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <p style={{margin: 0, padding: 0}}>Card content</p>
          <p style={{margin: 0, padding: 0}}>Card content</p>
          <p style={{margin: 0, padding: 0}}>Card content</p>
        </Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    </div>
  )
};

const cardStyle = {
  width: 140,
  display: 'inline-flex',
  marginInlineEnd: 20,
}

export const Example2 = {
  name: '阴影',
  render: () => (
    <div>
      <Card style={cardStyle}>
        <Card.Body>无阴影</Card.Body>
      </Card>

      <Card style={cardStyle} shadow="hover">
        <Card.Body>Hover时触发</Card.Body>
      </Card>

      <Card style={cardStyle} shadow>
        <Card.Body>有阴影</Card.Body>
      </Card>
    </div>
  )
}

export const Example3 = {
  name: '无边框',
  render: () => (
    <div style={{width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray'}}>
      <Card
        bordered={false}
        style={{
          width: 300,
          display: 'inline-flex',
          marginInlineEnd: 20,
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <p style={{margin: 0, padding: 0}}>Card content</p>
          <p style={{margin: 0, padding: 0}}>Card content</p>
          <p style={{margin: 0, padding: 0}}>Card content</p>
        </Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    </div>
  )
}
