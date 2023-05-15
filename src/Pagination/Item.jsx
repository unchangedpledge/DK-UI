import React from 'react'
import classnames from 'classnames'

const DefaultValue = {
  disabled: false,
  isCurrent: false,
}

const Item = (props = DefaultValue) => {
  
  const handleClick = () => {
    const { page, onClick } = props
    onClick(page)
  }

  const { children, isCurrent, disabled, prefixCls } = props
  const className = classnames({
    [`${prefixCls}-item`]: true,
  }, props.className, isCurrent && `${prefixCls}-current`)

  return (
    <a className={className} disabled={disabled || isCurrent} onClick={handleClick}>
      {children}
    </a>
  )

}

export default Item
