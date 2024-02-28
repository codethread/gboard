export function assertIsError(err: unknown): asserts err is Error {
  if (!(err instanceof Error)) {
    throw new Error(`not an error ${JSON.stringify(err)}`);
  }
}

export function assertUnreachable(branch: never): never {
  throw new Error(
    `This should not be reachable, likely there is a missing condition or switch case for branch ${
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      branch as string
    }`
  );
}
