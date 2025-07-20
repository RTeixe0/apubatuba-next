type BadgeGroupProps = {
  titulo: string;
  itens: string[];
};

export function BadgeGroup({ titulo, itens }: BadgeGroupProps) {
  if (!itens || itens.length === 0) return null;

  const destaque = itens[itens.length - 1];
  const comuns = itens.slice(0, -1);

  return (
    <div className="w-full max-w-full bg-white/5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.15)] p-6 box-border">
      <h3 className="text-[#ffd43b] text-[1.25rem] font-semibold text-center mb-6 tracking-wide">
        {titulo}
      </h3>

      <div className="flex flex-wrap justify-center w-full gap-[0.7rem] fade-up fade-up-active">
        {comuns.map((badge, i) => (
          <span
            key={i}
            className="inline-flex items-center justify-center bg-white/10 text-gray-200 text-[0.95rem] font-medium px-4 py-2 rounded-full leading-[1.2] shadow max-w-full text-center break-words whitespace-normal transition-all duration-200 hover:bg-white/20 hover:scale-[1.03]"
          >
            {badge}
          </span>
        ))}

        <span className="inline-block text-[#ffd43b] bg-[#ffd43b]/10 border border-[#fdcb6e] font-bold text-[0.95rem] px-6 py-3 rounded-full mt-4 text-center max-w-full mx-auto w-full break-words transition-all duration-200 hover:bg-[#ffd43b]/20 hover:scale-[1.02]">
          {destaque}
        </span>
      </div>
    </div>
  );
}
