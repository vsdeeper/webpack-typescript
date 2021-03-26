import { Store as SubscriberStore } from './subscriber'
export class Watcher {
  vm: any;
  exp: string;
  cb: (...arg: any) => void;
  value: any
  constructor (
    vm: object,
    exp: string,
    cb: (...arg: any) => void
  ) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get();  // 将自己添加到订阅器的操作
  }
  update () {
    this.run();
  }
  run () {
    const value = this.vm[this.exp];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }
  get () {
    SubscriberStore.target = this // 缓存自己
    const value = this.vm[this.exp]  // 强制执行监听器里的get函数
    SubscriberStore.target = null;  // 释放自己
    return value;
  }
}