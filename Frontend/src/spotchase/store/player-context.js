"use client";
import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext({
  track: {},
  setTrack: (trackobj) => { },
  isPlaying: false,
  setIsPlaying: () => { },
  accessToken: null,
  isChanging: false,
  setIsChanging: () => { },
  isHidden: false,
  setIsHidden: () => { },
});

export const trackobj = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

// Used for managing the player state all over the application
export function PlayerContextProvider(props) {
  const [track, setTrack] = useState(trackobj);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  // Fetch the access token from the server, in order to play music
  useEffect(() => {
    getToken().then((token) => {
      setAccessToken(token);
    });
  }, [track]);

  const contextValue = {
    track,
    setTrack,
    isHidden,
    setIsHidden,
    isPlaying,
    setIsPlaying,
    accessToken,
    setIsChanging,
    isChanging,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}

const getToken = async () => {
  try {
    const response = await fetch("/api/spotify/token");
    const data = await response.json();
    if (data.status == "200") {
      return data.token;
    } else {
      console.error("Error fetching token", data);
    }
  } catch (error) {
    console.error("Error fetching token", error);
  }
};
