import http from "..";

export type EventItem = {
  id: number;
  title: string;
  image_url?: string | null;
  start_datetime: string;   // ISO
  created_at?: string;      // ISO
};

export async function fetchLatestEvents(limit = 3): Promise<EventItem[]> {
  // Si tu endpoint es exactamente /api/events/ ajusta aquí si hace falta
  const { data } = await http.get<EventItem[]>("events");

  // Ordena por created_at (si existe) o por start_datetime y toma los últimos 3
  const sorted = [...data].sort((a, b) => {
    const aKey = new Date(a.created_at ?? a.start_datetime).getTime();
    const bKey = new Date(b.created_at ?? b.start_datetime).getTime();
    return bKey - aKey;
  });

  return sorted.slice(0, limit);
}
