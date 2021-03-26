export class Page {
  public appEle!: HTMLDivElement
  constructor(selector = '#app') {
    this.appEle = document.querySelector(selector) as HTMLDivElement
  }
  mounted () {
    return new Promise<boolean>(resolve => {
      window.addEventListener('DOMContentLoaded', () => {
        resolve(true)
      })
    })
  }
}