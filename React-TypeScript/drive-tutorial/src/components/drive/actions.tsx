'use client'

import React from 'react'
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
import DialogPopup from '~/components/ui/dialog-popup'
import { createFolderAction } from '~/server/actions'

export default function Actions(props: { currentFolderId: number }) {
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const handleAccept = async (folderName: string) => {
    const trimmedName = folderName.trim()
    if (!trimmedName) {
      console.error('Folder name is null or empty')
      return
    }

    try {
      await createFolderAction(trimmedName, props.currentFolderId)
      router.refresh()
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  return (
    <div className={twStyles.container}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
          <DropdownMenuItemStyled
            className={twStyles.dropdownMenuItem}
            style={{ cursor: 'not-allowed' }}
          >
            <Folder className="mr-2 h-4 w-4" />
            New File
          </DropdownMenuItemStyled>
          <DropdownMenuItemStyled
            className={twStyles.dropdownMenuItem}
            onClick={() => {
              setDropdownOpen(false)
              setDialogOpen(true)
            }}
          >
            <File className="mr-2 h-4 w-4" />
            New Folder
          </DropdownMenuItemStyled>
        </DropDownMenuContentStyled>
      </DropdownMenu>

      <DialogPopup
        dialogTriggerName="New Folder"
        dialogTitle="Create New Folder"
        acceptText="Create"
        cancelText="Cancel"
        inputDefaultValue="Unnamed Folder"
        descriptionText=""
        handleButton={(folderName: string, cancel: boolean) => {
          if (!cancel) {
            void handleAccept(folderName)
          }
          setDialogOpen(false)
        }}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

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
        button: `${twStyles.uploadButton}`,
      }}
    />
  )
}

const twStyles = {
  container: 'ml-auto flex gap-2 items-start',
  button: 'gap-2 w-22 h-10 rounded-md',
  uploadButton: 'gap-2 w-26 h-10 rounded-md',
  dropdownMenuContent: 'w-36 rounded-md p-2 mt-1 shadow-md',
  dropdownMenuItem:
    'flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm',
}

const DropDownMenuContentStyled = styled(DropdownMenuContent)`
  background: hsl(var(--background-lighter));
  color: hsl(var(--foreground));
  border: 0px;
`

const DropdownMenuItemStyled = styled(DropdownMenuItem)`
  &:hover {
    background: hsl(var(--secondary));
  }
`
