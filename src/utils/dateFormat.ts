import moment from 'moment';
import 'moment-timezone';

type DateFormatType =
  | 'YYYY.MM.DD'
  | 'YYYY.MM.DD HH:mm'
  | 'YYYY.MM.DD HH:mm:ss'
  | 'HH:mm:ss'
  | 'YY.MM.DD'
  | 'YY.MM.DD HH:mm'
  | 'MM.DD HH:mm';

export const dateFormat = {
  date: (value: Date | string | null | undefined, format: DateFormatType) => {
    if (!value) {
      return 'unknown';
    }
    return moment(value).format(format);
  },

  timeRange: (start: string, end: string) => {
    if (!start || !end) return 'unknown';

    const formattedStart = moment(start, 'HHmm').format('HH:mm');
    const formattedEnd = moment(end, 'HHmm').format('HH:mm');

    return `${formattedStart} ~ ${formattedEnd}`;
  },
};
