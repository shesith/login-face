import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getCasesFromStorage = () => {
  const stored = localStorage.getItem("cases");
  if (stored) return JSON.parse(stored);
  // Casos por defecto si no hay nada en storage
  return [
    {
      id: 1,
      title: "Robo en joyería central",
      status: "En progreso",
      description:
        "Investigando el robo ocurrido el 15 de mayo en la joyería del centro.",
      dateReported: "2025-05-20",
    },
    {
      id: 2,
      title: "Fraude bancario en línea",
      status: "Pendiente",
      description: "Posible esquema de phishing afectando varias cuentas.",
      dateReported: "2025-05-22",
    },
  ];
};

export const CriminalInvestigation = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState(getCasesFromStorage());
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "Pendiente",
  });

  useEffect(() => {
    localStorage.setItem("cases", JSON.stringify(cases));
  }, [cases]);

  const closeCase = (id) => {
    setCases((prevCases) =>
      prevCases.map((c) => (c.id === id ? { ...c, status: "Cerrado" } : c))
    );
  };

  const startEdit = (caso) => {
    setEditingId(caso.id);
    setEditForm({
      title: caso.title,
      description: caso.description,
      status: caso.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = (id) => {
    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === id
          ? {
              ...c,
              title: editForm.title,
              description: editForm.description,
              status: editForm.status,
            }
          : c
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-8 py-12 flex flex-col items-center">
      <h1 className="text-6xl font-bold mb-6 text-[#63DAF1] font-bicubik animate-pulse">
        Criminal Investigation
      </h1>
      <p className="max-w-4xl text-center text-[#BBF8F9] text-xl font-light mb-12 leading-relaxed">
        Bienvenido al centro de investigaciones. Aquí puedes consultar los casos
        activos, revisar evidencias, administrar perfiles y mantener el orden en
        nuestra comunidad. La seguridad y la precisión son nuestra prioridad.
      </p>
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
                {editingId === id ? (
                  <div className="mb-4 md:mb-0 max-w-xl w-full">
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="mb-2 w-full rounded bg-[#222] border border-[#63DAF1] p-2 text-white"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="mb-2 w-full rounded bg-[#222] border border-[#63DAF1] p-2 text-white"
                      rows={2}
                    />
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="mb-2 w-full rounded bg-[#222] border border-[#63DAF1] p-2 text-white"
                    >
                      <option value="En progreso">En progreso</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(id)}
                        className="px-4 py-1 rounded bg-green-500 text-black font-semibold hover:bg-green-600 transition"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-1 rounded bg-gray-600 text-white font-semibold hover:bg-gray-700 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 md:mb-0 max-w-xl">
                    <h3 className="text-2xl font-semibold text-[#63DAF1] mb-1">
                      {title}
                    </h3>
                    <p className="text-gray-300 mb-2">{description}</p>
                    <p className="text-gray-500 text-sm">
                      Reportado:{" "}
                      <time dateTime={dateReported}>{dateReported}</time>
                    </p>
                  </div>
                )}

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
                  {/* Solo mostrar botones si el caso no está cerrado */}
                  {status !== "Cerrado" && editingId !== id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => closeCase(id)}
                        className="px-4 py-2 rounded bg-[#63DAF1] text-black font-semibold hover:bg-[#52b7c6] transition"
                      >
                        Marcar como cerrado
                      </button>
                      <button
                        onClick={() =>
                          startEdit({ id, title, description, status })
                        }
                        className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <button
        onClick={() => navigate("/home-admin")}
        className="mt-12 px-8 py-3 bg-[#00afd0] text-black font-bold rounded-lg hover:brightness-125 transition"
      >
        ← Volver a Inicio
      </button>
    </div>
  );
};
