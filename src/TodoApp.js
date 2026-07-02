import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

// ---------------------------------------------------------
// TodoApp — Lista de tarefas estilo "Notas" do iOS, tom azul
// ---------------------------------------------------------
// Conceitos de React praticados aqui:
// 1. useState -> guardar e atualizar estado (lista de tarefas, texto do input, filtro)
// 2. Renderização condicional -> mostrar mensagem quando a lista está vazia
// 3. Listas com .map() -> transformar array de dados em elementos JSX
// 4. "key" prop -> React precisa de uma key única em cada item de lista
// 5. Formulário controlado -> o <input> é 100% controlado pelo estado (value + onChange)
// 6. Passar funções como props (aqui tudo está num único componente, mas em apps maiores
//    cada função como toggleTodo/deleteTodo viraria prop de um componente <TodoItem />)

export default function TodoApp() {
  // Cada tarefa é um objeto: { id, text, completed }
  const [todos, setTodos] = useState([
    { id: 1, text: "Aprender useState", completed: true },
    { id: 2, text: "Estilizar com Tailwind", completed: false },
    { id: 3, text: "Publicar no portfólio", completed: false },
  ]);

  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  // Adiciona uma nova tarefa
  function addTodo(e) {
    e.preventDefault(); // evita reload da página ao enviar o form
    const trimmed = inputText.trim();
    if (trimmed === "") return; // não adiciona tarefa vazia

    const newTodo = {
      id: Date.now(), // id simples baseado em timestamp
      text: trimmed,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]); // nunca mutar o array direto
    setInputText("");
  }

  // Alterna concluída/não concluída
  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Remove uma tarefa
  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  // Filtra a lista de acordo com a aba selecionada
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-blue-100 flex items-start justify-center p-6">
      <div className="w-full max-w-md">

        {/* Cabeçalho estilo "Notas" */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h1 className="text-2xl font-semibold text-blue-900">Tarefas</h1>
          <span className="text-sm text-blue-500">{remainingCount} pendente(s)</span>
        </div>

        {/* Card principal */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-md border border-blue-100 overflow-hidden">

          {/* Formulário para adicionar tarefa */}
          <form onSubmit={addTodo} className="flex items-center gap-2 p-4 border-b border-blue-100">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nova tarefa..."
              className="flex-1 bg-blue-50 rounded-xl px-4 py-2 text-blue-900 placeholder-blue-300 outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0"
              aria-label="Adicionar tarefa"
            >
              <Plus size={20} />
            </button>
          </form>

          {/* Abas de filtro estilo "segmented control" do iOS */}
          <div className="flex gap-1 p-2 bg-blue-50/60">
            {[
              { key: "all", label: "Todas" },
              { key: "active", label: "Ativas" },
              { key: "completed", label: "Concluídas" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 text-sm py-1.5 rounded-lg transition ${
                  filter === tab.key
                    ? "bg-white text-blue-700 shadow-sm font-medium"
                    : "text-blue-400 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lista de tarefas */}
          <ul>
            {filteredTodos.length === 0 && (
              <li className="text-center text-blue-300 py-10 text-sm">
                Nenhuma tarefa por aqui
              </li>
            )}

            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-blue-50 last:border-none group"
              >
                {/* Checkbox circular estilo iOS */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                    todo.completed
                      ? "bg-blue-500 border-blue-500"
                      : "border-blue-300"
                  }`}
                  aria-label="Marcar como concluída"
                >
                  {todo.completed && <Check size={14} className="text-white" />}
                </button>

                {/* Texto da tarefa */}
                <span
                  className={`flex-1 text-sm transition ${
                    todo.completed
                      ? "line-through text-blue-300"
                      : "text-blue-900"
                  }`}
                >
                  {todo.text}
                </span>

                {/* Botão de excluir, some até passar o mouse */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-blue-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                  aria-label="Excluir tarefa"
                >
                  <Trash2 size={16} />
                </button>
              </li>
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