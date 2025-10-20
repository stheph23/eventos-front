import { Link } from "react-router-dom"; 
import logo from "../../assets/images/logo-home.svg"
import ig from "../../assets/images/icon-ig.svg"
import fb from "../../assets/images/icon-fb.svg"

const Footer = () => {
    return(
    <div className="flex flex-col items-center w-full gap-6 p-6 bg-green md:grid md:grid-cols-4 md:gap-3 md:justify-items-center min-h-[150px]">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
            <Link
                to="/inicio"
                className="flex items-center justify-center w-full h-full"
            >
                <img src={logo} 
                    alt="Un Día de Esperanza logo" 
                    className="rounded-full w-12 h12 object-contain"
                />
            </Link>
        </div>
        
        <div className="flex items-center gap-4">
            <a 
                href="https://www.instagram.com/undiadeesperanza/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform cursor-pointer hover:scale-110"
            >
                <img src={ig} alt="Instagram" className="w-8 h-8" />
            </a>
            <a 
                href="https://www.facebook.com/undiadesperanza/?locale=es_LA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform cursor-pointer hover:scale-110"
            >
                <img src={fb} alt="Facebook" className="w-8 h-8" />
            </a>
        </div> 
        
        <Link 
            to="/eventos" 
            className="text-lg text-white cursor-pointer hover:underline font-itcmedium md:text-2xl"
        >
            EVENTOS
        </Link>
        
        {/* Enlace a inicio usando Link */}
        <Link 
            to="/inicio" 
            className="text-lg text-white cursor-pointer hover:underline font-itcmedium md:text-2xl"
        >
            PÁGINA PRINCIPAL
        </Link>
    </div>
    )
};

export default Footer;