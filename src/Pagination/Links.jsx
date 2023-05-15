import React from 'react'
import Item from './Item'
import Prev from './Prev'
import Next from './Next'
import classnames from 'classnames'

const DefaultValue = {
  span: 5,
  text: {},
}

const renderIcon = (isPrev) => {
  if (!isPrev) {
    return <svg viewBox="0 0 1024 1024"><path d="M802.5 511.3L465.8 174.6c-25-25-25-65.4 0-90.4 25-24.9 65.4-24.9 90.4 0l379.3 379.3c0.9 0.8 1.8 1.7 2.7 2.5 25 25 25 65.4 0 90.4L556.9 937.7c-25 25-65.4 25-90.4 0s-25-65.4 0-90.4l336-336z"></path><path d="M420.5 511.5L83.8 174.8c-25-25-25-65.4 0-90.4 25-24.9 65.4-24.9 90.4 0l379.3 379.3c0.9 0.8 1.8 1.7 2.7 2.5 25 25 25 65.4 0 90.4L174.9 937.9c-25 25-65.4 25-90.4 0s-25-65.4 0-90.4l336-336z"></path></svg>
  }
  return <svg viewBox="0 0 1024 1024"><path d="M219.5 511.3l336.7-336.7c25-25 25-65.4 0-90.4-25-24.9-65.4-24.9-90.4 0L86.5 463.5c-0.9 0.8-1.8 1.7-2.7 2.5-25 25-25 65.4 0 90.4l381.3 381.3c25 25 65.4 25 90.4 0s25-65.4 0-90.4l-336-336z"></path><path d="M601.5 511.5l336.7-336.7c25-25 25-65.4 0-90.4-25-24.9-65.4-24.9-90.4 0L468.5 463.7c-0.9 0.8-1.8 1.7-2.7 2.5-25 25-25 65.4 0 90.4l381.3 381.3c25 25 65.4 25 90.4 0s25-65.4 0-90.4l-336-336z"></path></svg>
}

const Links = (props = DefaultValue) => {

  const { 
    current,
    onChange,
    span = DefaultValue.span,
    disabled,
    prefixCls
  } = props

  const getLinks = () => {
    const { total, pageSize } = props

    if (total === 0) return { links: [], max: 0 }

    const max = Math.ceil(total / pageSize)
    const links = []
    let right
    let left = current - Math.floor(span / 2)
    if (left < 3) {
      left = 3
    }
    right = left + span
    if (right + 1 >= max) {
      right = max - 1
      left = right - span
      if (left < 1) {
        left = 1
      }
    } else {
      right -= left > 1 ? 1 : 0
    }

    if (left > 1) {
      links.push(1)
    }
    if (left === 3) {
      links.push(2)
    } else if (left > 3) {
      links.push('<<')
    }

    for (let i = left; i < right + 1; i++) {
      links.push(i)
    }

    if (right === max - 2) {
      links.push(max - 1)
    } else if (right < max - 1) {
      links.push('>>')
    }

    if (right < max) {
      links.push(max)
    }

    return { links, max }
  }

  const { links, max } = getLinks()

  const className = classnames({
    [`${prefixCls}-links`]: true,
    [`${prefixCls}-section`]: true,
  })

  return (
    <div className={className}>
      <Prev {...props} />
      {
        links.map(p => {
          if (typeof p === 'number') {
            return (
              <Item key={p} disabled={disabled} isCurrent={current === p} page={p} onClick={onChange} prefixCls={prefixCls}>
                {p}
              </Item>
            )
          }
          const isPrev = p === '<<'
          let page = isPrev ? current - span : current + span
          if (page < 1) page = 1
          if (page > max) page = max
          return (
            <Item
              key={p}
              disabled={disabled}
              page={page}
              className={`${prefixCls}-no-border ${prefixCls}-${isPrev ? 'more-left' : 'more-right'}`}
              onClick={onChange}
              prefixCls={prefixCls}
            >
              {renderIcon(isPrev)}
            </Item>
          )
        })
      }
      <Next {...props} />
    </div>
  )
}

export default Links
