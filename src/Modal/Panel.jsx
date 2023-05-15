import React from 'react'
import classnames from 'classnames'
import Icons from '../Icons'
import Card from '../Card'
import { Provider as ZProvider } from './context'
import { useEffect } from 'react'
import { memo } from 'react'
import { useRef } from 'react'

const DefaultValue = {
  className: '',
  size: 'default',
  style: {},
  type: 'default',
  top: '10vh',
  maskCloseAble: true,
  width: 500,
  events: {},
  drawer: false,
}

function setTransformOrigin(node, value) {
  const { style } = node
  style.transformOrigin = value
}

let mousePosition = null

const getClickPosition = (e) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  }
  setTimeout(() => {
    mousePosition = null
  }, 100)
}

document.addEventListener('click', getClickPosition, true)

const Panel = (props) => {
  const prefixCls = 'dk-modal'

  const {
    footer,
    type,
    onClose,
    maskCloseAble,
    position,
    zoom,
    hideClose,
    from,
    top,
    events,
    fullScreen,
  } = props
  const className = classnames(
    {
      [`${prefixCls}-panel`]: true,
      [`${prefixCls}-zoom`]: true,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${position}`]: position,
    },
    props.className
  )
  const showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null
  const maskStyle = { paddingBottom: fullScreen ? 0 : top }

  // const handleMaskClick = (type, e) => {
  //   this[type] = e.target
  // }
  
  const handleClose = (e) => {
    e.stopPropagation()
    const { target } = e
    if (!maskCloseAble) {
      return
    }
    // if (maskDownTarget !== maskUpTarget) return
    if (target.matches(`.${prefixCls}-mask`) && onClose) {
      onClose()
    }
  }

  const getStyle = () => {
    const { width, height, top, position, style, fullScreen, drawer } = props
    const w = fullScreen ? '100vw' : width
    const h = fullScreen ? '100vh' : height
    return Object.assign(
      {
        position: 'absolute',
      },
      position ? 
        {
          width: drawer && ['left', 'right'].includes(position) ? w : undefined,
          height: drawer && ['top', 'bottom'].includes(position) ? h : undefined,
        } : 
        {
          display: 'inline-flex',
          width: w,
          height: h,
          top: fullScreen ? 0 : top,
          position: 'relative',
        },
      style || {}
    )
  }

  const renderIcon = () => {
    if (type === 'default') {
      return null
    }
    const iconType = type?.charAt(0).toUpperCase() + type?.slice(1)
    return Icons[iconType]
  }

  const renderTitle = (renderInContent = false) => {
    const { from, title } = props
    if (!title) {
      return null
    }

    if (from === 'method') {
      if (!renderInContent) return null

      return <div className={`${prefixCls}-title ${prefixCls}-method-title`}>{ title }</div>
    }

    const icon = renderIcon()

    return (
      <Card.Header className={`${prefixCls}-title ${icon ? `${prefixCls}-with-icon` : ''}`}>
        { title }
      </Card.Header>
    )
  }

  const renderContent = () => {
    const { children, noPadding, padding, position, bodyStyle, from = null } = props

    let style = { padding: noPadding === true ? 0 : padding }
    if (position) style.overflow = 'auto'

    if (bodyStyle) style = Object.assign(style, bodyStyle)

    if (!from || from !== 'method') {
      return <Card.Body style={style}>{children}</Card.Body>
    }

    const icon = renderIcon()

    return (
      <Card.Body className={`${prefixCls}-body`} style={style}>
        { icon && <div className={`${prefixCls}-icon`}>{icon}</div> }
        { renderTitle(true) }
        <div>{children}</div>
      </Card.Body>
    )
  }

  const animate = () => {
    const { container } = props
    setTimeout(() => {
      container?.classList.add(`${prefixCls}-show`)
      if (!position) {
        container?.classList.add(`${prefixCls}-start`)
      }
    })
  }

  const panel = useRef()
  const savePanel = (node) => {
    panel.current = node
  }

  const updateOrigin = () => {
    if (position || !zoom) {
      return
    }
    const node = panel.current
    setTransformOrigin(node, '')
    if (node) {
      if (mousePosition) {
        const { left, top } = node.getBoundingClientRect()
        const ol = mousePosition.x - left
        const ot = mousePosition.y - top
        setTransformOrigin(node, `${ol}px ${ot}px`)
      } else {
        setTransformOrigin(node, '')
      }
    }
  }

  useEffect(() => {
    updateOrigin()
    animate()
  })

  return (
    <ZProvider value>
      <div
        {...events}
        style={maskStyle}
        className={`${prefixCls}-mask`}
        // onMouseDown={handleMaskDown}
        // onMouseUp={handleMaskUp}
        onClick={handleClose}
      >
        <Card
          forwardedRef={savePanel}
          shadow
          className={className}
          style={getStyle()}
        >
          {showClose && (
            <a className={`${prefixCls}-close`} onClick={onClose}>
              {'X'}
            </a>
          )}
          { renderTitle() }
          { renderContent() }
          {footer && (
            <Card.Footer className={`${prefixCls}-footer ${from ? `${prefixCls}-${from}` : ''}`} align="right">
              { footer }
            </Card.Footer>
          )}
        </Card>
      </div>
    </ZProvider>
  )
}


Panel.defaultProps = DefaultValue

export default memo(Panel)

