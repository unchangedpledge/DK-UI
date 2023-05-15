import React from 'react'
import classnames from 'classnames'
import { createContext } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const context = createContext()

export const consumer = (Origin) => props => (
  <context.Consumer>
    {value => <Origin {...value} {...props} />}
  </context.Consumer>
)

/**
 * @param {*} Component
 * @param {*} duration
 * @param {*} type - fade, collapse, tranlate
 */

export default function (Component, { type = ['fade'], duration = 360, display = 'block' }) {
  const prefixCls = 'dk-hidable'
  const hasCollapse = type.indexOf('collapse') >= 0

  const Hidable = (props) => {
    const { show: showProp = false } = props
    const [show, setShow] = useState(showProp)
    const height = useRef(0)
    const id = useRef(`__hidable_${(new Date).getTime()}__`)

    const getElement = () => {
      return document.querySelector(`.${id.current}`)
    }

    const handleShow = () => {
      const es = getElement().style
      es.display = display
      setTimeout(() => {
        setShow(true)

        if (hasCollapse) {
          es.height = `${height.current}px`

          setTimeout(() => {
            es.height = 'auto'
            es.overflow = ''
          }, duration)
        }
      }, 10)
    }

    const handleHide = () => {
      setShow(false)
      const element = getElement()

      if (hasCollapse) {
        height.current = element.offsetHeight
        element.style.height = `${height.current}px`
        element.style.overflow = 'hidden'

        setTimeout(() => {
          element.style.height = '0px'
        }, 10)
      }

      setTimeout(() => {
        if (element) {
          element.style.display = 'none'
        }
      }, duration)
    }

    const isFirstMount = useRef(true)
  
    useEffect(() => {
      if (isFirstMount.current) {
        isFirstMount.current = false
        const el = getElement()
        if (!el) return
  
        if (props.show) {
          handleShow()
          return
        }
        if (hasCollapse) {
          height.current = el.offsetHeight
        }
        
        el.style.display = 'none'
        if (hasCollapse) {
          el.style.overflow = 'hidden'
          el.style.height = '0px'
        }
      } else {
        if (props.show) {
          handleShow()
        } else {
          handleHide()
        }
      }
    }, [props.show])

    let animation = `fade-animation-${duration}`

    const className = classnames(
      prefixCls,
      ...type.map(item => `${prefixCls}-${item}`),
      {
        [`${prefixCls}-${animation}`]: animation,
        [`${prefixCls}-show`]: show,
      },
      props.className,
      id.current
    )

    const provider = { show }
    return (
      <context.Provider value={provider}>
        <Component {...props} className={className} />
      </context.Provider>
    )
  }

  return Hidable
}
