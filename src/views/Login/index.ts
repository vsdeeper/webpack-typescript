import '@/assets/style/global.scss'
import { Class } from '@/common'


export class Login extends Class.Page {
  title!: string
  constructor (title: string) {
    super()
    this.title = title
  }
}

const login = new Login('我是登录页')
await login.mounted()
login.appEle.innerText = login.title
