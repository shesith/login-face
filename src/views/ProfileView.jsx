// src/views/ProfileView.jsx
import { useNavigate } from "react-router-dom";

export const ProfileView = () => {
  const navigate = useNavigate();

  const user = {
    name: "Abigail",
    nickname: "Kitty patitas suaves",
    email: "abigail@example.com",
    role: "Agente Especial",
    bio: "Agente especial dedicada a investigaciones criminales con 5 años de experiencia en la división de delitos complejos.",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-2xl bg-[#0f0f0f] p-10 rounded-2xl shadow-xl border border-[#00afd0]">
        <div className="flex flex-col items-center gap-6">
          <img
            src={user.avatarUrl}
            alt="Avatar de perfil"
            className="w-32 h-32 rounded-full border-4 border-[#00afd0] shadow-md object-cover"
          />
          <h1 className="text-4xl font-bold text-[#63DAF1]">{user.name}</h1>
          <p className="italic text-[#63DAF1] text-xl">"{user.nickname}"</p>
          <p className="text-lg mb-4">{user.bio}</p>
          <div className="w-full">
            <p className="mb-2">
              <span className="font-semibold text-[#00afd0]">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold text-[#00afd0]">Rol:</span> {user.role}
            </p>
          </div>

          <button
            onClick={() => navigate("/home-admin")}
            className="mt-8 px-6 py-3 bg-[#00afd0] text-black font-bold rounded-lg hover:brightness-125 transition"
          >
            ← Volver a Inicio
          </button>
        </div>
      </div>
    </div>
  );
};
