"use client";
import { PlayerContext } from "../../store/player-context";
import { FeedbackContext } from "../../store/feedback-context";
import { useEffect, useContext } from "react";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import SpotifyWebApi from "spotify-web-api-node";
import Image from "next/image";
import Alert from "../alerts/Alert";

export default function Player() {
  const { alert, setAlert } = useContext(FeedbackContext);
  const {
    accessToken,
    track,
    isPlaying,
    setIsPlaying,
    setTrack,
    isChanging,
    setIsChanging,
    isHidden,
    setIsHidden,
  } = useContext(PlayerContext);

  const spotifyApi = new SpotifyWebApi();
  try {
    spotifyApi.setAccessToken(accessToken);
  } catch (e) {}

  useEffect(() => {
    const playTrack = async () => {
      if (isChanging === true && track?.uri) {
        await spotifyApi
          .play({
            uris: [track.uri],
          })
          .then(
            function (data) {},
            function (err) {
              handleError(err);
            },
          );
        setIsPlaying(true);
        setIsChanging(false);
      } else if (isChanging === true && track.context_uri) {
        await spotifyApi
          .play({
            context_uri: track.context_uri,
          })
          .then(
            function (data) {},
            function (err) {
              handleError(err);
            },
          );
        setIsPlaying(true);
        setIsChanging(false);
      }
    };

    playTrack();
  }, [isChanging]);

  useEffect(() => {
    // This function updates the player when the track changes, outside of the app E.g User changes track on Spotify
    if (accessToken) {
      spotifyApi.getMyCurrentPlayingTrack().then(
        function (data) {
          if (data?.body?.is_playing) {
            setTrack(data.body.item);
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        },
        function (err) {
          console.log(err);
        },
      );
    }
  }, [accessToken, isPlaying]);

  // Play or pause the track
  const handleButtonClick = async () => {
    if ((isPlaying && track?.uri) || (isPlaying && track.context_uri)) {
      await spotifyApi.pause().then(
        function (data) {},
        function (err) {
          handleError(err);
        },
      );
      setIsPlaying(false);
    } else if (
      (!isPlaying && track?.uri) ||
      (!isPlaying && track.context_uri)
    ) {
      await spotifyApi.play().then(
        function (data) {},
        function (err) {
          handleError(err);
        },
      );
      setIsPlaying(true);
    }
  };

  // Error handling
  const handleError = (err) => {
    if (err.statusCode === 403) {
      setAlert({
        type: "error",
        message: "You need a Spotify Premium account to play music.",
        active: true,
      });
      setIsPlaying(false);
      setTrack(null);
    } else if (err.statusCode === 404) {
      setAlert({
        type: "error",
        message: "No devices found. Please open Spotify on a device.",
        active: true,
      });
      setIsPlaying(false);
      setTrack(null);
    } else if (err.statusCode === 401) {
      setAlert({
        type: "error",
        message: "Please log out and log back in to SpotLove",
        active: true,
      });
      setIsPlaying(false);
      setTrack(null);
    } else {
      console.error("Something went wrong!", err);
    }
  };

  const player = (
    <>
      {isHidden ? (
        <img
          src={"/SpotLoveSubmark.png"}
          alt="SpotLove Logo"
          width={30}
          height={30}
          onClick={() => setIsHidden(false)}
          className="fixed bottom-0 right-0 z-50 m-5 mx-2 animate-pulse cursor-pointer hover:scale-110"
        />
      ) : (
        <XMarkIcon
          onClick={() => setIsHidden(true)}
          className=" fixed bottom-8 right-1 z-50 mb-8 h-5 w-5 cursor-pointer opacity-10 hover:scale-105 hover:text-peach-dark hover:opacity-80"
        />
      )}

      <div
        className={`fixed bottom-0 right-0 ${isHidden ? "invisible" : null} z-50 m-5 flex items-center justify-center rounded-xl border-2 bg-white py-1 font-avenir text-black shadow-md`}
      >
        <img
          src={"/SpotLoveSubmark.png"}
          alt="SpotLove Logo"
          width={30}
          height={30}
          className="mx-2 cursor-pointer "
        />
        <div className="w-36 bg-gradient-to-l from-peach to-peach-dark bg-clip-text pr-10 md:w-80 md:pr-32 ">
          <a
            href={track?.album?.external_urls?.spotify}
            target="_blank"
            className=" cursor-pointer"
          >
            <p className="text-md overflow-clip truncate font-semibold text-transparent ">
              {track?.name}
            </p>
          </a>
          <a href={track?.artists[0]?.external_urls?.spotify} target="_blank">
            <p className=" -mt-1 overflow-clip truncate  text-xs font-normal text-gray-600  hover:underline">
              {track?.artists[0]?.name}
            </p>
          </a>
        </div>
        {isPlaying ? (
          <PauseCircleIcon
            onClick={handleButtonClick}
            className="mr-2 h-8 w-8 cursor-pointer text-peach-dark hover:scale-105"
          />
        ) : (
          <PlayCircleIcon
            onClick={handleButtonClick}
            className="mr-2 h-8 w-8 cursor-pointer text-peach-dark  hover:scale-105"
          />
        )}
      </div>
    </>
  );

  return (
    <>
      {alert.active && <Alert {...alert} isTop={true} />}
      {track?.name && player}
    </>
  );
}
