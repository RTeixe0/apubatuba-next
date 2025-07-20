import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-5 z-[1000] bg-[#0077b6] text-[#ffd43b] p-3 rounded-full shadow-lg hover:bg-[#005f8e] transition-all duration-300"
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
