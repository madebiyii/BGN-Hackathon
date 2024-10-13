import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ModalReport(props) {
  const { isOpen, setIsOpen, setAlert, targetUser, id, setUserFetching } =
    props;
  const [report, setReport] = useState("");

  async function handleReport(event) {
    event.preventDefault();

    // Report user using api, email will be sent to us with the report
    if (report.length == 0) {
      setAlert({
        active: true,
        message: "Please provide a more detailed description.",
        type: "error",
      });
    } else {
      await axios
        .post("/api/report/user", { report, targetUser, id })
        .then((res) => {
          if (res.status === 200) {
            setAlert({
              active: true,
              message: "User has been reported.",
              type: "success",
            });
            setUserFetching(true);
          } else {
            setAlert({
              active: true,
              message: "An error occurred. Please try again.",
              type: "error",
            });
          }
        });
      setReport("");
      setIsOpen(false);
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
                <Dialog.Panel
                  data-cy="modal-report"
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Report User ⚠️
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please report any inappropriate behavior or content to
                      SpotLove. We take these reports seriously and will take
                      action if necessary. The user will be hidden from your
                      feed.
                    </p>
                  </div>

                  <form className="mt-4">
                    <label
                      htmlFor="report"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reason for reporting
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="report"
                        name="report"
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-peach focus:ring-peach sm:text-sm"
                        placeholder="Please provide a brief description..."
                        maxLength={200}
                        value={report}
                        onChange={(e) => setReport(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-peach to-peach-dark px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      onClick={() => handleReport(event)}
                    >
                      Report
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
