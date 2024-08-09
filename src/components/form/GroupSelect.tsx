import { HeartHandshake, Plus } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'

export default function GroupSelect({
  form,
  field,
}: {
  form: { setValue: (key: string, value: any) => void }
  field: { value: string | null }
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
        <SelectTrigger className="w-[200px] hover:bg-fuchsia-100">
          <SelectValue placeholder="Select Group" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="medellinId">
          <div className="text-muted-foreground flex items-start gap-3">
            <HeartHandshake className="size-5" />
            <div className="grid gap-0.5">
              <p>
                <span className="text-foreground font-medium">Medellin</span>
              </p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="bogotaId">
          <div className="text-muted-foreground flex items-start gap-3">
            <HeartHandshake className="size-5" />
            <div className="grid gap-0.5">
              <p>
                <span className="text-foreground font-medium">Bogota</span>
              </p>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
