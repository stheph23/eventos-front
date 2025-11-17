import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

export default function PaymentButton({ event }) {
  const [preferenceId, setPreferenceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Inicializa MercadoPago una sola vez
    initMercadoPago("APP_USR-6e45d740-f68f-45e5-9cc2-7024bec8303b", { locale: "es-PE" });
  }, []);

  const handleBuy = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/payments/create/", {
        title: event.title || "Entrada de evento",
        price: event.price || 1,
        quantity: event.quantity || 1,
      });

      console.log("Respuesta backend:", res.data);

      if (res.data && typeof res.data.id === "string") {
        setPreferenceId(res.data.id);
      } else {
        setError("El backend no devolvió un ID válido");
        console.error("Respuesta inválida:", res.data);
      }
    } catch (err) {
      console.error("Error al crear preferencia:", err);
      setError("No se pudo crear la preferencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!preferenceId ? (
        <button
          onClick={handleBuy}
          disabled={loading}
          className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-green font-itcbold hover:bg-green-600"
        >
          {loading ? "Generando pago..." : "Comprar con Mercado Pago"}
        </button>
      ) : (
        preferenceId && (
          <div className="mt-2">
            {/* ✅ Verificación doble */}
            <Wallet initialization={{ preferenceId: preferenceId }} />
          </div>
        )
      )}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
