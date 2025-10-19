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
 const [dni, setDni] = useState("");

  const [loading, setLoading] = useState(false);

 const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");

  const [showModalAlertWarning, setShowModalAlertWarning] = useState(false);
  const [warningText, setWarningText] = useState("");
const [lastIsAdmin, setLastIsAdmin] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);
const [confirmPassword, setConfirmPassword] = useState("");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const isStrongPassword = (value) => {
  if (!value) return false;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;
  return regex.test(value.trim());
};

  const closeSuccess = () => {
    setShowModalSuccess(false);
    if (isLogin) {
        navigate(lastIsAdmin ? "/admin/events" : "/inicio");
    } else {
      setIsLogin(true); 
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
        setLastIsAdmin(Boolean(user?.is_admin));

        setSuccessText("¡Inicio de sesión exitoso!");
        setShowModalSuccess(true);
      } else {
  // REGISTER
  const requiredRegisterFields = [
    { key: "firstName", label: "Nombre", value: firstName },
    { key: "lastName",  label: "Apellido", value: lastName },
    { key: "email",     label: "Correo", value: email },
    { key: "password",  label: "Contraseña", value: password },
    { key: "dni",       label: "DNI", value: dni },

  ];

  const missing = requiredRegisterFields
    .filter(f => !f.value || !String(f.value).trim())
    .map(f => f.label);

  if (missing.length) {
    setWarningText(`Completa: ${missing.join(", ")}.`);
    setShowModalAlertWarning(true);
    return;
  }

  if (!isValidEmail(email)) {
    setWarningText("Ingresa un correo válido (ej. usuario@dominio.com).");
    setShowModalAlertWarning(true);
    return;
  }

if (!isStrongPassword(password)) {
  setWarningText(
    "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial."
  );
  setShowModalAlertWarning(true);
  return;
}

if (password !== confirmPassword) {
  setWarningText("Las contraseñas no coinciden.");
  setShowModalAlertWarning(true);
  return;
}

      if (dni.length !== 8) {
        setWarningText("El DNI debe tener exactamente 8 dígitos.");
        setShowModalAlertWarning(true);
        return;
      }

  await registerApi({
    email: email.trim(),
    password,
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    dni: dni.trim(),
  });

        setSuccessText("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setShowModalSuccess(true);
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
                                        placeholder="Ingrese su correo electrónico"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none font-itcbook focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="mb-4 ">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                        Contraseña <span className="text-red">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            placeholder="Ingrese su contraseña"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md font-itcbook focus:outline-none "
                                            required
                                        />
                                        <span
                                            className="absolute inset-y-0 flex items-center cursor-pointer right-4"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                d="M8.99994 11.7474C7.48358 11.7474 6.25244 10.5163 6.25244 8.99994C6.25244 7.48358 7.48358 6.25244 8.99994 6.25244C10.5163 6.25244 11.7474 7.48358 11.7474 8.99994C11.7474 10.5163 10.5163 11.7474 8.99994 11.7474Z"
                                                stroke="#6B7280"
                                                />
                                                <path
                                                d="M2.10894 10.981L2.10823 10.9799C1.77368 10.4591 1.59131 9.74477 1.59131 9.00292C1.59131 8.26141 1.77354 7.54474 2.10869 7.01963C3.87716 4.26251 6.39653 2.73511 9.00006 2.73511C11.6038 2.73511 14.1229 4.26268 15.8837 7.01926L15.8844 7.02036C16.2189 7.54111 16.4013 8.25545 16.4013 8.9973C16.4013 9.73901 16.219 10.4559 15.8836 10.981C14.1229 13.7376 11.6038 15.2651 9.00006 15.2651C6.38861 15.2651 3.86953 13.7373 2.10894 10.981Z"
                                                stroke="#6B7280"
                                                />
                                            </svg>
                                            ) : (
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                d="M2.25 7.5C2.89431 8.28073 3.65286 8.95964 4.5 9.51375M4.5 9.51375C5.41237 10.109 6.43096 10.5228 7.5 10.7325C8.49094 10.9229 9.50906 10.9229 10.5 10.7325C11.569 10.5228 12.5876 10.109 13.5 9.51375M4.5 9.51375L3.375 10.875M15.75 7.5C15.1057 8.28073 14.3471 8.95964 13.5 9.51375M13.5 9.51375L14.625 10.875M7.5 10.7318L7.125 12.375M10.5 10.7318L10.875 12.375"
                                                stroke="#6B7280"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                />
                                            </svg>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/**
                                <div className="flex items-center justify-between mb-6">
                                    <a href="#" className="text-sm text-blue-600 font-itcbook hover:underline">
                                        ¿Olvidaste la contraseña?
                                    </a>
                                </div>
 */}
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
                                    placeholder="Escriba sus nombres"
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
                                    placeholder="Escriba sus apellidos"
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none"
                                    required
                                />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                    DNI <span className="text-red">*</span>
                                    </label>
                                    <input
                                    type="text"
                                    value={dni}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,8}$/.test(value)) setDni(value);
                                    }}
                                    maxLength={8}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none "
                                    placeholder="8 dígitos"
                                    required
                                    />
                                    {dni.length > 0 && dni.length < 8 && (
                                    <p className="mt-1 text-xs text-red-500 font-itcbook">
                                        El DNI debe tener 8 dígitos.
                                    </p>
                                    )}
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                        Dirección de correo electrónico <span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="Escriba su correo electrónico"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none "
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
                                    <div className="relative">                                    
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            placeholder="Escriba una contraseña"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md font-itcbook focus:outline-none"
                                            required
                                        />

                                        <span
                                            className="absolute inset-y-0 flex items-center cursor-pointer right-4"
                                            onClick={togglePasswordVisibility}
                                            >
                                            {showPassword ? (
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.99994 11.7474C7.48358 11.7474 6.25244 10.5163 6.25244 8.99994C6.25244 7.48358 7.48358 6.25244 8.99994 6.25244C10.5163 6.25244 11.7474 7.48358 11.7474 8.99994C11.7474 10.5163 10.5163 11.7474 8.99994 11.7474Z" stroke="#6B7280"/>
                                                <path d="M2.10894 10.981L2.10823 10.9799C1.77368 10.4591 1.59131 9.74477 1.59131 9.00292C1.59131 8.26141 1.77354 7.54474 2.10869 7.01963C3.87716 4.26251 6.39653 2.73511 9.00006 2.73511C11.6038 2.73511 14.1229 4.26268 15.8837 7.01926L15.8844 7.02036C16.2189 7.54111 16.4013 8.25545 16.4013 8.9973C16.4013 9.73901 16.219 10.4559 15.8836 10.981C14.1229 13.7376 11.6038 15.2651 9.00006 15.2651C6.38861 15.2651 3.86953 13.7373 2.10894 10.981Z" stroke="#6B7280"/>
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.25 7.5C2.89431 8.28073 3.65286 8.95964 4.5 9.51375M4.5 9.51375C5.41237 10.109 6.43096 10.5228 7.5 10.7325C8.49094 10.9229 9.50906 10.9229 10.5 10.7325C11.569 10.5228 12.5876 10.109 13.5 9.51375M4.5 9.51375L3.375 10.875M15.75 7.5C15.1057 8.28073 14.3471 8.95964 13.5 9.51375M13.5 9.51375L14.625 10.875M7.5 10.7318L7.125 12.375M10.5 10.7318L10.875 12.375" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 ">
                                    <label className="block mb-2 text-sm text-gray-700 font-itcmedium">
                                    Confirmar contraseña <span className="text-red">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        placeholder="Repita su contraseña"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md font-itcbook focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        />
                                        <span
                                        className="absolute inset-y-0 flex items-center cursor-pointer right-4"
                                        onClick={toggleConfirmPasswordVisibility}
                                        >
                                        {showConfirmPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99994 11.7474C7.48358 11.7474 6.25244 10.5163 6.25244 8.99994C6.25244 7.48358 7.48358 6.25244 8.99994 6.25244C10.5163 6.25244 11.7474 7.48358 11.7474 8.99994C11.7474 10.5163 10.5163 11.7474 8.99994 11.7474Z" stroke="#6B7280"/>
                                            <path d="M2.10894 10.981L2.10823 10.9799C1.77368 10.4591 1.59131 9.74477 1.59131 9.00292C1.59131 8.26141 1.77354 7.54474 2.10869 7.01963C3.87716 4.26251 6.39653 2.73511 9.00006 2.73511C11.6038 2.73511 14.1229 4.26268 15.8837 7.01926L15.8844 7.02036C16.2189 7.54111 16.4013 8.25545 16.4013 8.9973C16.4013 9.73901 16.219 10.4559 15.8836 10.981C14.1229 13.7376 11.6038 15.2651 9.00006 15.2651C6.38861 15.2651 3.86953 13.7373 2.10894 10.981Z" stroke="#6B7280"/>
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.25 7.5C2.89431 8.28073 3.65286 8.95964 4.5 9.51375M4.5 9.51375C5.41237 10.109 6.43096 10.5228 7.5 10.7325C8.49094 10.9229 9.50906 10.9229 10.5 10.7325C11.569 10.5228 12.5876 10.109 13.5 9.51375M4.5 9.51375L3.375 10.875M15.75 7.5C15.1057 8.28073 14.3471 8.95964 13.5 9.51375M13.5 9.51375L14.625 10.875M7.5 10.7318L7.125 12.375M10.5 10.7318L10.875 12.375" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                        </span>
                                    </div>
                                    {confirmPassword && confirmPassword !== password && (
                                    <p className="mt-1 text-xs text-red-500 font-itcbook">
                                        Las contraseñas no coinciden.
                                    </p>
                                    )}
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