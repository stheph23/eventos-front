
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo-home.svg"
import CardEvent from "../../components/cardEvent";
import banner from "../../assets/images/banner-events.png"
import Footer from "../../components/footer";
import Header from "../../components/header";
export default function Events() {

    return(
    <div className="flex flex-col w-full pt-8 gap-14 ">
        <Header/>
        <img src={banner} className="w-full h-auto "/>

        <h1 className="pt-3 pb-8 text-4xl text-center font-itcbold">EVENTOS</h1>
        <div className="grid items-center justify-center w-full grid-cols-3 gap-3 space-y-6 justify-items-center ">
            <CardEvent/>
            <CardEvent/>
            <CardEvent/>

            <CardEvent/>
            <CardEvent/>
            <CardEvent/>
            <CardEvent/>
            <CardEvent/>
            <CardEvent/>
        </div>

        <Footer/>

    </div>
    );
}
