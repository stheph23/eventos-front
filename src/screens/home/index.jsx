
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo-home.svg"
import CardEvent from "../../components/cardEvent";
import banner from "../../assets/images/banner-events.png"
import Footer from "../../components/footer";
import Header from "../../components/header";
import {fetchLatestEvents } from "../../client/events/index"

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchLatestEvents(3);
        if (alive) setEvents(list);
      } catch (e) {
        console.error("Error cargando eventos:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

    return(
    <div className="flex flex-col w-full h-full gap-6 pt-8 ">
        <Header/>
        <div className="w-full">
          <img src={banner} className="w-full h-auto "/>
        </div>

        <div className="px-[5%]">
          <h1 className="pt-8 pb-8 text-2xl text-center md:text-4xl font-itcbold">NUESTROS PRÓXIMOS EVENTOS</h1>
          <div className="flex items-center justify-center w-full gap-10 pb-12">
            {loading ? (
              <p className="text-center font-itcmedium">Cargando eventos...</p>
            ) : (
              <div className="flex flex-col items-center justify-center w-full gap-10 lg:flex-row">
                {events.map(ev => (
                  <CardEvent
                    key={ev.id}
                    id={ev.id}
                    imageUrl={ev.image_url}
                    title={ev.title}
                    startDateTime={ev.start_datetime}
                    price={ev.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer/>
    </div>
    );
}
