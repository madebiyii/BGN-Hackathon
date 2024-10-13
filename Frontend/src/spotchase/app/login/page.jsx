"use client";
import { useState } from "react";
import { FeedbackContext } from "../../store/feedback-context";
import ModalLogin from "../../components/modals/ModalLogin";
import { useContext } from "react";

// Log in page

export default function Login() {
  const { setAlert } = useContext(FeedbackContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ModalLogin isOpen={open} setIsOpen={setOpen} setAlert={setAlert} />
      <div className="flex h-dvh flex-wrap">
        <div className="hidden w-full bg-[url('/LoginBG.jpeg')] bg-cover bg-center bg-no-repeat lg:block lg:w-1/2"></div>
        <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
          <div className="mx-auto justify-center text-center">
            <img
              src="/bwspotchase.svg"
              alt="SpotChaseLogo"
              className={"justify-center px-10 text-center"}
              width={800}
              height={800}
            />
            <h1 className="pt-5 text-2xl text-peach-dark lg:ml-10 xl:text-3xl">
              Chase Unforgettable Moments{" "}
            </h1>
            <div
              data-cy="login-button-loginpage"
              className="mx-auto mt-10 flex w-3/4 cursor-pointer items-center justify-center rounded-3xl border px-4 py-3 text-center text-xl text-black shadow-sm hover:scale-95 md:w-2/4"
              onClick={() => setOpen(true)}
            >
              <img
                src="/googleicon.svg"
                alt="Google Logo"
                className={"mr-5"}
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
