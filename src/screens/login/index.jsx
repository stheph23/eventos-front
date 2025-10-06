import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [userType, setUserType] = useState("client");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email,
            password,
            rememberMe,
            userType: isLogin ? null : userType
        });

        if (isLogin) {
            navigate("/inicio");
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen gap-8 pt-8">
            <Header/>
            
            <div className="px-[5%] flex flex-col items-center justify-center flex-grow py-8">
                <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
                    <div className="flex border-b">
                        <button
                            className={`flex-1 py-4 font-itcmedium text-center ${isLogin ? 'bg-green text-white' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className={`flex-1 py-4 font-itcmedium text-center ${!isLogin ? 'bg-green text-white' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Registrarse
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {isLogin ? (
                            // Formulario de Login
                            <>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                        Correo electrónico <span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none font-itcbook focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                        Contraseña <span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between mb-6">

                                    <a href="#" className="text-sm text-blue-600 font-itcbook hover:underline">
                                        ¿Olvidaste la contraseña?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 text-white transition-colors rounded-md font-itcmedium bg-green hover:bg-green-600"
                                >
                                    Ingresar
                                </button>
                            </>
                        ) : (
                            // Formulario de Registro
                            <>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                        Dirección de correo electrónico <span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500 font-itcbook">
                                        Se enviará un enlace a tu dirección de correo electrónico para establecer una nueva contraseña.
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                        Contraseña <span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 text-white transition-colors rounded-md font-itcmedium bg-green hover:bg-green-600"
                                >
                                    Registrarse
                                </button>
                            </>
                        )}
                    </form>


                </div>
            </div>

            <Footer/>
        </div>
    );
}