import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-home.svg"

const UserIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
          stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = (props) => (
  <svg viewBox="0 0 32 32" width="20" height="20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
      <line x1="29" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24,25v3H8V4H24V7h2V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V29a1,1,0,0,0,1,1H25a1,1,0,0,0,1-1V25Z" fill="currentColor"/>
      <line x1="16" y1="16" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="16" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="8" x2="25" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="26" x2="25" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem("token")));

  // Mantener estado cuando cambie el token (p. ej. desde otras pantallas o pestañas)
  useEffect(() => {
    const onStorage = () => setIsAuth(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // También recalcular al montar por si cambió antes
  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem("token")));
  }, []);

  const goHome = useCallback(() => navigate("/inicio"), [navigate]);
  const goEvents = useCallback(() => navigate("/events"), [navigate]);
  const goLogin = useCallback(() => {
    setMenuOpen(false);
    navigate("/iniciar-sesión"); 
  }, [navigate]);

  const handleLogout = useCallback(() => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setMenuOpen(false);
    navigate("/iniciar-sesión"); 
  }, [navigate]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      const menu = document.getElementById("user-menu");
      const btn = document.getElementById("user-menu-btn");
      if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menuOpen]);
  
     return (
    <div className="flex items-center px-[5%] justify-center w-full py-3 bg-white">
      <div className="grid items-center w-full grid-cols-3 gap-3 px-4">
        {/* Izquierda: INICIO */}
        <button
          onClick={goHome}
          className="text-2xl text-left text-gray-600 cursor-pointer hover:text-gray-900 font-itcbold"
        >
          INICIO
        </button>

        {/* Centro: LOGO */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="h-28" />
        </div>

        {/* Derecha: NUESTROS EVENTOS + Menú usuario */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={goEvents}
            className="text-2xl text-gray-600 cursor-pointer hover:text-gray-900 font-itcbold"
          >
            NUESTROS EVENTOS
          </button>

          {/* Menú usuario */}
         <div className="relative">
            <button
              id="user-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-50"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              title={isAuth ? "Mi cuenta" : "Acceder"}
            >
              <UserIcon />
            </button>

            {menuOpen && (
              <div
                id="user-menu"
                className="absolute right-0 z-50 w-48 mt-2 overflow-hidden bg-white border rounded-md shadow-lg"
                role="menu"
              >
                {!isAuth ? (
                  <button
                    onClick={goLogin}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 font-itcbook"
                    role="menuitem"
                  >
                    <UserIcon />
                    <span>Iniciar sesión</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-itcbook"
                    role="menuitem"
                  >
                    <LogoutIcon />
                    <span>Cerrar sesión</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Header;