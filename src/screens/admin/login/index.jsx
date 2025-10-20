import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import ModalAlertWarning from "../../../components/modalAlertWarning";

export default function AdminLogin() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [warn, setWarn] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      localStorage.setItem("isAdmin", "true");
      nav("/admin/events");
    } else {
      setWarn("Credenciales de administrador inválidas.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex items-center justify-center flex-1 p-6">
        <form onSubmit={submit} className="w-full max-w-sm p-6 space-y-4 bg-white shadow rounded-xl">
          <h1 className="text-xl font-itcbold">Ingreso Administrador</h1>
          <div>
            <label className="block mb-1 text-sm font-itcbook">Usuario</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 border rounded font-itcbook"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-itcbook">Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-2 border rounded font-itcbook"
              placeholder="admin"
            />
          </div>
          <button className="w-full py-2 text-white rounded-md font-itcmedium bg-green">Entrar</button>
          {warn && (
            <ModalAlertWarning
              showModalAlertWarning={true}
              closeModal={() => setWarn("")}
              error={warn}
            />
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
