import { Eye, EyeOff } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'

export default function VisibilitySelect({
  form,
  field,
}: {
  form: { setValue: (key: string, value: any) => void }
  field: { value: string | null }
}) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-[150px] items-start transition-all duration-150 ease-out hover:bg-fuchsia-100 [&_[data-description]]:hidden">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="publicVisibility">
          <div className="text-muted-foreground flex items-start gap-3">
            <Eye className="size-5" />
            <div className="grid gap-0.5">
              <p>
                <span className="text-foreground font-medium">Public</span>
              </p>
              <p className="text-xs" data-description>
                Event will be discoverable by other users
              </p>
            </div>
          </div>
        </SelectItem>
        <SelectItem value="hiddenVisibility">
          <div className="text-muted-foreground flex items-start gap-3">
            <EyeOff className="size-5" />
            <div className="grid gap-0.5">
              <p>
                <span className="text-foreground font-medium">Hidden</span>
              </p>
              <p className="text-xs" data-description>
                Event will not be discoverable by other users
              </p>
            </div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
