import moment from 'moment';
import 'moment-timezone';

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
  date6: (value: string | null) => {
    console.log('이력서 날짜: ', value);
    if (!value) return;
    const utcDate = moment.utc(value); // UTC로 파싱한 날짜
    const localizedDate = utcDate.tz(moment.tz.guess()); // 타임존에 맞게 변환된 날짜
    // const formattedDate = localizedDate.format('YYYY.MM.DD HH:mm');

    return moment(value).format('YY.MM.DD HH:mm');
  },
  timeRange: (start: string, end: string) => {
    if (!start || !end) return 'unknown';

    const formattedStart = moment(start, 'HHmm').format('HH:mm');
    const formattedEnd = moment(end, 'HHmm').format('HH:mm');

    return `${formattedStart} ~ ${formattedEnd}`;
  },
};
