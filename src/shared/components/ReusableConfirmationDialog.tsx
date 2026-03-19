// ReusableConfirmationDialog.tsx

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  isLoading = false,
}: ConfirmationDialogProps) => {
  return (
    <Dialog.Root
      role="alertdialog"
      lazyMount
      placement="center"
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <p>{message}</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" colorPalette="gray">
                  {cancelText}
                </Button>
              </Dialog.ActionTrigger>

              <Button
                colorPalette="red"
                onClick={onConfirm}
                loading={isLoading}
              >
                {confirmText}
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" colorPalette="gray" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};