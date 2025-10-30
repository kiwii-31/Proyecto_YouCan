import { FaUsers, FaBullseye, FaEye, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  const sections = [
    {
      icon: <FaUsers size={28} className="text-blue-450" />,
      title: "¿Quienes somos nosotros?",
      description:
        "Somos YouCan, una pagina web para ayudar a organizar tus habitos y que puedas lograr tus objetivos",
      color: "bg-blue-100",
    },
    {
      icon: <FaBullseye size={28} className="text-green-450" />,
      title: "Nuestra mision",
      description:
        "Facilitar la organizacion y que sigas tu planificacion de habitos",
      color: "bg-green-100",
    },
    {
      icon: <FaEye size={28} className="text-yellow-450" />,
      title: "Nuestra vision",
      description:
        "Ser la app para mejorar tu productividad y organizacion personal mediante háaitos",
      color: "bg-yellow-100",
    },
    {
      icon: <FaLaptopCode size={28} className="text-purple-450" />,
      title: "Motivacion",
      description:
        "Creamos YouCan porque sabemos que organizar hábitos puede ser difícil, y queremos que cada persona logre sus metas",
      color: "bg-purple-100",
    },
  ];

  const team = [
    { name: "Laura Martinez Rodas", img: "/src/img/laura.png" },
    { name: "Elmer Flores Arce", img: "/src/img/elmer.png" },

  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>

      {/* Secciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-6 rounded-lg shadow ${section.color}`}
          >
            <div>{section.icon}</div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Equipo */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Nuestro Equipo</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="text-center w-36">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
              />
              <p className="mt-2 font-semibold">{member.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
