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

  // if there is a music match, show the music match modal after the first click
  useEffect(() => {
    const handleClick = () => {
      if (!firstClick) {
        setFirstClick(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [firstClick]);

  // check for onboarding status
  useEffect(() => {
    if (user != null) {
      setOnBoarding(user.onBoarding);
    }
  }, [user]);

  // used to update the auth and cause it to re-render and check the token
  useEffect(() => {
    const data = getSession();
  }, []);

  return (
    <>
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
    </>
  );
}

const FeedMain = (props) => {
  const { user, users, setUsers } = props;
  const [notification, setNotification] = useState(0);
  const name = user.name;
  const img = user.img;

  useEffect(() => {}, [users]);

  // Fetch notifications
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
      {users.length != 0 ? (
        <main className="bg-fill col-1 flex h-dvh items-center justify-center overflow-y-auto fold:overflow-auto  sm:overflow-x-hidden md:h-full lg:-overflow-x-hidden">
          <div className="-mt-10 md:mt-10">
            <nav className="mt-8 flex items-center justify-between px-5 text-peach lg:hidden">
              <div className="mt-1 bg-gradient-to-r from-peach to-peach-dark bg-clip-text text-left text-4xl font-semibold text-transparent">
                SpotLove
              </div>
              <div className="flex items-center justify-center gap-1">
                {/* Icons on the right */}
                <Link
                  href={`profile/${user.id}`}
                  className="inline-block cursor-pointer rounded-full bg-gradient-to-t from-peach to-peach-dark p-0.5 hover:scale-110"
                >
                  <img
                    src={img}
                    alt={`${name} Photo`}
                    className="drop-shadow-xs rounded-full object-cover"
                    style={{ width: "30px", height: "30px" }} // Use inline styles for width and height
                  />
                </Link>

                <Link className="relative hover:scale-110" href={`/chat`}>
                  <div
                    className={`absolute ${notification <= 0 && "hidden"} bottom-5 left-5 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-peach text-xs font-bold text-white shadow-md`}
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

            <nav className="mx-auto hidden items-center justify-between  text-peach  lg:flex lg:justify-center lg:gap-20">
              <div className="ml-5 mt-1 bg-gradient-to-t from-peach to-peach-dark bg-clip-text text-left text-4xl font-semibold text-transparent lg:text-6xl">
                SpotLove
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  href={`profile/${user.id}`}
                  className="inline-block cursor-pointer rounded-full bg-gradient-to-t from-peach to-peach-dark p-0.5 hover:scale-110"
                >
                  <img
                    src={img}
                    alt={`${name} Photo`}
                    className="drop-shadow-xs rounded-full object-cover"
                    style={{ width: "40px", height: "40px" }} // Use inline styles for width and height
                  />
                </Link>
                <Link href={`/chat`} className="relative hover:scale-110">
                  <div
                    className={`absolute ${notification <= 0 && "hidden"} bottom-6 left-6 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-peach text-xs font-bold text-white shadow-md`}
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

            {users && (
              <UserProfiles users={users} user={user} setUsers={setUsers} />
            )}
          </div>
        </main>
      ) : (
        <main className="flex h-dvh items-center justify-center">
          <div className="-mt-10 md:mt-10">
            <nav className="fixed left-0 right-0 top-0 mt-8  flex items-center justify-between px-5 text-peach lg:hidden">
              <div className="mt-1 bg-gradient-to-r from-peach to-peach-dark bg-clip-text text-left text-4xl font-semibold text-transparent">
                SpotLove
              </div>
              <div className="flex items-center justify-center gap-1">
                {/* Icons on the right */}
                <Link
                  href={`profile/${user.id}`}
                  className="inline-block cursor-pointer rounded-full bg-gradient-to-t from-peach to-peach-dark p-0.5 hover:scale-110"
                >
                  <img
                    src={img}
                    alt={`${name} Photo`}
                    className="drop-shadow-xs rounded-full object-cover"
                    style={{ width: "30px", height: "30px" }} // Use inline styles for width and height
                  />
                </Link>

                <Link className="relative hover:scale-110" href={`/chat`}>
                  <div
                    className={`absolute ${notification <= 0 && "hidden"} bottom-5 left-5 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-peach text-xs font-bold text-white shadow-md`}
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

            <nav className="fixed left-0 right-0 top-0 mx-auto mt-10 hidden items-center justify-between  text-peach  lg:flex lg:justify-center lg:gap-20">
              <div className="ml-5 mt-1 bg-gradient-to-t from-peach to-peach-dark bg-clip-text text-left text-4xl font-semibold text-transparent lg:text-6xl">
                SpotLove
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  href={`profile/${user.id}`}
                  className="inline-block cursor-pointer rounded-full bg-gradient-to-t from-peach to-peach-dark p-0.5 hover:scale-110"
                >
                  <img
                    src={img}
                    alt={`${name} Photo`}
                    className="drop-shadow-xs rounded-full object-cover"
                    style={{ width: "40px", height: "40px" }} // Use inline styles for width and height
                  />
                </Link>
                <Link href={`/chat`} className="relative hover:scale-110">
                  <div
                    className={`absolute ${notification <= 0 && "hidden"} bottom-6 left-6 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-peach text-xs font-bold text-white shadow-md`}
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

            <div className="flex items-center px-5">
              <h2 className="mt-1 bg-gradient-to-r from-peach to-peach-dark bg-clip-text pt-10 text-center text-4xl font-semibold text-transparent">
                No more matches for now, check back later
                <span className=" ml-2 text-white">👋</span>
              </h2>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

const UserProfiles = ({ users, user, setUsers }) => {
  const { setNewMatch, setMatchesFetching } = useContext(MatchesContext);
  const currentUser = users[0];
  const handleLike = async () => {
    const data = await axios
      .post(`/api/action/user/like/${currentUser.id}`)
      .then((res) => {
        return res.data;
      });
    if (data.match) {
      currentUser.matchId = data.matchId;
      setNewMatch(currentUser);
      console.log(data);
      setMatchesFetching(true);
    }
    setMatchesFetching(true);
  };
  const handleDislike = async () => {
    await axios.post(`/api/action/user/dislike/${currentUser.id}`);
    console.log("Disliked");
    setMatchesFetching(true);
  };

  const handleRefresh = () => {
    console.log("Refreshed");
    const newUsers = [...users];
    const shuffled = newUsers.sort(() => 0.5 - Math.random());
    setUsers(shuffled);
  };

  return (
    <>
      <main className="flex h-full flex-col  items-center justify-center overflow-x-hidden text-white">
        {currentUser != null && (
          <UserProfile user={currentUser} actualUser={user} blurred={true} />
        )}
      </main>
      <ControlBar
        handleDislike={handleDislike}
        handleLike={handleLike}
        handleRefresh={handleRefresh}
      />
    </>
  );
};

const MusicMatched = ({ user, actualUser, setMusicMatch }) => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const audioRef = useRef(null);

  // Show the music match animation and play the track they matched on

  const commonTracks = user.TopTracks.filter((track) => {
    return actualUser.TopTracks.some((userTrack) => {
      return userTrack.id === track.id;
    });
  });

  const commonTrack = commonTracks[0];

  useEffect(() => {
    if (!audioRef.current && user.TopTracks.length > 0) {
      const commonTracks = user.TopTracks.filter((track) => {
        return actualUser.TopTracks.some((userTrack) => {
          return userTrack.id === track.id;
        });
      });
      const commonTrack = commonTracks.length > 0 ? commonTracks[0] : null;
      if (commonTrack && commonTrack.preview_url) {
        audioRef.current = new Audio(commonTrack.preview_url);
        audioRef.current.loop = true;
        audioRef.current.play().catch((error) => {
          console.error("Playback failed", error);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [user, actualUser]);

  // once the user has clicked on the modal, stop the music and end the animation
  useEffect(() => {
    if (animationIndex === 2 && audioRef.current) {
      audioRef.current.pause();
      setMusicMatch(null);
    }
  }, [animationIndex]);

  const handleClick = () => {
    setAnimationIndex(animationIndex + 1);
  };

  const handleSongClick = () => {
    setMusicMatch(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const url = commonTrack.external_urls.spotify;
    window.open(url, "_blank");
  };
  return (
    <>
      {animationIndex === 0 && (
        <motion.div
          onClick={handleClick}
          className="flex-col-1 overflow-none fixed bottom-0 left-0  right-0 top-0 z-50 flex h-dvh items-center justify-center  bg-[url('/waves.svg')] text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex-col items-center justify-center p-10 drop-shadow-md"
          >
            <div className="flex items-center justify-center pb-4">
              <img
                src="/SpotLoveLogo_White.png"
                alt="Music Icon"
                height={200}
                width={200}
                className="justify-center text-center"
              />
            </div>
            <h2 className="text-center text-3xl font-black text-white md:text-6xl">
              MUSIC MATCH !
            </h2>
            <div
              onClick={handleSongClick}
              key={commonTrack.id}
              className="flex cursor-pointer items-center gap-2 pt-2 hover:underline"
            >
              {" "}
              {/* Use Tailwind classes to set the size */}
              <img
                src={commonTrack.album.images[0].url}
                alt={commonTrack.name}
                className=""
                height={600}
                width={600}
              />
            </div>

            <div className="pt-3 text-center ">
              <p className="text-xl font-semibold ">{commonTrack.name}</p>
              <p className="text-xl ">{commonTrack.album.artists[0].name}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {animationIndex === 1 && (
        <div
          onClick={handleClick}
          className="flex-col-1 overflow-none fixed bottom-0 left-0  right-0 top-0 z-50 flex h-dvh items-center justify-center  bg-[url('/waves.svg')] text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <h2 className="text-center text-2xl font-black text-white md:text-4xl">
              Your new melody mate !
            </h2>
            <Link href={`profile/${user.id}`}>
              <UserProfile
                user={user}
                actualUser={actualUser}
                blurred={false}
              />
            </Link>
            <Link
              href={`chat/${user.id}`}
              className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-white  px-5 py-2 text-center font-semibold hover:scale-105"
            >
              <span className="mx-auto text-peach">
                <div>Say hi to {user.name} 👋</div>
              </span>
            </Link>
          </motion.div>
        </div>
      )}
    </>
  );
};

const NewMatch = ({ user, newMatch }) => {
  // New Match animation, play music and show the new match

  const { setNewMatch } = useContext(MatchesContext);
  const { setAlert } = useContext(FeedbackContext);
  const router = useRouter();
  const audioRef = useRef(null);
  const handleClick = () => {
    setNewMatch(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAlert({
      active: true,
      type: "success",
      message: "View your new match in the chat section",
    });
  };

  const track = user.TopTracks[0];
  useEffect(() => {
    if (!audioRef.current && user.TopTracks.length > 0) {
      if (track && track.preview_url) {
        audioRef.current = new Audio(track.preview_url);
        audioRef.current.play().catch((error) => {
          console.error("Playback failed", error);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [user]);

  // User can go to the chat section to talk to their new match
  const handleChat = () => {
    audioRef.current.pause();
    router.push(`/chat?userId=${newMatch.id}`);
    setNewMatch(null);
  };

  return (
    <div
      onClick={handleClick}
      className="overflow-none fixed bottom-0 left-0 right-0  top-0 z-50 flex h-dvh flex-col items-center justify-center  bg-[url('/waves.svg')] text-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col items-center justify-center"
      >
        <h2 className="text-center text-2xl font-black text-white md:text-4xl">
          Your new match !
        </h2>
        <div onClick={() => router.push(`/profile/${newMatch.id}`)}>
          <UserProfile user={newMatch} actualUser={user} blurred={false} />
        </div>
        <div
          onClick={handleChat}
          className="mt-5 flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white   py-2 text-center font-semibold hover:scale-105"
        >
          <span className=" justify-center  bg-gradient-to-t from-peach to-peach-dark bg-clip-text text-transparent">
            <p>Chat with {newMatch.name}</p>
          </span>
          <p>👋</p>
        </div>
      </motion.div>
    </div>
  );
};
const UserProfile = ({ user, actualUser, blurred }) => {
  const { setAlert } = useContext(FeedbackContext);
  const { setUserFetching } = useContext(UserContext);
  const { setTrack, setIsChanging } = useContext(PlayerContext);
  if (user.TopArtists.length > 3) {
    user.TopArtists = user.TopArtists.slice(0, 3);
  }

  if (user.TopGenres.length > 3) {
    user.TopGenres = user.TopGenres.slice(0, 3);
  }
  const [openModal, setOpenModal] = useState(false);
  const age = getAge(user.dob);
  const distance = getDistance(actualUser, user);

  // Mobile users will be redirected to the Spotify page of the track due to restrictions of spotify play
  // Desktop users will be able to play the track in the player

  const handleTrack = (track) => {
    if (isMobile) {
      window.open(track.external_urls.spotify, "_blank");
      return;
    }

    const newTrack = {
      name: track.name,
      album: {
        external_urls: {
          spotify: track.external_urls.spotify,
        },
      },
      artists: [
        {
          name: track.name,
          external_urls: {
            spotify: track.external_urls.spotify,
          },
        },
      ],
      context_uri: track.uri,
    };

    setTrack(newTrack);
    setIsChanging(true);
  };

  return (
    <>
      <ModalReport
        isOpen={openModal}
        setIsOpen={setOpenModal}
        id={actualUser.id}
        targetUser={user.id}
        setAlert={setAlert}
        setUserFetching={setUserFetching}
      />
      <section className="mt-4 overflow-x-hidden md:mt-6">
        <div
          style={{ backgroundImage: user.color }}
          className={`relative h-[600px] rounded-3xl  shadow-lg fold:h-[500px] fold:w-[270px] sm:h-[480px] sm:w-[360px] md:h-[600px] md:w-[400px] lg:h-[700px] lg:w-[580px]`}
        >
          <img
            src={user.img}
            alt={user.name + "Photo"}
            className={`absolute inset-0 h-full w-full rounded-3xl object-cover   ${blurred ? "p-5 opacity-20 mix-blend-normal blur-md grayscale " : "opacity-90"} drop-shadow-md `}
          />

          <div
            onClick={() => setOpenModal(true)}
            className="justify-right absolute right-0 pr-3 pt-4"
          >
            <div className="group relative flex cursor-pointer items-center justify-center text-center text-white">
              <ExclamationCircleIcon className="h-5 w-5 cursor-pointer opacity-40 hover:opacity-100" />
              <span className="absolute pr-1 pt-8 text-xs opacity-0 transition-opacity group-hover:opacity-40">
                Report
              </span>
            </div>
          </div>

          <div className="justify-left absolute bottom-0 w-full px-5 pb-3 drop-shadow-lg">
            {/* Top section for Name, Age, Location */}
            <div className="text-left text-white">
              <p className="text-5xl font-semibold">{user.name}</p>
              <p className="text-md font-normal ">
                {age} | {distance} km
              </p>
            </div>

            <div className="mt-2">
              <p className="py-2 text-xs">{user.bio}</p>

              {user.TopArtists.length > 0 && (
                <p className="mr-2 pt-1 text-sm font-semibold text-white opacity-60 md:text-xl">
                  Top Artists
                </p>
              )}

              <div className="flex gap-3 pt-2">
                {user.TopArtists.map((artist) => (
                  <div
                    onClick={() => handleTrack(artist)}
                    key={artist.id}
                    className="flex cursor-pointer items-center gap-2 hover:underline"
                  >
                    <div className="h-7 w-7 flex-shrink-0 md:h-8 md:w-8">
                      {" "}
                      {/* Use Tailwind classes to set the size */}
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="h-full w-full rounded-full object-cover" // Remove width and height attributes and add w-full h-full
                      />
                    </div>
                    <p className="text-xs md:text-sm">{artist.name}</p>
                  </div>
                ))}
              </div>

              <div className="ml-1 flex gap-2 pt-2 font-normal opacity-60">
                {user.TopGenres.map((genre) => (
                  <a
                    key={genre}
                    className="cursor-pointer hover:underline"
                    href={`genre/${genre}`}
                  >
                    <p className="text-sm">
                      {" "}
                      #{genre.charAt(0).toUpperCase() + genre.slice(1)}{" "}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// User can like or dislike the user and refresh the list of users
const ControlBar = ({ handleLike, handleDislike, handleRefresh }) => {
  return (
    <div className="relative bottom-0 items-center justify-center pt-3 text-3xl font-semibold text-white md:relative md:flex md:pb-16 md:pt-5">
      <div className="inner-shadow flex items-center justify-center gap-10 rounded-3xl  px-10 py-3 text-center text-gray-300">
        <XCircleIcon
          onClick={handleDislike}
          className="h-12 w-12 cursor-pointer hover:scale-110"
        />
        <Square2StackIcon
          onClick={handleRefresh}
          className="h-12 w-12 cursor-pointer hover:scale-110"
        />
        <CheckCircleIcon
          onClick={handleLike}
          className="h-12 w-12 cursor-pointer hover:scale-110"
        />
      </div>
    </div>
  );
};
