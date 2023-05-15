import React from 'react'
import Pagination from './Pagination'
import { useState } from 'react'
import './pagination.scss'

const DefaultValue = { defaultCurrent: 1, pageSize: 10, total: 0 }

const DKPagination = (props = DefaultValue) => {
  const [current, setCurrent] = useState(props.current || props.defaultCurrent || DefaultValue.defaultCurrent)
  const [pageSize, setPageSize] = useState(props.pageSize || props.defaultPageSize || DefaultValue.pageSize)
  
  const handleChange = (current, newPageSize = pageSize) => {
    const sizeChange = pageSize !== newPageSize
    setCurrent(current)
    setPageSize(newPageSize)
    if (props.onChange) {
      props.onChange(current, pageSize, sizeChange)
    }
  }

  if (props?.total < 0) return null

  return <Pagination {...props} current={current} pageSize={pageSize} onChange={handleChange} />

}

export default DKPagination