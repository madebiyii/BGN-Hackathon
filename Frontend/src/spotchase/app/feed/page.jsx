
// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";

// export default function Feed() {
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const handleScroll = () => {
//     const position = window.pageYOffset;
//     setScrollPosition(position);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <Navbar page="Feed" />
//       <main className="bg-white">
//         <div className="mx-auto max-w-5xl px-10 py-20">
//           <h1 className="text-4xl font-bold text-center mb-10">Welcome to the Feed</h1>

//           <div className="text-center">
//             <p>Your feed is currently empty. Please set your travel preferences to get started!</p>
//           </div>

//           {/* Add Preferences Floating Button */}
//           <Link href="/preferences">
//             <div
//               className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition transform hover:scale-105 cursor-pointer"
//               style={{ position: 'fixed', right: '2%', bottom: scrollPosition > 100 ? '2%' : '10%' }}
//             >
//               Set Preferences
//             </div>
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }


// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";

// export default function Feed() {
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const handleScroll = () => {
//     const position = window.pageYOffset;
//     setScrollPosition(position);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <Navbar page="Preferences" /> {/* Updated page prop */}
//       <main className="bg-white">
//         <div className="mx-auto max-w-5xl px-10 py-20">
//           <h1 className="text-4xl font-bold text-center mb-10">Welcome to the Feed</h1>

//           <div className="text-center">
//             <p>Your feed is currently empty. Please set your travel preferences to get started!</p>
//           </div>

//           {/* Add Preferences Floating Button */}
//           <Link href="/preferences">
//             <div
//               className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition transform hover:scale-105 cursor-pointer"
//               style={{ position: 'fixed', right: '2%', bottom: scrollPosition > 100 ? '2%' : '10%' }}
//             >
//               Set Preferences
//             </div>
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function Feed() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar page="Feed" /> {/* Updated page prop */}
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-10 py-20">
          <h1 className="text-4xl font-bold text-center mb-10">Welcome to the Feed</h1>

          <div className="text-center">
            <p>Your feed is currently empty. Please set your travel preferences to get started!</p>
          </div>

          {/* Add Preferences Floating Button */}
          <Link href="/preferences">
            <div
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition transform hover:scale-105 cursor-pointer"
              style={{ position: 'fixed', right: '2%', bottom: scrollPosition > 100 ? '2%' : '10%' }}
            >
              Set Preferences
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
