import React, { isValidElement } from 'react'
import classnames from 'classnames'
import { Spin } from '../Spin/Spin'
import './button.scss'

const DefaultProps = {
  size: 'default',
  htmlType: 'button',
  outline: false,
  type: 'default',
}

const Button = (props = DefaultProps) => {

  const prefixCls = 'dk-button'

  const {
    outline: outlineProp = DefaultProps.outline,
    type: typeProp = DefaultProps.type,
    size = DefaultProps.size,
    href,
    htmlType = DefaultProps.htmlType,
    loading,
    disabled,
    onRef,
    shape,
    text,
    target,
    children,
    ...others
  } = props

  const isSecondary = typeProp === 'secondary' && !outlineProp && !text
  const type = isSecondary ? 'primary' : typeProp
  const outline = outlineProp || isSecondary
  let color = outline || type === 'default' ? undefined : '#fff'
  if (text) color = 'currentColor'
  const className = classnames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size !== DefaultProps.size,
      [`${prefixCls}-text`]: text,
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-outline`]: outline,
      [`${prefixCls}-disabled`]: disabled,
    },
    props.className
  )

  if (href && !disabled) {
    return (
      <a href={href} {...others} target={target} className={className} ref={onRef}>
        {props.children}
      </a>
    )
  }

  return (
    <button {...others} ref={onRef} disabled={disabled || loading} type={htmlType} className={className}>
      {loading && (
        <span style={{marginRight: '5px', display: 'inline-flex'}}>
          <Spin size='small' color={color} />
        </span>
      )}
      <span>{ children }</span>
    </button>
  )
}

export default Button
