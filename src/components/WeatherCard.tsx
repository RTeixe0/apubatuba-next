// components/WeatherCard.tsx
import { useEffect, useState } from "react";

type Day = {
  date: string;
  code: number | null;
  text: string;
  icon: string;
  tmax: number;
  tmin: number;
  rain: number | null;
};

type WeatherPayload = {
  location: string;
  current: {
    temp: number;
    wind: number | null;
    code: number | null;
    text: string;
    icon: string;
  };
  days: Day[];
  updatedAt: string;
};

export default function WeatherCard() {
  const [data, setData] = useState<WeatherPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const r = await fetch("/api/weather");
        if (!r.ok) throw new Error("Falha ao carregar clima");
        const j: WeatherPayload = await r.json();
        if (active) setData(j);
      } catch (e) {
        if (active) setErr(e instanceof Error ? e.message : "Erro inesperado");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const id: ReturnType<typeof setInterval> = setInterval(
      load,
      15 * 60 * 1000
    );
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-4 py-2 text-white/85">
        Carregando previsão…
      </div>
    );
  if (err || !data)
    return (
      <div className="max-w-6xl mx-auto px-4 py-2 text-red-200">
        Não foi possível carregar a previsão agora.
      </div>
    );

  const fmt = (iso: string) =>
    new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });

  return (
    <section
      aria-label="Previsão do tempo para Praia Grande, Ubatuba"
      className="max-w-6xl mx-auto px-4"
    >
      {/* Cabeçalho minimalista (sem barra/amarelo) */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 sm:mb-3">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--text)]">
          Previsão do tempo
        </h2>
        <span className="text-white/60 text-xs sm:text-sm truncate">
          {data.location}
        </span>
      </div>

      {/* Linha principal enxuta */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
        {/* Atual */}
        <div className="flex items-center sm:items-end gap-3 sm:gap-4">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none text-[var(--text)]">
            {data.current.temp}
            <span
              className="text-base sm:text-lg md:text-xl align-super"
              style={{ color: "var(--accent)" }}
            >
              °C
            </span>
          </div>
          <div className="text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl" aria-hidden>
                {data.current.icon}
              </span>
              <span className="text-sm sm:text-base">{data.current.text}</span>
            </div>
            <div className="text-[11px] sm:text-xs text-white/65 mt-1">
              {data.current.wind != null && (
                <>Vento {Math.round(data.current.wind)} km/h</>
              )}
              <span className="mx-1">•</span>
              Atualizado{" "}
              {new Date(data.updatedAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {/* Próximos dias — sem fundo/borda */}
        <ul
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-visible -mx-1 px-1 py-1"
          aria-label="Previsão para os próximos dias"
        >
          {data.days.map((d) => (
            <li key={d.date} className="shrink-0 md:shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-xl sm:text-2xl" aria-hidden>
                  {d.icon}
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-white/70">
                    {fmt(d.date)}
                  </div>
                  <div className="text-sm text-[var(--text)] font-medium">
                    {d.tmax}° <span className="text-white/70">/ {d.tmin}°</span>
                  </div>
                  {d.rain != null && (
                    <div className="text-[10px] sm:text-[11px] text-white/60">
                      Chuva {d.rain}%
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé mínimo */}
      <p className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] text-white/55">
        Dados: Open‑Meteo. Condições podem variar rapidamente no litoral.
      </p>

      {/* JSON‑LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WeatherForecast",
            name: "Previsão do tempo - Praia Grande, Ubatuba",
            dateIssued: new Date().toISOString(),
            forecast: data.days.map((d) => ({
              "@type": "WeatherForecast",
              date: d.date,
              weatherSummary: d.text,
              maximumTemperature: {
                "@type": "QuantitativeValue",
                value: d.tmax,
                unitCode: "CEL",
              },
              minimumTemperature: {
                "@type": "QuantitativeValue",
                value: d.tmin,
                unitCode: "CEL",
              },
              precipitationProbability: d.rain,
            })),
            areaServed: {
              "@type": "Place",
              name: "Praia Grande – Ubatuba, SP",
              geo: {
                "@type": "GeoCoordinates",
                latitude: -23.493,
                longitude: -45.066,
              },
            },
          }),
        }}
      />
    </section>
  );
}
