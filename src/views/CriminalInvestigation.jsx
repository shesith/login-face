// src/views/CriminalInvestigation.jsx

import { useState } from "react";

export const CriminalInvestigation = () => {
  // Estado para simular casos activos (puedes reemplazar con datos reales después)
  const [cases, setCases] = useState([
    {
      id: 1,
      title: "Robo en joyería central",
      status: "En progreso",
      description: "Investigando el robo ocurrido el 15 de mayo en la joyería del centro.",
      dateReported: "2025-05-20",
    },
    {
      id: 2,
      title: "Fraude bancario en línea",
      status: "Pendiente",
      description: "Posible esquema de phishing afectando varias cuentas.",
      dateReported: "2025-05-22",
    },
  ]);

  // Función para simular cerrar un caso
  const closeCase = (id) => {
    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === id ? { ...c, status: "Cerrado" } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-8 py-12 flex flex-col items-center">
      {/* Título principal */}
      <h1 className="text-6xl font-bold mb-6 text-[#63DAF1] font-bicubik animate-pulse">
        Criminal Investigation
      </h1>

      {/* Descripción general */}
      <p className="max-w-4xl text-center text-[#BBF8F9] text-xl font-light mb-12 leading-relaxed">
        Bienvenido al centro de investigaciones. Aquí puedes consultar los casos activos, 
        revisar evidencias, administrar perfiles y mantener el orden en nuestra comunidad.
        La seguridad y la precisión son nuestra prioridad.
      </p>

      {/* Lista de casos activos */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-[#00afd0] pb-2">
          Casos Activos
        </h2>

        {cases.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No hay casos activos por ahora.
          </p>
        ) : (
          <ul className="space-y-6">
            {cases.map(({ id, title, status, description, dateReported }) => (
              <li
                key={id}
                className="bg-[#111111] rounded-xl p-6 shadow-lg border border-[#00afd0] flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-4 md:mb-0 max-w-xl">
                  <h3 className="text-2xl font-semibold text-[#63DAF1] mb-1">
                    {title}
                  </h3>
                  <p className="text-gray-300 mb-2">{description}</p>
                  <p className="text-gray-500 text-sm">
                    Reportado: <time dateTime={dateReported}>{dateReported}</time>
                  </p>
                </div>

                <div className="flex flex-col md:items-end">
                  <span
                    className={`mb-4 px-3 py-1 rounded-full font-semibold text-sm ${
                      status === "Cerrado"
                        ? "bg-green-600 text-green-100"
                        : status === "En progreso"
                        ? "bg-yellow-600 text-yellow-100"
                        : "bg-red-600 text-red-100"
                    }`}
                  >
                    {status}
                  </span>

                  {/* Solo mostrar botón si el caso no está cerrado */}
                  {status !== "Cerrado" && (
                    <button
                      onClick={() => closeCase(id)}
                      className="px-4 py-2 rounded bg-[#63DAF1] text-black font-semibold hover:bg-[#52b7c6] transition"
                    >
                      Marcar como cerrado
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de contacto para reportar un nuevo caso */}
      <section className="w-full max-w-5xl mt-16 bg-[#0c0c0c] rounded-2xl p-8 border border-[#00afd0] shadow-2xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-[#00afd0] pb-2 text-[#63DAF1]">
          Reportar un nuevo caso
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Funcionalidad aún no implementada.");
          }}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2 text-white font-semibold">
            Título del caso:
            <input
              type="text"
              placeholder="Ejemplo: Robo en la joyería"
              className="rounded bg-[#111111] border border-[#00afd0] p-3 focus:outline-none focus:ring-2 focus:ring-[#63DAF1] text-white"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-white font-semibold">
            Descripción:
            <textarea
              placeholder="Describe el caso con detalles"
              rows={4}
              className="rounded bg-[#111111] border border-[#00afd0] p-3 focus:outline-none focus:ring-2 focus:ring-[#63DAF1] text-white"
              required
            />
          </label>

          <button
            type="submit"
            className="self-start bg-[#63DAF1] text-black font-bold px-6 py-3 rounded hover:bg-[#52b7c6] transition"
          >
            Enviar reporte
          </button>
        </form>
      </section>
    </div>
  );
};
