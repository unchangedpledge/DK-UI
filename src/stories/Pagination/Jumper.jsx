import React from 'react'
import classnames from 'classnames'
import { useState } from 'react'
import { useEffect } from 'react'

const inputStyle = { 
  display: 'block',
  width: '100%',
  padding: '5px 8px',
  border: 0,
  background: 'transparent',
  'line-height': 'inheritm',
  outline: 'none',
  color: '#333E59m',
  boxSizing: 'border-box'
}

const Jumper = (props) => {

  const {
    current,
    prefixCls,
    onChange
  } = props

  const [value, setValue] = useState(current)

  useEffect(() => {
    setValue(current)
  }, [current])

  const className = classnames({
    [`${prefixCls}-section`]: true,
  })

  const getMax = () => {
    const { total, pageSize } = props
    return Math.ceil(total / pageSize) || 1
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      let current = parseInt(e.target.value, 10)

      if (!Number.isFinite(current)) return
      if (current < 1) current = 1

      const max = getMax()
      if (current > max) current = max

      onChange(current)
      
    }
  }

  return (
    <div className={className}>
      <span>跳至</span>
      <label style={{
        width: '60px',
        display: 'inline-block',
        position: 'relative',
        border: '1px solid #cccfd7',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        borderRadius: '4px',
        color: '#333E59',
        fontSize: '14px',
        margin: '0 4px',
        lineHeight: 1.42857143,
        transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
      }}>
        <input
          type='number'
          value={String(value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {setValue(current)}}
          onChange={(e)=>{setValue(e.target.value)}}
          style={inputStyle}
        />
      </label>
      <span>页</span>
    </div>
  )
}

export default Jumper
