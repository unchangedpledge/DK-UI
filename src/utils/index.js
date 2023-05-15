import classnames from "classnames"


export const classGenerator = (name, prefix = 'dk') => (...args) => {
  return classnames(...args.map(item => {
    return item ? `${prefix}-${name}${item === '_' ? '' : '-' + item}` : ''
  }))
}
