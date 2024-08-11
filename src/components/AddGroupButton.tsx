import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AddGroupButton() {
  const [groupName, setGroupName] = useState<string>('')

  const handleCreateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const resp = await fetch('/api/groups', {
      method: 'POST',
      body: JSON.stringify({ groupName }),
    })
    console.log('resp', resp)
  }

  return (
    <Dialog>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) => setGroupName(e.target.value)}
              id="name"
              placeholder="Ex: Bali, Football creww..."
              className="col-span-3"
              min={5}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateGroup} disabled={groupName.length < 5}>
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
