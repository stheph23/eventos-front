import React, { useEffect, useMemo, useState } from "react";
import Footer from "../../../../components/footer";
import Header from "../../../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById, createEvent, updateEvent } from "../../../../client/events";

function toISO(dateStr, timeStr) {
  // Espera "YYYY-MM-DD" y "HH:MM"
  if (!dateStr || !timeStr) return "";
  return `${dateStr}T${timeStr}:00Z`; // simplificado: UTC
}

function fromISO(iso) {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);
  const date = d.toISOString().slice(0, 10);
  const time = d.toISOString().slice(11, 16);
  return { date, time };
}
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/"}uploads/image/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Fallo subiendo imagen: ${txt}`);
  }
  const data = await res.json();
  return data.url; // backend responde { url: "http://.../media/events/uuid_nombre.jpg" }
}

export default function AdminEventEditor() {
  const nav = useNavigate();
  const { id } = useParams(); 
  const isCreate = id === "new";
const [file, setFile] = useState(null);
const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(!isCreate);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    image_url: "",
    title: "",
    description: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
  });

  useEffect(() => {
    if (isCreate) return;
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchEventById(id);
        const s = fromISO(data.start_datetime);
        const e = fromISO(data.end_datetime);
        if (!alive) return;
        setForm({
          image_url: data.image_url || "",
          title: data.title || "",
          description: data.description || "",
          start_date: s.date,
          start_time: s.time,
          end_date: e.date,
          end_time: e.time,
        });
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { /* cleanup */ };
  }, [id, isCreate]);

const onFileChange = (e) => {
  const f = e.target.files?.[0] || null;
  setFile(f);
  setPreview(f ? URL.createObjectURL(f) : "");
};


  const canSave = useMemo(() => {
    return form.title.trim() && form.start_date && form.start_time;
  }, [form]);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onCancel = () => nav("/admin/events");

  const onSave = async () => {
    if (!canSave) return;
    setSaving(true);

    let imageUrlToSend = form.image_url?.trim() || "";

    if (file) {
      // 1) subimos archivo al backend → obtenemos URL
      imageUrlToSend = await uploadImage(file);
    }

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description || "",
        image_url: imageUrlToSend || null,
        start_datetime: toISO(form.start_date, form.start_time),
        end_datetime: form.end_date && form.end_time ? toISO(form.end_date, form.end_time) : null,
        status: "active",
        is_published: true,
      };
      if (isCreate) {
        await createEvent(payload);
      } else {
        await updateEvent(id, payload);
      }
      nav("/admin/events");
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar. Revisa consola.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="p-6">Cargando...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full max-w-3xl p-6 mx-auto space-y-6">
        <h1 className="text-2xl font-itcbold">{isCreate ? "Crear evento" : "Editar evento"}</h1>

        <div className="grid grid-cols-1 gap-6 font-itcbook md:grid-cols-2">
          <div className="space-y-3">
<label className="block text-sm">Imagen (subir archivo)</label>
<input type="file" accept="image/*" onChange={onFileChange} className="w-full p-2 border rounded" />

<label className="block mt-2 text-sm">…o pegar URL pública</label>
<input
  value={form.image_url}
  onChange={onChange("image_url")}
  className="w-full p-2 border rounded"
  placeholder="https://..."
/>

{(preview || form.image_url) && (
  <div className="mt-2">
    <p className="text-sm text-gray-500">Vista previa:</p>
    <img
      src={preview || form.image_url}
      alt="preview"
      className="object-cover w-full max-w-xl shadow rounded-xl"
    />
  </div>
)}


            <label className="block text-sm">Título</label>
            <input
              value={form.title}
              onChange={onChange("title")}
              className="w-full p-2 border rounded"
              placeholder="Nombre del evento"
            />

            <label className="block text-sm">Descripción</label>
            <textarea
              value={form.description}
              onChange={onChange("description")}
              className="w-full p-2 border rounded h-28"
              placeholder="Describe el evento..."
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm">Fecha de inicio</label>
            <input type="date" value={form.start_date} onChange={onChange("start_date")} className="w-full p-2 border rounded" />
            <label className="block text-sm">Hora de inicio</label>
            <input type="time" value={form.start_time} onChange={onChange("start_time")} className="w-full p-2 border rounded" />

            <label className="block mt-2 text-sm">Fecha de fin</label>
            <input type="date" value={form.end_date} onChange={onChange("end_date")} className="w-full p-2 border rounded" />
            <label className="block text-sm">Hora de fin</label>
            <input type="time" value={form.end_time} onChange={onChange("end_time")} className="w-full p-2 border rounded" />
          </div>
        </div>



        <div className="flex gap-3">
          <button
            onClick={onSave}
            disabled={!canSave || saving}
            className="px-4 py-2 text-white rounded font-itcmedium bg-green disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button onClick={onCancel} className="px-4 py-2 border rounded font-itcmedium">
            Cancelar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
