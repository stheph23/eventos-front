import logo from "../../assets/images/logo-home.svg"
const Header = () => {
    return(
        <div className="flex items-center justify-center w-full">
            <div className="grid items-center justify-center grid-cols-3 gap-3">
                <p className="text-2xl text-center text-gray-500 cursor-pointer font-itcbold">INICIO</p>
                <div className="flex items-center justify-center">
                    <img src={logo} />
                </div>
                <p className="text-2xl text-gray-500 cursor-pointer font-itcbold">NUESTROS EVENTOS</p>
            </div>
        </div>
    )
};

export default Header;