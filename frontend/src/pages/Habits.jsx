import { useState, useEffect } from "react";
import { getHabits, createHabit as apiCreateHabit, updateHabit as apiUpdateHabit, deleteHabit as apiDeleteHabit } from "../api/habitsApi";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ nombre: "", descripcion: "", dias: [] });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  useEffect(() => {
    async function fetchHabits() {
      try {
        const data = await getHabits();
        if (Array.isArray(data)) {
          const formatted = data.map(h => ({
            ...h,
            dias: Array.isArray(h.Dia) ? h.Dia : (h.Dia?.split(",") || []),
            nombre: h.Nombre,
            descripcion: h.Descripcion,
            id: h.ID_Habito
          }));
          setHabits(formatted);
        } else {
          setHabits([]);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar habitos");
      }
    }
    fetchHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newHabit.nombre) {
      setError("El nombre del habito es obligatorio");
      return;
    }

    try {
      if (editId) {
        await apiUpdateHabit(editId, {
          Nombre: newHabit.nombre,
          Descripcion: newHabit.descripcion,
          Dia: newHabit.dias.join(","),
          Done: false
        });
      } else {
        await apiCreateHabit({
          Nombre: newHabit.nombre,
          Descripcion: newHabit.descripcion,
          Dia: newHabit.dias.join(","),
          Done: false
        });
      }

      const data = await getHabits();
      const formatted = data.map(h => ({
        ...h,
        dias: Array.isArray(h.Dia) ? h.Dia : (h.Dia?.split(",") || []),
        nombre: h.Nombre,
        descripcion: h.Descripcion,
        id: h.ID_Habito
      }));
      setHabits(formatted);
      setEditId(null);
      setNewHabit({ nombre: "", descripcion: "", dias: [] });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al guardar habito");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Seguro que quieres eliminarlo?")) {
      try {
        await apiDeleteHabit(id);
        const data = await getHabits();
        const formatted = data.map(h => ({
          ...h,
          dias: Array.isArray(h.Dia) ? h.Dia : (h.Dia?.split(",") || []),
          nombre: h.Nombre,
          descripcion: h.Descripcion,
          id: h.ID_Habito
        }));
        setHabits(formatted);
      } catch (err) {
        console.error(err);
        setError("Error al eliminar habito");
      }
    }
  };

  const handleEdit = (h) => {
    setEditId(h.id);
    setNewHabit({ nombre: h.nombre, descripcion: h.descripcion, dias: h.dias });
    setError("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Habitos</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 max-w-md">
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

        <div className="flex gap-2 flex-wrap">
          {days.map(d => (
            <label key={d} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={newHabit.dias.includes(d)}
                onChange={() => {
                  setNewHabit({
                    ...newHabit,
                    dias: newHabit.dias.includes(d)
                      ? newHabit.dias.filter(x => x !== d)
                      : [...newHabit.dias, d]
                  });
                }}
                className="checkbox checkbox-primary"
              />
              {d}
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">{editId ? "Editar" : "Agregar"}</button>
      </form>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {Array.isArray(habits) && habits.length > 0 ? (
          habits.map(h => (
            <div key={h.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="font-semibold text-xl">{h.nombre}</h2>
              <p className="text-gray-500">{h.descripcion || "Sin descripcion"}</p>
              <p>Dias: {h.dias?.join(", ") || "No asignados"}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(h)} className="btn btn-sm btn-warning">Editar</button>
                <button onClick={() => handleDelete(h.id)} className="btn btn-sm btn-error">Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay habitos</p>
        )}
      </div>
    </div>
  );
}
