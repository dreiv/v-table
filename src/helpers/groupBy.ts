export function groupBy(items: any[], key: any) {
  return items.reduce((acc, x) => {
    if (!x) return;
    if (!acc[x[key]]) acc[x[key]] = [];

    acc[x[key]].push(x);
    return acc;
  }, {});
}
