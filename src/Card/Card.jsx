import React from 'react'
import classnames from 'classnames'
import { Provider } from './context'
import { useRef } from 'react'

import './card.scss'


const Card = (props) => {
  const prefixCls = 'dk-card'

  const {
    bordered = true,
    className = '',
    style = {},
    extra
  } = props

  const element = useRef()

  const bindElement = (el) => {
    element.current = el
    const { forwardedRef } = props
    if (forwardedRef) forwardedRef(el)
  }

  const shadow = props.shadow === true ? 'shadow' : props.shadow
  const cardClass = classnames(
    prefixCls,
    {
      [`${prefixCls}-${shadow}`]: shadow,
      [`${prefixCls}-bordered`]: bordered,
    },
    className
  )

  const provierValue = {
    extra
  }

  return (
    <div className={cardClass} ref={bindElement} style={style}>
      <Provider value={provierValue}>
        {props.children}
      </Provider>
    </div>
  )

}


export default Card
