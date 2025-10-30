import { FaTasks, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: <FaTasks size={28} className="text-blue-500" />,
      title: "Organiza tus habitos",
      description:
        "Podes registrar, editar y eliminar habitos para mantener un seguimiento diario de tus actividades y metas",
      color: "bg-blue-100",
    },
    {
      icon: <FaCalendarAlt size={28} className="text-green-500" />,
      title: "Planifica tu dia",
      description:
        "Ve tus habitos en un calendario y organiza tu dia a dia",
      color: "bg-green-100",
    },
    {
      icon: <FaEnvelope size={28} className="text-purple-500" />,
      title: "Mandanos mensajes",
      description:
        "Envianos mensajes y nosotros te ayudaremos con tu problema",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800">Bienvenido a YouCan</h1>
        <p className="text-gray-600 text-lg">
          Te ayudaremos a organizar tus habitos, planificar tu dia y alcanzar tus objetivos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-6 rounded-lg shadow ${feature.color}`}
          >
            <div>{feature.icon}</div>
            <div>
              <h2 className="text-xl font-semibold mb-1">{feature.title}</h2>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
