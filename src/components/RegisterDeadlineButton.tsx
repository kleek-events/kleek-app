import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DateTimePicker } from './ui/datetime-picker'

export default function RegisterDeadlineButton({
  form,
  field,
}: {
  form: {
    setValue: (name: string, value: string | undefined) => void
  }
  field: {
    value: string | number | readonly string[] | undefined
  }
}) {
  const handleReset = () => {
    form.setValue('registrationDeadline', undefined)
  }

  return (
    <div className="flex items-center gap-2">
      <small>{field.value?.toLocaleString() ?? 'Not set'}</small>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" type="button">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registration Deadline</DialogTitle>
            <DialogDescription>
              Set a deadline for registration. After this date, no more registrations will be
              accepted.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <DateTimePicker field={{ ...field }} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Confirm Deadline</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleReset} variant="secondary">
                Remove Deadline
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
