import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { File, Folder, Upload, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'

export default function Actions() {
  const handleUpload = () => {
    // Mock upload functionality
    alert('Upload functionality would open a file picker here')
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2" id="new-dropdown-trigger">
            <Plus className="h-4 w-4" />
            New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-36 rounded-md bg-white p-2 shadow-md"
        >
          <DropdownMenuItem className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100">
            <Folder className="mr-2 h-4 w-4" />
            New Folder
          </DropdownMenuItem>
          <DropdownMenuItem className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100">
            <File className="mr-2 h-4 w-4" />
            New Doc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={handleUpload} className="gap-2">
        <Upload className="h-4 w-4" />
        Upload
      </Button>
    </div>
  )
}
