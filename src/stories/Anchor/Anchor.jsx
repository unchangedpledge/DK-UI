import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import './anchor.scss'
import classnames from 'classnames'

export const Anchor = (props) => {
  const prefixCls = 'dk-anchor'

  const {
    items
  } = props

  const [current, setCurrent] = useState(items[0].href)

  const getTop = () => {
    const index = [...items].flat(Infinity).findIndex(item => item.href === current)
    return `${14.5 + 30 * index}px`
  }

  const renderItems = (arr) => {
    return arr.map(item => {
      const { key, href, title, children } = item

      const linkClassNames = classnames({
        [`${prefixCls}-link`]: true,
        [`${prefixCls}-link-active`]: href === current,
      })

      const titleClassNames = classnames({
        [`${prefixCls}-link-title`]: true,
        [`${prefixCls}-link-title-active`]: href === current,
      })

      const handleClick = () => {
        setCurrent(href)
      }

      return (
        <div key={key} className={linkClassNames}>
          <a className={titleClassNames} href={href} onClick={handleClick}>{ title }</a>
          { children && renderItems(children) }
        </div>
      )
    })
  }

  return (
    <div className={`${prefixCls}-wrapper`} style={{maxHeight: '100vh'}}>
      <div className={`${prefixCls}`}>
        <span className={`${prefixCls}-ink`} style={{top: getTop(), height: '21px'}} />
        {
          renderItems(items)
        }
      </div>
    </div>
  )
}

// Button.propTypes = {
//   /**
//    * Is this the principal call to action on the page?
//    */
//   primary: PropTypes.bool,
//   /**
//    * What background color to use
//    */
//   backgroundColor: PropTypes.string,
//   /**
//    * How large should the button be?
//    */
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   /**
//    * Button contents
//    */
//   label: PropTypes.string.isRequired,
//   /**
//    * Optional click handler
//    */
//   onClick: PropTypes.func,
// };

// Button.defaultProps = {
//   backgroundColor: null,
//   primary: false,
//   size: 'medium',
//   onClick: undefined,
// };

export default Anchor
