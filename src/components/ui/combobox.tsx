'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'

const timezones = [
  { value: 'pacific_niue', label: 'Pacific/Niue', offset: 'GMT-11:00' },
  { value: 'pacific_honolulu', label: 'Pacific/Honolulu', offset: 'GMT-10:00' },
  { value: 'america_anchorage', label: 'America/Anchorage', offset: 'GMT-09:00' },
  { value: 'america_los_angeles', label: 'America/Los_Angeles', offset: 'GMT-08:00' },
  { value: 'america_denver', label: 'America/Denver', offset: 'GMT-07:00' },
  { value: 'america_chicago', label: 'America/Chicago', offset: 'GMT-06:00' },
  { value: 'america_new_york', label: 'America/New_York', offset: 'GMT-05:00' },
  { value: 'america_halifax', label: 'America/Halifax', offset: 'GMT-04:00' },
  { value: 'america_st_johns', label: 'America/St_Johns', offset: 'GMT-03:30' },
  { value: 'america_sao_paulo', label: 'America/Sao_Paulo', offset: 'GMT-03:00' },
  { value: 'america_noronha', label: 'America/Noronha', offset: 'GMT-02:00' },
  { value: 'atlantic_azores', label: 'Atlantic/Azores', offset: 'GMT-01:00' },
  { value: 'europe_london', label: 'Europe/London', offset: 'GMT+00:00' },
  { value: 'europe_berlin', label: 'Europe/Berlin', offset: 'GMT+01:00' },
  { value: 'europe_helsinki', label: 'Europe/Helsinki', offset: 'GMT+02:00' },
  { value: 'europe_moscow', label: 'Europe/Moscow', offset: 'GMT+03:00' },
  { value: 'asia_dubai', label: 'Asia/Dubai', offset: 'GMT+04:00' },
  { value: 'asia_kabul', label: 'Asia/Kabul', offset: 'GMT+04:30' },
  { value: 'asia_karachi', label: 'Asia/Karachi', offset: 'GMT+05:00' },
  { value: 'asia_kolkata', label: 'Asia/Kolkata', offset: 'GMT+05:30' },
  { value: 'asia_kathmandu', label: 'Asia/Kathmandu', offset: 'GMT+05:45' },
  { value: 'asia_dhaka', label: 'Asia/Dhaka', offset: 'GMT+06:00' },
  { value: 'asia_rangoon', label: 'Asia/Rangoon', offset: 'GMT+06:30' },
  { value: 'asia_bangkok', label: 'Asia/Bangkok', offset: 'GMT+07:00' },
  { value: 'asia_shanghai', label: 'Asia/Shanghai', offset: 'GMT+08:00' },
  { value: 'asia_tokyo', label: 'Asia/Tokyo', offset: 'GMT+09:00' },
  { value: 'australia_adelaide', label: 'Australia/Adelaide', offset: 'GMT+09:30' },
  { value: 'australia_sydney', label: 'Australia/Sydney', offset: 'GMT+10:00' },
  { value: 'pacific_noumea', label: 'Pacific/Noumea', offset: 'GMT+11:00' },
  { value: 'pacific_auckland', label: 'Pacific/Auckland', offset: 'GMT+12:00' },
  { value: 'pacific_fakaofo', label: 'Pacific/Fakaofo', offset: 'GMT+13:00' },
  { value: 'pacific_kiritimati', label: 'Pacific/Kiritimati', offset: 'GMT+14:00' },
]

export function Combobox({
  form,
  field,
}: {
  form: { setValue: (key: string, value: any) => void }
  field: { value: Date | null }
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
          >
            {field.value
              ? timezones.find((timezone) => timezone.value === field.value)?.label +
                ' ' +
                timezones.find((timezone) => timezone.value === field.value)?.offset
              : 'Select timezone'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((timezone) => (
                <CommandItem
                  value={timezone.label}
                  key={timezone.value}
                  onSelect={() => {
                    form.setValue('timezone', timezone.value)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      timezone.value === field.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {timezone.label + ' - ' + timezone.offset}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
