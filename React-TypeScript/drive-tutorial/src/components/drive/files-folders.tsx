import { File, Folder, MoreVertical } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { MOCK_DATA } from '~/lib/constants'
import type { FileItem, FolderItem } from '~/lib/types'

type FilesFoldersProps = {
  searchQuery: string
  viewType: 'grid' | 'list'
  currentPath: string[]
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>
}

export default function FilesFolders({
  currentPath,
  setCurrentPath,
  searchQuery,
  viewType,
}: FilesFoldersProps) {
  // Get current folder content based on path
  const getCurrentContent = () => {
    let current = MOCK_DATA

    for (const folder of currentPath) {
      console.log('Current Path:', currentPath)
      console.log('Current Content:', current)
      const foundFolder = current.find(
        (item) => item.type === 'folder' && item.name === folder
      ) as FolderItem
      if (foundFolder) {
        current = foundFolder.contents
      } else {
        return []
      }
    }

    // Filter by search query if present
    if (searchQuery) {
      return current.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return current
  }

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  const currentContent = getCurrentContent()

  return (
    <div className="flex-1 overflow-auto p-4">
      {currentContent.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
          <Folder className="mb-4 h-16 w-16 opacity-20" />
          <p>This folder is empty</p>
        </div>
      ) : (
        <div
          className={
            viewType === 'grid'
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'space-y-2'
          }
        >
          {currentContent.map((item) => (
            <div
              key={item.id}
              className={`overflow-hidden rounded-lg border transition-colors hover:border-primary ${viewType === 'list' ? 'flex items-center p-2' : ''} `}
            >
              {item.type === 'folder' ? (
                <div
                  className={`cursor-pointer p-4 ${viewType === 'list' ? 'flex w-full items-center' : ''} `}
                  onClick={() => navigateToFolder(item.name)}
                >
                  <div
                    className={`${viewType === 'list' ? 'flex w-full items-center gap-4' : 'flex flex-col items-center gap-2'}`}
                  >
                    <Folder
                      className={`${viewType === 'list' ? 'h-5 w-5' : 'h-12 w-12'} text-primary`}
                    />
                    <div
                      className={viewType === 'list' ? 'flex-1' : 'text-center'}
                    >
                      <p className="truncate font-medium">{item.name}</p>
                      {viewType === 'list' && (
                        <p className="text-xs text-muted-foreground">
                          {item.contents.length} items
                        </p>
                      )}
                    </div>
                    {viewType === 'list' && (
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <a
                  href={`#file-${item.id}`}
                  className={`block p-4 ${viewType === 'list' ? 'flex w-full items-center' : ''} `}
                >
                  <div
                    className={`${viewType === 'list' ? 'flex w-full items-center gap-4' : 'flex flex-col items-center gap-2'}`}
                  >
                    <File
                      className={`${viewType === 'list' ? 'h-5 w-5' : 'h-12 w-12'} text-muted-foreground`}
                    />
                    <div
                      className={viewType === 'list' ? 'flex-1' : 'text-center'}
                    >
                      <p className="truncate font-medium">{item.name}</p>
                      {viewType === 'list' && (
                        <p className="text-xs text-muted-foreground">
                          Modified {item.modified}
                        </p>
                      )}
                    </div>
                    {viewType === 'list' && (
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
