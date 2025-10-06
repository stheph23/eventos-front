import minImageBanner from "../../assets/images/example-banner.png"
import calendar from "../../assets/images/calendar.svg"
import { Link } from "react-router-dom"; 

const MONTHS_ES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);

  // Fuerza zona horaria de Lima para fecha y hora
  const zoned = new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Lima",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: true
    }).format(d)
  );

  const day = String(zoned.getDate()).padStart(2, "0");
  const month = MONTHS_ES[zoned.getMonth()];
  const time = new Intl.DateTimeFormat("es-PE", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Lima"
  }).format(d);

  // 👉 Sin guion entre día y mes. Si quieres, deja o quita el guion antes de la hora.
  return `${day} de ${month} - ${time}`;
}


const CardEvent = ({
    id,
    imageUrl,
    title,
    startDateTime
}) => {
    return(
        <div className="w-[283px] h-[300px] overflow-hidden flex flex-col gap-2 rounded-2xl drop-shadow-card bg-white">
            <Link to={`/detalle-evento/${id ?? ""}`}>
                <img 
                    src={imageUrl} 
                    className="w-[283px] h-[150px] object-cover] cursor-pointer"
                    alt={title}
                />
            </Link>
            <div className="flex flex-col justify-around h-full gap-2 p-2 px-6">
                <p className="text-lg text-left font-itcmedium">{title}</p>
                <div className="flex items-center gap-2">
                    <img src={calendar} className="w-5 h-5" alt="Calendario"/>
                    <p className="text-sm text-gray-500 font-itcmedium">
                        {formatDateTime(startDateTime)}
                    </p>
                </div>
                <div className="flex items-center justify-center gap-3 font-itcmedium">
                    <p className="text-gray-500">S/. 11.00</p>
                    <button className="p-1 px-2 text-white rounded-xl bg-blue">
                        COMPRAR
                    </button>

                </div>
                
            </div>

        </div>
    )
};

export default CardEvent;