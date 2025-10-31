import React, { useState, useEffect } from "react";

export default function Calendar() {
  const [habits, setHabits] = useState([]);

  const days = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
  const todayIndex = new Date().getDay(); 


  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  const toggleDone = (habitId) => {
    const updatedHabits = habits.map(h => h.id === habitId ? { ...h, Done: !h.Done } : h);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Calendario de Habitos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {days.map((day, index) => {
          const dayHabits = habits.filter(h => h.Dia === day);
          const isToday = (todayIndex === 0 && day === "domingo") || (todayIndex === index + 1 && day !== "domingo");

          return (
            <div
              key={day}
              className={`p-4 rounded-md shadow-md transition-all ${
                isToday ? "bg-blue-100 border-2 border-blue-400" : "bg-white"
              }`}
            >
              <h2 className="font-semibold text-xl capitalize mb-2">{day}</h2>

              {dayHabits.length === 0 ? (
                <p className="text-gray-400 text-sm">No hay habitos</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {dayHabits.map(h => (
                    <li key={h.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-all">
                      <div>
                        <p className={h.Done ? "line-through text-gray-400 font-semibold" : "font-semibold"}>
                          {h.Nombre}
                        </p>
                        {h.Descripcion && <p className="text-gray-500 text-sm">{h.Descripcion}</p>}
                      </div>
                      <input
                        type="checkbox"
                        checked={h.Done}
                        onChange={() => toggleDone(h.id)}
                        className="checkbox checkbox-primary"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

