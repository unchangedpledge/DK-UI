import React, { createContext } from 'react'

const context = createContext()

export const { Provider } = context

function filterProps(props, keys) {
  if (!props) return {}

  const value = {}
  keys.forEach(k => {
    value[k] = props[k]
  })
  return value
}

// 返回增加props的高阶组件
export const consumer = (Origin, keys = []) => (
  props
) => (
  <context.Consumer>
    {(value) => <Origin {...props} {...filterProps(value, keys)} />}
  </context.Consumer>
)
