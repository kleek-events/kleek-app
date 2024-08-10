'use client'

import { usePlacesWidget } from 'react-google-autocomplete'
import { Input } from '@/components/ui/input'

export default function AutocompletePlacesInput({
  form,
  field,
}: {
  form: { setValue: (name: string, value: string) => void }
  field: {
    value: string | number | readonly string[] | undefined
  }
}) {
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    onPlaceSelected: (place) => {
      console.log(place)
      form.setValue('location', place.formatted_address)
    },
    options: {
      types: ['geocode', 'establishment'],
    },
  })
  return (
    <>
      <Input placeholder="Search location" {...field} ref={ref} />
    </>
  )
}
