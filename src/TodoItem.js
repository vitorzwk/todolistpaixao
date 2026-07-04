import { Check, Trash2 } from "lucide-react";

// Esse componente NÃO tem estado próprio. Ele só recebe dados prontos
// via props e "avisa" o pai quando algo acontece (clique no checkbox ou na lixeira).
// Isso é o padrão "componente controlado pelo pai".
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 border-b border-blue-50 last:border-none group">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
          todo.completed ? "bg-blue-500 border-blue-500" : "border-blue-300"
        }`}
        aria-label="Marcar como concluída"
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>

      <span
        className={`flex-1 text-sm transition ${
          todo.completed ? "line-through text-blue-300" : "text-blue-900"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-blue-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
        aria-label="Excluir tarefa"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}