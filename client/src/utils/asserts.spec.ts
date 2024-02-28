import { assertIsError } from './asserts';

describe('asserts', () => {
  test('assertIsError', () => {
    expect(() => assertIsError('')).toThrowError();
    expect(() => assertIsError(new Error())).not.toThrowError();
  });
});
