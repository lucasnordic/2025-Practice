import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { File, Folder, Upload, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"

export default function Actions () {
    const handleUpload = () => {
        // Mock upload functionality
        alert("Upload functionality would open a file picker here")
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
                className="p-2 bg-white shadow-md rounded-md w-36"
              >
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1 w-full hover:bg-gray-100 rounded-md text-sm">
                  <Folder className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1 w-full hover:bg-gray-100 rounded-md text-sm">
                  <File className="h-4 w-4 mr-2" />
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