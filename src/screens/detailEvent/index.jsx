import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import bannerprueba from "../../assets/images/detalle-evento-prueba.png";
import PaymentModal from "../../components/paymentModal";
import { fetchEventById } from "../../client/events";

const MONTHS_ES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

function formatDateLima(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  // Tomamos componentes en la zona horaria de Lima
  const fmt = new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).formatToParts(d);

  const day = fmt.find(p => p.type === "day")?.value?.padStart(2, "0") ?? "";
  const monthName = fmt.find(p => p.type === "month")?.value ?? "";
  const year = fmt.find(p => p.type === "year")?.value ?? "";

  // Capitalizar mes
  const mesCap = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  return `${day} de ${mesCap}, ${year}`;
}

function formatTimeLima(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  // 24h sin segundos, zona Lima
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

function isSameDayLima(aIso, bIso) {
  if (!aIso || !bIso) return false;
  const a = new Date(aIso);
  const b = new Date(bIso);

  const opt = { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" };
  const aStr = new Intl.DateTimeFormat("en-CA", opt).format(a); // yyyy-mm-dd
  const bStr = new Intl.DateTimeFormat("en-CA", opt).format(b);
  return aStr === bStr;
}

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ZONES_FAKE = [
  { id: "general", name: "General", price: 20 },
  { id: "vip", name: "VIP", price: 60 },
  { id: "platinum", name: "Platinum", price: 80 },
];


export default function DetailEvent() {

  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");


    // Datos de ejemplo para el evento
    const [ticketCount, setTicketCount] = useState(1);
    const [selectedZone, setSelectedZone] = useState("general");
    const [showPaymentModal, setShowPaymentModal] = useState(false);     

    const currentZone = ZONES_FAKE.find(z => z.id === selectedZone);
    const totalPrice = currentZone ? currentZone.price * ticketCount : eventData.price * ticketCount;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchEventById(id);
        if (!alive) return;

        // Armamos los campos solicitados
        const date = formatDateLima(data.start_datetime);

        let time = "";
        const start = formatTimeLima(data.start_datetime);
        const end = data.end_datetime ? formatTimeLima(data.end_datetime) : null;

        if (end && isSameDayLima(data.start_datetime, data.end_datetime)) {
          time = `${start} - ${end} hrs`;
        } else {
          time = `${start} hrs`;
        }

        setEventData({
          title: data.title,
          description: data.description,
          date,
          time,
          image_url: data.image_url ?? null,
          // si luego necesitas otros campos, los pasas aquí
        });
      } catch (e) {
        console.error(e);
        setErr("No se pudo cargar el evento.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) return <div className="pt-8"><Header/><p className="p-6">Cargando...</p><Footer/></div>;
  if (err) return <div className="pt-8"><Header/><p className="p-6 text-red-600">{err}</p><Footer/></div>;
  if (!eventData) return <div className="pt-8"><Header/><p className="p-6">Evento no encontrado.</p><Footer/></div>;

    const handleIncrement = () => {
        setTicketCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (ticketCount > 1) {
            setTicketCount(prev => prev - 1);
        }
    };

    const handleBuyTickets = () => {
        setShowPaymentModal(true);
    };

    const handleCloseModal = () => {
        setShowPaymentModal(false);
    };

     const eventoData = {

        zones: [
            { id: "general", name: "General", price: 450 },
            { id: "vip", name: "VIP", price: 800 },
            { id: "platinum", name: "Platinum", price: 1200 }
        ]
    };
    
    return (
        <div className="flex flex-col w-full min-h-screen gap-8 pt-8">
            <Header/>
            
            <div className="px-[5%] flex flex-col gap-8">
                {/* Banner del evento */}
                <img src={eventData.image_url} className="w-full rounded-xl h-[406px] object-cover shadow-lg" alt="Banner del evento"/>
                
                {/* Información principal */}
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Detalles del evento */}
                    <div className="flex-1">
                        <h1 className="mb-2 text-4xl text-gray-800 font-itcbold">{eventData.title}</h1>
                        <h2 className="mb-6 text-xl text-gray-600 font-itcmedium">{eventData.subtitle}</h2>
                        
                        <p className="mb-8 leading-relaxed text-gray-700 font-itcbook">{eventData.description}</p>
                        
                        {/* Información detallada */}
                        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <CalendarIcon />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-itcbook">Fecha</p>
                                    <p className="text-sm font-itcmedium">{eventData.date}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <ClockIcon />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-itcbook">Hora</p>
                                    <p className="text-sm font-itcmedium">{eventData.time}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <TicketIcon />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-itcbook">Precio</p>
                                    <p className="text-sm font-itcmedium">S/20.00 </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <MapPinIcon />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-itcbook">Ubicación</p>
                                    <p className="text-sm font-itcmedium">
                                        Lima, Perú
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Panel de compra */}
                    <div className="sticky p-6 bg-white shadow-lg lg:w-96 rounded-xl h-fit top-4">
                        <h3 className="mb-4 text-xl font-itcbold">Reserva tu lugar</h3>
                        
                        
                        <div className="mb-6">
                            <label className="block mb-2 text-gray-700 outline-none font-itcbook">Selecciona tu zona:</label>
                            <select 
                                className="w-full p-3 border rounded-lg outline-none"
                                value={selectedZone}
                                onCh
                                ange={(e) => setSelectedZone(e.target.value)}
                            >
                                {ZONES_FAKE.map(zone => (
                                    <option key={zone.id} className="font-itcbook" value={zone.id}>
                                        {zone.name} - S/.{zone.price}.00
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-gray-600 font-itcbook">Precio por persona:</span>
                            <span className="text-xl text-blue font-itcbold">
                                S/.{currentZone ? currentZone.price : eventData.price}.00
                            </span>
                        </div>
                        
                        <div className="mb-6 font-itcbook">
                            <label className="block mb-2 text-gray-700">Cantidad de boletos:</label>
                            <div className="flex items-center w-32 overflow-hidden border rounded-lg">
                                <button 
                                    className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200"
                                    onClick={handleDecrement}
                                >
                                    -
                                </button>
                                <div className="w-12 py-2 text-center">
                                    {ticketCount}
                                </div>
                                <button 
                                    className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200"
                                    onClick={handleIncrement}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6 text-lg font-itcbold">
                            <span>Total:</span>
                            <span className="text-xl text-green">S/.{totalPrice}.00</span>
                        </div>
                        
                        <button
                            onClick={handleBuyTickets}
                            className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-green font-itcbold hover:bg-green-600">
                            Comprar boletos
                        </button>
                        
                        <p className="mt-4 text-sm text-center text-gray-500 font-itcbook">
                            * Boletos limitados. Precios sujetos a cambio.
                        </p>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={handleCloseModal}
                totalPrice={totalPrice}
                eventName={eventData.title}
            />

            <Footer/>
        </div>
    );
}