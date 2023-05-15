import React from 'react'
import { createContext } from 'react'

const context = createContext()

export const Provider = context.Provider

const consumer = (Origin) => (props) => (
  
  <context.Consumer>
    {value => {
      const map = Object.assign({}, props, value && props.absolute && props.zIndex === undefined && { zIndex: 1051 })
      return <Origin {...map} />
    }}
  </context.Consumer>
)

export default consumer
