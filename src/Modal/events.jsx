import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from '../Button/Button'
import Panel from './Panel'
// import ready from '../utils/dom/ready'

// div: HTMLElement; container: HTMLElement; visible?: boolean; props: Options
const containers = {}
const DURATION = 200

const docSize = {
  get width() {
    return document.documentElement.clientWidth || document.body.clientWidth
  },
  get height() {
    return document.documentElement.clientHeight || document.body.clientHeight
  },
}

function getDiv(id) {
  const mod = containers[id]
  return mod ? mod.div : null
}

function getContainer(id) {
  const mod = containers[id]
  return mod ? mod.container : null
}

function hasVisibleMask() {
  return Object.keys(containers).some(k => containers[k].visible && !containers[k].props.hideMask)
}

function isMask(id) {
  const ids = Object.keys(containers).filter(k => containers[k].visible && !containers[k].props.hideMask)
  if (ids.length === 0) return true
  return ids[0] === id
}

export function destroy(id, unmount) {
  const div = getDiv(id)
  const container = getContainer(id)
  if (!div || !container) return

  delete containers[id]
  if (unmount) {
    ReactDOM.unmountComponentAtNode(div)
  }
  if (div?.parentNode) {
    div.parentNode.removeChild(div)
  }
}

export function close(props, callback) {
  const { id, position, usePortal } = props
  const modal = containers[id]

  if (!modal || modal.visible === false) return

  modal.visible = false

  const { div } = modal
  const prefixCls = 'dk-modal'

  div.classList.remove(`${prefixCls}-show`, `${prefixCls}-start`)

  if (!position) {
    div.classList.add(`${prefixCls}-end`)
  }

  setTimeout(() => {
    div.style.display = 'none'
    div.classList.remove(`${prefixCls}-end`)
    if (props.destroy) {
      destroy(id, !usePortal)
    }

    if (!hasVisibleMask()) {
      const doc = document.body.parentNode
      doc.style.overflow = ''
      doc.style.paddingRight = ''
    }

    callback?.()

  }, DURATION)
}

export function createDiv(props) {
  const defaultContainer = document.body
  const { id, position, container = defaultContainer, hideMask } = props
  let div = getDiv(props.id)
  if (div) {
    return div
  }

  const parent = container
  div = document.createElement('div')
  parent.appendChild(div)
  const prefixCls = 'dk-modal'
  div.className = classnames(
    prefixCls,
    {
      [`${prefixCls}-position`]: position,
      [`${prefixCls}-hide-mask`]: hideMask,
    },
    props.rootClassName
  )

  containers[id] = { div, container: parent, props }

  return div
}

export function open(props, isPortal) {
  const { content, onClose, zIndex, forceMask, ...otherProps } = props
  const options = { ...props, usePortal: isPortal }
  const div = createDiv(options)
  div.style.display = 'block'
  const parsed = parseInt(String(zIndex), 10)
  if (!Number.isNaN(parsed)) {
    div.style.zIndex = parsed
  }

  const doc = document.body.parentNode
  if (!props.hideMask) {
    if (!doc.style.paddingRight) {
      doc.style.paddingRight = `${window.innerWidth - docSize.width}px`
    }
    doc.style.overflow = 'hidden'
  }

  const handleClose = () => {
    console.log('handleClose 执行')
    onClose && onClose()
    !isPortal && close(options)
  }

  const opacityDefault = props.maskOpacity === undefined ? 0.45 : props.maskOpacity
  const maskOpacity = isMask(props.id) || forceMask ? opacityDefault : 0.01
  if (!props.hideMask) {
    div.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`
  }

  containers[props.id].visible = true

  const panel = (
    <Panel {...otherProps} onClose={handleClose} container={div}>
      { content }
    </Panel>
  )

  if (isPortal) {
    return ReactDOM.createPortal(panel, div)
  }
  // if (document.activeElement && !getParent(document.activeElement, div)) {
  //   document.activeElement.blur()
  // }

  ReactDOM.render(panel, div)
  return null
}

const LoadingOk = (props) => {
  const [loading, setLoading] = useState(false)
  const { option } = props
  const onClick = closeCallback(option?.onOk, option, setLoading)
  return (
    <Button loading={loading} key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
      { 'ok' }
    </Button>
  )
}

const closeCallback = (fn, option, setLoading) => () => {
  let res = fn?.()
  // 如果是promise的回调
  if (res && typeof res.then === 'function') {

    setLoading?.(true)

    res.finally(() => {
      close(option)
      setLoading?.(false)
    })
  } else {
    close(option)
  }
}

const generateCancelBtn = (option) => {
  const onClick = closeCallback(option?.onCancel, option)
  return (
    <Button id={`${option.id}-cancel`} key="cancel" onClick={onClick}>
      { 'cacel' }
    </Button>
  )
}

export const method = (type) => (option) => {
  const props = Object.assign(
    {
      width: 420,
      esc: true,
    },
    option,
    {
      id: `__${(new Date).getTime()}__`,
      destroy: true,
      type,
      from: 'method',
    }
  )

  if (type === 'confirm') {
    props.footer = [generateCancelBtn(props), <LoadingOk option={props} key="ok" />]
  } else {
    props.footer = props?.footer ? props.footer : [<LoadingOk option={props} key="ok" />]
  }

  open(props)
  return () => close(props)
}

export const closeAll = () => {
  Object.keys(containers)
    .filter(id => containers[id].props.from === 'method' && containers[id].visible)
    .forEach(id => {
      const { onClose, usePortal } = containers[id].props
      if (onClose) onClose()
      if (!usePortal) close(containers[id].props)
    })
}

// ready(() => {
//   document.addEventListener('keydown', e => {
//     if (e.key !== 'Escape') return
//     const ids = Object.keys(containers).reverse()
//     const opened = ids.find(id => containers[id].visible && containers[id].props.esc)
//     if (!opened) return
//     const { props } = containers[opened]
//     const { onClose, usePortal } = props
//     if (onClose) onClose()
//     if (!usePortal) close(props)
//   })
// })
