export function clone<T>(obj: T): T {
  return Object.entries(obj).reduce((acc: any, [key, val]) => {
    acc[key] = { ...val };

    return acc;
  }, {});
}
