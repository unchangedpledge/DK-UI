
export const getSize = (size, type) => {
  let width = -1
  let height = -1
  if (type === 'line') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      height = size === 'small' ? 6 : 8
    } else if (typeof size === 'number') {
      [width, height] = [-1, size]
    } else {
      [width = -1, height = 8] = size
    }
  } else if (type === 'circle') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      [width, height] = size === 'small' ? [60, 60] : [120, 120]
    } else if (typeof size === 'number') {
      [width, height] = [size, size]
    } else {
      width = size[0] ?? size[1] ?? 120
      height = size[0] ?? size[1] ?? 120
    }
  }
  return [width, height]
}

