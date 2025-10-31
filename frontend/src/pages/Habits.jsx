import React, { useState, useEffect } from "react";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ Nombre: "", Descripcion: "", Dia: "lunes", Done: false });
  const [editId, setEditId] = useState(null);

  const days = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHabit.Nombre) return;

    if (editId !== null) {
      const updated = { id: editId, ...newHabit };
      setHabits(habits.map(h => h.id === editId ? updated : h));
      setEditId(null);
    } else {
      const newId = habits.length > 0 ? habits[habits.length - 1].id + 1 : 1;
      setHabits([...habits, { ...newHabit, id: newId }]);
    }

    setNewHabit({ Nombre: "", Descripcion: "", Dia: "lunes", Done: false });
  };

  const handleEdit = (habit) => {
    setEditId(habit.id);
    setNewHabit({ ...habit });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este habito?")) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const toggleDone = (habitId) => {
    setHabits(habits.map(h => h.id === habitId ? { ...h, Done: !h.Done } : h));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Habitos</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 max-w-md">  
        <input
          type="text"
          placeholder="Nombre del habito"
          value={newHabit.Nombre}
          onChange={e => setNewHabit({ ...newHabit, Nombre: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Descripcion (opcional)"
          value={newHabit.Descripcion}
          onChange={e => setNewHabit({ ...newHabit, Descripcion: e.target.value })}
          className="input input-bordered w-full"
        />
        <select
          value={newHabit.Dia}
          onChange={e => setNewHabit({ ...newHabit, Dia: e.target.value })}
          className="input input-bordered w-full"
        >
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button type="submit" className="btn btn-primary">{editId !== null ? "Editar Habito" : "Agregar Habito"}</button>
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
                  <li key={h.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={h.Done}
                        onChange={() => toggleDone(h.id)}
                        className="checkbox checkbox-primary"
                      />
                      <div>
                        <p className={h.Done ? "line-through text-gray-400 font-semibold" : "font-semibold"}>{h.Nombre}</p>
                        {h.Descripcion && <p className="text-gray-500 text-sm">{h.Descripcion}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(h)} className="btn btn-sm btn-warning">Editar</button>
                      <button onClick={() => handleDelete(h.id)} className="btn btn-sm btn-error">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {habits.length === 0 && <p className="text-gray-500">No hay habitos.</p>}
      </div>
    </div>
  );
}
