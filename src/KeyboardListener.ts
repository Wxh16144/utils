const defaultTimeout = 800 // 默认超时时间，单位毫秒
const defaultTarget = (typeof document !== 'undefined' ? document : null)
const loop = () => { }

type KeyboardCallback = () => void

export interface KeyboardListenerOptions {
  timeout?: number
  target?: EventTarget | null
}

export class KeyboardListener {
  private timeout: number
  private target: EventTarget | null
  private registeredWords: Map<string, KeyboardCallback>
  private currentSequence: string
  private timeoutId: ReturnType<typeof setTimeout> | null
  private potentialMatch: KeyboardCallback | null

  constructor({ timeout = defaultTimeout, target = defaultTarget }: KeyboardListenerOptions = {}) {
    this.timeout = timeout
    this.target = target
    this.registeredWords = new Map()
    this.currentSequence = ''
    this.timeoutId = null
    this.potentialMatch = null

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  register(word: string, callback: KeyboardCallback = loop): void {
    if (typeof word !== 'string' || word.length === 0) {
      console.error('Registration failed: "word" must be a non-empty string.')
      return
    }
    if (typeof callback !== 'function') {
      console.error('Registration failed: "callback" must be a function.')
      return
    }

    const lowerCaseWord = word.toLowerCase()
    this.registeredWords.set(lowerCaseWord, callback)
  }

  start(target?: EventTarget): void {
    if (target) {
      this.target = target
    }
    if (!this.target || typeof this.target.addEventListener !== 'function') {
      console.error('KeyboardListener: Invalid event target.')
      return
    }
    this.target.addEventListener('keydown', this.handleKeyDown as EventListener)
  }

  stop(): void {
    if (this.target && typeof this.target.removeEventListener === 'function') {
      this.target.removeEventListener('keydown', this.handleKeyDown as EventListener)
    }
    this.resetState()
  }

  resetState(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.currentSequence = ''
    this.timeoutId = null
    this.potentialMatch = null
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.metaKey || event.ctrlKey || event.altKey || event.key.length > 1) {
      return
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    const key = event.key.toLowerCase()
    this.currentSequence += key
    this.potentialMatch = null

    const possibleWords = [...this.registeredWords.keys()].filter(word =>
      word.startsWith(this.currentSequence),
    )

    if (possibleWords.length === 0) {
      this.resetState()
      return
    }

    const isExactMatch = this.registeredWords.has(this.currentSequence)
    if (isExactMatch) {
      const isAlsoPrefix = possibleWords.some(word => word.length > this.currentSequence.length)

      if (isAlsoPrefix) {
        this.potentialMatch = this.registeredWords.get(this.currentSequence) as KeyboardCallback
      }
      else {
        (this.registeredWords.get(this.currentSequence) as KeyboardCallback)()
        this.resetState()
        return
      }
    }

    this.timeoutId = setTimeout(() => {
      if (this.potentialMatch) {
        this.potentialMatch()
      }
      this.resetState()
    }, this.timeout)
  }
}
