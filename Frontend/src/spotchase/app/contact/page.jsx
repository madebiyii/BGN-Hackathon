"use client";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", contactInfo);
    // Implement further form submission logic here
  };

  return (
    <>
      <Navbar page="Contact" />
      <main className="bg-white text-gray-900">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-center text-4xl font-bold text-blue-500">
            Contact Us
          </h1>
          <p className="text-center text-lg text-gray-500 mb-8">
            We’d love to hear from you! Fill out the form below to get in touch.
          </p>

          <form
            className="bg-white p-8 shadow-lg rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xl font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="E.g. John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-semibold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="E.g. john@example.com"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactInfo.subject}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="E.g. Inquiry about services"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xl font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactInfo.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border"
                  placeholder="Write your message here..."
                  rows="6"
                  required
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
