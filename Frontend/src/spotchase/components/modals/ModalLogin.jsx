import axios from "axios";
import { signIn } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

export default function ModalLogin(props) {
  const { isOpen, setIsOpen, setAlert } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const router = useRouter();

  async function handleSubmitEmail(event) {
    event.preventDefault();
    if (email === "") {
      setAlert({
        active: true,
        type: "error",
        message: "Please enter your email",
      });
    } else if (emailIsValid(email)) {
      axios
        .post("/api/email/login", {
          email,
        })
        .then((response) => {
          if (response.status === 200) {
            setAlert({
              active: true,
              type: "success",
              message: "Email sent successfully",
            });
            setEmail("");
            setPassword("");
            setIsOpen(false);
            router.push("/");
          } else {
            setAlert({
              active: true,
              type: "error",
              message: "Error sending email",
            });
          }
        })
        .catch((error) => {
          setAlert({
            active: true,
            type: "error",
            message: "Error sending email",
          });
        });
    } else {
      setAlert({
        active: true,
        type: "error",
        message: "Please enter a valid email",
      });
    }
  }

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmitPassword(event) {
    event.preventDefault();
    setIsOpen(false);
    setPassword("");
    setEmail("");
    setOpenPassword(false);
    if (password === process.env.NEXT_PUBLIC_SPOTLOVE_PASSWORD) {
      signIn("spotify", { callbackUrl: "/feed" }).catch((e) =>
        setAlert({
          active: true,
          type: "error",
        }),
      );
    } else {
      setAlert({
        active: true,
        type: "error",
        message: "Incorrect password",
      });
      setPassword("");
      setEmail("");
      setOpenPassword(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {openPassword
                      ? "Enter your password 💞"
                      : " Trying SpotLove for the first time? "}
                  </Dialog.Title>
                  <div className="mt-2">
                    {!openPassword ? (
                      <p className="text-sm text-gray-500">
                        SpotLove is currently in beta. Please send us your
                        Spotify account email if you would like to try out the
                        app. We will then send you a code to create an account
                        and try out the application.💞
                      </p>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Enter the password you received in your email to sign in
                        to SpotLove.
                      </span>
                    )}

                    {!openPassword && (
                      <p
                        data-cy="password-open-button"
                        className="cursor-pointer pt-3 hover:text-peach-dark hover:underline"
                        onClick={() => setOpenPassword(true)}
                      >
                        {" "}
                        I already have a code{" "}
                      </p>
                    )}
                  </div>

                  {!openPassword ? (
                    <form className="mt-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          data-cy="email-input"
                          id="email"
                          name="email"
                          type="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-peach focus:ring-peach sm:text-sm"
                          placeholder="Please enter your email"
                          maxLength={50}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <button
                        data-cy="send-email-button"
                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-peach to-peach-dark px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                        onClick={() => handleSubmitEmail(event)}
                      >
                        Send
                      </button>
                    </form>
                  ) : (
                    <form className="mt-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-peach focus:ring-peach sm:text-sm"
                          placeholder="Please enter your password"
                          maxLength={50}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <button
                        data-cy="button-continue-login"
                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-peach to-peach-dark px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                        onClick={() => handleSubmitPassword(event)}
                      >
                        Continue
                      </button>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
