import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import './rate.scss'

export const Rate = ({ defaultValue = 0, count = 5, ...props }) => {

  const [rate, setRate] = useState(defaultValue)
  const [tempRate, setTempRate] = useState(defaultValue)

  const handleHover = (e) => {
    if (e.target.tagName == 'LI') {
      const i = +e.target.dataset.index
      setTempRate(i + 1)
    }
  }

  const handleLeave = () => {
    setTempRate(rate)
  }

  const handleClick = (e) => {
    if (e.target.tagName == 'LI') {
      const i = +e.target.dataset.index
      setRate(i + 1)
    }
  }

  return (
    <ul className="dk-rate" onClick={(e) => {handleClick(e)}} onMouseOver={(e) => {handleHover(e)}} onMouseLeave={handleLeave}>
      {
        Array(count).fill(null).map((_, i) => {
          return (
            <li
              className={classnames({
                'dk-rate-star': true,
                'ant-rate-star-zero': tempRate < i,
                'ant-rate-star-full': tempRate > i
              })}
              data-index={+i}
            >
              <div>
                <div className="dk-rate-star-first">
                  <span>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                  </span>
                </div>
                <div className="dk-rate-star-second">
                  <span>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                  </span>
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>
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

export default Rate
