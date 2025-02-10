import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ko';

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
  // 게시 가능 기간 (종료일 23:59:59로 설정)
  dateRange: (startDate: Date | string, duration: number) => {
    if (!startDate || duration <= 0) return 'unknown';

    const start = moment(startDate).startOf('day'); // 시작일 00:00:00
    const end = moment(startDate)
      .add(duration - 1, 'days') // 종료일 계산 (기간 - 1일)
      .endOf('day'); // 종료일 23:59:59로 설정

    const formatWithDay = (date: moment.Moment) => date.format('YY.MM.DD(ddd)');

    return `${formatWithDay(start)} ~ ${formatWithDay(end)}`;
  },
  dateOrToday: (value: Date | string | null | undefined) => {
    if (!value) return 'unknown';

    const date = moment(value);
    const today = moment().startOf('day');

    return date.isSame(today, 'day') ? 'TODAY' : date.format('MM.DD');
  },
};
