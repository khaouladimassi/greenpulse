import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Flash {
  x: number;
  y: number;
  id: number;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const [flashId, setFlashId] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const newFlash: Flash = { x: e.clientX, y: e.clientY, id: flashId };
    setFlashes((prev) => [...prev, newFlash]);
    setFlashId((prev) => prev + 1);

    if (flashes.length > 50) {
      setFlashes((prev) => prev.slice(prev.length - 50));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* ⚡ FLASH TRAÎNÉE - VERT CLAIR, FRESH */}
      {flashes.map((flash) => (
        <motion.div
          key={flash.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1, 0.9] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute w-40 h-3 rounded-full pointer-events-none
                     bg-green-500/90 blur-2xl
                     shadow-[0_0_100px_rgba(34,197,94,1),
                             0_0_150px_rgba(34,197,94,0.8),
                             0_0_200px_rgba(34,197,94,0.6)]"
          style={{ top: flash.y, left: flash.x }}
        />
      ))}

      {/* ⚡ CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center
                        bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.6)]">
          <Zap className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 text-white">
          {t("login.title")}
        </h1>

        <p className="font-display text-sm tracking-[0.3em] uppercase text-gray-300 mb-6">
          {t("login.subtitle")}
        </p>

        <p className="text-gray-200 mb-10 leading-relaxed">
          {t("login.description")}
        </p>

        <Button
          size="lg"
          onClick={() => navigate("/dashboard")}
          className="text-sm font-display tracking-wider px-8 py-6 rounded-xl
                     bg-green-500 text-white
                     shadow-[0_0_30px_rgba(34,197,94,0.6)]
                     hover:bg-green-600 hover:scale-105
                     transition-all duration-300"
        >
          {t("login.enter")}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Login;