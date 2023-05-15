import React from 'react'
import classnames from 'classnames'

const Footer = (props) => {
  const prefixCls = 'dk-card'

  const { align, className, ...other } = props
  const cardFooterClass = classnames(
    {
      [`${prefixCls}-footer`]: true,
      [`${prefixCls}-${align}`]: align,
    },
    className
  )

  return <div {...other} className={cardFooterClass} />
}


export default Footer
