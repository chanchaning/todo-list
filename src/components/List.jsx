import './List.css';
import TodoItem from './TodoItem';
import { useState } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
    const [search, setSearch] = useState('');
    const [collapsedDates, setCollapsedDates] = useState(new Set());

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getFilteredData = () => {
        if (search === '') {
            return todos;
        }

        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase()),
        );
    };

    // 날짜 포맷 함수 (오늘, 어제, 날짜)
    const formatDate = (timestamp) => {
        const today = new Date();
        const todoDate = new Date(timestamp);
        
        today.setHours(0, 0, 0, 0);
        todoDate.setHours(0, 0, 0, 0);
        
        const diffTime = today - todoDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 0) {
            return '오늘';
        } else if (diffDays === 1) {
            return '어제';
        } else {
            const year = todoDate.getFullYear();
            const month = String(todoDate.getMonth() + 1).padStart(2, '0');
            const day = String(todoDate.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        }
    };

    // 날짜별로 그룹화
    const groupTodosByDate = (todoList) => {
        const grouped = {};
        todoList.forEach((todo) => {
            const dateKey = formatDate(todo.date);
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(todo);
        });
        return grouped;
    };

    const toggleDateCollapse = (dateKey) => {
        const newCollapsed = new Set(collapsedDates);
        if (newCollapsed.has(dateKey)) {
            newCollapsed.delete(dateKey);
        } else {
            newCollapsed.add(dateKey);
        }
        setCollapsedDates(newCollapsed);
    };

    const filteredTodos = getFilteredData();
    const groupedTodos = groupTodosByDate(filteredTodos);
    
    // 날짜 순서 정렬 (오늘 -> 어제 -> 날짜 순)
    const sortedDateKeys = Object.keys(groupedTodos).sort((a, b) => {
        if (a === '오늘') return -1;
        if (b === '오늘') return 1;
        if (a === '어제') return -1;
        if (b === '어제') return 1;
        return b.localeCompare(a); // 날짜는 내림차순
    });

    return (
        <div className="List">
            <input
                value={search}
                onChange={onSearchChange}
                placeholder="검색어를 입력하세요"
            />
            <div className="todos_wrapper">
                {sortedDateKeys.map((dateKey) => {
                    const isCollapsed = collapsedDates.has(dateKey);
                    return (
                        <div key={dateKey} className="date-group">
                            <div 
                                className="date-header"
                                onClick={() => toggleDateCollapse(dateKey)}
                            >
                                <span className="date-title">{dateKey}</span>
                                <span className="date-count">
                                    ({groupedTodos[dateKey].length})
                                </span>
                                <span className="collapse-icon">
                                    {isCollapsed ? '▼' : '▲'}
                                </span>
                            </div>
                            {!isCollapsed && (
                                <div className="date-todos">
                                    {groupedTodos[dateKey].map((todo) => {
                                        return (
                                            <TodoItem
                                                key={todo.id}
                                                {...todo}
                                                onUpdate={onUpdate}
                                                onDelete={onDelete}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;
