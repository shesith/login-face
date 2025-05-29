import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadModel, predictFace } from "../utils/faceRecognition";
import { GetImageUrl } from "../utils/getImageUrl";

export const Login = () => {
  const [spinning, setSpinning] = useState(true);
  const webcamRef = useRef(null);
  const [agentName, setAgentName] = useState("");
  const [intruderAlert, setIntruderAlert] = useState(false);
  const [showAccessAlert, setShowAccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadModel();
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("No se pudo acceder a la cámara. Verifica los permisos.");
      console.error("Error activando la cámara:", error);
    }
  };

  const handleDetect = async () => {
    if (!webcamRef.current) {
      alert("La cámara no está activa. Asegúrate de permitir el acceso.");
      return;
    }

    const highestPrediction = await predictFace(webcamRef.current);
    console.log("Mayor probabilidad detectada:", highestPrediction);

    const knownAgents = ["Abigail Miñano", "Luis Adrian"];

    if (
      highestPrediction.className &&
      knownAgents.includes(highestPrediction.className.trim()) &&
      highestPrediction.probability > 0.8
    ) {
      setAgentName(highestPrediction.className);
      setShowAccessAlert(true);
      setSpinning(true);

      setTimeout(() => {
        setSpinning(false); // Detener giro después de 2 segundos
      }, 2000);

      setTimeout(() => {
        setShowAccessAlert(false);
        navigate("/home-admin");
      }, 3000); // 3 segundos para mostrar el mensaje
    } else {
      // 🔥 Reproducir sonido de alerta y detenerlo después de 3 segundos
      const audio = new Audio("/public/sounds/alarm.mp3");
      audio.loop = false;
      audio.play();

      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reiniciar el sonido para futuras detecciones
      }, 3000);

      setIntruderAlert(true);
      setTimeout(() => setIntruderAlert(false), 3000); // La alerta visual también dura 3 segundos
    }
  };

  return (
    <div className="flex items-center justify-center gap-20 relative w-full h-screen bg-black text-white">
      {/* ALERTA DE INTRUSO */}
      {intruderAlert && (
        <div className="fixed top-0 left-0 w-full h-full bg-red-800 text-white text-6xl font-bold flex items-center justify-center animate-flicker z-[999]">
          🚨 INTRUSO DETECTADO 🚨
        </div>
      )}

      {/* ALERTA DE ACCESO CONCEDIDO */}
      {showAccessAlert && agentName && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#063e4e]/95 flex items-center justify-center z-[999]">
          <div className="bg-[#034655] text-black px-16 py-12 rounded-2xl shadow-2xl border-4 border-[#0a0a0a] flex flex-row items-center gap-8 animate-fade-in">
            <img
              className={`w-[120px] transition-all duration-500 ${
                spinning ? "spin-animation" : ""
              }`}
              src={GetImageUrl("marco-circular", "png")}
              alt="check"
              style={{ minWidth: 120 }}
            />
            <div className="flex flex-col items-start">
              <span className="text-4xl font-bold mb-2">Acceso concedido</span>
              <span className="text-2xl font-mono">a: {agentName}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex absolute top-20 left-15 opacity-45">
        <img
          className="w-[250px]"
          src={GetImageUrl("tecnologia", "png")}
          alt="Imagen de muestra"
        />
        <img
          className="w-[250px]"
          src={GetImageUrl("tecnologia", "png")}
          alt="Imagen de muestra"
        />
        <img
          className="w-[250px] absolute top-28"
          src={GetImageUrl("tecnologia", "png")}
          alt="Imagen de muestra"
        />
      </div>

      <div className="text-white flex flex-col">
        <img
          className="w-70 ml-28"
          src={GetImageUrl("letras-fbi", "png")}
          alt="Imagen de muestra"
        />
        <p className="text-[#63DAF1] text-neon text-8xl font-bicubik">AGENTS</p>
      </div>

      <div className="flex absolute bottom-10 left-28 opacity-45">
        <img
          className="w-[250px]"
          src={GetImageUrl("tecnologia", "png")}
          alt="Imagen de muestra"
        />
        <img
          className="w-[250px]"
          src={GetImageUrl("tecnologia", "png")}
          alt="Imagen de muestra"
        />
        <img
          className="w-[250px] absolute bottom-26"
          src={GetImageUrl("tecnologia", "png")}
          alt="Imagen de muestra"
        />
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-[600px] h-[480px] overflow-hidden">
          {/* Video más pequeño */}
          <video
            ref={webcamRef}
            autoPlay
            muted
            className="absolute top-[5%] left-[5%] w-[90%] h-[90%] object-cover z-10"
          ></video>

          {/* Marco más grande */}
          <img
            src={GetImageUrl("marco-camara", "png")}
            alt="Marco de cámara"
            className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none scale-110"
          />
        </div>

        <button
          onClick={handleDetect}
          className="bg-[#034655] text-xl rounded-md text-white px-6 py-3 mt-4 hover:bg-[#03465590] transition-all duration-300 cursor-pointer"
        >
          ACCEDER
        </button>
      </div>
    </div>
  );
};
