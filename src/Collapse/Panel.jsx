import React from 'react'
import classnames from 'classnames'
import { Provider } from './context'
import { useState } from 'react'
import { useRef } from 'react'
import hidable from './hidable'

const Item = (props) => {
  const className = classnames(props.className)
  const { show, getRef, ...other } = props
  return <div ref={getRef} {...other} className={className} style={props.style} />
}

const CollapseChildren = hidable(Item, { type: ['collapse'], duration: 240 })

const Panel = (props) => {
  const prefixCls = 'dk-collapse'

  const {
    className = '',
    style = {},
    onCollapse,
    extra,
    header,
    cKey,
    activeKey,
    showArrow = true,
    collapsible = true
  } = props

  const element = useRef()

  const bindElement = (el) => {
    element.current = el
    const { forwardedRef } = props
    if (forwardedRef) forwardedRef(el)
  }

  const panelClass = classnames(
    {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-disabled`]: !collapsible,
    },
    className
  )

  const headerClass = classnames({
    [`${prefixCls}-header`]: true,
  })

  const renderIndicator = () => {
    const className = classnames(
      {
        [`${prefixCls}-indicator`]: true,
      },
    )
    return (
      <div className={className}>
        <span className='dk-collapse-arrow'>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" style={{ transform: activeKey.includes(cKey) ? "rotate(90deg)" : "" }}><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
        </span>
      </div>
    )
  }

  return (
    <div className={panelClass} ref={bindElement} style={style}>
      <div className={headerClass} onClick={() => {collapsible && onCollapse(cKey)}}>
        <div className={`${prefixCls}-header-title`}>
          { showArrow && renderIndicator() }
          { header }
        </div>
        {
          extra && (
            <div className={`${prefixCls}-header-extra`}>
              {extra}
            </div>
          )
        }
      </div>
        <CollapseChildren show={activeKey.includes(cKey)}>
          <div className={`${prefixCls}-content`} >
            { props.children }
          </div>
        </CollapseChildren>
    </div>
  )
}

export default Panel
