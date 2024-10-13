"use client";
import Link from "next/link";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useContext, useState, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { rdb } from "../../services/firebaseClient";
import { UserContext } from "../../store/user-context";
import { FeedbackContext } from "../../store/feedback-context";
import { MatchesContext } from "../../store/matches-context";
import { PlayerContext } from "../../store/player-context";
import BoardingPage from "../../components/pages/BoardingPage";
import ModalReport from "../../components/modals/ModalReport";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  XCircleIcon,
  CheckCircleIcon,
  Square2StackIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { getAge } from "../../utils/getAge";
import { getDistance } from "../../utils/getDistance";

export default function Feed() {
  const sendData = () => {
    alert("Sending: " + textInput);

    axios.post("https://bgnhack24dub-643.nw.r.appspot.com/user_itin", textInput)
          .then((response) => response.data)
          .then((data) => {
              console.log(data);
              let firstChoice = data[0];
            });
      
        
        //console.log(JSON.parse( "{ \"destinations\" : " + data + "}"));
  };
    
    

  

  const textStyle = {
    margin: 'auto'
  };
  const [textInput, setInput] = useState("");

  return (
    <>
      <Navbar page="Feed" />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
        <textarea style={textStyle} onChange={(ev)=>{setInput(ev.target.value)}}> Replace this with the user form </textarea>
        <button style={{border: '2px grey solid', borderRadius: '5px', padding: '5px', marginTop: '20px'}}
                onClick={sendData}> Press This </button>
        </div>
      <Footer />
    </>
  );
}

