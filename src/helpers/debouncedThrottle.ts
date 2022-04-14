export function debouncedThrottle(fn: any, duration = 300): any {
  let timeout: any;
  let shouldWait = false;
  let storedArgs: any;

  function delay(isAsync = false, resolve?: any, reject?: any) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      shouldWait = false;

      if (storedArgs) {
        isAsync
          ? fn(...storedArgs)
              .then(resolve)
              .catch(reject)
          : fn(...storedArgs);
        storedArgs = null;
      }
    }, duration);
  }

  function implementation(
    args: any,
    isAsync = false,
    resolve?: any,
    reject?: any
  ) {
    if (shouldWait) {
      storedArgs = args;
    } else {
      isAsync
        ? fn(...args)
            .then(resolve)
            .catch(reject)
        : fn(...args);
      shouldWait = true;
    }

    delay(isAsync, resolve, reject);
  }

  return (...args: any) =>
    fn.constructor.name === "AsyncFunction"
      ? new Promise((resolve, reject) => {
          implementation(args, true, resolve, reject);
        })
      : implementation(args);
}
