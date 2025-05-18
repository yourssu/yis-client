import { DateArg, differenceInMinutes, formatDistanceToNowStrict, isThisYear } from 'date-fns'
import { formatWithOptions } from 'date-fns/fp'
import { ko } from 'date-fns/locale'
export const formatToKoreanRelativeDate = (date: DateArg<Date>) => {
  if (differenceInMinutes(new Date(), date) === 0) {
    return '방금 전'
  }
  return formatDistanceToNowStrict(date, { addSuffix: true })
}

const formatKo = formatWithOptions({ locale: ko })
// https://github.com/date-fns/date-fns/blob/main/src/locale/ko/snapshot.md
export const formatTemplates = {
  '1월 11일 수요일': formatKo('MMM do EEEE'),
  '1월 11일(수요일)': formatKo('MMM do(EEEE)'),
  '1월 11일 (수) 오후 11:00': formatKo('MMM do (E) aaaa h:mm'),
  '1월 11일(수) 23:00': formatKo('MMM do(E) HH:mm'),
  '1월 11일 (수) 23:00': formatKo('MMM do (E) HH:mm'),
  '24.01.01 23:00': formatKo('yy.MM.dd HH:mm'),
  '1월 11일 (수) 23시 00분': formatKo('MMM do (E) HH시 mm분'),
  '1.11 (수)': formatKo('M.dd (E)'),
  '1.11 (수) 23:00': formatKo('M.dd (E) HH:mm'),
  '1/11(수) 오후 11:00': formatKo('M/dd(E) aaaa h:mm'),
  '24년 1월 1일': formatKo('yy년 MMM do'),
  '24년 1월': formatKo('yy년 MMM'),
  '24-01-01': formatKo('yy-MM-dd'),
  '2024-01-01': formatKo('yyyy-MM-dd'),
  '2024/01/01 23:00': formatKo('yyyy/MM/dd HH:mm'),
  '24/01/01 23:00': formatKo('yy/MM/dd HH:mm'),
  '01/01 23:00': formatKo('MM/dd HH:mm'),
  '24.01.01': formatKo('yy.MM.dd'),
  '24. 1. 1': formatKo('yy. M. d'),
  '24년 1월 1일 23시': formatKo('yy년 MMM do HH시'),
  '1월 1일': formatKo('MMM do'),
  '2024년 1월 1일': formatKo('yyyy년 MMM do'),
  '2024년 1월': formatKo('yyyy년 MMM'),
  '25년 2월 3일 (월요일)': formatKo('yy년 MMM do (EEEE)'),
  '오전 10:00': formatKo('a	h:mm'),
  '11일 10:00': formatKo('do HH:mm'),
  '10:00': formatKo('HH:mm'),
  '2월 3일, 오후 10:23': formatKo('MMM do, aaaa h:mm'),
  '(2024년)? 2월 3일, 오후 10:23': (v: DateArg<Date>) => {
    const fn = formatKo(isThisYear(v) ? 'MMM do, aaaa h:mm' : 'yyyy년 MMM do, aaaa h:mm')
    return fn(v)
  },
}
