// src/utils/formatTime.ts
import dayjs from '../lib/dayjs';

export const formatTime = (date: string | Date, format = 'LLL') => {
  return dayjs(date).format(format);
};