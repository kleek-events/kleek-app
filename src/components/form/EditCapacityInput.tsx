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

export default function EditCapacityInput({
  form,
  field,
}: {
  form: { setValue: (name: string, value: number | undefined) => void }
  field: {
    value: string | number | readonly string[] | undefined
  }
}) {
  const handleReset = () => {
    form.setValue('capacity', undefined)
  }

  return (
    <div className="flex items-center gap-2">
      <span>{field.value ?? 'Unlimited'}</span>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" type="button">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Max Capacity</DialogTitle>
            <DialogDescription>
              Group allows you to organize your events and share them with a specific group of
              people.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Input placeholder="Max Capacity" {...field} step="1" min={1} type="number" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Confirm Limit</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleReset} variant="secondary">
                Remove Limit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
