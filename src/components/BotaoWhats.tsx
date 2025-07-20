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
        fixed bottom-20 left-1/2 -translate-x-1/2 z-[1000]
        flex items-center gap-[0.8rem]
        px-4 py-2
        bg-[#0077b6] hover:bg-[#005f8e]
        text-[#ffd43b]
        font-bold text-[1.05rem] rounded-[12px]
        shadow-md
        transition-all duration-300
      "
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Image
        src="/assets/img/whatsapp.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="w-6 h-6"
      />{" "}
      Quero reservar agora!
    </a>
  );
}
