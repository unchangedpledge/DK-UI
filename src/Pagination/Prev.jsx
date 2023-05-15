import React from 'react'
import Item from './Item'

const Prev = (props) => {

  const { 
    onChange,
    current,
    text,
    disabled,
    isSimple,
    prefixCls
  } = props

  const renderPrev = () => {
    return text?.prev || <svg viewBox="0 0 1024 1024"><path d="M304.905 561.68c-11.785 0-23.57-4.496-32.562-13.488-17.984-17.983-17.984-47.139 0-65.122l402.522-402.522c17.982-17.983 47.14-17.983 65.122 0 17.984 17.984 17.984 47.14 0 65.123l-402.521 402.521c-8.992 8.993-20.776 13.488-32.562 13.488z"></path><path d="M707.426 964.201c-11.785 0-23.57-4.496-32.561-13.488l-402.523-402.522c-17.984-17.983-17.984-47.139 0-65.122 17.983-17.983 47.14-17.983 65.123 0l402.521 402.522c17.984 17.983 17.984 47.139 0 65.122-8.991 8.992-20.776 13.488-32.561 13.488z"></path></svg>
  }

    const prev = current - 1
    const className = text?.prev || isSimple ? `no-border arrow` : 'arrow'
    return (
      <Item className={`${prefixCls}-${className}`} page={prev} disabled={disabled || prev < 1} onClick={onChange} prefixCls={prefixCls}>
        {renderPrev()}
      </Item>
    )

}

Prev.displayName = 'ShineoutPaginationPrev'

export default Prev
