import React, { useState } from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        const newTodoItem: Todo = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Todo List
                </h1>
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new todo"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <span
                                className={`flex-grow cursor-pointer ${
                                    todo.completed ? "line-through text-gray-500" : "text-gray-800"
                                }`}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="ml-2 px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                {todos.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No todos yet. Add some!</p>
                )}
            </div>
        </div>
    );
};

export default TodoApp;
