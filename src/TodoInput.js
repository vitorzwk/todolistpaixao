import { useState } from "react";
import { Plus } from "lucide-react";

// Esse componente tem o SEU PRÓPRIO estado (o texto digitado),
// mas quando o usuário confirma, ele entrega a tarefa pronta pro pai via prop (onAdd).
// O pai é quem decide o que fazer com essa tarefa (adicionar na lista).
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed === "") return;
    onAdd(trimmed); // chama a função que veio do pai, passando o texto
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-b border-blue-100">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
  );
}