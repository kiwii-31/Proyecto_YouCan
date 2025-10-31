export default function Habits({ habits, setHabits }) {
  const [newHabit, setNewHabit] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHabit.nombre) {
      setError("El nombre del habito es obligatorio");
      return;
    }

    if (editId !== null) {
      setHabits(habits.map(h => h.id === editId ? { ...h, ...newHabit } : h));
      setEditId(null);
    } else {
      setHabits([...habits, { ...newHabit, id: Date.now(), done: false }]);
    }

    setNewHabit({ nombre: "", descripcion: "" });
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Seguro que quieres eliminarlo?")) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const handleEdit = (h) => {
    setEditId(h.id);
    setNewHabit({ nombre: h.nombre, descripcion: h.descripcion });
    setError("");
  };

  return (
    <div className="p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mis Habitos</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 max-w-md">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Nombre del habito"
          value={newHabit.nombre}
          onChange={e => setNewHabit({ ...newHabit, nombre: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Descripcion (opcional)"
          value={newHabit.descripcion}
          onChange={e => setNewHabit({ ...newHabit, descripcion: e.target.value })}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">{editId !== null ? "Editar" : "Agregar"}</button>
      </form>

      {habits.length === 0 && <p>No hay habitos</p>}
      {habits.map(h => (
        <div key={h.id} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2">
          <div>
            <h2 className="font-semibold">{h.nombre}</h2>
            <p className="text-gray-500">{h.descripcion || "Sin descripcion"}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleEdit(h)} className="btn btn-sm btn-warning">Editar</button>
            <button onClick={() => handleDelete(h.id)} className="btn btn-sm btn-error">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
