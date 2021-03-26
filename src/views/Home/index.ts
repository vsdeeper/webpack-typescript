import '@/assets/style/global.scss'
import './index.scss'
import { Class, Observe, Watcher } from '@/common'


export class Home extends Class.Page {
  constructor () {
    super()
  }
  data () {
    return {
      pageName: '加载中...'
    }
  }
  goto (href: string) {
    window.location.href = href
  }
}

class BothWay {
  data: any;
  constructor (data: any, el: Element, exp: string) {
    this.data = data
    Observe(data)
    el.innerHTML = this.data[exp] // 初始化模板数据的值
    new Watcher(data, exp, (val: any) => {
      el.innerHTML = val
    })
  }
}

const home = new Home()
const data = home.data()
const el = document.querySelector('#pageName') as Element
const selfVue = new BothWay(data, el, 'pageName')

setTimeout(() => {
  selfVue.data.pageName = '我是首页'
}, 3000)
