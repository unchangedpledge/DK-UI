import React from 'react'
import classnames from 'classnames'

const Body = (props) => {
  const prefixCls = 'dk-card'
  const { className, ...other } = props

  const cardBodyClass = classnames(
    {
      [`${prefixCls}-body`]: true,
    },
    className
  )

  return (
    <div {...other} className={cardBodyClass} />
  )
}


export default Body
