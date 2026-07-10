import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import FilterTabs from "./FilterTabs";
import TodoItem from "./TodoItem";

// TodoApp é o componente "pai": ele guarda TODO o estado da aplicação
// e distribui, via props, pedaços desse estado (e funções) pros filhos.
const initialTodos = [
  { id: 1, text: "Aprender useState", completed: true },
  { id: 2, text: "Estilizar com Tailwind", completed: false },
  { id: 3, text: "Publicar no portfólio", completed: false },
];

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = window.localStorage.getItem("todos");

    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch {
        return initialTodos;
      }
    }

    return initialTodos;
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-blue-100 flex items-start justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4 px-1">
          <h1 className="text-2xl font-semibold text-blue-900">To do List</h1>
          <span className="text-sm text-blue-500">{remainingCount} pendente(s)</span>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-md border border-blue-100 overflow-hidden">
          {/* Passando a FUNÇÃO addTodo como prop */}
          <TodoInput onAdd={addTodo} />

          {/* Passando DADOS (filter) e FUNÇÃO (setFilter) como props */}
          <FilterTabs filter={filter} onChange={setFilter} />

          <ul>
            {filteredTodos.length === 0 && (
              <li className="text-center text-blue-300 py-10 text-sm">Nenhuma tarefa por aqui</li>
            )}

            {/* Passando cada tarefa individual + funções como props pro TodoItem */}
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-blue-300 mt-4">
          Feito com React + Tailwind CSS
        </p>
      </div>
    </div>
  );
}
