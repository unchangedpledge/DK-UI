import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import './tag.scss'

export const Tag = ({ children, closable, onClose, ...props }) => {

  const prefixCls = 'dk-tag'

  const dkTagClassNames = classnames({
    [`${prefixCls}`]: true,
    [`${prefixCls}-closable`]: closable
  })

  const handleClick = (e) => {
    onClose?.()
    e.stopPropagation();
  }

  return (
    <div className={dkTagClassNames} {...props}>
      <div className={`${prefixCls}-content`}>
        <p>{children}</p>
      </div>
      {
        closable && 
        <div className={`${prefixCls}-close`} onClick={handleClick}>
          <span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" focusable="false" aria-hidden="true"><path d="M17.6568 19.7782C18.2426 20.3639 19.1924 20.3639 19.7782 19.7782C20.3639 19.1924 20.3639 18.2426 19.7782 17.6568L14.1213 12L19.7782 6.34313C20.3639 5.75734 20.3639 4.8076 19.7782 4.22181C19.1924 3.63602 18.2426 3.63602 17.6568 4.22181L12 9.87866L6.34313 4.22181C5.75734 3.63602 4.8076 3.63602 4.22181 4.22181C3.63602 4.8076 3.63602 5.75734 4.22181 6.34313L9.87866 12L4.22181 17.6568C3.63602 18.2426 3.63602 19.1924 4.22181 19.7782C4.8076 20.3639 5.75734 20.3639 6.34313 19.7782L12 14.1213L17.6568 19.7782Z" fill="currentColor"></path></svg>
          </span>
        </div>
      }
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

export default Tag
