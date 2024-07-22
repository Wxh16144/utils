/**
 * 在浏览器中生成一个UUID。
 * @returns uuid
 * @see https://www.30secondsofcode.org/js/s/uuid-generator-browser
 * @example
 * UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
 */
const UUIDGeneratorBrowser = (): string =>
  `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c => (
    (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(16)
  ))

export default UUIDGeneratorBrowser
