'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { File, Folder, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { styled } from 'styled-components'
import { UploadButton } from '~/components/drive/uploadthing'
import { useRouter } from 'next/navigation'

export default function Actions(props: { currentFolderId: number }) {
  return (
    <div className={twStyles.container}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className={twStyles.button}
            id="new-dropdown-trigger"
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
        </DropdownMenuTrigger>
        <DropDownMenuContentStyled
          align="end"
          className={twStyles.dropdownMenuContent}
        >
          <DropDownMenuItemStyled className={twStyles.dropdownMenuItem}>
            <Folder className="mr-2 h-4 w-4" />
            New Folder
          </DropDownMenuItemStyled>
          <DropDownMenuItemStyled className={twStyles.dropdownMenuItem}>
            <File className="mr-2 h-4 w-4" />
            New Doc
          </DropDownMenuItemStyled>
        </DropDownMenuContentStyled>
      </DropdownMenu>

      {/* TODO: redo styling of button to fit + New */}
      <UploadNewButton currentFolderId={props.currentFolderId} />
    </div>
  )
}

export function UploadNewButton(props: { currentFolderId: number }) {
  const router = useRouter()

  return (
    <UploadButton
      endpoint="driveUploader"
      input={{ folderId: props.currentFolderId }}
      onClientUploadComplete={() => {
        router.refresh()
      }}
      appearance={{
        button: `${twStyles.button}`,
      }}
    />
  )
}

const twStyles = {
  container: 'ml-auto flex gap-2 items-start',
  button: 'gap-2 w-24 h-10 rounded-md',
  dropdownMenuContent: 'w-36 rounded-md p-2 shadow-md',
  dropdownMenuItem:
    'flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm',
}

const DropDownMenuContentStyled = styled(DropdownMenuContent)`
  background: hsl(var(--background-lighter));
  color: hsl(var(--foreground));
  border: 0px;
`

const DropDownMenuItemStyled = styled(DropdownMenuItem)`
  &:hover {
    background: hsl(var(--secondary));
  }
`
