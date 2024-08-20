import { HeartHandshake } from 'lucide-react'

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
  groups,
}: {
  form: { setValue: (key: string, value: any) => void }
  field: { value: string | undefined; onChange: (value: string) => void }
  groups: any
}) {
  const handleChange = (value: string) => {
    form.setValue('group', value)
    field.onChange(value)
  }

  return (
    <Select onValueChange={handleChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-[200px] hover:bg-fuchsia-100">
          <SelectValue placeholder="Select Group" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {groups &&
          groups.map((group: any) => (
            <SelectItem value={group.id} key={group.id}>
              <div className="flex items-start gap-2 overflow-hidden text-muted-foreground">
                <HeartHandshake className="size-5" />
                <span className="truncate font-medium text-foreground">{group.name}</span>
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
