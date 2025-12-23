import { create } from 'zustand';

const useConfirmDialogStore = create((set) => ({
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null,
    
    openDialog: (message, onConfirm, onCancel) => {
        set({
            isOpen: true,
            message,
            onConfirm,
            onCancel: onCancel || (() => {}),
        });
    },
    
    closeDialog: () => {
        set({
            isOpen: false,
            message: '',
            onConfirm: null,
            onCancel: null,
        });
    },
    
    confirm: () => {
        const { onConfirm } = useConfirmDialogStore.getState();
        if (onConfirm) {
            onConfirm();
        }
        useConfirmDialogStore.getState().closeDialog();
    },
    
    cancel: () => {
        const { onCancel } = useConfirmDialogStore.getState();
        if (onCancel) {
            onCancel();
        }
        useConfirmDialogStore.getState().closeDialog();
    },
}));

export default useConfirmDialogStore;

