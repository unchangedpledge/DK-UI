import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { useClickAway } from 'ahooks'
import { Tag } from '../Tag/Tag'
import './tagInput.scss'
import { useRef } from 'react'
import { createPortal } from 'react-dom'


export const TagInput = ({
  defaultValue,
  placeholder,
  onChange,
  addOnBlur,
  allowDuplicates,
  allowClear,
  onBlur,
  onFocus,
  onAdd,
  onRemove,
  maxTagCount,
  showRestTagsPopover,
  ...props
}) => {

  const prefixCls = 'dk-tagInput'

  const ref = useRef()
  const nRef = useRef()
  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState(defaultValue || [])
  const [focus, setFocus] = useState(false)
  const [hover, setHover] = useState(false)
  const [nHover, setNHover] = useState(false)
  const [showAllTags, setShowAllTags] = useState(!maxTagCount)
  const dkTagInputClassNames = classnames({
    [`${prefixCls}`]: true,
    [`${prefixCls}-focus`]: focus,
    [`${prefixCls}-hover`]: hover,
  })
  const dkTagInputClearBtnClassNames = classnames({
    [`${prefixCls}-clearBtn`]: true,
    [`${prefixCls}-clearBtn-invisible`]: !hover
  })
  maxTagCount = maxTagCount || tags.length
  const showN = (!showAllTags && maxTagCount < tags.length)

  useClickAway(() => {
    setShowAllTags(false)
    setFocus(false)
  }, [ref])
  
  const handleClickWrapper = () => {
    setShowAllTags(true)
    setFocus(true)
  }

  const addTag = () => {
    let newTags = [...tags, inputValue]
    allowDuplicates && (newTags = [...new Set(newTags)])
    setTags(newTags)
    onAdd?.(inputValue)
    setInputValue('')
    onChange?.(newTags)
  }

  const handleFocus = (e) => {
    onFocus?.(e)
    setShowAllTags(true)
    setFocus(true)
  }

  const handleBlur = (e) => {
    addOnBlur && addTag()
    onBlur?.(e)
    setShowAllTags(false)
    setFocus(false)
  }
  
  const handleKeyDown = (e) => {
    if(e.keyCode === 13) { // 回车按下
      addTag()
    }
  }

  const handleDeleteTag = (i) => {
    onRemove?.(tags[i], i)
    setTags(tags.filter((_, index) => i != index))
  }

  const handleClear =() => {
    setTags([])
  }

  
  return (
    <div {...props} className={dkTagInputClassNames} ref={ref} onClick={handleClickWrapper} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={`${prefixCls}-wrapper`}>
        {
          tags?.map((item, index) => (index + 1 <= maxTagCount || showAllTags) ? 
            (<Tag 
                key={item + index} 
                children={item}
                closable={true}
                onClose={()=>{handleDeleteTag(index)}}
            />) : ''
          )
        }
        { <span className={`${prefixCls}-wrapper-n`} ref={nRef} onMouseEnter={() => setNHover(true)} onMouseLeave={() => setNHover(false)} style={{display: showN ? 'inline-block' : 'none'}}>+{tags.length - maxTagCount}</span> }
        <div className={`${prefixCls}-wrapper-input`}>
          <input
            className="dk-input"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={dkTagInputClearBtnClassNames} onClick={handleClear}>
        <span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" focusable="false" aria-hidden="true" >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM17.0352 16.8626C16.4597 17.4585 15.5101 17.4751 14.9142 16.8996L12.0368 14.121L9.25822 16.9984C8.68274 17.5943 7.73314 17.6109 7.13722 17.0354C6.5413 16.4599 6.52472 15.5103 7.1002 14.9144L9.87883 12.037L7.00147 9.2584C6.40555 8.68293 6.38897 7.73332 6.96445 7.1374C7.53992 6.54148 8.48953 6.52491 9.08545 7.10038L11.9628 9.87901L14.7414 7.00165C15.3169 6.40573 16.2665 6.38916 16.8624 6.96463C17.4584 7.54011 17.4749 8.48971 16.8995 9.08563L14.1208 11.963L16.9982 14.7416C17.5941 15.3171 17.6107 16.2667 17.0352 16.8626Z" fill="currentColor"></path>
          </svg>
        </span>
      </div>
      {
        showRestTagsPopover && nHover &&
        createPortal(
          <div className="dk-portal" style={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000}} onMouseEnter={() => setNHover(true)} onMouseLeave={() => setNHover(false)}>
            <div
              className='dk-portal-inner'
              style={{
                position: 'absolute',
                left: (nRef.current?.offsetLeft + nRef.current?.offsetWidth / 2),
                top: nRef.current?.offsetTop - 5,
                transform: 'translateX(-50%) translateY(-100%)',
              }}
            >
              <div 
                className="dk-popover-wrapper dk-popover-wrapper-show dk-popover-with-arrow" 
                style={{
                  'transform-origin': '50% 100%',
                  position: 'relative',
                  backgroundColor: 'white',
                  borderRadius: 6,
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 1px 0px, rgba(0, 0, 0, 0.1) 0px 4px 14px 0px',
                  fontSize: 14,
                  lineHeight: '20px',
                  padding: 12
                }}>
                <div className="dk-popover">
                  <div className="dk-popover-content">
                  {
                    tags?.slice(maxTagCount).map((item, index) => (<Tag
                      key={item + index} 
                      children={item}
                      closable={true}
                      onClose={()=>{handleDeleteTag(maxTagCount + index)}}
                    />)
                    )
                  }
                  </div>
                </div>
                <svg style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: -7}} width="24" height="8" xmlns="http://www.w3.org/2000/svg" class="dk-popover-icon-arrow"><path d="M0 0.5L0 1.5C4 1.5, 5.5 3, 7.5 5S10,8 12,8S14.5 7, 16.5 5S20,1.5 24,1.5L24 0.5L0 0.5z" fill="rgba(28, 31, 35, .08)" opacity="1"></path><path d="M0 0L0 1C4 1, 5.5 2, 7.5 4S10,7 12,7S14.5  6, 16.5 4S20,1 24,1L24 0L0 0z" fill="rgba(255, 255, 255, 1)"></path></svg>
              </div>
            </div>          
          </div>,
          document.body
        )
      }
    </div>
  );
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

export default TagInput
