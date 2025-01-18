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
  date5: (value: string | null) => {
    if (!value) return;
    return moment(value).format('YY.MM.DD');
  },
  timeRange: (start: string, end: string) => {
    if (!start || !end) return 'unknown';

    const formattedStart = moment(start, 'HHmm').format('HH:mm');
    const formattedEnd = moment(end, 'HHmm').format('HH:mm');

    return `${formattedStart} ~ ${formattedEnd}`;
  },
};
