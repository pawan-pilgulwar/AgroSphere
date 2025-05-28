"use client";
import React, { useEffect } from "react";
import Homepage from "@/components/Homepage";
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
        <Alerts />
        <Homepage />
    </>
  );
}
