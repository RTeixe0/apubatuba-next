import type { NextApiRequest, NextApiResponse } from "next";

type WmoCode = keyof typeof WMO_CODE;

const WMO_CODE: Record<number, { desc: string; icon: string }> = {
  0: { desc: "Céu limpo", icon: "☀️" },
  1: { desc: "Pred. ensolarado", icon: "🌤️" },
  2: { desc: "Parcialmente nublado", icon: "⛅" },
  3: { desc: "Nublado", icon: "☁️" },
  45: { desc: "Nevoeiro", icon: "🌫️" },
  48: { desc: "Nevoeiro gelado", icon: "🌫️" },
  51: { desc: "Garoa fraca", icon: "🌦️" },
  53: { desc: "Garoa", icon: "🌦️" },
  55: { desc: "Garoa forte", icon: "🌦️" },
  56: { desc: "Garoa congelante fraca", icon: "🌧️" },
  57: { desc: "Garoa congelante", icon: "🌧️" },
  61: { desc: "Chuva fraca", icon: "🌧️" },
  63: { desc: "Chuva", icon: "🌧️" },
  65: { desc: "Chuva forte", icon: "⛈️" },
  66: { desc: "Chuva congelante fraca", icon: "🌧️" },
  67: { desc: "Chuva congelante", icon: "🌧️" },
  71: { desc: "Neve fraca", icon: "🌨️" },
  73: { desc: "Neve", icon: "🌨️" },
  75: { desc: "Neve forte", icon: "❄️" },
  77: { desc: "Cristais de gelo", icon: "❄️" },
  80: { desc: "Aguaceiros fracos", icon: "🌦️" },
  81: { desc: "Aguaceiros", icon: "🌦️" },
  82: { desc: "Aguaceiros fortes", icon: "⛈️" },
  85: { desc: "Aguaceiros de neve fracos", icon: "🌨️" },
  86: { desc: "Aguaceiros de neve", icon: "🌨️" },
  95: { desc: "Trovoadas", icon: "⛈️" },
  96: { desc: "Trovoadas com granizo", icon: "⛈️" },
  99: { desc: "Trovoadas fortes com granizo", icon: "⛈️" },
} as const;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Praia Grande - Ubatuba
    const latitude = -23.493;
    const longitude = -45.066;

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("timezone", "America/Sao_Paulo");
    url.searchParams.set(
      "daily",
      "weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
    );

    const r = await fetch(url.toString()); // cache 10 min
    if (!r.ok) throw new Error(`Open-Meteo ${r.status}`);
    const data = await r.json();

    const current = data?.current_weather ?? {};
    const daily = {
      dates: data?.daily?.time ?? [],
      code: data?.daily?.weathercode ?? [],
      tmax: data?.daily?.temperature_2m_max ?? [],
      tmin: data?.daily?.temperature_2m_min ?? [],
      rain: data?.daily?.precipitation_probability_max ?? [],
    };

    // Monta próximos 3 dias
    const days = daily.dates.slice(0, 3).map((d: string, i: number) => {
      const code = daily.code[i] ?? 0;
      const meta = WMO_CODE[code as WmoCode] ?? { desc: "—", icon: "⛅" };
      return {
        date: d,
        code,
        text: meta.desc,
        icon: meta.icon,
        tmax: Math.round(daily.tmax[i]),
        tmin: Math.round(daily.tmin[i]),
        rain: daily.rain[i] ?? null,
      };
    });

    const nowMeta = WMO_CODE[current.weathercode as WmoCode] ?? {
      desc: "—",
      icon: "⛅",
    };

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=300");
    res.status(200).json({
      location: "Praia Grande – Ubatuba, SP",
      current: {
        temp: Math.round(current.temperature ?? 0),
        wind: current.windspeed ?? null,
        code: current.weathercode ?? null,
        text: nowMeta.desc,
        icon: nowMeta.icon,
      },
      days,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Erro ao obter previsão" });
    }
  }
}
