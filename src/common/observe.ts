import { Subscriber, Store as SubscriberStore } from './subscriber'
interface Obj {
  [key: string]: any,
  [index: number]: any
}
type Data = Obj | string | number | null

export const DefineReactive = (data: Data, key: string | number, val: Data) => {
  Observe(val)
  const subscriber = new Subscriber()
  Object.defineProperty(data, key, {
    get () {
      if (SubscriberStore.target) {
        subscriber.addSub(SubscriberStore.target)
      }
      return val
    },
    set (newVal) {
      val = newVal
      console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
      subscriber.notify()
    },
    enumerable: true,
    configurable: true
  })
}

export const Observe = (data: Data) => {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach((key: string | number) => {
    DefineReactive(data, key, data[key])
  })
}