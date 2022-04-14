export function debounced(fn: any, wait = 300): any {
  let timeout: any;

  function implementation(
    args: any,
    isAsync = false,
    resolve?: any,
    reject?: any
  ) {
    clearTimeout(timeout);
    timeout = setTimeout(
      () =>
        isAsync
          ? fn(...args)
              .then(resolve)
              .catch(reject)
          : fn(...args),
      wait
    );
  }

  return (...args: any) =>
    fn.constructor.name === "AsyncFunction"
      ? new Promise((resolve, reject) => {
          implementation(args, true, resolve, reject);
        })
      : implementation(args);
}
