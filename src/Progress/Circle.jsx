
import { Circle as RCCircle }  from 'rc-progress'
import { getSize } from './utils'


const Circle = ({ children, prefixCls, percent, status, size }) => {

  const mergedSize = size || [120, 120]
  const [width, height] = getSize(mergedSize, 'circle')

  const strokeColor = {
    exception: '#ff4d4f',
    success: '#52c41a',
    normal: '#1677ff'
  }[status]

  const strokeWidth = 5

  const circleStyle = {
    width,
    height,
    fontSize: width * 0.15 + 6
  }


  const circleContent = (
    <RCCircle 
      percent={percent}
      strokeWidth={strokeWidth}
      trailWidth={strokeWidth}
      strokeColor={strokeColor}
      prefixCls={prefixCls}
    />
  )

  return (
    <div className={`${prefixCls}-inner`} style={circleStyle}>
      {circleContent}
      {children}
    </div>
  )
}

export default Circle
