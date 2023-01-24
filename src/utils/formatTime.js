import { format } from 'date-fns';

export const formatTime = time => {
  return format(Date.parse(time), 'dd MMMM yyyy, HH:mm');
};
