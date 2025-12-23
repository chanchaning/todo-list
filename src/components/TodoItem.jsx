import './TodoItem.css';

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className="TodoItem">
            <label className="checkbox-wrapper">
                <input
                    readOnly
                    checked={isDone}
                    type="checkbox"
                    onChange={onChangeCheckbox}
                />
                <span className="checkmark"></span>
            </label>
            <div className={`content ${isDone ? 'done' : ''}`}>{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    );
};

export default TodoItem;
