"use client";
import { useState, useContext } from "react";
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for router in the app directory
import { FeedbackContext } from "../../store/feedback-context";
import { setToken } from '../../middleware'; // Import the setToken function
import ModalLogin from "../../components/modals/ModalLogin";
import { auth, provider, signInWithPopup } from "../../services/firebaseClient";

// Log in page for SpotChase

export default function Login() {
  const { setAlert } = useContext(FeedbackContext);
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  return (
    <>
      <ModalLogin isOpen={open} setIsOpen={setOpen} setAlert={setAlert} />
      <div className="flex h-dvh flex-wrap">
        <div className="hidden w-full bg-[url('/activities.webp')] bg-cover bg-center bg-no-repeat lg:block lg:w-1/2"></div>
        <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
          <div className="mx-auto justify-center text-center">
            <img
              src="/bwspotchase.svg"
              alt="SpotChase Logo"
              className="justify-center px-10 text-center"
              width={800}
              height={800}
            />
            <h1 className="pt-5 text-2xl text-blue-600 lg:ml-10 xl:text-3xl">
              Chase Unforgettable Moments{" "}
            </h1>
            <div
              data-cy="login-button-loginpage"
              className="mx-auto mt-10 flex w-3/4 cursor-pointer items-center justify-center rounded-3xl border border-blue-500 bg-gradient-to-r from-blue-500 to-green-500 px-4 py-3 text-center text-xl text-white shadow-sm hover:scale-95 md:w-2/4"
              onClick={() =>
                signInWithPopup(auth, provider)
                  .then((result) => {
                    
                    setToken(true); // Set the token to true
                    console.log("User signed in, token set to true.");
                    router.push("/feed"); // Navigate to the feed page
                  })
                  .catch((error) => {
                    console.error('Error during sign in:', error);
                  })
                  .finally(() => {
                    // This will run regardless of success or failure
                    router.push("/feed"); // Navigate to the feed page
                  })
              }
            >
              <img
                src="/googleicon.svg"
                alt="Google Logo"
                className="mr-5"
                width={40}
                height={40}
              />
              <h3 className="text-md md:text-lg">Sign in with Google</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
