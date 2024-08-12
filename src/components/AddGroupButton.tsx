import { Plus } from 'lucide-react'
import { useState } from 'react'

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
import { Label } from '@/components/ui/label'

export default function AddGroupButton({ onGroupCreated }: { onGroupCreated: () => void }) {
  const [groupName, setGroupName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      const resp = await fetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({ groupName }),
      })

      if (!resp.ok) {
        const data = await resp.json()
        throw new Error(data.error)
      }
      onGroupCreated()
      setLoading(false)
      setOpen(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Group allows you to organize your events and share them with a specific group of people.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            onChange={(e) => setGroupName(e.target.value)}
            id="name"
            placeholder="Enter group name. Ex: Mexico, Bali Yoga..."
            className="col-span-3 w-full"
            min={5}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleCreateGroup} disabled={groupName.length < 5}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-r-2 border-t-2 border-fuchsia-300" />
                Creating...
              </div>
            ) : (
              'Create Group'
            )}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
