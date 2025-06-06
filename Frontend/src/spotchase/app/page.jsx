// "use client";
// import { motion, useInView } from "framer-motion";
// import { useRef, useState } from "react";
// import Image from "next/image";
// import SplashScreen from "../components/loaders/SplashScreen";
// import Navbar from "../components/navbar/Navbar";
// import Footer from "../components/footer/Footer";
// import {
//   MapPinIcon,
//   UsersIcon,
//   GlobeAltIcon,
// } from "@heroicons/react/24/solid";

// export default function Home() {
//   return <>{<HomePage />}</>;
// }

// const HomePage = () => {
//   const [splash, setSplash] = useState(true);
//   return (
//     <>
//       <SplashScreen setSplash={setSplash} />

//       {splash && (
//         <main className="overflow-x-hidden font-avenir">
//           <Hero />

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: false }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="xl:px-auto grid items-center justify-center gap-2 rounded-xl px-10 pt-10 md:mx-20 md:px-10 xl:mt-20 xl:grid-cols-2"
//           >
//             <div className="">
//               <h3
//                 data-cy="content-title1"
//                 className="bg-gradient-to-r from-green-400 to-green-600 
//               bg-clip-text text-left text-3xl font-semibold text-transparent md:px-10 md:pb-10 md:text-8xl lg:pb-5 lg:text-8xl lg:font-black"
//               >
//                 Chase Your <br />
//                 Adventures
//               </h3>
//               <p
//                 data-cy="content-text1"
//                 className="pt-2 font-normal text-green-400 md:p-10 md:pt-5 md:text-4xl"
//               >
//                 {" "}
//                 Where every path leads to new discoveries. <br />
//                 Explore the world with SpotChase 🌍{" "}
//               </p>
//             </div>

//             <img
//               data-cy="content-image1"
//               src="/pplfun.webp"
//               alt="Person Exploring"
//               width={900}
//               height={900}
//               className="mb-2 mt-8 rounded-3xl shadow-lg md:mb-0"
//             />
//           </motion.div>

//           <Steps />
//           <Features />

//           <div className="mb-10 items-center p-5 xl:p-10">
//             <p className="mb-10 mt-12 text-center text-lg font-normal text-gray-400 md:mb-20 md:pt-3 md:text-3xl xl:ml-10">
//               We use top technology to bring you the ultimate exploration experience!
//             </p>
//           </div>

//           <ConnectWithGoogle />
//           <Footer />
//         </main>
//       )}
//     </>
//   );
// };

// const Hero = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: false }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       <div
//         className="h-dvh bg-opacity-50 bg-[url('/bg.jpeg')] bg-cover bg-center
//     bg-no-repeat font-avenir md:bg-[url('/bg.jpeg')]"
//       >
//         <Navbar page={"Home"} />
//         <div className="flex h-2/3 items-center justify-center overscroll-x-none ">
//           {/* Hero text */}
//           <div className="justify-center text-center">
//             <h1
//               data-cy="hero-title"
//               className="mb-4 font-avenir text-3xl font-semibold text-white md:text-9xl lg:font-black"
//             >
//               Find Your Next Adventure
//             </h1>
//             <p className="text-md px-5 text-blue-900 md:text-4xl">
//               Discover new places and experiences with SpotChase
//             </p>

//             <a href="/login" className="justify-center text-center">
//               <div className="m-auto mt-10 w-2/4 cursor-pointer rounded-3xl bg-white px-10 py-2 shadow-lg hover:scale-95 md:py-5">
//                 <span
//                   className="whitespace-nowrap bg-gradient-to-r from-green-400 
//       to-green-600 bg-clip-text text-2xl font-bold text-transparent md:text-4xl"
//                 >
//                   Log in
//                 </span>
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         data-cy="web-screenshot"
//         className="px-auto -mt-40 flex justify-center md:-mt-16 xl:-mt-28 2xl:-mt-52"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: false }}
//         transition={{ duration: 0.6, ease: "linear" }}
//       >
//         <img
//           src="/cards.jpg"
//           alt="Destinations"
//           width={1600}
//           height={1600}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };

// const Steps = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: false }}
//       transition={{ duration: 1, ease: "easeOut" }}
//       className="bg-white px-10 py-2 md:mt-10 md:py-5"
//       data-cy="steps"
//     >
//       <div className="mt-10 grid gap-10 px-5 md:grid-cols-2 lg:grid-cols-4">
//         <div className="flex flex-col items-center">
//           <h2
//             className="bg-gradient-to-r  from-blue-400 to-green-600 bg-clip-text text-left 
//        text-5xl font-semibold text-transparent"
//           >
//             {" "}
//             Step 1{" "}
//           </h2>
//           <a href="/login">
//             <h3 className="mt-5 cursor-pointer text-center text-xl font-semibold hover:underline">
//               Log in and Set Your Destination
//             </h3>
//           </a>
//           <p className="mt-2 text-center text-sm text-gray-500">
//             Start by choosing your destination and let SpotChase map out your journey.
//           </p>
//         </div>

//         <div className="flex flex-col items-center">
//           <h2
//             className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-left 
//        text-5xl font-semibold text-transparent"
//           >
//             {" "}
//             Step 2
//           </h2>
//           <h3 className="mt-5 text-center text-xl font-semibold">
//             Discover Unique Experiences
//           </h3>
//           <p className="mt-2 text-center text-sm text-gray-500">
//             Let SpotChase suggest adventures and hidden gems tailored just for you.
//           </p>
//         </div>

//         <div className="flex flex-col items-center">
//           <h2
//             className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-left 
//        text-5xl font-semibold text-transparent"
//           >
//             {" "}
//             Step 3
//           </h2>
//           <h3 className="mt-5 text-center text-xl font-semibold">
//             Track Your Journey
//           </h3>
//           <p className="mt-2 text-center text-sm text-gray-500">
//             SpotChase tracks your adventure in real-time. Keep a log of every moment.
//           </p>
//         </div>

//         <div className="flex flex-col items-center">
//           <h2
//             className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-left 
//        text-5xl font-semibold text-transparent"
//           >
//             Step 4
//           </h2>
//           <h3 className="mt-5 text-xl font-semibold">Share Your Journey</h3>
//           <p className="mt-2 text-center text-sm text-gray-500">
//             Inspire others by sharing your experiences and routes on SpotChase.
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Features = () => {
//   const features = [
//     {
//       name: "Interactive Maps",
//       description:
//         "Use our interactive maps to plan your routes and explore new places seamlessly.",
//       icon: (
//         <MapPinIcon className="mb-5 h-8 w-8 text-blue-400 lg:h-12 lg:w-12" />
//       ),
//       link: "about/#interactive-maps",
//     },
//     {
//       name: "Personalized Adventures",
//       description:
//         "Our algorithm customizes your adventure based on your preferences, making each journey unique.",
//       icon: (
//         <GlobeAltIcon className="mb-5 h-8 w-8 text-blue-400 lg:h-12 lg:w-12" />
//       ),
//       link: "about/#personalized-adventures",
//     },
//     {
//       name: "Community Interaction",
//       description:
//         "Connect with fellow travelers, share tips, and collaborate on discovering new places.",
//       icon: (
//         <UsersIcon className="mb-5 h-8 w-8 text-blue-400 lg:h-12 lg:w-12" />
//       ),
//       link: "about/#community-interaction",
//     },
//   ];

//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false });
//   const container = {
//     whileInView: { opacity: 1, y: 0 },
//     hidden: { opacity: 1, scale: 0 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delayChildren: 0.1,
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//     },
//   };
//   return (
//     <>
//       <div
//         data-cy="features"
//         className="mt-12 rounded-t-3xl bg-gradient-to-r from-blue-400 to-green-600 px-5 pt-10 shadow-xl drop-shadow-lg lg:mt-28 lg:px-10 lg:pt-14 2xl:px-40"
//       >
//         <h3 className="text-shadow-lg bg-gradient-to-r pt-5 text-left text-2xl font-bold text-white md:pb-5 md:text-7xl xl:text-8xl 2xl:text-9xl">
//           All the Right Tools for Adventure!
//         </h3>
//         <p className="pt-2 font-normal text-white md:pt-3 md:text-4xl">
//           Innovative features designed to guide and inspire your travels.
//         </p>
//         <motion.div
//           variants={container}
//           ref={ref}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid gap-4 py-10 md:pt-14 lg:grid-cols-3 lg:py-20 "
//         >
//           {features.map((feature) => (
//             <motion.div
//               variants={item}
//               className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:p-10"
//               key={feature.name}
//             >
//               {feature.icon}

//               <a href={feature.link}>
//                 <h5 className="mb-2 text-2xl font-semibold tracking-tight text-blue-400 lg:text-4xl">
//                   {feature.name}
//                 </h5>
//               </a>
//               <p className="mb-3 font-normal text-gray-500 lg:text-xl">
//                 {feature.description}
//               </p>
//               <a
//                 href={feature.link}
//                 className="inline-flex items-center text-blue-400 hover:underline lg:text-lg"
//               >
//                 Learn More
//                 <svg
//                   className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 18 18"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                   />
//                 </svg>
//               </a>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </>
//   );
// };

// const ConnectWithGoogle = () => {
//   return (
//     <div className="w-full rounded-lg border-t p-4 py-20 text-center sm:p-8">
//       <h5 className="mb-2 text-3xl font-bold text-gray-900 md:py-4">
//         Start Your Journey Now!
//       </h5>
//       <p className="mb-5 text-base text-gray-500 sm:text-lg">
//         Log in with your Google account to begin exploring.
//       </p>
//       <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse">
//         <a
//           href="/login"
//           className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r  from-blue-400 to-green-600 px-4 py-2.5 text-white hover:scale-95 sm:w-auto"
//         >
//           <svg
//             className="me-3 h-7 w-7"
//             xmlns="http://www.w3.org/2000/svg"
//             shapeRendering="geometricPrecision"
//             textRendering="geometricPrecision"
//             imageRendering="optimizeQuality"
//             fillRule="evenodd"
//             clipRule="evenodd"
//             viewBox="0 0 512 511.991"
//           >
//             <path
//               fill="#fff"
//               fillRule="nonzero"
//               d="M255.998.003C114.616.003 0 114.616 0 255.997c0 141.385 114.616 255.994 255.998 255.994C397.395 511.991 512 397.386 512 255.997 512 114.624 397.395.015 255.994.015l.004-.015v.003zm117.4 369.22c-4.585 7.519-14.427 9.908-21.949 5.288-60.104-36.714-135.771-45.027-224.882-24.668-8.587 1.954-17.146-3.425-19.104-12.015-1.967-8.591 3.394-17.15 12.003-19.104 97.518-22.28 181.164-12.688 248.645 28.55 7.522 4.616 9.907 14.427 5.288 21.95l-.001-.001zm31.335-69.703c-5.779 9.389-18.067 12.353-27.452 6.578-68.813-42.298-173.703-54.548-255.096-29.837-10.556 3.187-21.704-2.761-24.906-13.298-3.18-10.556 2.772-21.68 13.309-24.891 92.971-28.208 208.551-14.546 287.574 34.015 9.385 5.779 12.35 18.067 6.575 27.441v-.004l-.004-.004zm2.692-72.584c-82.511-49.006-218.635-53.51-297.409-29.603-12.649 3.837-26.027-3.302-29.86-15.955-3.832-12.656 3.303-26.023 15.96-29.867 90.428-27.452 240.753-22.149 335.747 34.245 11.401 6.754 15.133 21.446 8.375 32.809-6.728 11.378-21.462 15.13-32.802 8.371h-.011z"
//             />
//           </svg>
//           <div className="text-left rtl:text-right">
//             <div className="mb-1 text-xs">Connect with Google</div>
//             <div className="-mt-1 font-sans text-sm font-semibold">Google</div>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import SplashScreen from "../components/loaders/SplashScreen";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import {
  MapPinIcon,
  UsersIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  return <>{<HomePage />}</>;
}

const HomePage = () => {
  const [splash, setSplash] = useState(true);
  return (
    <>
      <SplashScreen setSplash={setSplash} />
      {splash && (
        <main className="overflow-x-hidden font-avenir">
          <Hero />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="xl:px-auto grid items-center justify-center gap-2 rounded-xl px-10 pt-10 md:mx-20 md:px-10 xl:mt-20 xl:grid-cols-2"
          >
            <div>
              <h3
                data-cy="content-title1"
                className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-left text-3xl font-semibold text-transparent md:px-10 md:pb-10 md:text-8xl lg:pb-5 lg:text-8xl lg:font-black"
              >
                Chase Your <br /> Adventures
              </h3>
              <p
                data-cy="content-text1"
                className="pt-2 font-normal text-green-400 md:p-10 md:pt-5 md:text-4xl"
              >
                Where every path leads to new discoveries. <br /> Explore the world with SpotChase 🌍
              </p>
            </div>
            <img
              data-cy="content-image1"
              src="/pplfun.webp"
              alt="Person Exploring"
              width={900}
              height={900}
              className="mb-2 mt-8 rounded-3xl shadow-lg md:mb-0"
            />
          </motion.div>

          <Steps />
          <Features />

          <div className="mb-10 items-center p-5 xl:p-10">
            <p className="mb-10 mt-12 text-center text-lg font-normal text-gray-400 md:mb-20 md:pt-3 md:text-3xl xl:ml-10">
              We use top technology to bring you the ultimate exploration experience!
            </p>
          </div>

          <ConnectWithGoogle />
          <Footer />
        </main>
      )}
    </>
  );
};

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="h-dvh bg-opacity-50 bg-[url('/bg.jpeg')] bg-cover bg-center bg-no-repeat font-avenir">
        <Navbar page={"Home"} />
        <div className="flex h-2/3 items-center justify-center">
          <div className="text-center">
            <h1 data-cy="hero-title" className="mb-4 text-3xl font-semibold text-white md:text-9xl lg:font-black">
              Find Your Next Adventure
            </h1>
            <p className="px-5 text-white md:text-4xl">
              Discover new places and experiences with SpotChase
            </p>
            <a href="/signup">
              <div className="m-auto mt-10 w-2/4 cursor-pointer rounded-3xl bg-white px-10 py-2 shadow-lg hover:scale-95 md:py-5">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
                  Join Beta Access
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <motion.div
        data-cy="web-screenshot"
        className="px-auto -mt-40 flex justify-center md:-mt-16 xl:-mt-28 2xl:-mt-52"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "linear" }}
      >
        <img src="/cards.jpg" alt="Destinations" width={1600} height={1600} />
      </motion.div>
    </motion.div>
  );
};

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-white px-10 py-2 md:mt-10 md:py-5"
      data-cy="steps"
    >
      <div className="mt-10 grid gap-10 px-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
            Step 1
          </h2>
          <a href="/signup">
            <h3 className="mt-5 cursor-pointer text-center text-xl font-semibold hover:underline">
              Join and Set Your Destination
            </h3>
          </a>
          <p className="mt-2 text-center text-sm text-gray-500">
            Start by choosing your destination and let SpotChase map out your journey.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
            Step 2
          </h2>
          <h3 className="mt-5 text-center text-xl font-semibold">Discover Unique Experiences</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            Let SpotChase suggest adventures and hidden gems tailored just for you.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
            Step 3
          </h2>
          <h3 className="mt-5 text-center text-xl font-semibold">Track Your Journey</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            SpotChase tracks your adventure in real-time. Keep a log of every moment.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
            Step 4
          </h2>
          <h3 className="mt-5 text-xl font-semibold">Share Your Journey</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            Inspire others by sharing your experiences and routes on SpotChase.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      name: "Interactive Maps",
      description: "Use our interactive maps to plan your routes and explore new places seamlessly.",
      icon: <MapPinIcon className="mb-5 h-8 w-8 text-blue-400 lg:h-12 lg:w-12" />,
      link: "about/#interactive-maps",
    },
    {
      name: "Personalized Adventures",
      description: "Our algorithm customizes your adventure based on your preferences, making each journey unique.",
      icon: <GlobeAltIcon className="mb-5 h-8 w-8 text-blue-400 lg:h-12 lg:w-12" />,
      link: "about/#personalized-adventures",
    },
    {
      name: "Community Interaction",
      description: "Connect with fellow travelers, share tips, and collaborate on discovering new places.",
      icon: <UsersIcon className="mb-5 h-8 w-8 text-blue-400 lg:h-12 lg:w-12" />,
      link: "about/#community-interaction",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const container = {
    whileInView: { opacity: 1, y: 0 },
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      data-cy="features"
      className="mt-12 rounded-t-3xl bg-gradient-to-r from-blue-400 to-green-600 px-5 pt-10 shadow-xl drop-shadow-lg lg:mt-28 lg:px-10 lg:pt-14 2xl:px-40"
    >
      <h3 className="text-shadow-lg bg-gradient-to-r pt-5 text-left text-2xl font-bold text-white md:pb-5 md:text-7xl xl:text-8xl 2xl:text-9xl">
        All the Right Tools for Adventure!
      </h3>
      <p className="pt-2 font-normal text-white md:pt-3 md:text-4xl">
        Innovative features designed to guide and inspire your travels.
      </p>
      <motion.div
        variants={container}
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-4 py-10 md:pt-14 lg:grid-cols-3 lg:py-20"
      >
        {features.map((feature) => (
          <motion.div
            variants={item}
            className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:p-10"
            key={feature.name}
          >
            {feature.icon}
            <a href={feature.link}>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-blue-400 lg:text-4xl">
                {feature.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 lg:text-xl">
              {feature.description}
            </p>
            <a href={feature.link} className="inline-flex items-center text-blue-400 hover:underline lg:text-lg">
              Learn More
              <svg
                className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const ConnectWithGoogle = () => {
  return (
    <div className="w-full rounded-lg border-t p-4 py-20 text-center sm:p-8">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 md:py-4">Start Your Journey Now!</h5>
      <p className="mb-5 text-base text-gray-500 sm:text-lg">Join our beta to explore SpotChase.</p>
      <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse">
        <a
          href="/signup"
          className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-green-600 px-4 py-2.5 text-white hover:scale-95 sm:w-auto"
        >
          <span className="text-sm font-semibold">Join Beta Access</span>
        </a>
      </div>
    </div>
  );
};