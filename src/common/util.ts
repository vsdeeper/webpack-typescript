/**
 * 首字母小写
 * @params { str: 页面名称 }
 */
export function initialToLowercase (str: string): string {
  if (str) {
    return str.slice(0, 1).toLowerCase + str.slice(1)
  }
  return 'unkown'
}
/**
 * 对象类型检查
 * @params { obj: 检查对象 }
 */
export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
