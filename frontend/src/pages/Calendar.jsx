export default function Calendar({ habits, setHabits }) {
  const toggleDone = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  return (
    <div className="p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Calendario de Habitos</h1>
      {habits.length === 0 && <p>No hay habitos para mostrar</p>}

      {habits.map(h => (
        <div key={h.id} className="flex justify-between items-center p-2 bg-white rounded mb-2">
          <div>
            <h2 className="font-semibold">{h.nombre}</h2>
            <p className="text-gray-500">{h.descripcion || "Sin descripcion"}</p>
          </div>
          <input
            type="checkbox"
            checked={h.done || false}
            onChange={() => toggleDone(h.id)}
            className="checkbox checkbox-primary"
          />
        </div>
      ))}
    </div>
  );
}
