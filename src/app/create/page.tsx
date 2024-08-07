'use client'

import clsx from 'clsx'
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Select,
  Textarea,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import SignInButton from '@/components/SignInButton'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { CheckIcon } from '@heroicons/react/24/outline'

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]

function Create() {
  const account = useAccount()
  const [selected, setSelected] = useState(people[1])

  return (
    <div className="mx-auto max-w-5xl sm:py-12">
      <div className="flex justify-start">
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton
            className={clsx(
              'relative block w-1/6 rounded-lg bg-pink-400 py-1.5 pl-3 pr-8 text-left text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
            )}
          >
            {selected.name}
            <ChevronDownIcon
              className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'w-[var(--button-width)] rounded-xl border border-white/5 bg-pink-300 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
            )}
          >
            {people.map((person) => (
              <ListboxOption
                key={person.name}
                value={person}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{person.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      {account.isConnected ? (
        <div className="mx-auto grid max-w-2xl grid-flow-row-dense grid-cols-3 gap-4">
          <div>Picture</div>
          <div className="col-span-2 w-full">
            <form className="flex flex-col gap-4">
              <Input
                placeholder="Event name"
                className={clsx(
                  'mt-3 block w-full rounded-lg border-none text-4xl text-gray-900 transition placeholder:opacity-70 hover:placeholder:opacity-80 sm:text-5xl',
                  'focus:outline-none',
                )}
              />
              <Field>
                <Label className="text-sm/6 font-medium text-gray-700">Description</Label>
                <Textarea
                  className={clsx(
                    'mt-3 block w-full resize-none rounded-lg border-none bg-gray-200 px-3 py-1.5 text-sm/6 text-gray-700',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-200',
                  )}
                  rows={3}
                />
              </Field>

              <Fieldset className="space-y-6 rounded-xl bg-white">
                <Legend className="text-base/7 font-semibold text-gray-700">Event Options</Legend>
                <Field>
                  <Label className="text-sm/6 font-medium text-gray-700">Street address</Label>
                  <Input
                    className={clsx(
                      'mt-3 block w-full rounded-lg border-none bg-gray-200 px-3 py-1.5 text-sm/6 text-gray-700',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-200',
                    )}
                  />
                </Field>
                <Field>
                  <Label className="text-sm/6 font-medium text-gray-700">Country</Label>
                  <div className="relative">
                    <Select
                      className={clsx(
                        'mt-3 block w-full appearance-none rounded-lg border-none bg-gray-200 px-3 py-1.5 text-sm/6 text-gray-700',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-200',
                        // Make the text of each option black on Windows
                        '*:text-black',
                      )}
                    >
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>United States</option>
                    </Select>
                    <ChevronDownIcon
                      className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
                      aria-hidden="true"
                    />
                  </div>
                </Field>
              </Fieldset>
              <Button className="rounded bg-sky-600 px-4 py-2 text-base text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500">
                Create event
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center gap-6 text-lg leading-8 text-gray-600">
          <p className="text-xl">You need an log in to create an event</p>
          <SignInButton />
        </div>
      )}
    </div>
  )
}

export default Create
