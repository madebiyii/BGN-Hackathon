"use client";
import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { FeedbackContext } from "./feedback-context";
import { getAge } from "../utils/getAge";

export const UserContext = createContext({
  user: null,
  setUser: (obj) => {},
  userFetching: false,
  setUserFetching: (bool) => {},
  handleProfileDetails: (data) => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [userFetching, setUserFetching] = useState(false);
  const { setAlert } = useContext(FeedbackContext);
  // Fetch user details from the database
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/get/user")
        .then((res) => {
          if (res.status === 200) {
            if (res.data.TopTracks.length > 3) {
              res.data.TopTracks = res.data.TopTracks.slice(0, 3);
            }
            if (res.data.TopArtists.length > 3) {
              res.data.TopArtists = res.data.TopArtists.slice(0, 3);
            }
            res.data.age = getAge(res.data.dob);
            res.data.dob = res.data.dob;
            setUser(res.data);
            setUserFetching(false);
          }
        })
        .catch((err) => {
          setAlert({
            active: true,
            type: "error",
            message: "Something went wrong. Please try again later",
          });
          setUserFetching(false);
        });
    };

    fetchData();
  }, [userFetching]);

  // Update user details in the database
  const handleProfileDetails = async (data) => {
    await axios
      .post("/api/updatedetails/user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setAlert({
          active: true,
          type: "success",
          message: "Profile created successfully.",
        });
        setUserFetching(true);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          active: true,
          type: "error",
          message: "Something went wrong. Please try again later",
        });
      });
  };

  const contextValue = {
    setUser,
    user,
    userFetching,
    setUserFetching,
    handleProfileDetails,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
