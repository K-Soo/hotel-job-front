import moment from 'moment';

export const dateFormat = {
  date1: (value: string) => {
    return moment(value).format('YYYY.MM.DD');
  },
  date2: (value: string | null) => {
    if (!value) return;
    return moment(value).format('YYYY.MM.DD HH:mm');
  },
  date3: (value: string | null) => {
    if (!value) return;
    return moment(value).format('YYYY.MM.DD HH:mm:ss');
  },
  date4: (value: string | null) => {
    if (!value) return;
    return moment(value).format('HH:mm:ss');
  },
};
