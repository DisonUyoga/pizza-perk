export function isNewProduct(date: string) {
  const currentDate = new Date();
  const productDate = new Date(date);
  const utcTime1 = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  );
  const utcTime2 = Date.UTC(
    productDate.getFullYear(),
    productDate.getMonth(),
    productDate.getDate(),
    productDate.getHours(),
    productDate.getMinutes(),
    productDate.getSeconds()
  );
  const diffInTime = utcTime1 - utcTime2;
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays <= 30;
}
