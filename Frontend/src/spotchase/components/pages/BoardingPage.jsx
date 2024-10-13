"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FeedbackContext } from "../../store/feedback-context";
import ModalOnboarding from "../modals/ModalOnboarding";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { validateAddress, getAddress } from "../../services/locationService";

// Onboarding page for new users
export default function BoardingPage(props) {
  const {
    user,
    step,
    setStep,
    realLocation,
    setRealLocation,
    handleProfileDetails,
  } = props;

  return (
    <>
      {step !== 4 ? (
        <Boarding
          name={user.name}
          img={user.img}
          step={step}
          setStep={setStep}
        />
      ) : (
        <Step4
          realLocation={realLocation}
          setRealLocation={setRealLocation}
          handleProfileDetails={handleProfileDetails}
        />
      )}
    </>
  );
}

const Boarding = (props) => {
  const { name, img, step, setStep } = props;
  const { setAlert } = useContext(FeedbackContext);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep === 3 ? 3 : prevStep + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Every time user progresses, the component will re-render
  return (
    <>
      <div className="bg-gradient-to-r from-peach to-peach-dark text-center font-avenir text-white">
        <div
          className={`h-full items-center justify-center bg-[url('/onboardingbg.png')] bg-cover bg-no-repeat text-center`}
        >
          <div className="flex h-dvh place-items-center items-center justify-center">
            <div>
              {step === 1 && <Step1 name={name} />}
              {step === 2 && <Step2 />}
              {step === 3 && (
                <Step3
                  name={name}
                  img={img}
                  setStep={setStep}
                  setAlert={setAlert}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step1 = (props) => {
  const { name } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="px-5 font-avenir text-5xl md:text-6xl lg:text-8xl">
        {" "}
        Hi {name.split(" ")[0]} 👋{" "}
      </h2>
    </motion.div>
  );
};

const Step2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="px-10 font-avenir text-3xl md:text-6xl">
        {" "}
        Before you can find new connections, we have a few things to do first...{" "}
      </h2>
    </motion.div>
  );
};

const Step3 = (props) => {
  const { name, img, setStep, setAlert } = props;
  const [isOpen, setIsOpen] = useState(true);

  const handleProfileUpdate = async (data) => {
    axios
      .post("/api/update/user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setStep(4);
      })
      .catch((err) => {
        setStep(1);
        console.log(err);
        setAlert({
          active: true,
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      });
  };
  return (
    <ModalOnboarding
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setStep={setStep}
      handleProfileUpdate={handleProfileUpdate}
      name={name}
      img={img}
      setAlert={setAlert}
    />
  );
};

const Step4 = (props) => {
  const { realLocation, setRealLocation, handleProfileDetails } = props;
  const { setAlert } = useContext(FeedbackContext);
  const [getLocationActivated, setGetLocationActivated] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [coordinates, setCoordinates] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  /* Reference : https://www.npmjs.com/package/react-google-autocomplete */

  const validateForm = async (event) => {
    const formData = new FormData(event.currentTarget);
    const validatedAddress = await validateAddress(realLocation);
    const dob = new Date(formData.get("dob"));
    const age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
    if (age < 18) {
      setAlert({
        active: true,
        type: "error",
        message: "You must be 18 or above to use SpotLove",
      });
      return {
        flag: false,
        message: "You must be 18 or above to use SpotLove",
      };
    } else if (selectedInterests.length === 0) {
      setAlert({
        active: true,
        type: "error",
        message: "Please select at least one interest",
      });
      return { flag: false, message: "Please select at least one interest" };
    } else if (coordinates.latitude === 0.0 || coordinates.longitude === 0.0) {
      setAlert({
        active: true,
        type: "error",
        message:
          "Please enter a valid location, or use the current location button to get your location.",
      });
      return { flag: false, message: "Please enter a valid location" };
    } else if (validatedAddress === false || realLocation === "") {
      setAlert({
        active: true,
        type: "error",
        message:
          "Please enter a valid location, or use the current location button to get your location.",
      });
      return { flag: false, message: "Please enter a valid location" };
    }
    formData.append("interests", JSON.stringify(selectedInterests));
    formData.append("latitude", coordinates.latitude.toString());
    formData.append("longitude", coordinates.longitude.toString());
    formData.append("location", realLocation);
    return { flag: true, message: "Form is valid", data: formData };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValid = await validateForm(event);
    if (formValid.flag === false) {
      return;
    } else {
      const formData = formValid.data;
      handleProfileDetails(formData);
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest.name)
        ? prevInterests.filter((i) => i !== interest.name)
        : [...prevInterests, interest.name],
    );
  };

  const handlePlaceSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setRealLocation(value);
    setCoordinates({
      latitude: latLng.lat,
      longitude: latLng.lng,
    });
  };

  useEffect(() => {
    const handleGetAddress = async () => {
      const address = await getAddress(
        coordinates.latitude,
        coordinates.longitude,
      );
      setRealLocation(address);
    };
    if (getLocationActivated) {
      setRealLocation("Finding your location...");
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            handleGetAddress();
            setGetLocationActivated(false);
          },
          (error) => {
            console.log(error);
          },
        );
      }
    }
  }, [getLocationActivated]);

  return (
    <>
      <div
        className={`min-h-dvh bg-gradient-to-r from-peach to-peach-dark px-10 py-10 text-left font-avenir text-white md:px-32 md:py-44`}
      >
        <h2 className="text-4xl font-semibold md:text-7xl">
          Tell us about yourself!
        </h2>
        <h3 className="pt-4 text-xl md:text-4xl">
          Please fill in the details to help find your music match
        </h3>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pt-12"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label htmlFor="bio" className="text-xl md:text-4xl">
              Bio ✏️
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Share a bit about your musical journey... 🎶  What tunes light up your day? Any favorite concerts or memories? Or perhaps what you're looking for here on SpotLove. Let's make your profile sing!"
              className="mt-4 h-96 rounded-lg border-none bg-white p-4 text-black shadow-md md:h-32 lg:w-3/4"
              required
            />
          </div>

          <section className="gap-24 pt-12 lg:flex">
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="whitespace-nowrap text-xl md:text-4xl"
              >
                Gender 🤍
              </label>
              <select
                id="gender"
                name="gender"
                className="hide-default-arrow mt-4 w-full cursor-pointer rounded-lg border-none bg-white p-4 text-black shadow-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex flex-col pt-5  lg:pt-0">
              <label
                htmlFor="dob"
                className="whitespace-nowrap text-xl md:text-4xl"
              >
                Date of Birth 📅
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-input mt-3 w-full cursor-pointer rounded-lg border-none bg-white p-4 text-black shadow-md"
                required
              />
            </div>

            <div className="flex flex-col pt-5 lg:w-2/5 lg:pt-0 2xl:w-1/5">
              <label
                htmlFor="location"
                className="whitespace-nowrap text-xl md:text-4xl"
              >
                Location 🗺️
              </label>
              <div className="relative mt-4">
                <PlacesAutoComplete
                  value={realLocation}
                  onChange={(value) => setRealLocation(value)}
                  onSelect={handlePlaceSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <div>
                        <input
                          {...getInputProps({
                            className: `w-full ${loading && "animate-pulse"} border-none  pr-12 truncate  cursor-pointer rounded-lg bg-white p-4 pr-4  text-xs text-black shadow-md md:text-sm`,
                            type: "text",
                            id: "location",
                            name: "location",
                            required: true,
                            placeholder: realLocation,
                          })}
                        />
                      </div>

                      {suggestions.length > 0 && (
                        <div className="rounded-xl">
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
                                className="cursor-pointer p-4 text-black hover:bg-gray-100"
                              >
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PlacesAutoComplete>
              </div>

              <p
                onClick={() => setGetLocationActivated(true)}
                className="text-md block cursor-pointer pt-3 hover:underline"
              >
                Use Current Location
              </p>
            </div>
          </section>

          <div className="ml-0 mt-10">
            <h3 className="mb-4 text-3xl md:text-5xl">
              Select your interests:
            </h3>
            <div className="grid-flow-col text-left  md:pt-5 xl:w-3/4">
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
                  className={`cursor-pointer rounded-xl p-1.5 text-4xl  2xl:p-2 ${
                    selectedInterests.includes(interest.name)
                      ? "opacity-20"
                      : ""
                  }`}
                  type="button"
                >
                  <div className="flex items-center justify-center rounded-3xl bg-white px-3 xl:px-5">
                    <p className="text-[20px] md:p-2  md:text-2xl 2xl:text-4xl">
                      {interest.icon}
                    </p>
                    <p className="ml-1 text-[14px] text-black md:text-xl 2xl:text-2xl">
                      {interest?.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mb-10 mt-10 h-20 w-full self-center rounded-3xl bg-white text-3xl font-semibold text-peach-dark shadow-md hover:scale-95 hover:bg-opacity-90 md:mt-16 lg:w-2/4 xl:mb-auto xl:w-1/4 "
          >
            <p
              className="bg-gradient-to-r from-peach to-peach-dark 
                bg-clip-text text-3xl  font-semibold text-transparent  lg:font-black"
            >
              Start Matching !
            </p>
          </button>
        </motion.form>
      </div>
    </>
  );
};
