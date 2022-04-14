export function debounced(fn: any, wait = 300): any {
  let timeout: any;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

export function debouncedAsync(fn: any, wait = 300): any {
  let timeout: any;

  const deb = (resolve: any, reject: any, args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(
      () =>
        fn(...args)
          .then(resolve)
          .catch(reject),
      wait
    );
  };

  return (...args: any) =>
    new Promise((resolve, reject) => {
      deb(resolve, reject, args);
    });
}
