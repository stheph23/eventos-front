import http from "..";

export type EventItem = {
  id: number;
  title: string;
  image_url?: string | null;
  start_datetime: string;  
  end_datetime?: string;
  status?: string;
  description?: string;
  is_published?: boolean;
  created_at?: string;      
  updated_at?: string;      
  organizer_id?: number;
  venue_id?: number;
  organizer_user?: number | null;
};


export async function createEvent(payload: EventItem) {
  const { data } = await http.post("events/", payload);
  return data;
}

export async function updateEvent(id: number | string, payload: Partial<EventItem>) {
  const { data } = await http.patch(`events/${id}/`, payload);
  return data;
}

export async function deleteEvent(id: number | string) {
  await http.delete(`events/${id}/`);
}

export async function fetchAllEvents(): Promise<EventItem[]> {
  const { data } = await http.get<EventItem[]>("events");
  console.log("API /events (raw):", data); // <- imprime todo lo que manda el endpoint
  // Ordenar por fecha de inicio ascendente (próximos primero)
  return [...data].sort(
    (a, b) =>
      new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
  );
}

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


export async function fetchEventById(id: number | string): Promise<EventItem> {
  // si tu router no usa slash final, cambia a: `events/${id}`
  const { data } = await http.get<EventItem>(`events/${id}/`);
  return data;
}

export async function uploadImage(file) {
  console.log("🚀 [DEBUG] Enviando imagen a Django:", file);

  const formData = new FormData();
  formData.append("file", file);
  try{
const res = await fetch("http://127.0.0.1:8000/api/uploads/image/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Fallo subiendo imagen:", text);
      throw new Error("Fallo subiendo imagen: " + text);
    }

    const data = await res.json();
    console.log("✅ [DEBUG] Respuesta del backend:", data);
    return data.url;
  } catch (error) {
    console.error("🔥 Error en uploadImage:", error);
    throw error;
  }
}
