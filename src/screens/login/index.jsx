import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { loginApi } from "../../client/login";
import {registerApi} from "../../client/register"
import ModalSuccess from "../../components/modalSuccess";
import ModalAlertWarning from "../../components/modalAlertWarning";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");

  const [showModalAlertWarning, setShowModalAlertWarning] = useState(false);
  const [warningText, setWarningText] = useState("");


  const closeSuccess = () => {
    setShowModalSuccess(false);
    // si es login, navega; si es registro, cambia a pestaña login
    if (isLogin) {
      navigate("/inicio");
    } else {
      setIsLogin(true); // volver a "Iniciar Sesión"
    }
  };

  const closeWarning = () => setShowModalAlertWarning(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (isLogin) {
        // LOGIN
        const { token, user } = await loginApi({ email, password });
        localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        setSuccessText("¡Inicio de sesión exitoso!");
        setShowModalSuccess(true);
      } else {
        // REGISTER
        if (!firstName.trim() || !lastName.trim()) {
          setWarningText("Por favor, ingresa nombre y apellido.");
          setShowModalAlertWarning(true);
          return;
        }

        await registerApi({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        });

        setSuccessText("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setShowModalSuccess(true);
        // No navegamos aún; al cerrar modal cambiamos a pestaña Login
      }
    } catch (err) {
      const backendMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        err?.message;

      setWarningText(backendMsg || "Ocurrió un error. Intenta nuevamente.");
      setShowModalAlertWarning(true);
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="flex flex-col w-full min-h-screen gap-8 pt-8">
            <Header/>

      <ModalSuccess
        showModalSuccess={showModalSuccess}
        closeModalSuccess={closeSuccess}
        fill="#2ecc71"
        text={successText}
      />
      <ModalAlertWarning
        showModalAlertWarning={showModalAlertWarning}
        closeModal={closeWarning}
        error={warningText}
      />
            
            <div className="px-[5%] flex flex-col items-center justify-center flex-grow py-8">
                <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
                    <div className="flex border-b">
                        <button
                            className={`flex-1 py-4 font-itcmedium text-center
                                 ${isLogin ? 'bg-green text-white' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => setIsLogin(true)}
                            type="button"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className={`flex-1 py-4 font-itcmedium text-center
                                ${!isLogin ? 'bg-green text-white' : 'bg-gray-100 text-gray-600'}`}
                            onClick={() => setIsLogin(false)}
                            type="button"
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
                                        type="email"
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
                                    disabled={loading}
                                    className="w-full px-4 py-3 text-white transition-colors rounded-md font-itcmedium bg-green hover:bg-green-600"
                                >
                                    {loading ? "Ingresando..." : "Ingresar"}
                                </button>
                            </>
                        ) : (
                            // Formulario de Registro
                            <>
                                <div className="mb-4">
                                <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                    Nombres <span className="text-red">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none"
                                    required
                                />
                                </div>

                                <div className="mb-4">
                                <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                    Apellidos <span className="text-red">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none"
                                    required
                                />
                                </div>
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
                                    {/** 
                                    <p className="mt-1 text-xs text-gray-500 font-itcbook">
                                        Se enviará un enlace a tu dirección de correo electrónico para establecer una nueva contraseña.
                                    </p>
                                    */}
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
                                    disabled={loading}
                                    className="w-full px-4 py-3 text-white transition-colors rounded-md font-itcmedium bg-green hover:bg-green-600"
                                >
                                    {loading ? "Registrando..." : "Registrarse"}
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