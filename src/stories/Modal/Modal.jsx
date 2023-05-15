import { useRef } from 'react'
import { open, close, destroy } from './events'
// import Card from '../Card'
import { useEffect } from 'react'
import './modal.scss'
import { memo } from 'react'
import { shallowEqual } from './utils'

const DefaultValue = {
  className: '',
  size: 'default',
  style: {},
  type: 'default',
  usePortal: true,
  visible: false,
  hideMask: false,
  esc: true,
}

const Modal = (props) => {
  const { usePortal, visible } = props
  
  const id = useRef(`__${(new Date).getTime()}__`)
  props.id = id.current
  
  const getOption = () => {
    const { children, usePortal, visible, ...other } = props
    return {
      ...other,
      content: children,
      id: id.current,
      from: 'modal',
    }
  }

  const option = getOption()

  useEffect(() => {
    if (visible && !usePortal) {
      open(option, false)
    }
    if (!visible) {
      close({ id: id.current })
    }
  })
  
  useEffect(() => {
    return () => {
      close({ id: id.current })
      destroy(id.current, !usePortal)
    }
  }, [])

  if (visible && usePortal) { 
    return open(option, true)
  }
  return null
}

Modal.displayName = 'ShineoutModal'
Modal.defaultProps = DefaultValue

export default memo(Modal, (prevProps, nextProps) => {
  if (shallowEqual(prevProps, nextProps)) {
    return true
  }
  if (nextProps.visible) {
    return false
  }
  close({ ...prevProps })
  return !(!shallowEqual(prevProps, nextProps) && nextProps.visible)
})
