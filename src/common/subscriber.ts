// 订阅者存储器，用于存放watcher
export class Subscriber {
  subs: Array<any> = []
  addSub (sub: any) {
    this.subs.push(sub)
  }
  notify () {
    this.subs.forEach((sub: any) => {
      sub.update()
    })
  }
}

interface Stroe {
  target: object | null
}
export const Store: Stroe = {
  target: null
}