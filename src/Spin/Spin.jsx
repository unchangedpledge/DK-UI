import React from 'react'
import classnames from 'classnames'
import './spin.scss'

export const Spin = (props) => {
  const {
    children,
    tip,
    size = 'middle',
    spinning = true,
    color
  } = props

  const prefixCls = 'dk-spin'

  const classNamesObj = classnames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: true,
      [`${prefixCls}-block`]: !!children,
      [`${prefixCls}-hidden`]: !spinning
    }
  )

  return (
    <div className={classNamesObj}>
      {
        spinning && (
          <div className="dk-spin-wrapper" style={{color}}>
            <svg width="48" height="48" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" data-icon="spin"><defs><linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id="linearGradient-45"><stop stopColor="currentColor" stopOpacity="0" offset="0%"></stop><stop stopColor="currentColor" stopOpacity="0.50" offset="39.9430698%"></stop><stop stopColor="currentColor" offset="100%"></stop></linearGradient></defs><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect fillOpacity="0.01" fill="none" x="0" y="0" width="36" height="36"></rect><path d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951" stroke="url(#linearGradient-45)" strokeWidth="4" strokeLinecap="round"></path></g></svg>
            { tip && <div className="tip">{tip}</div> }
          </div>
        )
      }
      <div className="dk-spin-children">
        { children }
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

export default Spin
