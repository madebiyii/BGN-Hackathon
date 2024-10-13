import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function ModalOnboarding(props) {
  const { isOpen, setIsOpen, handleProfileUpdate, name, img, setAlert } = props;
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [userName, setUsername] = useState(name.split(" ")[0]);
  const [arrayBuffer, setArrayBuffer] = useState(null);

  const nameValidation = (name) => {
    if (name.length == 0 || !/^[a-zA-Z ]+$/.test(name) || name.length >= 748) {
      return false;
    }
    return true;
  };

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

  // send to API
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameValidation(userName)) {
      setAlert({
        type: "warning",
        message: "Please add your first name",
        active: true,
      });
      console.log("Invalid name");
    } else if (file && !fileValidation(file)) {
      console.log("Invalid file");
      setAlert({
        type: "warning",
        message: "Only PNG, JPG or JPEG up to 5MB allowed",
        active: true,
      });
    } else {
      const data = new FormData();
      data.append("name", userName);
      if (file && !isDeleted) {
        data.append("img", file);
      } else if (!file && img && !isDeleted) {
        data.append("img", "Default");
      } else if (isDeleted) {
        data.append("img", "None");
      }
      handleProfileUpdate(data);
      setIsOpen(false);
    }
  };

  const handleDelete = () => {
    URL.revokeObjectURL(url);
    setUrl("");
    setFile(null);
    setIsDeleted(true);
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
        // Had to use FileReader to convert the file/blob to ArrayBuffer to post data
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuff = event.target.result;
          setArrayBuffer(arrayBuff);
        };
        reader.readAsArrayBuffer(file);
      }
      setFile(file);
      setIsDeleted(false);
      setUrl(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => console.log(null)}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  xl:max-w-4xl xl:scale-110">
                  <Dialog.Title
                    as="h3"
                    className="py-1 text-2xl font-bold leading-6 text-peach"
                  >
                    Update your profile 🤔
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} data-cy="modal-onboarding">
                    <div className="py-5 sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-peach sm:max-w-md xl:max-w-full">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                            placeholder={name.split(" ")[0]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Profile Picture
                      </label>
                      <div className="flex pt-2 text-sm text-gray-500">
                        <p>
                          Choose an image or{" "}
                          <span
                            className="cursor-pointer text-peach hover:animate-pulse"
                            onClick={() => handleDelete()}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleDelete()
                            }
                          >
                            remove
                          </span>{" "}
                          the current one to update your profile picture.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-full my-5">
                      <div
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragging(false);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragging(true);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleImageUpload(e.dataTransfer.files[0]);
                          setDragging(false);
                        }}
                        onDrag={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragging(true);
                        }}
                      >
                        <div className="relative text-center">
                          {file && (
                            <img
                              src={url}
                              alt="Selected Image"
                              className="mx-auto h-20 w-20 rounded-full object-cover text-gray-300"
                            />
                          )}
                          {!file && !isDeleted && (
                            <img
                              src={img}
                              alt={name}
                              className="mx-auto h-20 w-20 rounded-full object-cover text-gray-300"
                            />
                          )}

                          {isDeleted && !file && (
                            <UserCircleIcon className="mx-auto h-20 w-20 text-gray-300" />
                          )}

                          {!isDeleted && (
                            <div className="absolute bottom-2 right-14 grid -translate-x-0 -translate-y-10 transform cursor-pointer place-items-center justify-center  rounded-full bg-black p-2 text-center text-white hover:scale-95 hover:text-peach-dark">
                              <TrashIcon
                                className="h-3 w-3"
                                onClick={() => handleDelete()}
                              />
                            </div>
                          )}

                          <div className="flex text-sm leading-6 text-gray-600">
                            <label className="cursor-pointer rounded-md bg-white font-semibold text-peach focus-within:outline-none focus-within:ring-2 focus-within:ring-peach-dark focus-within:ring-offset-2 hover:text-peach-dark">
                              <span>Upload a file</span>
                              <input
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
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const file = e.dataTransfer.files[0];
                                  if (file) {
                                    handleImageUpload(file);
                                  }
                                }}
                                accept="image/png, image/jpeg, image/jpg"
                              />
                            </label>
                            <p className="pl-1 ">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG or JPEG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-peach to-peach-dark px-4  py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      >
                        Continue
                      </button>
                    </div>
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
