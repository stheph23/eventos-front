
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo-home.svg"
import CardEvent from "../../components/cardEvent";
import banner from "../../assets/images/banner-events.png"
import Footer from "../../components/footer";
import Header from "../../components/header";
import { fetchAllEvents } from "../../client/events";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

 useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchAllEvents();
        console.log("Eventos (ordenados):", list); // <- imprime lo que pintaremos
        if (alive) setEvents(list);
      } catch (e) {
        console.error(e);
        setErr("No se pudo cargar la lista de eventos.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

    return(
    <div className="flex flex-col w-full pt-8 gap-14 ">
        <Header/>
        <img src={banner} className="w-full h-auto "/>

        <h1 className="pt-3 pb-8 text-4xl text-center font-itcbold">EVENTOS</h1>

      {loading ? (
        <p className="text-center font-itcmedium">Cargando eventos...</p>
      ) : err ? (
        <p className="text-center text-red-600 font-itcmedium">{err}</p>
      ) : (
        <div className="grid items-center justify-center w-full grid-cols-3 gap-3 space-y-6 justify-items-center ">
          {events.map((ev) => (
            <CardEvent
              key={ev.id}
              id={ev.id}
              imageUrl={ev.image_url}
              title={ev.title}
              startDateTime={ev.start_datetime}  // <- nombre correcto de la prop
            />
          ))}
        </div>
      )}


        <Footer/>

    </div>
    );
}
