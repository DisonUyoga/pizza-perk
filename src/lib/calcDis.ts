export function calcDis(curr: number, prev: number) {
  const discount = (prev - curr) / prev;

  return discount * 100;
}
