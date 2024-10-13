"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { FeedbackContext } from "./feedback-context";
import { UserContext } from "./user-context";
import axios from "axios";

export const MatchesContext = createContext({
  matches: [],
  potentialMatches: [],
  setPotentialMatches: (arr) => { },
  setMatchesFetching: (bool) => { },
  matchesFetching: true,
  isMatchesFetched: false,
  setIsMatchesFetched: (bool) => { },
  musicMatch: null,
  setMusicMatch: (match) => { },
  newMatch: null,
  setNewMatch: (match) => { },
});

export function MatchesContextProvider({ children }) {
  const { setAlert } = useContext(FeedbackContext);
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState(null);
  const [musicMatch, setMusicMatch] = useState(null);
  const [isMatchesFetched, setIsMatchesFetched] = useState(false);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [matchesFetching, setMatchesFetching] = useState(true);

  useEffect(() => {
    // will be replaced by algorithm
    // fetches potential matches from the server + music matches
    const fetchPotentialMatches = async () => {
      await axios
        .get("/api/1234/findmatches")
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setPotentialMatches(res.data);
            setMatchesFetching(false);
          }
        })
        .catch((err) => {
          setAlert({
            active: true,
            type: "error",
            message: "Something went wrong. Please try again later",
          });
          setMatchesFetching(false);
          setPotentialMatches([]);
        });
    };

    const fetchMusicMatch = async () => {
      await axios
        .get("/api/musicmatch/find")
        .then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            setMusicMatch(res.data[0]);
          }
        })
        .catch((err) => {
          setAlert({
            active: true,
            type: "error",
            message: "Something went wrong. Please try again later",
          });
          setMusicMatch(null);
        });
    };

    // Dont allow matches list to be empty or less than 1, fetch new ones
    if (
      matchesFetching &&
      user?.onBoarding == true &&
      user
    ) {
      fetchPotentialMatches();
      fetchMusicMatch();
    }
  }, [matchesFetching, user]);

  // fetch current matches
  useEffect(() => {
    const fetchMatches = async () => {
      await axios
        .get("/api/matches/get")
        .then((res) => {
          if (res.status === 200) {
            setMatches(res.data);
            setIsMatchesFetched(true);
          }
        })
        .catch((err) => {
          setAlert({
            active: true,
            type: "error",
            message: "Something went wrong. Please try again later",
          });
        });
    };

    if (user?.onBoarding == true && user) {
      fetchMatches();
    }
  }, [user, newMatch, matchesFetching, musicMatch]);



  const contextValue = {
    matches: matches,
    setMatchesFetching: setMatchesFetching,
    matchesFetching: matchesFetching,
    potentialMatches: potentialMatches,
    setPotentialMatches: setPotentialMatches,
    musicMatch: musicMatch,
    newMatch: newMatch,
    setNewMatch: setNewMatch,
    setMusicMatch: setMusicMatch,
    isMatchesFetched: isMatchesFetched,
    setIsMatchesFetched: setIsMatchesFetched,
  };

  return (
    <MatchesContext.Provider value={contextValue}>
      {children}
    </MatchesContext.Provider>
  );
}
