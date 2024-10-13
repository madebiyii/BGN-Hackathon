"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { isMobile } from "react-device-detect";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../store/user-context";
import { FeedbackContext } from "../../../store/feedback-context";
import { PlayerContext } from "../../../store/player-context";
import { getDistance } from "../../../utils/getDistance";
import { getAge } from "../../../utils/getAge";
import ModalReport from "../../../components/modals/ModalReport";
import {
  ArrowLeftCircleIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";

// Used to view user profile page
export default function User() {
  const router = useRouter();
  const { user, setUserFetching } = useContext(UserContext);
  const { setAlert } = useContext(FeedbackContext);
  const { setTrack, setIsChanging } = useContext(PlayerContext);
  const [openModal, setOpenModal] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedBy, setBlockedBy] = useState(false);
  const [fetchBlockedUsers, setFetchBlockedUsers] = useState(false);
  const [distance, setDistance] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/163/getuser/${slug}`).then((res) => {
        if (res.data.status === 200) {
          const data = res.data.data;
          if (data?.isDeleted) {
            router.back();
          }
          if (data.TopTracks.length > 3) {
            data.TopTracks = data.TopTracks.slice(0, 3); // Only need to display top 3 always
          }
          if (data.TopArtists.length > 3) {
            data.TopArtists = data.TopArtists.slice(0, 3);
          }
          setActiveUser(data);
          setDistance(getDistance(user, data));
          if (user?.id == slug && user != null) {
            setIsAuthorised(true); // If user is viewing their own profile they are authorised
          } else if (user != null) {
            setIsAuthorised(false); // Check if the user is authorised for certain actions
            for (let i = 0; i < data.blockedUsers.length; i++) {
              if (data.blockedUsers[i].id == user.id) {
                setBlockedBy(data.blockedUsers[i].IsBlocked);
              }
            }
            for (let i = 0; i < user.blockedUsers.length; i++) {
              // console.log(user.blockedUsers[i]);
              if (user.blockedUsers[i].id == slug) {
                setIsBlocked(user.blockedUsers[i].IsBlocked);
              }
            }
            setFetchBlockedUsers(false);
          }
        } else {
          router.push("/");
        }
      });
    };

    if (user != null || fetchBlockedUsers == true) {
      fetchData();
    }
  }, [slug, user, fetchBlockedUsers]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  const handleReport = () => {
    setOpenModal(true);
  };

  // Block a user
  const handleBlock = async () => {
    await axios
      .post(
        `/api/block/user`,
        {
          blockUserId: slug,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setAlert({
            active: true,
            type: "success",
            message: res.data.message,
          });
          setUserFetching(true);
          setFetchBlockedUsers(true);
        }

        if (res.data.message === "User has been blocked") {
          router.push("/");
        }
      })
      .catch((err) => {
        setAlert({
          active: true,
          type: "error",
          message: "Something went wrong",
        });
      });
  };

  const backgroundImageUrl =
    activeUser?.TopTracks.length > 0 &&
    activeUser?.TopTracks[0].album.images[0].url.length > 0
      ? activeUser?.TopTracks[0].album.images[0].url
      : "";
  const backgroundStyle = {
    background: `linear-gradient(rgba(249, 106, 108, 0.9), rgba(252, 87, 140, 0.9)), url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };

  const handleTrack = (track, type) => {
    if (isMobile) {
      window.open(track.external_urls.spotify, "_blank");
      return;
    }

    if (type === "track") {
      track.mobile = track.external_urls.spotify;
      setTrack(track);
      setIsChanging(true);
    } else if (type === "artist") {
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
        mobile: track.external_urls.spotify,
        context_uri: track.uri,
      };

      setTrack(newTrack);
      setIsChanging(true);
    }
  };

  return (
    <>
      {!isAuthorised && user && activeUser && (
        <ModalReport
          isOpen={openModal}
          setIsOpen={setOpenModal}
          id={user?.id}
          targetUser={slug}
          setAlert={setAlert}
          setUserFetching={setUserFetching}
        />
      )}
      {activeUser != null && (
        <>
          <div
            style={backgroundStyle}
            className="-z-50 h-full pb-32 shadow-inner drop-shadow-lg"
          >
            <div className="flex h-full items-center justify-center px-10 ">
              <img
                src="/SpotLoveLogo_White.png"
                width={600}
                height={600}
                className="-z-50  pt-20 drop-shadow-md"
              />
            </div>
          </div>

          {isBlocked && !blockedBy && (
            <div className=" fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-70">
              <h2 className="px-5 text-center text-3xl text-white">
                You have blocked this user
              </h2>
              <button
                className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text px-5 py-2 text-xl font-black text-white hover:scale-105 hover:underline"
                onClick={handleBlock}
              >
                Unblock
              </button>
            </div>
          )}

          {blockedBy && (
            <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-95">
              <h2 className="px-10 text-center text-3xl font-black text-white">
                You have been blocked by this user
              </h2>
            </div>
          )}

          <div
            className="absolute z-50  cursor-pointer items-center justify-center bg-gradient-to-r from-peach to-peach-dark bg-clip-text pt-24 text-3xl font-semibold md:fixed md:pl-20"
            onClick={() => router.back()}
          >
            <ArrowLeftCircleIcon className="z-50 h-12 w-12 text-peach" />
          </div>
          <div
            className={`flex items-center justify-center pt-10 ${isBlocked ? "blur-lg" : "blur-none"}`}
          >
            <img
              src={activeUser.img}
              alt={activeUser.name + "Photo"}
              className="rounded-full object-cover drop-shadow-sm"
              width={170}
              height={170}
              style={{ aspectRatio: "1/1" }} // Maintain a square aspect ratio
            />
          </div>

          <main className="flex items-center justify-center ">
            <div
              className={`grid grid-cols-1 justify-center text-center ${isBlocked ? "blur-lg" : "blur-none"}`}
            >
              <div className=" flex flex-col items-center justify-center  text-center">
                <div className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text pt-10">
                  <h1 className="text-clip font-bold font-extrabold text-peach-dark text-transparent  fold:text-4xl sm:text-6xl md:text-8xl">
                    {activeUser.name} | {getAge(activeUser.dob)}
                  </h1>
                </div>

                {!isAuthorised && (
                  <div className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text pt-2 text-xl text-peach-dark">
                    <span className="text-clip  text-transparent">
                      {distance}km away
                    </span>
                  </div>
                )}
                <p className="text-md mt-5 w-1/2">{activeUser.bio}</p>

                {activeUser.TopGenres.length > 0 && (
                  <>
                    <div className="flex items-center justify-center gap-2 pt-5">
                      {activeUser.TopGenres.map((genre) => (
                        <a
                          key={genre}
                          className="cursor-pointer  hover:underline"
                          href={`/genre/${genre}`}
                        >
                          <p className="text-md text-black">
                            {" "}
                            #{genre.charAt(0).toUpperCase() +
                              genre.slice(1)}{" "}
                          </p>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                <div className=" w-3/4 grid-flow-col gap-4 pt-5 text-center md:w-2/4">
                  {activeUser.interests.map((interest) => (
                    <button
                      key={interest}
                      className={`cursor-default rounded-xl p-1.5`}
                      type="button"
                    >
                      <div className="flex items-center justify-center rounded-3xl border-2 border-black bg-white px-3 py-1.5 xl:px-5">
                        <p className="text-md text-black">{interest}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {isAuthorised && (
                  <div className="flex gap-3">
                    <a
                      href={`/settings`}
                      className="mt-5 cursor-pointer rounded-xl bg-gradient-to-t from-peach to-peach-dark px-5 py-2 font-semibold text-white hover:scale-105"
                    >
                      Edit Profile
                    </a>

                    <button
                      className="mt-5 cursor-pointer rounded-xl bg-gradient-to-t from-peach to-peach-dark px-5 py-2 font-semibold text-white hover:scale-105"
                      onClick={handleSignOut}
                    >
                      Log Out
                    </button>
                  </div>
                )}

                {!isAuthorised && (
                  <div className="flex gap-3">
                    <button
                      className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-t from-peach to-peach-dark px-5 py-2 font-semibold text-white hover:scale-105"
                      onClick={handleReport}
                    >
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      Report User
                    </button>

                    <button
                      className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-t from-peach to-peach-dark px-5 py-2 font-semibold text-white hover:scale-105"
                      onClick={handleBlock}
                    >
                      <NoSymbolIcon className="h-5 w-5" />
                      {isBlocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                )}

                <div className="items-center justify-center px-10 pt-10 text-center">
                  {activeUser.TopTracks.length > 0 && (
                    <div className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text ">
                      <h2 className="text-clip pl-5 text-center font-bold text-peach-dark text-transparent fold:pl-0 fold:text-3xl sm:text-5xl md:text-left">
                        Top Tracks
                      </h2>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center gap-4 py-4 text-center md:flex-row">
                    {activeUser.TopTracks.map((track) => (
                      <div
                        className="flex-shrink-0 cursor-pointer text-center hover:scale-95"
                        href={track.external_urls.spotify}
                        key={track.id}
                        onClick={() => handleTrack(track, "track")}
                      >
                        <div className="h-36 w-36 overflow-hidden">
                          <img
                            src={track.album.images[0].url}
                            alt={""}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="w-36 bg-gradient-to-t from-peach to-peach-dark bg-clip-text">
                          <h3 className="mt-2  overflow-hidden truncate text-ellipsis text-sm font-semibold text-transparent">
                            {track.name}
                          </h3>
                          <p className="overflow-hidden truncate text-ellipsis text-xs text-gray-600">
                            {track.artists[0].name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeUser.TopArtists.length > 0 && (
                    <div className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text ">
                      <h2 className="ml-5 text-clip text-center font-bold text-peach-dark text-transparent fold:pl-0 fold:text-3xl sm:text-5xl md:text-left">
                        Top Artists
                      </h2>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center gap-4 py-4 text-center md:flex-row">
                    {activeUser.TopArtists.map((artist) => (
                      <div
                        className="flex-shrink-0 cursor-pointer text-center hover:scale-95"
                        onClick={() => handleTrack(artist, "artist")}
                        key={artist.id}
                      >
                        <div className=" h-36 w-36 overflow-hidden">
                          <img
                            src={artist.images[0].url}
                            alt={artist.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="w-36 bg-gradient-to-t from-peach to-peach-dark bg-clip-text">
                          <h3 className="mt-2 truncate text-ellipsis text-sm font-semibold text-transparent">
                            {artist.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
