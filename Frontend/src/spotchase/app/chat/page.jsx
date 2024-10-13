"use client";
import axios from "axios";
import {
  ref,
  push,
  query,
  orderByChild,
  onValue,
  update,
  get,
} from "firebase/database";
import { rdb } from "../../services/firebaseClient";
import { useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "../../store/user-context";
import { FeedbackContext } from "../../store/feedback-context";
import { MatchesContext } from "../../store/matches-context";
import ModalReport from "../../components/modals/ModalReport";
import { getDistance } from "../../utils/getDistance";
import {
  ArrowLeftCircleIcon,
  Square2StackIcon,
  Cog8ToothIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  MusicalNoteIcon,
} from "@heroicons/react/20/solid";

// RDB SDK had to be imported from the client side to handle this feature
// Using apis to send message would be slow and inefficient

export default function Chat() {
  const { user, setUserFetching } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockOpen, setBlockOpen] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(true);
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { setAlert } = useContext(FeedbackContext);
  const { matches, isMatchesFetched } = useContext(MatchesContext);

  useEffect(() => {
    if (selectedUser) {
      const messagesRef = ref(rdb, `Messages/${selectedUser.id}`);
      const orderedMessagesQuery = query(
        messagesRef,
        orderByChild("timestamp"),
      );

      // Gather the messages for the selected user
      const unsubscribe = onValue(orderedMessagesQuery, (snapshot) => {
        const fetchedMessages = [];
        snapshot.forEach((childSnapshot) => {
          fetchedMessages.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [selectedUser, rdb]);

  // Set the selected user to the first match if no user is selected, good for bookmarking
  useEffect(() => {
    if (searchParams.get("userId") && matches.length > 0 && user) {
      const id = searchParams.get("userId");
      for (let i = 0; i < matches.length; i++) {
        if (matches[i].userid === id) {
          setSelectedUser(matches[i]);
          break;
        }
      }
    } else if (matches.length > 0 && user) {
      setSelectedUser(matches[0]);
    }
  }, [matches, searchParams, user]);

  return (
    user &&
    isMatchesFetched && (
      <>
        <ModalReport
          isOpen={openModal}
          setIsOpen={setOpenModal}
          id={user.id}
          targetUser={selectedUser?.userid}
          setAlert={setAlert}
          setUserFetching={setUserFetching}
        />
        {matches.length > 0 && (
          <div className="flex min-h-dvh overflow-x-hidden">
            {openSideBar && (
              <Sidebar
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
                setOpen={setOpenSideBar}
                matches={matches}
                setBlockOpen={setBlockOpen}
              />
            )}

            <SideChat
              user={user}
              messages={messages}
              selectedUser={selectedUser}
              setOpen={setOpenSideBar}
              open={openSideBar}
              setOpenModal={setOpenModal}
              setAlert={setAlert}
              setUserFetching={setUserFetching}
              blockOpen={blockOpen}
              setBlockOpen={setBlockOpen}
            />
          </div>
        )}

        {matches.length === 0 && (
          <a
            href={`/feed`}
            className="flex h-dvh cursor-pointer flex-col items-center justify-center"
          >
            <h2 className="text-center text-6xl font-black text-peach-dark hover:underline">
              No matches yet
            </h2>

            <p className="pt-1 text-gray-500">
              Start swiping to find your match
            </p>
          </a>
        )}
      </>
    )
  );
}

const Sidebar = ({
  setSelectedUser,
  setOpen,
  matches,
  selectedUser,
  setBlockOpen,
}) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  // change the selected user and update the URL
  const handleSelect = (match) => {
    setSelectedUser(match);
    const updatedUrl = new URL(window.location.href);
    updatedUrl.searchParams.set("userId", match.userid);
    router.push(updatedUrl.pathname + updatedUrl.search);
    setOpen(false);
    setBlockOpen(true);
  };

  useEffect(() => {
    // Update the notification count for the selected user, user has read the messages
    const updateNotification = async () => {
      const notificationReference = ref(
        rdb,
        `Chats/${selectedUser.id}/notifications`,
      );

      const allNotifications = ref(rdb, `Notifications/`);
      const notificationSnapshot = await get(notificationReference);
      const allNotificationSnapshot = await get(allNotifications);
      const allNotification = allNotificationSnapshot.val();
      const notification = notificationSnapshot.val();

      if (notification == null) return;
      if (notification[user.id] > 0) {
        allNotification[user.id] =
          allNotification[user.id] - notification[user.id];
        await update(allNotifications, allNotification);
        await update(notificationReference, {
          [user.id]: 0,
        });
      }
    };

    // Update the last message on sidebar
    if (selectedUser) {
      const messagesRef = ref(rdb, `Messages/`);
      const orderedMessagesQuery = query(messagesRef);
      updateNotification();
      const unsubscribe = onValue(orderedMessagesQuery, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const lastMessage =
            childSnapshot.val()[
              Object.keys(childSnapshot.val())[
                Object.keys(childSnapshot.val()).length - 1
              ]
            ];
          matches.forEach((match) => {
            if (match.id === childSnapshot.key) {
              match.lastMessage = lastMessage;
            }
          });
        });
      });
      return () => unsubscribe();
    }
  }, [selectedUser, rdb, matches]);

  return (
    <aside
      id="default-sidebar"
      className={` left-0 top-0 z-30  h-dvh  translate-x-0 bg-gray-50 drop-shadow-md transition-transform md:max-w-lg`}
      aria-label="Sidebar"
    >
      <div className=" inner-shadow h-5/6 overflow-x-hidden overflow-y-scroll pl-5 pr-8 font-avenir md:pr-8 ">
        <div className="  flex flex-col justify-center pb-5 pr-2 pt-5  ">
          <div className="flex items-center border-b pb-5 ">
            <img
              src="SpotLoveSubmark.png"
              alt="SpotLove"
              className="h-10 w-auto "
            />
            <div
              className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text pb-1 pl-2 pr-5 text-3xl 
      font-black text-transparent md:text-5xl"
            >
              <h2 className=""> Messages </h2>
            </div>
          </div>
          <ul className=" items-center space-y-5  pt-5 font-medium">
            {matches.map((match) => (
              <>
                <li
                  key={match.userid}
                  onClick={() => handleSelect(match)}
                  className="flex cursor-pointer items-center justify-start  space-x-2 border-b pb-5  "
                >
                  <div className="relative mr-2 h-10 w-10 flex-shrink-0 md:h-14 md:w-14">
                    {match?.type == "musicmatch" && (
                      <span class="absolute left-0 top-0  flex  h-4  w-4 items-center justify-center rounded-full bg-peach p-1 ">
                        <MusicalNoteIcon className=" h-4 w-4 cursor-pointer text-white " />
                      </span>
                    )}

                    <img
                      src={match?.img}
                      className=" h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <span
                      className={`text-3xl font-black ${selectedUser?.userid == match.userid ? "bg-gradient-to-t from-peach to-peach-dark bg-clip-text text-transparent" : "text-gray-200"}`}
                    >
                      {match?.name}
                    </span>
                    <p className="text-sm text-gray-500">
                      {match?.lastMessage
                        ? match.lastMessage.text
                        : "No messages yet"}
                    </p>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-40 mb-5  flex items-center gap-3 p-8">
          <a href={`/profile/${user.id}`}>
            <img
              src={user?.img}
              className=" h-10 w-10 rounded-full object-cover opacity-10 hover:opacity-100"
            />
          </a>
          <a href={`/`}>
            <Square2StackIcon className="h-8 w-8 cursor-pointer text-peach-dark opacity-40 hover:opacity-100" />
          </a>
          <a href={`/settings`}>
            <Cog8ToothIcon className="h-8 w-8 cursor-pointer text-peach-dark opacity-40 hover:opacity-100" />
          </a>
        </div>
      </div>
    </aside>
  );
};

const SideChat = ({
  user,
  selectedUser,
  setOpen,
  messages,
  setOpenModal,
  setAlert,
  setUserFetching,
  blockOpen,
  setBlockOpen,
}) => {
  const [messageInput, setMessageInput] = useState("");

  // Open the report modal
  const handleClickReport = (event) => {
    setOpenModal(true);
  };
  const handleBlock = async () => {
    await axios
      .post(
        `/api/block/user`,
        {
          blockUserId: selectedUser.userid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setAlert({
            active: true,
            type: "success",
            message: res.data.message,
          });
          setUserFetching(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          active: true,
          type: "error",
          message: "Something went wrong",
        });
      });
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return; // Prevent sending empty messages

    const message = {
      text: messageInput,
      from: user.id,
      to: selectedUser.userid,
      timestamp: Date.now(),
    };

    // Send the message to the database and update the notification count
    const reference = ref(rdb, `Messages/${selectedUser.id}`);
    const notificationReference = ref(
      rdb,
      `Chats/${selectedUser.id}/notifications`,
    );

    const allNotifications = ref(rdb, `Notifications/`);
    const notificationSnapshot = await get(notificationReference);
    const allNotificationSnapshot = await get(allNotifications);
    const notification = notificationSnapshot.val();
    const allNotification = allNotificationSnapshot.val();
    const newNotification = notification[selectedUser.userid] + 1;

    allNotification[selectedUser.userid] =
      allNotification[selectedUser.userid] + 1;
    try {
      await push(reference, message);
      await update(notificationReference, {
        [selectedUser.userid]: newNotification,
      });
      await update(allNotifications, allNotification);
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message: ", error);
      setAlert({
        active: true,
        type: "error",
        message: "Failed to send message",
      });
    }
  };

  return (
    <>
      {selectedUser && (
        <>
          {selectedUser.isBlocked && blockOpen && !selectedUser.blockedBy && (
            <>
              <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-90">
                <XMarkIcon
                  className=" absolute right-0 top-0 mt-3 h-10 w-10 cursor-pointer text-white hover:scale-105 "
                  onClick={() => setBlockOpen(false)}
                />
                <h2 className="px-5 text-center text-3xl text-white">
                  You have blocked this user
                </h2>
                <button
                  className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text px-5 py-2 text-xl font-black text-white hover:scale-105 hover:underline "
                  onClick={handleBlock}
                >
                  Unblock
                </button>
              </div>
            </>
          )}

          {selectedUser.blockedBy && blockOpen && (
            <>
              <div className=" fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-90">
                <XMarkIcon
                  className=" absolute right-0 top-0 mt-3 h-10 w-10 cursor-pointer text-white hover:scale-105 "
                  onClick={() => setBlockOpen(false)}
                />
                <h2 className="px-10 text-center text-3xl text-white">
                  You have been blocked by this user
                </h2>
              </div>
            </>
          )}

          <main
            className={`relative flex h-dvh flex-grow  flex-col font-avenir `}
          >
            <div className=" absolute right-0 top-0 z-20 flex w-full items-center rounded-md bg-white bg-opacity-95 pb-5 pt-8 shadow-sm hover:opacity-100  ">
              <ArrowLeftCircleIcon
                className="mx-3 cursor-pointer text-peach opacity-10 hover:opacity-100" // Remove width and height attributes and add w-full h-full
                height={40}
                width={40}
                onClick={() => setOpen((open) => !open)}
              />{" "}
              {/* Use Tailwind classes to set the size */}
              <div className="mr-3 h-10 w-10 flex-shrink-0 md:h-14 md:w-14">
                {" "}
                {/* Use Tailwind classes to set the size */}
                {selectedUser?.isDeleted ? (
                  <img
                    src={selectedUser.img}
                    className=" h-full w-full rounded-full object-cover" // Remove width and height attributes and add w-full h-full
                  />
                ) : (
                  <a href={`/profile/${selectedUser.userid}`}>
                    <img
                      src={selectedUser.img}
                      className=" h-full w-full rounded-full object-cover" // Remove width and height attributes and add w-full h-full
                    />
                  </a>
                )}
              </div>
              <div className="flex pr-2">
                <div className="">
                  <span className=" bg-gradient-to-r from-peach to-peach-dark bg-clip-text text-3xl font-black text-transparent drop-shadow-sm fold:text-xl sm:text-3xl">
                    {selectedUser.name}
                  </span>
                  {!selectedUser.isDeleted && (
                    <p className="text-sm text-gray-500">
                      {selectedUser.age} | {getDistance(user, selectedUser)} KM{" "}
                    </p>
                  )}
                </div>
                {!selectedUser.isDeleted && (
                  <ExclamationCircleIcon
                    onClick={handleClickReport}
                    className="mb-10  h-5 w-5 cursor-pointer opacity-10 hover:opacity-60"
                  />
                )}
              </div>
              <div></div>
            </div>

            <div className="hideScrollbar z-10 mb-20 flex w-full flex-col gap-6 overflow-x-hidden overflow-y-scroll rounded-lg pb-14 pl-10 pt-36 ">
              {!selectedUser.isDeleted && (
                <div className="flex flex-col items-center justify-center rounded-md pb-10 text-center opacity-70">
                  <a
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 p-3 shadow-md hover:scale-105 hover:shadow-lg"
                    href={selectedUser.playlist}
                  >
                    <img
                      src="SpotLoveSubmark.png"
                      width={100}
                      height={100}
                      alt="Logo"
                    ></img>
                    <span className="w-40 bg-gradient-to-r from-peach to-peach-dark bg-clip-text pt-2 text-center font-black text-transparent">
                      {selectedUser.name} & {user.name}
                    </span>
                  </a>
                  <span className="bg-gradient-to-r from-peach to-peach-dark bg-clip-text pt-4 text-center font-black text-transparent md:text-3xl">
                    Your Match Playlist
                  </span>
                  <p className="pt-2 text-center text-xs text-gray-500">
                    A smart blend of all your favourite music <br /> to help
                    deepen your connection 🎉
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  user={user}
                  selectedUser={selectedUser}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-40 mt-8   bg-white  pb-8   ">
              <form
                className="flex w-full items-center justify-between gap-3 px-8 pt-5 shadow-inner"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  disabled={
                    selectedUser.isBlocked ||
                    selectedUser.blockedBy ||
                    selectedUser?.isDeleted
                  }
                  placeholder="Type a message..."
                  className={`w-full rounded-full border border-gray-200 p-3 shadow-sm focus:border-transparent focus:outline-none focus:ring-2  focus:ring-peach ${(selectedUser.isBlocked || selectedUser.blockedBy || selectedUser?.isDeleted) && "cursor-not-allowed"}`}
                  value={messageInput} // Control the input with state
                  onChange={(e) => setMessageInput(e.target.value)} // Update state as the user types
                  maxLength={500}
                />

                <button
                  type="submit"
                  onClick={sendMessage}
                  className={`flex items-center rounded-xl bg-gradient-to-t from-peach to-peach-dark px-5 py-2 font-semibold text-white hover:scale-105  ${selectedUser.isBlocked || selectedUser.blockedBy || selectedUser?.isDeleted ? "cursor-not-allowed" : "cursor-pointer"} `}
                >
                  Send
                </button>
              </form>
            </div>
          </main>
        </>
      )}
    </>
  );
};

const Message = ({ message, user, selectedUser }) => {
  const { id, text, from, timestamp } = message;
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const chatter = from == user.id ? user : selectedUser;

  return (
    <div
      className={`flex items-start gap-1.5 ${from == user.id ? "self-end" : "self-start"} `}
    >
      <div className="h-8 w-8 flex-shrink-0 ">
        <img
          className="h-full w-full rounded-full object-cover"
          src={chatter.img}
          alt={chatter.name}
        />
      </div>
      <div className="leading-1.5 flex w-full max-w-[150px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gradient-to-t from-peach to-peach-dark p-4   md:max-w-[320px] ">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-white">
            {chatter.name}
          </span>
          <span className="text-xs font-normal text-white">{time}</span>
        </div>
        <p className="py-2.5 text-xs font-normal text-white ">{text}</p>
      </div>
    </div>
  );
};
