
/**
 * 等待指定的时间
 * @param ms 毫秒
 * @alias sleep
 * @example
 * delay(1000).then(() => console.log('1s'))
 * sleep(1000).then(() => console.log('1s'))
 */
const delay = (ms: number): Promise<any> => new Promise(resolve => setTimeout(resolve, ms))

export default delay
