'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog' // Correct import for Radix Dialog
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import './dialog.css'

interface DialogPopupProps {
  // A generic callback for handling input accept
  handleButton: (value: string, cancel: boolean) => void
  dialogTriggerName?: string
  dialogTitle?: string
  acceptText?: string
  cancelText?: string
  inputDefaultValue?: string
  descriptionText?: string
}

const DialogPopup: React.FC<DialogPopupProps> = ({
  handleButton,
  dialogTriggerName = 'New Item',
  dialogTitle = 'New Item',
  acceptText = 'Accept',
  cancelText = 'Cancel',
  inputDefaultValue = '',
  descriptionText = 'Enter a value below.',
}) => {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(inputDefaultValue)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="lg">
          {dialogTriggerName}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          className="DialogContent"
          aria-describedby="dialog-description"
        >
          <Dialog.Title className="DialogTitle">{dialogTitle}</Dialog.Title>
          {!descriptionText.trim() ? (
            <Dialog.Description />
          ) : (
            <Dialog.Description id="dialog-description">
              {descriptionText}
            </Dialog.Description>
          )}
          <fieldset className="Fieldset">
            <Input
              autoFocus
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleButton(inputValue, false)
                  setOpen(false)
                }
              }}
            />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
              gap: 4,
            }}
          >
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="lg"
                className="w-2"
                aria-label={cancelText}
                onClick={() => {
                  handleButton(inputValue, true)
                  setOpen(false)
                }}
              >
                {cancelText}
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="lg"
                className="w-2"
                aria-label={acceptText}
                onClick={() => {
                  handleButton(inputValue, false)
                  setOpen(false)
                }}
              >
                {acceptText}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogPopup
