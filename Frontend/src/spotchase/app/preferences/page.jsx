// "use client";
// import { useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";

// export default function Preferences() {
//   // States for managing the form inputs
//   const [mostLikedActivities, setMostLikedActivities] = useState([]);
//   const [leastLikedActivities, setLeastLikedActivities] = useState([]);
//   const [lessPreferredActivities, setLessPreferredActivities] = useState([]);
//   const [otherActivities, setOtherActivities] = useState("");
//   const [destination, setDestination] = useState("");
//   const [groupPreference, setGroupPreference] = useState([]);
//   const [dietaryRestrictions, setDietaryRestrictions] = useState("");

//   const handleCheckboxChange = (e, setter, state) => {
//     if (e.target.checked) {
//       setter([...state, e.target.value]);
//     } else {
//       setter(state.filter((item) => item !== e.target.value));
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-5 py-10">
//         <h2 className="text-4xl font-bold text-blue-600 mb-5">User Preferences</h2>
//         <p className="text-lg mb-5">
//           Please fill out the following information to help us create a personalized travel itinerary just for you!
//         </p>

//         <form>
//           {/* Personal Information */}
//           <section className="mb-10">
//             <h3 className="text-2xl font-semibold mb-3">1. Personal Information</h3>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Name:</label>
//               <input type="text" className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Email Address:</label>
//               <input type="email" className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Religion (if any):</label>
//               <input type="text" className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Cultural Background:</label>
//               <input type="text" className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Preferred Language for Communication:</label>
//               <input type="text" className="w-full p-2 border rounded" />
//             </div>
//           </section>

//           {/* Travel Interests */}
//           <section className="mb-10">
//             <h3 className="text-2xl font-semibold mb-3">2. Travel Interests</h3>

//             <div className="mb-4">
//               <p className="font-bold">Outdoor Activities:</p>
//               <label>
//                 <input type="checkbox" value="Hiking" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Hiking
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Biking" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Biking
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Beach Activities" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Beach Activities
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Water Sports" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Water Sports
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Nature Tours" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Nature Tours
//               </label>
//             </div>

//             <div className="mb-4">
//               <p className="font-bold">Cultural Experiences:</p>
//               <label>
//                 <input type="checkbox" value="Museums" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Museums
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Historical Tours" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Historical Tours
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Local Festivals" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Local Festivals
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Art Galleries" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Art Galleries
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Cultural Workshops" onChange={(e) => handleCheckboxChange(e, setMostLikedActivities, mostLikedActivities)} /> Cultural Workshops
//               </label>
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Any other specific activities you would like to do?</label>
//               <input type="text" value={otherActivities} onChange={(e) => setOtherActivities(e.target.value)} className="w-full p-2 border rounded" />
//             </div>
//           </section>

//           {/* Trip Details */}
//           <section className="mb-10">
//             <h3 className="text-2xl font-semibold mb-3">3. Trip Details</h3>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Desired travel dates:</label>
//               <input type="date" className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Trip duration (in days):</label>
//               <input type="number" className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Destination(s) or regions of interest:</label>
//               <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full p-2 border rounded" />
//             </div>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">What is the purpose of your trip?</label>
//               <select className="w-full p-2 border rounded">
//                 <option value="Leisure">Leisure</option>
//                 <option value="Adventure">Adventure</option>
//                 <option value="Business">Business</option>
//                 <option value="Cultural Exploration">Cultural Exploration</option>
//                 <option value="Family Visit">Family Visit</option>
//               </select>
//             </div>
//           </section>

//           {/* Group Preferences */}
//           <section className="mb-10">
//             <h3 className="text-2xl font-semibold mb-3">4. Group Preferences</h3>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Who are you traveling with?</label>
//               <label>
//                 <input type="checkbox" value="Solo" onChange={(e) => handleCheckboxChange(e, setGroupPreference, groupPreference)} /> Solo
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Partner" onChange={(e) => handleCheckboxChange(e, setGroupPreference, groupPreference)} /> Partner
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Family" onChange={(e) => handleCheckboxChange(e, setGroupPreference, groupPreference)} /> Family
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Friends" onChange={(e) => handleCheckboxChange(e, setGroupPreference, groupPreference)} /> Friends
//               </label><br />
//               <label>
//                 <input type="checkbox" value="Group Tour" onChange={(e) => handleCheckboxChange(e, setGroupPreference, groupPreference)} /> Group Tour
//               </label>
//             </div>
//           </section>

//           {/* Dietary Preferences */}
//           <section className="mb-10">
//             <h3 className="text-2xl font-semibold mb-3">5. Dietary Preferences</h3>

//             <div className="mb-4">
//               <label className="block font-bold mb-1">Do you have any dietary restrictions or preferences?</label>
//               <input type="text" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} className="w-full p-2 border rounded" />
//             </div>
//           </section>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button className="bg-blue-600 text-white p-3 rounded hover:bg-blue-800">Submit Preferences</button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }



"use client";

import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function Preferences() {
  const [selectedActivities, setSelectedActivities] = useState([]);
  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedActivities((prevSelected) =>
      checked
        ? [...prevSelected, name]
        : prevSelected.filter((activity) => activity !== name)
    );
  };

  return (
    <>
      <Navbar page="Preferences" />
      <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10">
        <div className="container mx-auto max-w-4xl rounded-lg bg-white shadow-lg">
          <div className="p-8">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-6">
              User Preferences
            </h1>
            <p className="text-center text-lg text-gray-600 mb-10">
              Please fill out the following information to help us create a personalized travel itinerary just for you!
            </p>

            {/* Form Section */}
            <div className="space-y-8">
              {/* Personal Information */}
              <section className="p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">
                  1. Personal Information
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-gray-600">Name:</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Email Address:</label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Religion (if any):</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Religion"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Cultural Background:</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Cultural Background"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">
                      Preferred Language for Communication:
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Preferred Language"
                    />
                  </div>
                </div>
              </section>

              {/* Travel Interests */}
              <section className="p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">
                  2. Travel Interests
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Outdoor Activities
                    </h3>
                    <div className="space-y-2">
                      {['Hiking', 'Biking', 'Beach Activities', 'Water Sports', 'Nature Tours'].map((activity) => (
                        <label key={activity} className="flex items-center">
                          <input
                            type="checkbox"
                            name={activity}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded-full"
                            onChange={handleCheckboxChange}
                          />
                          <span className="ml-2">{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Cultural Experiences
                    </h3>
                    <div className="space-y-2">
                      {['Museums', 'Historical Tours', 'Local Festivals', 'Art Galleries', 'Cultural Workshops'].map((activity) => (
                        <label key={activity} className="flex items-center">
                          <input
                            type="checkbox"
                            name={activity}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded-full"
                            onChange={handleCheckboxChange}
                          />
                          <span className="ml-2">{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Repeat for Food and Drink, Adventure, etc. */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Food and Drink
                    </h3>
                    <div className="space-y-2">
                      {['Food Tours', 'Cooking Classes', 'Wine or Beer Tastings', 'Street Food Exploration', 'Fine Dining Experiences'].map((activity) => (
                        <label key={activity} className="flex items-center">
                          <input
                            type="checkbox"
                            name={activity}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded-full"
                            onChange={handleCheckboxChange}
                          />
                          <span className="ml-2">{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Add more categories here... */}
                </div>
              </section>

              {/* Trip Details */}
              <section className="p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">
                  3. Trip Details
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-gray-600">Desired Travel Dates:</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Travel Dates"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Trip Duration (in days):</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Trip Duration"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">
                      Destination(s) or regions of interest:
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Destination(s)"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Purpose of your trip:</label>
                    <select className="w-full rounded-lg border border-gray-300 p-2 shadow-sm">
                      <option value="leisure">Leisure</option>
                      <option value="adventure">Adventure</option>
                      <option value="business">Business</option>
                      <option value="cultural">Cultural Exploration</option>
                      <option value="family">Family Visit</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Budget Information */}
              <section className="p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">
                  4. Budget Information
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-gray-600">Total travel budget ($):</label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Total Budget"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Daily budget ($):</label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
                      placeholder="Daily Budget"
                    />
                  </div>
                  
                  {/* Section 5: Group Preferences & Special Considerations */}
<div className="mb-10">
  <h2 className="text-2xl font-semibold">5. Group Preferences & Special Considerations</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <div>
      <p className="font-semibold">Who are you traveling with?</p>
      <label><input type="checkbox" /> Solo</label><br />
      <label><input type="checkbox" /> Partner</label><br />
      <label><input type="checkbox" /> Family</label><br />
      <label><input type="checkbox" /> Friends</label><br />
      <label><input type="checkbox" /> Group Tour</label><br />
    </div>
    <div>
      <p className="font-semibold">Do you have any dietary restrictions?</p>
      <input className="border p-3 rounded-lg w-full" placeholder="Dietary Restrictions" />
      <p className="mt-4 font-semibold">Accessibility Needs:</p>
      <input className="border p-3 rounded-lg w-full" placeholder="Accessibility Needs" />
    </div>
  </div>

  <div className="mt-4">
    <p className="font-semibold">Preferred time for activities:</p>
    <label><input type="checkbox" /> Morning</label><br />
    <label><input type="checkbox" /> Afternoon</label><br />
    <label><input type="checkbox" /> Evening</label><br />
  </div>

  <div className="mt-4">
    <p className="font-semibold">Would you like to include any spiritual or religious sites in your itinerary?</p>
    <label><input type="checkbox" /> Yes</label><br />
    <label><input type="checkbox" /> No</label><br />
  </div>
</div>

                </div>
              </section>

                
             
            </div>

            {/* Submit Button */}
            <div className="mt-10 flex justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition">
                Submit Preferences
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
