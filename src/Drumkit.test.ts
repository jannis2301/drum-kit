import { describe, it, expect } from 'vitest'

describe('Drumkit', () => {
  it('should return true, if it is a hyperbole', () => {
    const hyperbole = "I've told you a million times not to exaggerate!"
    expect(hyperbole.includes('a million times')).toBe(true)
  })
})
