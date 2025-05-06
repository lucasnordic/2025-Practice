'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog' // Correct import for Radix Dialog
import { Button } from '~/components/ui/button'
import './dialog.css'
import { type DbFile } from '~/types/drive-types'
import Image from 'next/image'

interface DialogPopupProps {
  dialogTriggerName?: string
  dialogTitle?: string
  descriptionText?: string
  children?: React.ReactNode
  file?: DbFile
}

const DialogPopupImage: React.FC<DialogPopupProps> = ({
  dialogTriggerName = 'New Item',
  dialogTitle = 'New Item',
  descriptionText = 'Enter a value below.',
  children,
  file,
}) => {
  const [open, setOpen] = React.useState(false)
  const [imageDimensions, setImageDimensions] = React.useState({
    // Default dimensions
    width: 1000,
    height: 1000,
  })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {children ?? (
          <Button variant="secondary" size="lg">
            {dialogTriggerName}
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          className="DialogContent"
          style={
            {
              '--dialog-max-width': '90vw',
              '--dialog-max-height': '90vh',
            } as React.CSSProperties
          }
          aria-describedby="dialog-description"
        >
          <Dialog.Title className="DialogTitle">{dialogTitle}</Dialog.Title>
          {file && (
            <Image
              src={file?.url}
              alt={file?.name}
              width={imageDimensions.width}
              height={imageDimensions.height}
              priority
              onError={(e) => {
                console.error('Failed to load image:', e)
              }}
            />
          )}
          <Dialog.Description id="dialog-description">
            {descriptionText?.trim() ?? ''}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogPopupImage
