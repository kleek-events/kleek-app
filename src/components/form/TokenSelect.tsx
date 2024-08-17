import Image from 'next/image'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'
import { DEPOSIT_TOKEN_ALLOWED } from '@/utils/blockchain'

export default function TokenSelect({
  form,
  field,
}: {
  form: { setValue: (key: string, value: any) => void }
  field: { value: string | undefined; onChange: (value: string) => void }
}) {
  const handleChange = (value: string) => {
    if (value === 'addGroup') {
      console.log('Add group')
      return null
    } else {
      form.setValue('group', value)
      field.onChange(value)
    }
  }

  return (
    <Select onValueChange={handleChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-full hover:bg-fuchsia-100">
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {DEPOSIT_TOKEN_ALLOWED.map((token, index) => (
          <SelectItem value={token.name} key={index}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Image
                className="size-4"
                src={token.logo}
                alt={token.name}
                width={20}
                height={20}
                unoptimized
              />
              <span className="font-medium text-foreground">{token.symbol}</span>
              <span className="capitalize">{token.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
