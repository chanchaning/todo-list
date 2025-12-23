import useConfirmDialogStore from '../stores/confirmDialogStore';

const useDeleteInterceptor = (onDelete) => {
    const openDialog = useConfirmDialogStore((state) => state.openDialog);

    const deleteWithConfirm = (id) => {
        openDialog(
            '삭제하시겠습니까?',
            () => {
                // 확인 버튼 클릭 시 실제 삭제 함수 호출
                onDelete(id);
            },
            () => {
                // 취소 버튼 클릭 시 아무것도 하지 않음
            }
        );
    };

    return deleteWithConfirm;
};

export default useDeleteInterceptor;

