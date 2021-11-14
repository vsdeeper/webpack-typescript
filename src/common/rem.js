// 基准大小
const baseSize = 75
// 设置 rem 函数
function setRem () {
  let ww = document.documentElement.clientWidth || document.body.clientWidth;
  let scale = ww / 375
  if (window.orientation === 0 || window.orientation === 180) {
    scale = ww / 375
  }
  if (window.orientation === 90 || window.orientation === -90) {
    scale = ww / 667
  }
  let htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize= baseSize * Math.min(scale, 2) + 'px'
}
setRem();
window.onresize = function () {
  setRem()
}

const aa = [1, 3]
const bb = aa.slice(0)
console.log('aa', aa)
console.log('bb', bb)