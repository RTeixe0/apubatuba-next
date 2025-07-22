import Image from "next/image";

type BotaoWhatsProps = {
  msg: string;
  phone?: string;
};

export function BotaoWhats({ msg, phone = "5519997341037" }: BotaoWhatsProps) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-22 right-2 z-[1000]
        bg-[#0077b6] hover:bg-[#005f8e]
        text-[#ffd43b]
        p-3
        rounded-full
        shadow-lg
        transition-all duration-300
      "
      aria-label="Fale conosco no WhatsApp"
    >
      <Image
        src="/assets/img/whatsapp.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="w-6 h-6"
      />
    </a>
  );
}
