import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

export const getWeekDates = (date) => {
    const start = startOfWeek(date);
    const end = endOfWeek(date);
  
    const days = eachDayOfInterval({ start, end }).map(date => ({
      day: format(date, 'eee'),
      date: format(date, 'MM-dd-yyyy'),
    }));
  
    return days;
  };