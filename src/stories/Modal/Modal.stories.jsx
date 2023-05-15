import { useState } from 'react';
import Modal from './index';
import Button from '../Button/Button'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Example1 = {
  name: '基本使用',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [content, setContent] = useState(1)
    const [visible, setVisible] = useState(false)

    const show = () => {
      setVisible(true)
    }

    const handleOk = () => {
      setVisible(false)
      setContent(content + 1)
      console.log('clicked ok!')
    }

    const handleCancel = () => {
      setVisible(false)
      setContent(content + 1)
      console.log('clicked cancel')
    }

    return (
      <div>
        <Button onClick={show}>click me</Button>
        <Modal
          zoom
          width={400}
          visible={visible}
          title="Modal Title"
          onClose={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={handleOk}>
              Ok
            </Button>,
          ]}
        >
          {`you are visited ${content}`}
        </Modal>
      </div>
    )
  }
};

export const Example2 = {
  name: '类型',
  render: () => {
    const info = () => {
      Modal.info({
        title: 'This is a info message',
        content: 'this is  some information that user must know',
      })
    }
  
    const success = () => {
      Modal.success({
        title: 'This is a success message',
        content: 'this is some information that user successful operation',
      })
    }
  
    const warning = () => {
      Modal.warn({
        title: 'This is a warning message',
        content: 'this is  some information that user must know',
      })
    }
  
    const error = () => {
      Modal.error({
        title: 'This is a error message',
        content: 'this is some information that user attended',
      })
    }
  
    const show = () => {
      Modal.show({
        title: 'This is a message',
        content: 'this is show information',
      })
    }
  
    return (
      <div>
        <Button onClick={show}>show</Button>
        <Button onClick={info}>info</Button>
        <Button onClick={error}>error</Button>
        <Button onClick={success}>success</Button>
        <Button onClick={warning}>warning</Button>
      </div>
    )
  }
}


