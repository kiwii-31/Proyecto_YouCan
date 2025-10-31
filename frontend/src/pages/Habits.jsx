import React, { useState } from "react";

export default function Habits() {
  const [habits, setHabits] = useState([]);
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
      setHabits(
        habits.map((h) =>
          h.id === editId ? { ...h, nombre: newHabit.nombre, descripcion: newHabit.descripcion } : h
        )
      );
      setEditId(null);
    } else {
      const newId = habits.length > 0 ? habits[habits.length - 1].id + 1 : 1;
      setHabits([...habits, { id: newId, nombre: newHabit.nombre, descripcion: newHabit.descripcion }]);
    }

    setNewHabit({ nombre: "", descripcion: "" });
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Seguro que quieres eliminarlo?")) {
      setHabits(habits.filter((h) => h.id !== id));
    }
  };

  const handleEdit = (h) => {
    setEditId(h.id);
    setNewHabit({ nombre: h.nombre, descripcion: h.descripcion });
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
          onChange={(e) => setNewHabit({ ...newHabit, nombre: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Descripcion (opcional)"
          value={newHabit.descripcion}
          onChange={(e) => setNewHabit({ ...newHabit, descripcion: e.target.value })}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary">
          {editId !== null ? "Editar" : "Agregar"}
        </button>
      </form>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {habits.length > 0 ? (
          habits.map((h) => (
            <div key={h.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="font-semibold text-xl">{h.nombre}</h2>
              <p className="text-gray-500">{h.descripcion || "Sin descripcion"}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(h)} className="btn btn-sm btn-warning">
                  Editar
                </button>
                <button onClick={() => handleDelete(h.id)} className="btn btn-sm btn-error">
                  Eliminar
                </button>
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
