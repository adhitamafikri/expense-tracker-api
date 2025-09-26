import dayjs from 'dayjs';

export const numericDateToSeconds = (numericDate: number) => {
  return dayjs(numericDate).unix();
};

export const numericDateToMinutes = (numericDate: number) => {
  return dayjs(numericDate).diff(dayjs(), 'minutes');
};

console.log(dayjs(1758861291));
console.log(numericDateToSeconds(1758861291));
console.log(numericDateToMinutes(1758861291));
