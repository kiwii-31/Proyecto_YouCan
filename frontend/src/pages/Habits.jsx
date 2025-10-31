import { useState, useEffect } from "react";
import { getHabits, createHabit as apiCreateHabit, updateHabit as apiUpdateHabit, deleteHabit as apiDeleteHabit } from "../api/habitsApi";

export default function Habits({ usuarioId }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ nombre: "", descripcion: "", dias: [] });
  const [editId, setEditId] = useState(null);
  const days = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

  useEffect(() => {
    async function fetchHabits() {
      const data = await getHabits(usuarioId);
      console.log("Habits data:", data);
      setHabits(data);
    }
    fetchHabits();
  }, [usuarioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newHabit.nombre) return;

    try {
      if (editId) {
        await apiUpdateHabit(editId, { ...newHabit, usuario_id: usuarioId });
      } else {
        await apiCreateHabit({ ...newHabit, usuario_id: usuarioId });
      }

      const data = await getHabits(usuarioId);
      setHabits(data);
      setEditId(null);
      setNewHabit({ nombre: "", descripcion: "", dias: [] });
    } catch (err) {
      console.error(err);
      alert("Error al guardar habito");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminarlo?")) {
      await apiDeleteHabit(id);
      const data = await getHabits(usuarioId);
      setHabits(data);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Habitos</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 max-w-md">
        <input type="text" placeholder="Nombre del hábito" value={newHabit.nombre} onChange={e => setNewHabit({...newHabit, nombre: e.target.value})} className="input input-bordered w-full"/>
        <input type="text" placeholder="Descripcion (opcional)" value={newHabit.descripcion} onChange={e => setNewHabit({...newHabit, descripcion: e.target.value})} className="input input-bordered w-full"/>
        <div className="flex gap-2 flex-wrap">
          {days.map(d => (
            <label key={d} className="flex items-center gap-1">
              <input type="checkbox" checked={newHabit.dias.includes(d)} onChange={() => {
                setNewHabit({
                  ...newHabit,
                  dias: newHabit.dias.includes(d) ? newHabit.dias.filter(x => x!==d) : [...newHabit.dias,d]
                });
              }} className="checkbox checkbox-primary"/>
              {d}
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">{editId ? "Editar" : "Agregar"}</button>
      </form>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {Array.isArray(habits) && habits.map(h => (
          <div key={h.id} className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-xl">{h.nombre}</h2>
            <p className="text-gray-500">{h.descripcion}</p>
            <p>Dias: {h.dias?.join(", ") || "No asignados"}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>{setEditId(h.id); setNewHabit(h)}} className="btn btn-sm btn-warning">Editar</button>
              <button onClick={()=>handleDelete(h.id)} className="btn btn-sm btn-error">Eliminar</button>
            </div>
          </div>
        ))}
        {habits.length===0 && <p className="text-gray-500">No hay habitos</p>}
      </div>
    </div>
  );
}
