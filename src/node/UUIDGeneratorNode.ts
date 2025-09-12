import crypto from 'node:crypto'

/**
 * 在 Nodejs 中生成一个UUID。
 * @returns uuid
 * @see https://www.30secondsofcode.org/js/s/uuid-generator-node
 * @example
 * UUIDGeneratorNode() // '79c7c136-60ee-40a2-beb2-856f1feabefc'
 */
export const UUIDGeneratorNode = (): string =>
  `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c => (
    (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16)
  ))
