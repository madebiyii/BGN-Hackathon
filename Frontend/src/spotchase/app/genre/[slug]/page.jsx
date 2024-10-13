"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";
import { useState, useEffect, useContext } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { PlayerContext } from "../../../store/player-context";
import { Splash } from "../../../components/loaders/SplashScreen";
import { generateContent } from "../../../services/gptService";

// Genre page - AI Generated content for each genre
export default function Genre() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const newSlug = decodeURIComponent(slug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .post(`/api/playlists/get`, {
            genre: newSlug,
          })
          .then((res) => setPlaylists(res.data)); // Fetch playlists for the genre
        const data = await generateContent(newSlug); // Generate content for the genre
        setContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setIsFetched(true);
      }
    };
    if (newSlug && !isFetched) {
      fetchData();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Splash />
      ) : (
        <Content title={newSlug} content={content} playlists={playlists} />
      )}
    </div>
  );
}

const Content = ({ content, title, playlists }) => {
  const router = useRouter();
  const { setTrack, setIsChanging } = useContext(PlayerContext);
  const backgroundImageUrl =
    playlists.length > 0 && playlists[0].images.length > 0
      ? playlists[0].images[0].url
      : "";
  // Background image gradient with genre title and image of the first playlist
  const backgroundStyle = {
    background: `linear-gradient(rgba(249, 106, 108, 0.9), rgba(252, 87, 140, 0.9)), url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };

  // Mobile and desktop play functionality
  const handlePlay = (playlist) => {
    if (isMobile) {
      window.open(playlist.external_urls.spotify, "_blank");
      return;
    }
    const track = {
      name: playlist.name,
      album: {
        external_urls: {
          spotify: playlist.external_urls.spotify,
        },
      },
      artists: [
        {
          name: playlist.owner.display_name,
          external_urls: {
            spotify: playlist.owner.external_urls.spotify,
          },
        },
      ],
      context_uri: playlist.uri,
      mobile: playlist.external_urls.spotify,
    };

    setTrack(track);
    setIsChanging(true);
  };

  return (
    <>
      <div
        className="h-full pb-32 shadow-inner drop-shadow-lg"
        style={backgroundStyle}
      >
        <div className="h-full items-center justify-center bg-opacity-20   ">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="pt-20 text-7xl font-black text-white drop-shadow-md md:text-9xl">
              {title[0].toUpperCase() + title.slice(1)}
            </h1>
            <p className="pt-2 text-3xl text-white md:text-4xl">Genre</p>
          </div>
        </div>
      </div>
      <div
        className="absolute z-50 cursor-pointer items-center justify-center bg-gradient-to-r from-peach to-peach-dark bg-clip-text pt-24 text-3xl font-semibold md:fixed md:pl-20"
        onClick={() => router.back()}
      >
        <ArrowLeftCircleIcon className="z-50 h-12 w-12 text-peach" />
      </div>
      <main className=" flex items-center justify-center px-10  md:px-48">
        <div className={`grid grid-cols-1 justify-center  `}>
          <div className=" flex  flex-col py-10 text-left md:pt-20">
            <div
              className="bg-gradient-to-t from-peach to-peach-dark bg-clip-text
       text-xl  text-transparent"
            >
              <h1 className="text-left text-2xl font-black md:text-5xl ">
                Description
              </h1>
            </div>
            <p className="pt-5 text-lg text-black"> {content} </p>
          </div>
          <div className="flex flex-col items-center gap-4 py-4 pb-20 text-center md:flex-row ">
            {playlists.map((playlist) => (
              <div
                className="flex-shrink-0 cursor-pointer items-center justify-center text-center  hover:scale-95"
                onClick={() => handlePlay(playlist)}
              >
                <div className="h-52 w-52 overflow-hidden text-center">
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-48 bg-gradient-to-t from-peach to-peach-dark bg-clip-text text-center">
                  <h3 className="mt-2 overflow-hidden truncate  text-ellipsis text-sm font-semibold text-transparent">
                    {playlist.name}
                  </h3>
                  <p className="overflow-hidden truncate text-ellipsis text-xs text-gray-600">
                    {playlist.description.includes("<a") ||
                    playlist.description.length == 0
                      ? "SpotLove"
                      : playlist.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
