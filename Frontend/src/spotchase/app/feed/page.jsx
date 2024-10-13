"use client";
import { useContext, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import DestinationCards from "../../components/DestinationCards"; // Import your DestinationCards component
import DestinationModal from "../../components/DestinationModal"
export default function Feed() {
  
  const [isModal, setModal]  = useState(false);
  const [modalData, setModalData] = useState();
  const [modalStatus, setModalStatus] = useState(0);
  const handlePick = (data, isSimpleClick) => {
    if (isSimpleClick){
      // It's just a click, and data is probably not here yet, open model
      setModal(true);
    } else {
      setModalData(data);
      setModalStatus(1);
    }
  }
  const tripData1 = {
    imageUrl: '/Image_of_paris.jpg',
    destination: 'Paris',
    tripDescription: 'Explore the beauty of Paris with this exciting itinerary!',
    mostLiked: 'Eiffel Tower',
    leastLiked: 'Long museum queues',
    budget: 1200,
    splurgeStatus: 'Yes',
    choiceHandler: handlePick
  };

  const tripData2 = {
    imageUrl: "/Image_of_tokyo.jpg",
    destination: "Tokyo",
    tripDescription: "Discover the vibrant culture of Tokyo!",
    mostLiked: "Sushi",
    leastLiked: "Crowded subways",
    budget: "$1500",
    splurgeStatus: "No",
    choiceHandler: handlePick
  };

  const tripData3 = {
    imageUrl: "/spain-barcelona.jpg",
    destination: "Barcelona",
    tripDescription: "Visit the vibrant city of Barcelona!",
    mostLiked: "Sagrada Família",
    leastLiked: "Crowded beaches",
    budget: "$900",
    splurgeStatus: "No",
    choiceHandler: handlePick
  };

  const tripData4 = {
    imageUrl: "/image_of_new_york.jpeg",
    destination: "New York",
    tripDescription: "Explore the energy of New York City!",
    mostLiked: "Broadway",
    leastLiked: "Traffic",
    budget: "$2000",
    splurgeStatus: "Yes",
    choiceHandler: handlePick
  };

  const tripData5 = {
    imageUrl: "/image_of_rome.webp",
    destination: "Rome",
    tripDescription: "Dive into history in the eternal city of Rome!",
    mostLiked: "Colosseum",
    leastLiked: "Tourist crowds",
    budget: "$1100",
    splurgeStatus: "No",
    choiceHandler: handlePick
  };

  const tripData6 = {
    imageUrl: "/image_of_dubai.jpg",
    destination: "Dubai",
    tripDescription: "Discover the luxury of Dubai!",
    mostLiked: "Burj Khalifa",
    leastLiked: "Hot weather",
    budget: "$2500",
    splurgeStatus: "Yes",
    choiceHandler: handlePick
  };



  return (
    <>
      { isModal && <DestinationModal data={modalData} status={modalStatus} 
      close={(rating)=>{
        setModalStatus(0);
        setModal(false);
        console.log("Itinerary Has Been Rated")
      }}>
        </DestinationModal>}
      <Navbar page="Feed" />

      
      <div className="flex justify-center items-center my-10 space-x-6">        
        <DestinationCards {...tripData1} />
        <DestinationCards {...tripData2} />
        </div>
        <div className="flex justify-center items-center my-10 space-x-6">        
        <DestinationCards {...tripData3} />
        <DestinationCards {...tripData4} />
        </div>
        <div className="flex justify-center items-center my-10 space-x-6">        
        <DestinationCards {...tripData5} />
        <DestinationCards {...tripData6} />
        </div>

      <Footer />
    </>
  );
}

