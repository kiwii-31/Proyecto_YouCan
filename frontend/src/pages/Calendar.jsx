import { useEffect, useState } from "react";
import { getHabits } from "../api/habitsApi";

export default function Calendar() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Calendario de Habitos</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {Array.isArray(habits) && habits.length > 0 ? (
          habits.map(h => (
            <div key={h.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="font-semibold text-xl">{h.nombre}</h2>
              <p className="text-gray-500">{h.descripcion || "Sin descripcion"}</p>
              <p>Dias: {h.dias?.join(", ") || "No asignados"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay habitos para mostrar</p>
        )}
      </div>
    </div>
  );
}
