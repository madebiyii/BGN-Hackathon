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

// About page - SpotChase story and features

export default function About() {
  return (
    <>
      <Navbar page="About" />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-10 font-avenir">
          <div className="bg-gradient-to-l from-blue-500 to-green-500 bg-clip-text">
            <h3
              data-cy="main-title"
              className="px-2 pt-10 text-center text-6xl font-semibold text-transparent lg:text-8xl xl:text-9xl"
            >
              {" "}
              Our Story{" "}
            </h3>

            <img
              data-cy="about-image"
              src="/black.jpg"
              alt="Adventure and Exploration"
              width={800}
              height={800}
              className="my-10 h-full w-full rounded-3xl object-cover"
            />

            <p
              data-cy="about-text1"
              className="text-md text-left text-gray-600 lg:pt-5 lg:text-xl"
            >
              Welcome to SpotChase, the ultimate app for adventurers and explorers! At SpotChase, we believe every journey is a story waiting to be written. Whether you're discovering new destinations, chasing hidden gems, or meeting fellow travelers, SpotChase is here to guide your adventures. We take the hassle out of planning, helping you create, share, and explore personalized itineraries. Whether you're new to a place or on holiday, SpotChase ensures every moment is well spent without the stress of organizing activities.
            </p>
            <p
              data-cy="about-text2"
              className="text-md pt-5 text-left text-gray-600 lg:text-xl"
            >
              SpotChase was created by a group of passionate explorers who believe technology can enhance how we experience the world. Our founders,{" "}
              <a
                data-cy="about-link1"
                className="text-blue-600"
                href="https://www.linkedin.com/in/michael-adebiyi/"
              >
                {" "}
                Michael Adebiyi{" "}
              </a>{" "}
              ,{" "}
              <a
                data-cy="about-link2"
                className="text-blue-600"
                href="https://www.linkedin.com/in/bryan-chikwendu/"
              >
                {" "}
                Bryan Chikwendu{" "}
              </a>{" "}
              ,{" "}
              <a
                data-cy="about-link3"
                className="text-blue-600"
                href="https://www.linkedin.com/in/faith-omotayo/"
              >
                {" "}
                Faith Omotayo{" "}
              </a>{" "}
              ,{" "}
              <a
                data-cy="about-link4"
                className="text-blue-600"
                href="https://www.linkedin.com/in/teniola-malomo/"
              >
                {" "}
                Teniola Malomo{" "}
              </a>{" "}
              embarked on a mission to merge their love for travel with cutting-edge technology. Together, they envisioned SpotChase—a platform designed to inspire adventure and make planning trips effortless for all explorers.
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
      name: "Itinerary Sharing",
      description:
        "SpotChase makes sharing travel plans easy. Whether you're heading on vacation or just exploring a new city, you can create and share custom itineraries with friends, taking the guesswork out of planning. Discover exciting activities without the hassle, so you can focus on enjoying your trip.",
      id: "itinerary-sharing",
    },
    {
      name: "Personalized Adventures",
      description:
        "Our app personalizes your exploration based on your preferences, offering curated recommendations that match your style of travel. Whether you’re seeking serene landscapes or thrilling expeditions, SpotChase ensures every experience is tailored just for you.",
      id: "personalized-adventures",
    },
    {
      name: "Community Interactions",
      description:
        "SpotChase fosters a global community of travelers. Share your journey, connect with fellow explorers, and collaborate on new adventures. Our community-based features allow you to exchange tips, share your routes, and create memories with like-minded travelers.",
      id: "community-interactions",
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
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-blue-500 lg:text-4xl">
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

  // Opens and closes the FAQ section
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "How do I get started with SpotChase?",
      answer:
        "Simply log in to the app, set your destination, and begin your adventure! SpotChase offers curated suggestions for every traveler.",
    },
    {
      question: "Is SpotChase available on mobile devices?",
      answer:
        "Yes! SpotChase is accessible on all devices with a browser, allowing you to explore on the go.",
    },
    {
      question: "How does the community feature work?",
      answer:
        "SpotChase's community feature allows users to share their journeys, offer tips, and collaborate on discovering new destinations.",
    },
    {
      question: "What age group can use SpotChase?",
      answer:
        "SpotChase is available to users aged 18 and above, ensuring a safe and inclusive environment for all adventurers.",
    },
  ];

  return (
    <>
      <motion.div
        className="border bg-gradient-to-l from-blue-500 to-green-500 p-10 font-avenir lg:mt-10 xl:p-32"
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
