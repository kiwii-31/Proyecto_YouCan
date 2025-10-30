import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Help() {
  const faqs = [
    {
      question: "¿Como agrego un nuevo habito?",
      answer:
        "Vas a la seccion 'Habitos', completas el nombre, descripcion y dia de la semana, y haces click en 'Agregar Habito'",
    },
    {
      question: "¿Como marco un habito como completado?",
      answer:
        "En la sección 'Calendario', apreta la casilla junto al habito para marcarlo como realizado",
    },
    {
      question: "¿Puedo editar o eliminar un habito?",
      answer:
        "Si puedes. En 'Mis Habitos', hace click en 'Editar' para modificar un habito o en 'Eliminar' para borrarlo",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Ayuda</h1>

      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-white shadow-md rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4 text-left font-semibold text-lg hover:bg-gray-100 rounded-t-lg"
            onClick={() => toggleFAQ(idx)}
          >
            {faq.question}
            {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openIndex === idx && (
            <div className="p-4 border-t border-gray-200 text-gray-700">
              {faq.answer}
            </div>
          )}
        </div>
      ))}

      <section className="mt-8 bg-blue-100 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Consejo para organizar tus habitos</h2>
        <p className="text-gray-650">
          Comenza con pocos habitos a la vez y agrega nuevos de apoco. Recorda revisar tu progreso en el calendario cada dia
        </p>
      </section>
    </div>
  );
}
