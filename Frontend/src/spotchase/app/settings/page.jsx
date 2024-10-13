"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../store/user-context";
import { FeedbackContext } from "../../store/feedback-context";
import { MatchesContext } from "../../store/matches-context";
import { validateAddress } from "../../services/locationService";
import ModalConfirm from "../../components/modals/ModalConfirm";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  ExclamationTriangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Settings() {
  const { user, setUserFetching } = useContext(UserContext);
  const { setAlert } = useContext(FeedbackContext);
  const { setMatchesFetching } = useContext(MatchesContext);
  const [isModified, setIsModified] = useState(false); // Check if the user has modified the settings
  const router = useRouter();
  const [settings, setSettings] = useState({
    name: user?.name,
    bio: user?.bio,
    img: user?.img,
    interests: user?.interests,
    gender: user?.gender,
    location: user?.location,
    dob: user?.dob,
    matchDistance: parseInt(user?.matchDistance) || 20,
    isHidden: user?.isHidden || false,
    lat: user?.lat,
    long: user?.long,
  });

  useEffect(() => {
    if (user != null) {
      for (const key in settings) {
        if (settings[key] !== user[key]) {
          setIsModified(true);
          return;
        } else if (checkInterests(settings.interests)) {
          setIsModified(true);
          return;
        }
      }
      setIsModified(false);
    }
  }, [settings]); // Check if the settings have been modified, avoids wasteful api calls

  // Check if the user has modified the interests, since its an array
  const checkInterests = (interests) => {
    if (interests.length !== user.interests.length) {
      return true;
    } else {
      for (const interest of interests) {
        if (!user.interests.includes(interest)) {
          return true;
        }
      }
    }
    return false;
  };

  // update the settings state when the user object changes
  useEffect(() => {
    setSettings({
      name: user?.name,
      bio: user?.bio,
      img: user?.img,
      interests: user?.interests,
      gender: user?.gender,
      location: user?.location,
      dob: user?.dob,
      matchDistance: user?.matchDistance || 0,
      isHidden: user?.isHidden || false,
    });
  }, [user]);

  // check if the user has modified the settings and warn them before leaving the page
  useEffect(() => {
    if (isModified) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [isModified]);

  // used to validate the user input, if not valid, set an alert
  const validator = async (settings) => {
    const address = await validateAddress(settings.location);
    if (settings.name.length == 0 || settings.name.length >= 50) {
      setAlert({
        type: "warning",
        message: "Please enter a valid name",
        active: true,
      });
      return false;
    }

    if (settings.bio.length == 0 || settings.bio.length >= 200) {
      setAlert({
        type: "warning",
        message: "Please enter a valid bio",
        active: true,
      });
      return false;
    }

    if (settings.location.length == 0 || settings.location.length >= 100) {
      setAlert({
        type: "warning",
        message: "Please enter a valid location",
        active: true,
      });
      return true;
    }

    if (settings.dob.length == 0) {
      setAlert({
        type: "warning",
        message: "Please enter a valid date of birth",
        active: true,
      });
      return true;
    }

    if (settings.interests.length == 0) {
      setAlert({
        type: "warning",
        message: "Please select at least one interest",
        active: true,
      });
      return true;
    }

    if (settings.matchDistance == null || settings.matchDistance < 1) {
      setAlert({
        type: "warning",
        message: "Please enter a valid matching distance",
        active: true,
      });
      return true;
    }

    if (address === false) {
      setAlert({
        type: "warning",
        message: "Please enter a valid location",
        active: true,
      });
      return true;
    }
    return false;
  };

  // save the user settings, send to api to update the user
  const handleSave = async (e) => {
    e.preventDefault();
    const isError = await validator(settings);
    if (isError) {
      return;
    }

    // Reformat the data
    const formData = new FormData();
    for (const key in settings) {
      if (settings[key] !== user[key] && key !== "interests") {
        formData.append(key, settings[key]);
      } else if (checkInterests(settings.interests)) {
        formData.append("interests", JSON.stringify(settings.interests));
      }
    }

    axios
      .post("/api/setting/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAlert({
            type: "success",
            message: "Settings saved successfully",
            active: true,
          });
        }
        setIsModified(false);
        setUserFetching(true);
        setMatchesFetching(true);
        router.push("/settings");
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: "Something went wrong. Please try again later",
          active: true,
        });
      });
  };

  return (
    <>
      {user != null && (
        <>
          <div className="mx-auto flex justify-center px-10 py-10 sm:py-10 md:py-20">
            <div className=" fixed left-0  ml-20 mt-20 hidden bg-gradient-to-t from-peach to-peach-dark bg-clip-text text-2xl font-semibold  xl:block">
              <nav>
                <ul className="justify-center text-left">
                  <li>
                    <a
                      href="#profile"
                      className="cursor-pointer text-transparent hover:text-red-300 "
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#personal-info"
                      className="cursor-pointer text-transparent hover:text-red-300 "
                    >
                      Personal Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="#general"
                      className="cursor-pointer text-transparent hover:text-red-300 "
                    >
                      General
                    </a>
                  </li>
                  <li>
                    <a
                      href="#feedback"
                      className="cursor-pointer text-transparent hover:text-red-300 "
                    >
                      Feedback
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="space-y-12">
              <form>
                <div className="flex items-center border-b border-gray-900/20 bg-gradient-to-t from-peach to-peach-dark bg-clip-text pb-5 text-left">
                  <h2 className="mr-auto pb-2 text-left font-semibold text-transparent  fold:text-2xl sm:text-4xl md:text-6xl">
                    {" "}
                    Settings{" "}
                  </h2>

                  <a
                    href={`profile/${user.id}`}
                    className="relative inline-block cursor-pointer rounded-full bg-gradient-to-t from-peach to-peach-dark p-0.5 hover:scale-110 sm:mr-1"
                    style={{ width: "40px", height: "40px" }} // Inline style to ensure width and height are set
                  >
                    <img
                      src={user.img}
                      alt={`${user.name} Profile`}
                      className="drop-shadow-xs h-full w-full rounded-full object-cover"
                    />
                  </a>
                  <a href="/feed">
                    <img
                      src="/SpotLoveSubmark.png"
                      alt="Feed"
                      width={50}
                      height={50}
                      className="mb-1 cursor-pointer hover:scale-110"
                    />
                  </a>
                </div>

                <ProfileSection
                  user={user}
                  setAlert={setAlert}
                  setSettings={setSettings}
                />
                <PersonalInfo user={user} setSettings={setSettings} />
                <GeneralInfo
                  user={user}
                  setAlert={setAlert}
                  setSettings={setSettings}
                />

                {isModified && (
                  <div className="mt-6 flex items-center justify-end gap-x-6 md:pb-10">
                    <button
                      type="submit"
                      onClick={handleSave}
                      className="rounded-xl bg-gradient-to-t from-peach to-peach-dark px-5 py-2 text-lg font-semibold text-white shadow-md hover:bg-peach-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
                    >
                      Save
                    </button>
                  </div>
                )}
              </form>

              <Feedback setAlert={setAlert} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Each section of the settings page is broken down into components for better readability

const ProfileSection = ({ user, setAlert, setSettings }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [url, setUrl] = useState(user.img);
  const [interests, setInterests] = useState(user.interests);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const fileValidation = (file) => {
    const sizeLimit = 1024 * 5 * 1024; // 5MB
    const allowedExtensions = ["png", "jpg", "jpeg"];
    if (
      file.size > sizeLimit ||
      !allowedExtensions.includes(file.type.split("/")[1])
    ) {
      return false;
    }
    return true;
  };

  const handleImageUpload = (file) => {
    if (!fileValidation(file)) {
      setAlert({
        type: "warning",
        message: "Only PNG, JPG or JPEG up to 5MB allowed",
        active: true,
      });
      return;
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuff = event.target.result;
        };
        reader.readAsArrayBuffer(file);
      }
      setFile(file);
      setIsDeleted(false);
      setUrl(URL.createObjectURL(file));
      setSettings((prevSettings) => ({
        ...prevSettings,
        img: file,
      }));
    }
  };

  const handleSetName = (name) => {
    setName(name);
    setSettings((prevSettings) => ({
      ...prevSettings,
      name: name,
    }));
  };

  const handleDelete = () => {
    URL.revokeObjectURL(url);
    setUrl("");
    setFile(null);
    setIsDeleted(true);
    setSettings((prevSettings) => ({
      ...prevSettings,
      img: "None",
    }));
    document.getElementById("file-upload").value = "";
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest.name)) {
      for (let i = 0; i < interests.length; i++) {
        if (interests[i] === interest.name) {
          interests.splice(i, 1);
        }
      }
      setInterests(interests);
    } else {
      interests.push(interest.name);
      setInterests(interests);
    }
    setSettings((prevSettings) => ({
      ...prevSettings,
      interests: interests,
    }));
  };

  const handleSetBio = (bio) => {
    setBio(bio);
    setSettings((prevSettings) => ({
      ...prevSettings,
      bio: bio,
    }));
  };

  return (
    <div id={"profile"} className="border-b border-gray-900/10 py-10">
      <div className=" bg-gradient-to-t from-peach to-peach-dark bg-clip-text">
        <h2 className="text-2xl  font-semibold leading-7 text-transparent  md:text-3xl">
          Profile
        </h2>
      </div>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Please fill in the details to help find your music match 🎶
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Profile Picture
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            {!isDeleted ? (
              <img
                src={url}
                alt="profile photo"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="h-12 w-12 rounded-full text-gray-300" />
            )}

            <div className="relative">
              <span
                onClick={triggerFileInputClick}
                className="cursor-pointer rounded-md bg-gradient-to-t from-peach to-peach-dark px-2.5 py-1.5 text-sm  text-white shadow-sm  hover:bg-peach-dark"
              >
                Change
              </span>
              <input
                ref={fileInputRef} // Assign the useRef reference to the input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={(e) => {
                  e.preventDefault();
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="col-span-full md:col-span-4">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-peach sm:max-w-md">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={name}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={user.name}
                onChange={(e) => handleSetName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Bio
          </label>
          <div className="mt-2">
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-peach sm:text-sm sm:leading-6"
              placeholder={user?.bio}
              value={bio}
              onChange={(e) => handleSetBio(e.target.value)}
              required
            />
          </div>
        </div>

        <label
          htmlFor="photo"
          className="block text-sm font-medium  text-gray-900"
        >
          Interests
        </label>
        <div className="col-span-full grid grid-cols-2 items-center gap-4 md:grid-cols-4 ">
          {[
            { icon: "🎤", name: "Singing" },
            { icon: "📚", name: "Reading" },
            { icon: "🎮", name: "Gaming" },
            { icon: "🏞️", name: "Nature" },
            { icon: "🎨", name: "Art" },
            { icon: "🍔", name: "Food" },
            { icon: "🎥", name: "Movies" },
            { icon: "📺", name: "TV Shows" },
            { icon: "📱", name: "Tech" },
            { icon: "🚗", name: "Cars" },
            { icon: "🏀", name: "Sports" },
            { icon: "🎳", name: "Bowling" },
            { icon: "🎲", name: "Board Games" },
            { icon: "🎭", name: "Theatre" },
            { icon: "🎸", name: "Guitar" },
          ].map((interest) => (
            <button
              key={interest.name}
              onClick={() => toggleInterest(interest)}
              className={`cursor-pointer text-sm ${
                interests.includes(interest.name) ? "opacity-20" : ""
              }`}
              type="button"
            >
              <div className="flex items-center justify-center rounded-3xl border bg-white p-2 shadow-md">
                <p className="text-[20px]   ">{interest.icon}</p>
                <p className="pl-2 text-[14px] text-black ">{interest?.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PersonalInfo = ({ user, setSettings }) => {
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [location, setLocation] = useState(user.location);

  useEffect(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      dob: dob,
      location: location,
      gender: gender.toLowerCase(),
    }));
  }, [dob, location, gender]);

  const handlePlaceSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setSettings((prevSettings) => ({
      ...prevSettings,
      lat: latLng.lat,
      long: latLng.lng,
    }));
  };

  return (
    <div id={"personal-info"} className="border-b border-gray-900/10 py-10">
      <div className=" bg-gradient-to-t from-peach to-peach-dark bg-clip-text">
        <h2 className="text-2xl font-semibold leading-7 text-transparent md:text-3xl">
          Personal Information
        </h2>
      </div>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        We do not share your personal information with anyone ❤️
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
        <div className="col-span-full ">
          <label
            htmlFor="Gender"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Gender
          </label>
          <div className="mt-2">
            <select
              id="gender"
              name="gender"
              value={gender.charAt(0).toUpperCase() + gender.slice(1)} // Set the value to the gender state
              onChange={(e) => setGender(e.target.value)}
              autoComplete="gender"
              className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-peach  sm:text-sm sm:leading-6"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-span-full mt-5">
            <PlacesAutoComplete
              value={location}
              onChange={(value) => setLocation(value)}
              onSelect={handlePlaceSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-peach">
                    <input
                      {...getInputProps({
                        className: `"block flex-1 overflow-x-clip truncate border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`,
                        type: "text",
                        id: "address",
                        name: "address",
                        required: true,
                        placeholder: location,
                      })}
                    />
                  </div>

                  {suggestions.length > 0 && (
                    <div className="-mt-1 flex-none rounded-b-xl border-b-2  border-l-2 border-r-2  pt-2 shadow-sm">
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#fc578c" // pink
                            : "#fff",
                        };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                            key={suggestion.placeId}
                            className=" border- cursor-pointer px-2  text-black  shadow-sm hover:bg-gray-100  hover:text-white sm:text-sm sm:leading-6"
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </PlacesAutoComplete>
          </div>
        </div>

        <div className="col-span-full ">
          <label
            htmlFor="dob"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date of Birth
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="dob"
              name="dob"
              autoComplete="bday"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="form-input block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-peach sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneralInfo = ({ user, setSettings, setAlert }) => {
  const [openModal, setOpenModal] = useState(false);
  const [matchDistance, setMatchDistance] = useState(user?.matchDistance ?? 0);
  const [isProfileHidden, setIsProfileHidden] = useState(
    user?.isHidden ?? false,
  );
  const handleDelete = () => {
    setOpenModal(false);
    axios.post("/api/delete/user").then((res) => {
      if (res.status === 200) {
        setAlert({
          type: "success",
          message:
            "Account deleted successfully. Thank you for using SpotLove!",
          active: true,
        });
        setTimeout(() => {}, 2000);
        handleSignOut();
      } else {
        setAlert({
          type: "error",
          message: "Something went wrong. Please try again later",
          active: true,
        });
      }
    });
  };

  const handleToggle = () => {
    setIsProfileHidden(!isProfileHidden);
  };

  const handleChange = (value) => {
    if (value.length === 0) {
      setMatchDistance(null);
    } else {
      setMatchDistance(parseInt(value));
    }
  };

  useEffect(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      matchDistance: matchDistance,
      isHidden: isProfileHidden,
    }));
  }, [matchDistance, isProfileHidden]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // Redirect to the home page after sign out
    window.location.href = "/";
  };

  return (
    <>
      <ModalConfirm
        open={openModal}
        setOpen={setOpenModal}
        handleCancel={() => null}
        handleConfirm={handleDelete}
      />
      <div id={"general"} className="border-b border-gray-900/10 py-10">
        <div className=" bg-gradient-to-t from-peach to-peach-dark bg-clip-text">
          <h2 className="text-2xl font-semibold leading-7 text-transparent md:text-3xl">
            General
          </h2>
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Tweak your settings to your liking 🚀
        </p>

        <div className="mt-8">
          <div className="col-span-full">
            <label
              htmlFor="distance"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Match Distance (km)
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="distance"
                name="distance"
                min="1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-peach sm:text-sm sm:leading-6"
                placeholder="Enter distance in km"
                value={matchDistance}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isProfileHidden}
                onChange={handleToggle}
                className="peer sr-only"
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-peach-dark peer-checked:after:translate-x-full "></div>
              <span className="ml-3 text-sm font-medium text-gray-800">
                {isProfileHidden
                  ? "Your profile is now hidden"
                  : "Hide my profile from other users"}
              </span>
            </label>
            {isProfileHidden && (
              <p className="pt-1 text-xs text-gray-300">
                Your profile will not be visible to other users in the feed.
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center  rounded-xl border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 fold:text-xs"
            >
              <ExclamationTriangleIcon
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Deactivate Account
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center rounded-xl border border-transparent bg-gray-600 px-4 py-2 font-medium text-white shadow-md hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 fold:text-xs"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Feedback = ({ setAlert }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = (email) => {
    if (
      email.length == 0 ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) ||
      email.length >= 748
    ) {
      return false;
    }
    return true;
  };

  const messageValidation = (message) => {
    if (message.length == 0 || message.length >= 748) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailValidation(email)) {
      setAlert({
        type: "warning",
        message: "Please enter a valid email",
        active: true,
      });
      return;
    }

    if (!messageValidation(message)) {
      setAlert({
        type: "warning",
        message: "Please enter a valid message",
        active: true,
      });
      return;
    }

    axios
      .post(
        "/api/suggestions/send",
        { email, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        if (res.status !== 200) {
          setAlert({
            type: "error",
            message: "Something went wrong. Please try again later",
            active: true,
          });
          return;
        }
        setAlert({
          type: "success",
          message: "Feedback sent successfully",
          active: true,
        });
        setEmail("");
        setMessage("");
      });
  };

  return (
    <form>
      <div id={"feedback"} className=" border-gray-900/10 pb-12">
        <div className=" bg-gradient-to-t from-peach to-peach-dark bg-clip-text">
          <h2 className="text-2xl font-semibold leading-7 text-transparent md:text-3xl">
            Tell us what you think !
          </h2>
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          We would love to hear your feedback 📥
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full ">
            <label
              htmlFor="review-email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="review-email"
              name="review-email"
              className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-peach focus:ring-peach sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="review-message"
              className="mt-5 block text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="review-message"
              name="review-message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-peach focus:ring-peach sm:text-sm"
              placeholder="Share your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="mt-5 justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-3xl bg-green-500 px-5 py-2 text-lg font-semibold text-white  hover:bg-peach-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};
