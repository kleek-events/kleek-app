'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/utils/string'
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

export function Combobox({
  valueName,
  items,
  form,
  field,
}: {
  valueName: string
  items: { label: string; value: string; offset?: string }[]
  form: { setValue: (key: string, value: any) => void }
  field: { value: Date | string | null }
}) {
  if (!items) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
          >
            {field.value ? (
              <div className="flex flex-row justify-between gap-4">
                <span>{items.find((item) => item.value === field.value)?.value}</span>
                <span className="text-muted-foreground">
                  {items.find((item) => item.value === field.value)?.offset}
                </span>
              </div>
            ) : (
              'Select timezone'
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {items.map((item, index) => (
                <CommandItem
                  value={item.value}
                  key={index}
                  onSelect={() => {
                    form.setValue(valueName, item.value)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      item.value === field.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <div className="flex flex-row justify-between gap-4">
                    <span>{item.value}</span>
                    <span className="text-muted-foreground">{item.offset}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
