import './ConfirmDialog.css';
import useConfirmDialogStore from '../stores/confirmDialogStore';

const ConfirmDialog = () => {
    const { isOpen, message, confirm, cancel } = useConfirmDialogStore();

    if (!isOpen) return null;

    return (
        <div className="confirm-dialog-overlay" onClick={cancel}>
            <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-dialog-message">{message}</div>
                <div className="confirm-dialog-buttons">
                    <button className="confirm-button" onClick={confirm}>
                        확인
                    </button>
                    <button className="cancel-button" onClick={cancel}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;

