// Componente dependente: só recebe o filtro atual e uma função pra mudar ele.
// Não tem ligação com as tarefas, só sobre as 3 opções de filtro.
export default function FilterTabs({ filter, onChange }) {
  const tabs = [
    { key: "all", label: "Todas" },
    { key: "active", label: "Ativas" },
    { key: "completed", label: "Concluídas" },
  ];

  return (
    <div className="flex gap-1 p-2 bg-blue-50/60">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
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
  );
}