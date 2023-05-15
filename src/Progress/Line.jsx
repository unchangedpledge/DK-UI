
import { getSize } from './utils'


const Line = ({ children, prefixCls, percent, size }) => {
  console.log(prefixCls, percent, size)

  const mergedSize = size || [-1, size === 'small' ? 6 : 8]
  const [width, height] = getSize(mergedSize, 'line')
  const outerStyle = {
    width: width < 0 ? '100%' : width,
    height,
  }

  const trailStyle = {
  }

  const percentStyle = {
    width: `${percent}%`,
    height,
  }

  return (
    <>
      <div className={`${prefixCls}-outer`} style={outerStyle}>
        <div className={`${prefixCls}-inner`} style={trailStyle}>
          <div className={`${prefixCls}-bg`} style={percentStyle}/>
          {/* {successPercent !== undefined ? (
            <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
          ) : null} */}
        </div>
      </div>
      {children}
    </>
  )
}

export default Line
