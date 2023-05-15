import React from 'react'
import { useRef, useEffect, useState, cloneElement } from 'react'
import classnames from 'classnames'
import './carousel.scss'

const style = {
  width: '100%',
  height: '400px',
}

export const Carousel = ({ children, animation = 'fade', speed = 1000, interval = 2000, autoPlay = true, ...props }) => {
  const carousel = useRef()
  const slide = useRef()
  const timer = useRef()
  const timeout = useRef()
  const clone = cloneElement(children[0])
  const num = useRef(0)
  const [current, setCurrent] = useState(0)

  const animate = (target, type = 'next') => {
    if(type === 'prev' && num.current < 0) {
      slide.current.style.transition = ''
      const left = -children.length * carousel.current?.offsetWidth
      target = left + carousel.current?.offsetWidth
      slide.current.style.left = left
      num.current = children.length - 1
      slide.current.style.transition = ''
    }
    clearTimeout(timeout.current)
    slide.current.style.transition = `left ${speed / 1000}s`
    slide.current.style.left = `${target}px`
    timeout.current = setTimeout(() => {
      slide.current.style.transition = ''
      if (type === 'next' && num.current >= children.length){// 到最后一张复制的图片
        slide.current.style.left = 0
        num.current = 0
      }
    }, speed);
  }

  const handleAutoPlay = () => {
    if (animation === 'slide') {
      const carouselWidth = carousel.current?.offsetWidth
      const len = children.length
      return setInterval(() => {
        console.log(1)
        num.current += 1
        setCurrent((current + 1) % len)
        animate(-num.current * carouselWidth)
      }, interval)
    } else if(animation === 'fade') {
      return setInterval(() => {
        handleClickBtn()
      }, interval);
    }
  }

  useEffect(() => {
    autoPlay && (timer.current = handleAutoPlay())
    return () => {
      clearInterval(timer.current)
    }
  })

  const handleClickBtn = (type = 'next') => {
    const len = children.length
    const addValue = type === 'next' ? 1 : -1
    setCurrent((current + addValue + len) % len)
    if (animation === 'slide') {
      const carouselWidth = carousel.current?.offsetWidth
      num.current += addValue
      animate(-num.current * carouselWidth, type)
    }
    
  }

  const handleClickIndicator = (i) => {
    setCurrent(i)
    if (animation === 'slide') {
      num.current = i
      animate(-i * carousel.current?.offsetWidth)
    }
  }

  return (
    <div ref={carousel} className="dk-carousel" style={{width: '700px', height: '400px'}}>
      <div ref={slide} className="dk-carousel-content-slide dk-carousel-content">
        {
          [...children, clone].map((child, i) => {
            const el = cloneElement(child, {
              class: classnames({
                'dk-carousel-content-item': true,
                'current': i === current
              })
            })
            return el
          })
        }
      </div>
      
      <div className="dk-carousel-indicator">
        {
          children.map((_, i) => (
            <span 
              className={classnames({
                'dk-carousel-indicator-item': true,
                'current': i === current
              })}
              onClick={() => handleClickIndicator(i)}
            />
          ))
        }
      </div>
      <div className="dk-carousel-arrow">
        <div onClick={() => {handleClickBtn('prev')}} className="dk-carousel-arrow-prev dk-carousel-arrow-dark">
          <span className="dk-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" focusable="false" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2782 4.23933C16.864 4.82511 16.864 5.77486 16.2782 6.36065L10.6213 12.0175L16.2782 17.6744C16.864 18.2601 16.864 19.2099 16.2782 19.7957C15.6924 20.3815 14.7426 20.3815 14.1569 19.7957L7.43934 13.0782C6.85355 12.4924 6.85355 11.5426 7.43934 10.9568L14.1569 4.23933C14.7426 3.65354 15.6924 3.65354 16.2782 4.23933Z" fill="currentColor"></path></svg>
          </span>
        </div>
        <div onClick={() => {handleClickBtn('next')}} className="dk-carousel-arrow-next dk-carousel-arrow-dark">
          <span className="dk-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" focusable="false" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.43934 19.7957C6.85355 19.2099 6.85355 18.2601 7.43934 17.6744L13.0962 12.0175L7.43934 6.36065C6.85355 5.77486 6.85355 4.82511 7.43934 4.23933C8.02513 3.65354 8.97487 3.65354 9.56066 4.23933L16.2782 10.9568C16.864 11.5426 16.864 12.4924 16.2782 13.0782L9.56066 19.7957C8.97487 20.3815 8.02513 20.3815 7.43934 19.7957Z" fill="currentColor"></path></svg>
          </span>
        </div>
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

export default Carousel
