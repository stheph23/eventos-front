import minImageBanner from "../../assets/images/example-banner.png"
import calendar from "../../assets/images/calendar.svg"
import { Link } from "react-router-dom"; 
const CardEvent = () => {
    return(
        <div className="w-[283px] h-[300px] overflow-hidden flex flex-col gap-2 rounded-2xl drop-shadow-card bg-white">
            <Link to="/detalle-evento">
                <img 
                    src={minImageBanner} 
                    className="w-[283px] cursor-pointer"
                    alt="Event banner"
                />
            </Link>
            <div className="flex flex-col justify-around h-full gap-2 p-2 px-6">
                <p className="text-lg text-left font-itcmedium ">Título</p>
                <div className="flex items-center gap-2">
                    <img src={calendar} className="w-5 h-5" />
                    <p className="text-sm text-gray-500 font-itcmedium">11 de Mayo - 2 pm</p>
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