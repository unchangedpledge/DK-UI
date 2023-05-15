import React from 'react'
import classnames from 'classnames'
import { Provider } from './context'
import { useState } from 'react'
import { useRef } from 'react'

import './collapse.scss'

const Collapse = (props) => {
  const prefixCls = 'dk-collapse'

  const {
    activeKey: activeKeyProp ,
    defaultActiveKey,
    onChange,
    bordered = true,
    className = '',
    style = {},
    accordion, // 是否为手风琴模式
  } = props

  const element = useRef()
  const [activeKey, setActiveKey] = useState(activeKeyProp || defaultActiveKey || [])


  const getActiveKeys = () => {
    const { activeKey: newActiveKey } = props
    
    return newActiveKey || activeKey
  }

  const bindElement = (el) => {
    element.current = el
    const { forwardedRef } = props
    if (forwardedRef) forwardedRef(el)
  }

  const handleCollapse = (key) => {
    const curActiveKeys = getActiveKeys()
    let activeKeys = !curActiveKeys.includes(key) ? [...curActiveKeys, key] : curActiveKeys.filter(item => item !== key)
    if (accordion) activeKeys = activeKeys.length ? [key] : activeKeys
    console.log(activeKeys)
    if (onChange) {
      onChange(activeKeys)
    } else {
      setActiveKey(activeKeys)
    }
  }

  const cardClass = classnames(
    prefixCls,
    {
      [`${prefixCls}-borderless`]: !bordered
    },
    className
  )

  const provierValue = {
    onCollapse: handleCollapse,
    activeKey
  }

  return (
    <div className={cardClass} ref={bindElement} style={style}>
      <Provider value={provierValue}>
        { props.children }
      </Provider>
    </div>
  )

}

export default Collapse
