declare module '*.json' {
  const value: any;
  export default value;
}

// Constructor
export interface ConstructorType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any[]): {};
}
// 接口返回数据
export interface Data {
  [prop: string]: {} | null;
}