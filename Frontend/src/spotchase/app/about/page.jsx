"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";

// About page - SpotLove story and features

export default function About() {
  return (
    <>
      <Navbar page="About" />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-10 font-avenir">
          <div className="bg-gradient-to-l from-peach to-peach-dark bg-clip-text">
            <h3
              data-cy="main-title"
              className="px-2 pt-10 text-center text-6xl font-semibold text-transparent lg:text-8xl xl:text-9xl"
            >
              {" "}
              Our Story{" "}
            </h3>

            <img
              data-cy="about-image"
              src="/header.webp"
              alt="Software Company"
              width={800}
              height={800}
              className="my-10 h-full w-full rounded-3xl object-cover"
            />

            <p
              data-cy="about-text1"
              className="text-md text-left text-gray-500 lg:pt-5 lg:text-xl"
            >
              Welcome to SpotLove, the revolutionary dating app where music is
              the heartbeat of connection! At SpotLove, we believe that music
              isn’t just a part of life; it’s the rhythm that connects us. Our
              app is dedicated to bringing people together through their shared
              love of music, offering a unique and immersive experience in the
              world of online dating. Whether you're a fan of pop, rock, jazz,
              or classical, SpotLove is your ticket to finding someone who not
              only shares your interests but also dances to the same beat.
            </p>
            <p
              data-cy="about-text2"
              className="text-md pt-5 text-left text-gray-500 lg:text-xl"
            >
              SpotLove was born out of a passion for music and its power to
              connect people. Founded by two music enthusiasts and tech
              innovators{" "}
              <a
                data-cy="about-link1"
                className="text-peach-dark"
                href="https://www.linkedin.com/in/jeffrey-igala-a369a9203/"
              >
                {" "}
                Jeffrey Igala{" "}
              </a>{" "}
              and{" "}
              <a
                data-cy="about-link2"
                className="text-peach-dark"
                href="https://www.linkedin.com/in/joseph-adedayo-559564238/"
              >
                {" "}
                Joseph Adedayo{" "}
              </a>{" "}
              who found regular dating applications to be lacking creativity and
              wanted to develop a more immersive experience for music lovers.
              Since then, our team has worked tirelessly to blend the magic of
              music with the potential of technology. We're a diverse crew,
              united by our love for tunes and the belief that everyone deserves
              a soundtrack to their love story.
            </p>
            <Features />
          </div>
        </div>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

const Features = () => {
  const features = [
    {
      name: "Music Integration",
      description:
        "SpotLove revolutionizes the way you connect with music and romance by integrating a state-of-the-art music player directly within the app. This feature allows users to effortlessly explore and play a wide array of songs, spanning various genres and eras, without ever leaving the interface. Imagine swiping through potential matches while listening to their favorite tracks, creating a seamless and immersive soundtrack that enhances your romantic adventures. Whether you're in the mood for upbeat pop melodies or mellow jazz tunes, SpotLove's music integration enriches your dating experience, making every interaction uniquely harmonious and vibrant. ",
      id: "music-integration",
    },
    {
      name: "Unique Matching",
      description:
        "At the heart of SpotLove is our innovative matching system, designed to find your perfect musical soulmate. Our advanced algorithm doesn't just look at your profile; it delves deep into your music preferences, analyzing your favorite genres, artists, and songs to create a harmonious match with someone who shares a similar soundtrack to their life. This 'love at first song' approach ensures that every match is based on a meaningful connection, transforming the way you discover and bond with potential partners. Whether it's a shared love for classic rock anthems or an appreciation for contemporary indie tracks, our matching system is finely tuned to orchestrate romantic connections that resonate on a deeper, more personal level. ",
      id: "unique-matching",
    },
    {
      name: "New Interactions",
      description:
        "SpotLove redefines the art of conversation in the online dating scene with its music-infused chat feature. This isn't just another messaging platform; it's a dynamic space where you can share tracks, discuss your favorite albums, and bond over shared musical interests. These music-themed interactions pave the way for deeper, more meaningful conversations, allowing you to connect with others on an emotional and artistic level. Whether you're sending a song that expresses your feelings or discussing the latest music festival, our chat feature ensures that every message strikes the right chord, setting the stage for more melodious and heartfelt interactions.",
      id: "new-interactions",
    },
  ];

  return (
    <>
      <div className=" ">
        <div className="grid gap-4 py-10 md:pt-14 lg:py-10">
          {features.map((feature) => (
            <div
              className="w-full rounded-3xl bg-white py-3"
              key={feature.name}
              id={feature.id}
            >
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-peach-dark lg:text-4xl">
                {feature.name}
              </h5>

              <p className="mb-3 font-normal text-gray-500 lg:text-xl">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  //Opens and closes the FAQ section
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: " How do I get started with SpotLove?",
      answer:
        "Simply enter the app, sign in with your Spotify account, and let the musical journey to love begin!",
    },
    {
      question: "Is SpotLove available on mobile devices?",
      answer:
        "SpotLove is accessible on all devices with a browser, ensuring you can connect with matches wherever you go.",
    },

    {
      question: "How does the 'music match' badge work?",
      answer:
        "The 'music match' badge appears on profiles of users who have recently listened to the same song as you, signaling a shared musical interest.",
    },

    {
      question: "What ages can use SpotLove?",
      answer:
        "SpotLove is available to users aged 18 and above, ensuring a safe and inclusive environment for all music lovers.",
    },
  ];

  return (
    <>
      <motion.div
        className="border bg-gradient-to-l from-peach to-peach-dark p-10 font-avenir lg:mt-10 xl:p-32"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-6 text-3xl font-semibold text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-6 flex cursor-pointer border-b pb-4"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex w-full justify-between">
                <div>
                  <h3
                    data-cy={`faq-title${index}`}
                    className="text-xl font-semibold text-white"
                  >
                    {faq.question}
                  </h3>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      data-cy={`faq-text${index}`}
                    >
                      <p className="mt-2 text-white">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>

                {openIndex === index ? (
                  <ArrowUpCircleIcon className="h-6 w-6 flex-shrink-0 text-white" />
                ) : (
                  <ArrowDownCircleIcon className="h-6 w-6 flex-shrink-0 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
