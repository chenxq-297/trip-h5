import dayjs from "dayjs";

export function TimeToMMDD(time,defaultFormat='MM月DD日'){
    return dayjs(time).format(defaultFormat)
}

export function getDiffDays(startDate, endDate) {
    return dayjs(endDate).diff(startDate, "day")
  }