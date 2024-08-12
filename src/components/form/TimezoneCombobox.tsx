import { Combobox } from '@/components/ui/combobox'

// const timezones = [
//   { value: 'Pacific/Niue', offset: 'GMT-11:00' },
//   { value: 'Pacific/Pago_Pago', offset: 'GMT-11:00' },
//   { value: 'America/Adak', offset: 'GMT-10:00' },
//   { value: 'Pacific/Honolulu', offset: 'GMT-10:00' },
//   { value: 'America/Anchorage', offset: 'GMT-09:00' },
//   { value: 'America/Juneau', offset: 'GMT-09:00' },
//   { value: 'America/Los_Angeles', offset: 'GMT-08:00' },
//   { value: 'America/Vancouver', offset: 'GMT-08:00' },
//   { value: 'America/Denver', offset: 'GMT-07:00' },
//   { value: 'America/Phoenix', offset: 'GMT-07:00' },
//   { value: 'America/Chicago', offset: 'GMT-06:00' },
//   { value: 'America/Mexico_City', offset: 'GMT-06:00' },
//   { value: 'America/Bogota', offset: 'GMT-05:00' },
//   { value: 'America/New_York', offset: 'GMT-05:00' },
//   { value: 'America/Halifax', offset: 'GMT-04:00' },
//   { value: 'America/Santiago', offset: 'GMT-04:00' },
//   { value: 'America/St_Johns', offset: 'GMT-03:30' },
//   { value: 'America/Argentina/Buenos_Aires', offset: 'GMT-03:00' },
//   { value: 'America/Sao_Paulo', offset: 'GMT-03:00' },
//   { value: 'America/Noronha', offset: 'GMT-02:00' },
//   { value: 'Atlantic/South_Georgia', offset: 'GMT-02:00' },
//   { value: 'Atlantic/Azores', offset: 'GMT-01:00' },
//   { value: 'Atlantic/Cape_Verde', offset: 'GMT-01:00' },
//   { value: 'Africa/Casablanca', offset: 'GMT+00:00' },
//   { value: 'Europe/London', offset: 'GMT+00:00' },
//   { value: 'Africa/Lagos', offset: 'GMT+01:00' },
//   { value: 'Africa/Kinshasa', offset: 'GMT+01:00' },
//   { value: 'Europe/Berlin', offset: 'GMT+01:00' },
//   { value: 'Africa/Cairo', offset: 'GMT+02:00' },
//   { value: 'Africa/Johannesburg', offset: 'GMT+02:00' },
//   { value: 'Africa/Khartoum', offset: 'GMT+02:00' },
//   { value: 'Europe/Helsinki', offset: 'GMT+02:00' },
//   { value: 'Africa/Nairobi', offset: 'GMT+03:00' },
//   { value: 'Africa/Addis_Ababa', offset: 'GMT+03:00' },
//   { value: 'Europe/Moscow', offset: 'GMT+03:00' },
//   { value: 'Asia/Riyadh', offset: 'GMT+03:00' },
//   { value: 'Asia/Baku', offset: 'GMT+04:00' },
//   { value: 'Asia/Dubai', offset: 'GMT+04:00' },
//   { value: 'Asia/Kabul', offset: 'GMT+04:30' },
//   { value: 'Asia/Tehran', offset: 'GMT+04:30' },
//   { value: 'Asia/Karachi', offset: 'GMT+05:00' },
//   { value: 'Asia/Tashkent', offset: 'GMT+05:00' },
//   { value: 'Asia/Kolkata', offset: 'GMT+05:30' },
//   { value: 'Asia/Colombo', offset: 'GMT+05:30' },
//   { value: 'Asia/Kathmandu', offset: 'GMT+05:45' },
//   { value: 'Asia/Almaty', offset: 'GMT+06:00' },
//   { value: 'Asia/Dhaka', offset: 'GMT+06:00' },
//   { value: 'Asia/Rangoon', offset: 'GMT+06:30' },
//   { value: 'Asia/Bangkok', offset: 'GMT+07:00' },
//   { value: 'Asia/Ho_Chi_Minh', offset: 'GMT+07:00' },
//   { value: 'Asia/Shanghai', offset: 'GMT+08:00' },
//   { value: 'Asia/Singapore', offset: 'GMT+08:00' },
//   { value: 'Asia/Seoul', offset: 'GMT+09:00' },
//   { value: 'Asia/Tokyo', offset: 'GMT+09:00' },
//   { value: 'Australia/Adelaide', offset: 'GMT+09:30' },
//   { value: 'Australia/Darwin', offset: 'GMT+09:30' },
//   { value: 'Australia/Brisbane', offset: 'GMT+10:00' },
//   { value: 'Australia/Sydney', offset: 'GMT+10:00' },
//   { value: 'Pacific/Guadalcanal', offset: 'GMT+11:00' },
//   { value: 'Pacific/Noumea', offset: 'GMT+11:00' },
//   { value: 'Pacific/Auckland', offset: 'GMT+12:00' },
//   { value: 'Pacific/Fiji', offset: 'GMT+12:00' },
//   { value: 'Pacific/Fakaofo', offset: 'GMT+13:00' },
//   { value: 'Pacific/Tongatapu', offset: 'GMT+13:00' },
//   { value: 'Pacific/Kiritimati', offset: 'GMT+14:00' },
// ]

// First, let's get all supported timezones
const allTimezones = Intl.supportedValuesOf('timeZone')

// Now, let's create our array with offset information
const timezones = allTimezones.map((tz) => {
  // Get the current date in this timezone
  const date = new Date()
  const options = { timeZone: tz, timeZoneName: 'short' }

  // Format the date to get the offset
  const formatted = new Intl.DateTimeFormat('en-US', options).format(date)

  // Extract the GMT offset
  const offset = formatted.split(' ').pop()

  return {
    value: tz,
    offset: `${offset}`,
  }
})

export default function TimezoneCombobox({
  form,
  field,
}: {
  form: { setValue: (key: string) => void }
  field: { value: Date | string | null }
}) {
  return <Combobox valueName="timezone" items={timezones} form={form} field={field} />
}
