// jsdom implements neither of these, and Radix measures the slider thumb
// through both. Without them the component throws on mount — an artefact of the
// environment, not of the component.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

globalThis.DOMRect ??= class {
  constructor(
    public x = 0,
    public y = 0,
    public width = 0,
    public height = 0,
  ) {}
  top = 0
  left = 0
  right = 0
  bottom = 0
  static fromRect() {
    return new DOMRect()
  }
  toJSON() {
    return this
  }
} as unknown as typeof DOMRect
