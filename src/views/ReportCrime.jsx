import { useNavigate } from "react-router-dom";

export const ReportCrime = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar lógica para enviar el reporte
    alert("¡Crimen reportado exitosamente!");
    navigate("/home-admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-2xl bg-[#0f0f0f] p-10 rounded-2xl shadow-xl border border-[#00afd0]">
        <h1 className="text-4xl font-bold text-[#63DAF1] text-center mb-8">Reportar Crimen</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-lg">Título del reporte</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#63DAF1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63DAF1]"
              placeholder="Ej: Robo en la estación central"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Descripción</label>
            <textarea
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#63DAF1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63DAF1]"
              rows="5"
              placeholder="Describe lo que ocurrió..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Tipo de crimen</label>
            <select
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#63DAF1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63DAF1]"
              required
            >
              <option value="">Seleccionar</option>
              <option value="robo">Robo</option>
              <option value="fraude">Fraude</option>
              <option value="asalto">Asalto</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-[#00afd0] text-black font-bold rounded-lg hover:brightness-125 transition"
          >
            Enviar Reporte
          </button>
        </form>

        <button
          onClick={() => navigate("/home-admin")}
          className="mt-6 text-[#63DAF1] underline hover:text-white transition"
        >
          ← Volver a Inicio
        </button>
      </div>
    </div>
  );
};
