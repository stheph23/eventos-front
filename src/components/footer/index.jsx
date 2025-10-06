import { Link } from "react-router-dom"; 
import logo from "../../assets/images/logo-home.svg"
import ig from "../../assets/images/icon-ig.svg"
import fb from "../../assets/images/icon-fb.svg"

const Footer = () => {
    return(
    <div className="flex grid items-center w-full grid-cols-4 gap-3 p-4 justify-items-center bg-green">
        <img src={logo} className="rounded-full"/>
        
        <div className="flex items-center gap-2">
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
            className="text-2xl text-white cursor-pointer hover:underline font-itcmedium"
        >
            EVENTOS
        </Link>
        
        {/* Enlace a inicio usando Link */}
        <Link 
            to="/inicio" 
            className="text-2xl text-white cursor-pointer hover:underline font-itcmedium"
        >
            PÁGINA PRINCIPAL
        </Link>
    </div>
    )
};

export default Footer;