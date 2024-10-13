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
import DestinationCards from "../../components/DestinationCards";  // Import your DestinationCards component
import {
  XCircleIcon,
  CheckCircleIcon,
  Square2StackIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { getAge } from "../../utils/getAge";
import { getDistance } from "../../utils/getDistance";

export default function Feed() {
  const { user, handleProfileDetails } = useContext(UserContext);
  const {
    potentialMatches,
    setPotentialMatches,
    musicMatch,
    newMatch,
    setMusicMatch,
    matchesFetching,
  } = useContext(MatchesContext);
  const [onBoarding, setOnBoarding] = useState(user?.onBoarding);
  const [step, setStep] = useState(1);
  const [realLocation, setRealLocation] = useState("");
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      if (!firstClick) {
        setFirstClick(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [firstClick]);

  useEffect(() => {
    if (user != null) {
      setOnBoarding(user.onBoarding);
    }
  }, [user]);

  useEffect(() => {
    const data = getSession();
  }, []);

  const tripData1 = {
    imageUrl: '/Image_of_paris.jpg',
    destination: 'Paris',
    tripDescription: 'Explore the beauty of Paris with this exciting itinerary!',
    mostLiked: 'Eiffel Tower',
    leastLiked: 'Long museum queues',
    budget: 1200,
    splurgeStatus: 'Yes',
  };

  const tripData2 = {
    imageUrl: "/Image_of_tokyo.jpg",
    destination: "Trip to Tokyo",
    tripDescription: "Discover the vibrant culture of Tokyo!",
    mostLiked: "Sushi",
    leastLiked: "Crowded subways",
    budget: "$1500",
    splurgeStatus: "No",
  };

  const tripData3 = {
    imageUrl: "/spain-barcelona.jpg",
    destination: "Barcelona",
    tripDescription: "Visit the vibrant city of Barcelona!",
    mostLiked: "Sagrada Família",
    leastLiked: "Crowded beaches",
    budget: "$900",
    splurgeStatus: "No",
  };

  const tripData4 = {
    imageUrl: "/image_of_new_york.jpeg",
    destination: "New York",
    tripDescription: "Explore the energy of New York City!",
    mostLiked: "Broadway",
    leastLiked: "Traffic",
    budget: "$2000",
    splurgeStatus: "Yes",
  };

  const tripData5 = {
    imageUrl: "/image_of_rome.webp",
    destination: "Rome",
    tripDescription: "Dive into history in the eternal city of Rome!",
    mostLiked: "Colosseum",
    leastLiked: "Tourist crowds",
    budget: "$1100",
    splurgeStatus: "No",
  };

  const tripData6 = {
    imageUrl: "/image_of_dubai.jpg",
    destination: "Dubai",
    tripDescription: "Discover the luxury of Dubai!",
    mostLiked: "Burj Khalifa",
    leastLiked: "Hot weather",
    budget: "$2500",
    splurgeStatus: "Yes",
  };

  return (
    <>
      <Navbar page="Feed" />

      {user != null && newMatch != null && (
        <NewMatch user={user} newMatch={newMatch} />
      )}

      {user != null && firstClick && musicMatch && (
        <MusicMatched
          user={musicMatch}
          actualUser={user}
          setMusicMatch={setMusicMatch}
        />
      )}

      {!onBoarding && user != null && (
        <BoardingPage
          user={user}
          step={step}
          setStep={setStep}
          realLocation={realLocation}
          setRealLocation={setRealLocation}
          handleProfileDetails={handleProfileDetails}
        />
      )}

      {user != null && onBoarding && !matchesFetching && (
        <FeedMain
          user={user}
          users={potentialMatches}
          setUsers={setPotentialMatches}
        />
      )}

      {/* Add DestinationCards component here */}
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

const FeedMain = (props) => {
  const { user, users, setUsers } = props;
  const [notification, setNotification] = useState(0);
  const name = user.name;
  const img = user.img;

  useEffect(() => {}, [users]);

  useEffect(() => {
    const notificationsRef = ref(rdb, `Notifications/${user.id}`);

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setNotification(data);
      }
    });
    return () => unsubscribe();
  }, [users]);

  return (
    <>
      <main className="bg-fill col-1 flex h-dvh items-center justify-center overflow-y-auto fold:overflow-auto  sm:overflow-x-hidden md:h-full lg:-overflow-x-hidden">
        <div className="-mt-10 md:mt-10">
          <nav className="mt-8 flex items-center justify-between px-5 text-blue-500 lg:hidden">
            <div className="mt-1 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-left text-4xl font-semibold text-transparent">
              SpotChase
            </div>
            <div className="flex items-center justify-center gap-1">
              <Link
                href={`profile/${user.id}`}
                className="inline-block cursor-pointer rounded-full bg-gradient-to-t from-blue-500 to-green-500 p-0.5 hover:scale-110"
              >
                <img
                  src={img}
                  alt={`${name} Photo`}
                  className="drop-shadow-xs rounded-full object-cover"
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>

              <Link className="relative hover:scale-110" href={`/chat`}>
                <div
                  className={`absolute ${notification <= 0 && "hidden"} bottom-5 left-5 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs font-bold text-white shadow-md`}
                >
                  {notification}
                </div>
                <img
                  src="./chat.png"
                  alt="Chat"
                  className="h-8 w-8 cursor-pointer  fold:hidden sm:block"
                />
              </Link>
              <Link href={`/settings`}>
                <img
                  src="./settings.png"
                  alt="Settings"
                  className="h-8 w-8 cursor-pointer hover:scale-110 fold:hidden sm:block"
                />
              </Link>
            </div>
          </nav>

          <nav className="mx-auto hidden items-center justify-between  text-blue-500  lg:flex lg:justify-center lg:gap-20">
            <div className="ml-5 mt-1 bg-gradient-to-t from-blue-500 to-green-500 bg-clip-text text-left text-4xl font-semibold text-transparent lg:text-6xl">
              SpotChase
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link
                href={`profile/${user.id}`}
                className="inline-block cursor-pointer rounded-full bg-gradient-to-t from-blue-500 to-green-500 p-0.5 hover:scale-110"
              >
                <img
                  src={img}
                  alt={`${name} Photo`}
                  className="drop-shadow-xs rounded-full object-cover"
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
              <Link href={`/chat`} className="relative hover:scale-110">
                <div
                  className={`absolute ${notification <= 0 && "hidden"} bottom-6 left-6 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs font-bold text-white shadow-md`}
                >
                  {notification}
                </div>
                <img
                  src="./chat.png"
                  alt="Chat"
                  className="h-10 w-10 cursor-pointer"
                />
              </Link>
              <Link href={`/settings`}>
                <img
                  src="./settings.png"
                  alt="Settings"
                  className="h-10 w-10 cursor-pointer hover:scale-110"
                />
              </Link>
            </div>
          </nav>
        </div>
      </main>
    </>
  );
};
