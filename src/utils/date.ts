import dayjs from 'dayjs'

export const formatDate = (timestamp, tz) => {
  return dayjs.unix(timestamp).tz(tz).format('MMM D, YYYY h:mm A')
}
