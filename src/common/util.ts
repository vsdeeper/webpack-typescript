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