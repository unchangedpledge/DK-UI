import React from 'react'
import classnames from 'classnames'

const Header = (props) => {
  const prefixCls = 'dk-card'
  const { 
    style,
    align,
    className,
    children,
    extra,
    ...other
  } = props

  const cardClass = classnames(
    {
      [`${prefixCls}-header`]: true,
      [`${prefixCls}-${align}`]: align,
    },
    className
  )

  const renderIndicator = () => {
    const { collapsed } = props
    if (collapsed === undefined) return undefined
    const className = classnames(
      {
        [`${prefixCls}-indicator`]: true,
      },
    )
    return <span className={className}>{'>'}</span>
  }

  return (
    <div style={style} {...other} className={cardClass}>
      <div className={`${prefixCls}-header-title`}>
        {renderIndicator()}
        {children}
      </div>
      {
        extra && (
          <div className={`${prefixCls}-header-extra`}>
            {extra}
          </div>
        )
      }
    </div>
  )
}


export default Header
