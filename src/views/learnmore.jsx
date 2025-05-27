// src/views/LearnMore.jsx
import { useNavigate } from "react-router-dom";

export const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-8 py-12">
      <h1 className="text-6xl font-bold mb-6 text-[#63DAF1] font-bicubik">
        Aprende Mas
      </h1>
      <p className="max-w-3xl text-center text-[#BBF8F9] text-xl font-light mb-12 leading-relaxed">
        Esta sección contiene información detallada sobre las funcionalidades del sistema,
        protocolos de seguridad, y procedimientos recomendados para el manejo de reportes
        y casos de investigación.
      </p>

      <section className="max-w-4xl bg-[#111111] rounded-2xl p-8 border border-[#00afd0] shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-[#63DAF1]">¿Qué puedes hacer aquí?</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300 text-lg">
          <li>Consultar tutoriales para gestionar reportes.</li>
          <li>Acceder a estadísticas de casos resueltos.</li>
          <li>Contactar al equipo de soporte.</li>
          <li>Revisar actualizaciones y noticias relevantes.</li>
        </ul>
      </section>

      <button
        onClick={() => navigate("/home-admin")}
        className="mt-10 px-6 py-3 bg-[#00afd0] text-black font-bold rounded-lg hover:bg-[#0099b8] transition"
      >
        ← Volver al Inicio
      </button>
    </div>
  );
};
