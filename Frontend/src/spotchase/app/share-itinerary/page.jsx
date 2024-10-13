"use client";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

// Modal component for viewing images
function Modal({ isOpen, mediaSrc, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        <button
          className="absolute top-0 right-0 m-4 text-white text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={mediaSrc} alt="Preview" className="max-w-full max-h-full" />
      </div>
    </div>
  );
}

export default function ShareItinerary() {
  const [itinerary, setItinerary] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    activities: [],
    budget: "",
    currency: "USD",
    companions: "",
    specialNotes: "",
    media: [], // Track multiple media files
    season: "", // New season field
  });

  const [activityInput, setActivityInput] = useState("");
  const [previewMedia, setPreviewMedia] = useState(null); // For media preview
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  const handleChange = (e) => {
    setItinerary({ ...itinerary, [e.target.name]: e.target.value });
  };

  const handleCurrencyChange = (e) => {
    setItinerary({ ...itinerary, currency: e.target.value });
  };

  const handleActivityChange = (e) => {
    setActivityInput(e.target.value);
  };

  const addActivity = () => {
    if (activityInput) {
      setItinerary({
        ...itinerary,
        activities: [...itinerary.activities, activityInput],
      });
      setActivityInput("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedMedia = [...itinerary.media, ...files];
    setItinerary({ ...itinerary, media: updatedMedia });
  };

  const handleMediaClick = (mediaSrc) => {
    setPreviewMedia(mediaSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPreviewMedia(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Itinerary Submitted:", itinerary);
  };

  return (
    <>
      <Navbar page="Share Itinerary" />
      <main className="bg-white text-gray-900">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-center text-4xl font-bold text-blue-500">
            Share Your Travel Itinerary
          </h1>
          <p className="text-center text-lg text-gray-500 mb-8">
            Help others discover new places by sharing what you did during your trip!
          </p>

          <form
            className="bg-white p-8 shadow-lg rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Existing Fields */}
              <div>
                <label className="block text-xl font-semibold mb-2">
                  Trip Name
                </label>
                <input
                  type="text"
                  name="tripName"
                  value={itinerary.tripName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="E.g. Summer Adventure in Bali"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-semibold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={itinerary.destination}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="E.g. Bali, Indonesia"
                  required
                />
              </div>

              {/* New Season Field */}
              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Season of Travel
                </label>
                <select
                  name="season"
                  value={itinerary.season}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  required
                >
                  <option value="">Select Season</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                </select>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={itinerary.startDate}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-semibold mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={itinerary.endDate}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Budget
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="budget"
                    value={itinerary.budget}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border"
                    placeholder="E.g. 2000"
                    required
                  />
                  <select
                    name="currency"
                    value={itinerary.currency}
                    onChange={handleCurrencyChange}
                    className="p-3 rounded-lg border"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>

              {/* Activities */}
              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Add Activities
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={activityInput}
                    onChange={handleActivityChange}
                    className="w-full p-3 rounded-lg border"
                    placeholder="E.g. Surfing, Beach party, etc."
                  />
                  <button
                    type="button"
                    onClick={addActivity}
                    className="bg-blue-500 text-white p-3 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-4">
                  {itinerary.activities.map((activity, index) => (
                    <li
                      key={index}
                      className="bg-blue-100 text-blue-700 py-2 px-4 mb-2 rounded-lg"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upload Media */}
              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Upload Media (Optional)
                </label>
                <input
                  type="file"
                  name="media"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full p-3 rounded-lg border"
                />
                {/* Thumbnails for Uploaded Images */}
                <div className="flex mt-4 gap-4">
                  {Array.from(itinerary.media).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="Uploaded Preview"
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                      onClick={() => handleMediaClick(URL.createObjectURL(file))}
                    />
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Special Notes
                </label>
                <textarea
                  name="specialNotes"
                  value={itinerary.specialNotes}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="Any special considerations or notes"
                  rows="4"
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:scale-105"
              >
                Share Itinerary
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />

      {/* Modal for full-size media preview */}
      <Modal isOpen={isModalOpen} mediaSrc={previewMedia} onClose={closeModal} />
    </>
  );
}
