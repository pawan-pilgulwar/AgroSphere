"use client";
import React, { useEffect } from "react";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import { useState } from "react";
import Alerts from "@/components/Alert";

export default function Home() {

  // const [Alert, setAlert] = useState(null);

  // const showAlert = (type, message) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(()=>{
  //     setAlert(null);
  //   }, 1500);
  // }

  return (
    <>
        <Navbar />
        <Alerts />
        <Homepage />
        <Footer />
    </>
  );
}
