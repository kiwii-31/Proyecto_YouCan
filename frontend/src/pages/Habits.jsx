import { useState, useEffect } from "react";
import { fetchHabits, createHabit, updateHabit, deleteHabit } from "../api/habitsApi";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: "", description: "", day: "lunes", done: false });
  const [editId, setEditId] = useState(null);

  const days = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

  useEffect(() => {
    async function loadHabits() {
      const data = await fetchHabits();
      setHabits(data);
    }
    loadHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newHabit.name) return;

    if (editId) {
      const updated = { id: editId, ...newHabit };
      await updateHabit(updated);
      setHabits(habits.map(h => h.ID_Habito === editId ? updated : h));
      setEditId(null);
    } else {
      const res = await createHabit(newHabit);
      if (!res.error) {
        setHabits([...habits, { ...newHabit, ID_Habito: res.ID_Habito || habits.length + 1 }]);
      } else {
        alert(res.error);
      }
    }

    setNewHabit({ name: "", description: "", day: "lunes", done: false });
  };

  const handleEdit = (habit) => {
    setEditId(habit.ID_Habito);
    setNewHabit({ 
      name: habit.Nombre, 
      description: habit.Descripcion, 
      day: habit.Dia, 
      done: habit.Done 
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este hábito?")) {
      await deleteHabit(id);
      setHabits(habits.filter(h => h.ID_Habito !== id));
    }
  };

  const toggleDone = async (habit) => {
    const updated = { ...habit, Done: !habit.Done };
    await updateHabit(updated);
    setHabits(habits.map(h => h.ID_Habito === habit.ID_Habito ? updated : h));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Hábitos</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Nombre del hábito"
          value={newHabit.name}
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={newHabit.description}
          onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
          className="input input-bordered w-full"
        />
        <select
          value={newHabit.day}
          onChange={(e) => setNewHabit({ ...newHabit, day: e.target.value })}
          className="input input-bordered w-full"
        >
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button type="submit" className="btn btn-primary">
          {editId ? "Editar Hábito" : "Agregar Hábito"}
        </button>
      </form>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {days.map(day => {
          const dayHabits = habits.filter(h => h.Dia === day);
          if (!dayHabits.length) return null;

          return (
            <div key={day} className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="font-semibold text-xl capitalize mb-3">{day}</h2>
              <ul className="space-y-2">
                {dayHabits.map(h => (
                  <li key={h.ID_Habito} className="flex justify-between items-center bg-white p-3 rounded-md shadow">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={h.Done}
                        onChange={() => toggleDone(h)}
                        className="checkbox checkbox-primary"
                      />
                      <div>
                        <p className={h.Done ? "line-through text-gray-400 font-semibold" : "font-semibold"}>
                          {h.Nombre}
                        </p>
                        {h.Descripcion && <p className="text-gray-500 text-sm">{h.Descripcion}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(h)} className="btn btn-sm btn-warning">Editar</button>
                      <button onClick={() => handleDelete(h.ID_Habito)} className="btn btn-sm btn-error">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {habits.length === 0 && <p className="text-gray-500">No hay hábitos.</p>}
      </div>
    </div>
  );
}
