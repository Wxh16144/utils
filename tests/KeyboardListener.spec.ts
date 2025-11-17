import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { KeyboardListener } from '../src'

// Mock EventTarget
const createMockTarget: any = () => ({
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})

describe('KeyboardListener', () => {
  let listener: KeyboardListener
  let mockTarget: ReturnType<typeof createMockTarget>

  beforeEach(() => {
    vi.useFakeTimers()
    mockTarget = createMockTarget()
    listener = new KeyboardListener({ target: mockTarget, timeout: 500 })
    vi.spyOn(console, 'error').mockImplementation(() => { })
  })

  afterEach(() => {
    listener.stop()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  const simulateKeydown = (key: string, options = {}) => {
    const event = new KeyboardEvent('keydown', { key, ...options });
    const handler = mockTarget.addEventListener.mock.calls.find(
      call => call[0] === 'keydown',
    )?.[1];
    if (handler) {
      (handler as EventListener)(event);
    }
  };

  it('should initialize with default options if none are provided', () => {
    // JSDOM provides a 'document' object, so the default target will be it.
    // We test the constructor without args to ensure it doesn't crash.
    const defaultListener = new KeyboardListener()
    expect(defaultListener).toBeInstanceOf(KeyboardListener)
  })

  it('should initialize with custom options', () => {
    expect((listener as any).timeout).toBe(500)
    expect((listener as any).target).toBe(mockTarget)
  })

  it('should register a word and callback', () => {
    const callback = vi.fn()
    listener.register('test', callback)
    expect((listener as any).registeredWords.has('test')).toBe(true)
    expect((listener as any).registeredWords.get('test')).toBe(callback)
  })

  it('should convert registered words to lowercase', () => {
    const callback = vi.fn()
    listener.register('TeSt', callback)
    expect((listener as any).registeredWords.has('test')).toBe(true)
    expect((listener as any).registeredWords.has('TeSt')).toBe(false)
  })

  it('should log an error for invalid registration word', () => {
    listener.register('', vi.fn())
    expect(console.error).toHaveBeenCalledWith('Registration failed: "word" must be a non-empty string.')
  })

  it('should log an error for invalid registration callback', () => {
    listener.register('word', 'not a function' as any)
    expect(console.error).toHaveBeenCalledWith('Registration failed: "callback" must be a function.')
  })

  it('should start listening for keydown events', () => {
    listener.start()
    expect(mockTarget.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('should stop listening for keydown events', () => {
    listener.start()
    listener.stop()
    expect(mockTarget.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('should reset state on stop', () => {
    const resetSpy = vi.spyOn(listener, 'resetState')
    listener.stop()
    expect(resetSpy).toHaveBeenCalled()
  })

  it('should trigger callback for an exact, non-prefix match', () => {
    const callback = vi.fn()
    listener.register('code', callback)
    listener.start()

    simulateKeydown('c')
    simulateKeydown('o')
    simulateKeydown('d')
    expect(callback).not.toHaveBeenCalled()
    simulateKeydown('e')
    expect(callback).toHaveBeenCalledTimes(1)
    expect((listener as any).currentSequence).toBe('')
  })

  it('should trigger callback for a prefix match after timeout', () => {
    const shortCallback = vi.fn()
    const longCallback = vi.fn()
    listener.register('dev', shortCallback)
    listener.register('develop', longCallback)
    listener.start()

    simulateKeydown('d')
    simulateKeydown('e')
    simulateKeydown('v')

    expect(shortCallback).not.toHaveBeenCalled()
    expect(longCallback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)

    expect(shortCallback).toHaveBeenCalledTimes(1)
    expect(longCallback).not.toHaveBeenCalled()
    expect((listener as any).currentSequence).toBe('')
  })

  it('should trigger callback for the longer word if typed fully', () => {
    const shortCallback = vi.fn()
    const longCallback = vi.fn()
    listener.register('dev', shortCallback)
    listener.register('develop', longCallback)
    listener.start()

    'develop'.split('').forEach(simulateKeydown)

    expect(longCallback).toHaveBeenCalledTimes(1)
    expect(shortCallback).not.toHaveBeenCalled()
    expect((listener as any).currentSequence).toBe('')
  })

  it('should reset sequence if a non-matching key is pressed', () => {
    const callback = vi.fn()
    listener.register('code', callback)
    listener.start()

    simulateKeydown('c')
    simulateKeydown('o')
    simulateKeydown('x') // Non-matching key

    expect((listener as any).currentSequence).toBe('')
    vi.advanceTimersByTime(500)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should be case-insensitive', () => {
    const callback = vi.fn()
    listener.register('secret', callback)
    listener.start()

    'SeCrEt'.split('').forEach(simulateKeydown)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should ignore modifier keys', () => {
    const callback = vi.fn()
    listener.register('abc', callback)
    listener.start()

    simulateKeydown('a')
    simulateKeydown('b', { ctrlKey: true })
    simulateKeydown('c')

    vi.advanceTimersByTime(500)
    expect(callback).not.toHaveBeenCalled()
    expect((listener as any).currentSequence).toBe('')
  })

  it('should ignore non-character keys (key.length > 1)', () => {
    const callback = vi.fn()
    listener.register('go', callback)
    listener.start()

    simulateKeydown('g')
    simulateKeydown('Shift')
    simulateKeydown('Enter')
    simulateKeydown('o')

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should reset the timeout on each key press', () => {
    const callback = vi.fn()
    listener.register('wait', callback)
    listener.start()

    simulateKeydown('w')
    vi.advanceTimersByTime(300)
    simulateKeydown('a')
    vi.advanceTimersByTime(300)
    simulateKeydown('i')
    vi.advanceTimersByTime(300)
    simulateKeydown('t')

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should reset state correctly', () => {
    // Register a word to ensure a timeout is set
    listener.register('apple', vi.fn());
    listener.start();
    simulateKeydown('a');

    expect((listener as any).currentSequence).toBe('a');
    expect((listener as any).timeoutId).not.toBeNull();

    listener.resetState();

    expect((listener as any).currentSequence).toBe('');
    expect((listener as any).timeoutId).toBeNull();
    expect((listener as any).potentialMatch).toBeNull();
  });

  it('should not trigger any callback if a sequence is a prefix but not a match, and then times out', () => {
    const callback = vi.fn()
    listener.register('develop', callback)
    listener.start()

    'develo'.split('').forEach(simulateKeydown)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)

    expect(callback).not.toHaveBeenCalled()
    expect((listener as any).currentSequence).toBe('')
  })
})