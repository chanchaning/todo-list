import './App.css';
import Header from './components/Header.jsx';
import Editor from './components/Editor.jsx';
import List from './components/List.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'todo-list';

function App() {
    // 로컬스토리지에서 초기 데이터 불러오기
    const getInitialTodos = () => {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
            return JSON.parse(savedTodos);
        }
        return [];
    };

    const [todos, setTodos] = useState(() => getInitialTodos());

    // todos가 변경될 때마다 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const onCreateTodo = (content) => {
        const newTodo = {
            // timestamp + 랜덤 숫자를 조합하여 고유한 id 생성
            id: Date.now() + Math.random(),
            isDone: false,
            content: content,
            date: new Date().getTime(),
        };

        setTodos([newTodo, ...todos]);
    };

    const onUpdate = (targetId) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === targetId) {
                    return {
                        ...todo,
                        isDone: !todo.isDone,
                    };
                }
                return todo;
            }),
        );
    };

    const onDelete = (targetId) => {
        const targetTodo = todos.find((todo) => todo.id === targetId);
        if (targetTodo) {
            setTodos(todos.filter((todo) => todo.id !== targetId));
        }
    };

    return (
        <div className="App">
            <Header />
            <Editor onCreate={onCreateTodo} />
            <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
            <ConfirmDialog />
        </div>
    );
}

export default App;
