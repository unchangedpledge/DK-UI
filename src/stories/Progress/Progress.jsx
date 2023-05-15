import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import Line from './Line'
import Circle from './Circle'
import './progress.scss'
import { useMemo } from 'react'


/**
 * 
 * @param {*} props: {
 *  type: 'line' | 'circle',
 *  status: 'normal' | 'exception', 'success'
 * }
 * @returns 
 */

export const Progress = (props) => {

  const { 
    children,
    percent = 0,
    type = 'line',
    status = 'normal',
    showInfo = true,
    format,
    size = 'default',
    ...other
  } = props
  const prefixCls = 'dk-progress'

  const dkClassNames = classnames({
    [prefixCls]: true,
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-status-${status}`]: true,
    [`${prefixCls}-show-info`]: showInfo,
    [`${prefixCls}-${size}`]: typeof size === 'string'
  })

  const progressInfo = useMemo(() => {
    if (!showInfo) {
      return null;
    }
    const textFormatter = format || ((number) => `${number}%`)
    let text = textFormatter(percent);
    
    return (
      <span className={`${prefixCls}-text`}>
        {text}
      </span>
    )
  }, [percent])

  return (
    <div className={dkClassNames}>
      {
        type === 'line' ?
          <Line {...props} prefixCls={prefixCls}>{ progressInfo }</Line> :
          <Circle {...props} prefixCls={prefixCls}>{ progressInfo }</Circle>
      }
    </div>
  )
};

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

export default Progress
