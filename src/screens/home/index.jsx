
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo-home.svg"
import CardEvent from "../../components/cardEvent";
import banner from "../../assets/images/banner-events.png"
import Footer from "../../components/footer";
import Header from "../../components/header";
export default function Home() {

    return(
    <div className="flex flex-col w-full gap-6 pt-8 ">
        <Header/>
        <img src={banner} className="w-full h-auto "/>

        <h1 className="pt-8 pb-8 text-4xl text-center font-itcbold">NUESTROS PRÓXIMOS EVENTOS</h1>
        <div className="flex items-center justify-center w-full gap-10 pb-12">
            <CardEvent/>
            <CardEvent/>
            <CardEvent/>
        </div>

        <Footer/>

    </div>
    );
}
