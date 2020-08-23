/** A utility that returns a promise that resolves when the passed function returns true. */
declare function until(
  /** A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses. */
  checkFunc: (setError: (error: Error) => void) => boolean | Promise<boolean>,
  /** The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`. */
  timeout?: number,
  /** A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`. */
  message?: string
): Promise<void>;

/** A utility that returns a promise that resolves when the passed function returns true. */
declare function until(
  /** A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses. */
  checkFunc: (setError: (error: Error) => void) => boolean | Promise<boolean>,
  /** A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`. */
  message?: string,
  /** The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`. */
  timeout?: number
): Promise<void>;

/** A utility that returns a promise that resolves when the passed function returns true. */
declare function until(
  /** The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`. */
  timeout: number,
  /** A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses. */
  checkFunc: (setError: (error: Error) => void) => boolean | Promise<boolean>,
  /** A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`. */
  message?: string
): Promise<void>;

/** A utility that returns a promise that resolves when the passed function returns true. */
declare function until(
  /** A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`. */
  message: string,
  /** A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses. */
  checkFunc: (setError: (error: Error) => void) => boolean | Promise<boolean>,
  /** The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`. */
  timeout?: number
): Promise<void>;

/** A utility that returns a promise that resolves when the passed function returns true. */
declare function until(
  /** The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`. */
  timeout: number,
  /** A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`. */
  message: string,
  /** A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses. */
  checkFunc: (setError: (error: Error) => void) => boolean | Promise<boolean>
): Promise<void>;

/** A utility that returns a promise that resolves when the passed function returns true. */
declare function until(
  /** A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`. */
  message: string,
  /** The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`. */
  timeout: number,
  /** A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses. */
  checkFunc: (setError: (error: Error) => void) => boolean | Promise<boolean>
): Promise<void>;

declare namespace until {
  /** The current default timeout. It's 1000 by default. */
  let defaultTimeout: number;
  /** Sets the default timeout in milliseconds. Passing a falsy ms resets to the default of 1000. */
  const setDefaultTimeout: (ms: number) => void;
}

export = until;
