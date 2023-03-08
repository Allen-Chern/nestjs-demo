class InternalAssertionFailedError extends Error {
  constructor(message?: string) {
    super('Internal Assertion Failed.' + (message ? ` Message: ${message}` : ''));
  }
}

export function assert(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new InternalAssertionFailedError(message);
  }
}
