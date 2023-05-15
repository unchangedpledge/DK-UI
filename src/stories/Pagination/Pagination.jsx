import React from 'react'
import classnames from 'classnames'
import Links from './Links'
import Jumper from './Jumper'
// import Simple from './Simple'
// import PageSizeList from './PageSizeList'

const DefaultValue = {
  size: 'default',
  layout: ['links'],
  span: 5,
  text: {},
}

const Pagination = (props = DefaultValue) => {
  const prefixCls = 'dk-pagination'
  const {
    layout = ['links'],
    size = 'default',
    span = 5,
    style
  } = props

  const classNamesObj = classnames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: true,
    }
  )

  const className = classnames(classNamesObj, props.className)

  return (
    <div className={className} style={style}>
      {
        layout?.map((section, i) => {
          switch (section) {
            case 'links':
              return <Links key={section} {...props} prefixCls={prefixCls}/>
            case 'list':
              // return <PageSizeList key={section} {...props} prefixCls={prefixCls}/>
            case 'jumper':
              return <Jumper key={section} {...props} prefixCls={prefixCls}/>
            default:
              if (typeof section === 'function') {
                return (
                  <div key={i}>
                    <span>{section(props)}</span>
                  </div>
                )
              }
              return null
          }
        })
      }
    </div>
  )
}

export default Pagination
