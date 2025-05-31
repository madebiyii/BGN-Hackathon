"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return setStatus("Please enter an email.");

    const { data, error } = await supabase
      .from("beta_emails")
      .insert([{ email }]);

    if (error) {
      console.error("Supabase error:", error);
      setStatus("Something went wrong. Try again.");
    } else {
      setStatus("Thank you! You've been added to the beta list.");
      setEmail("");
    }
  };

  return (
    <>
      <Navbar page="Signup" />
      <main className="min-h-screen bg-white px-4 py-10 font-avenir text-center text-gray-900">
        <h1 className="mb-4 text-4xl font-bold text-blue-600">Join Beta Access</h1>
        <p className="mb-6 text-gray-600">Sign up to be the first to try SpotChase!</p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border p-4 text-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white text-lg font-semibold hover:scale-95"
          >
            Join Now
          </button>
        </form>

        {status && (
          <p className="mt-6 text-md font-medium text-green-600">{status}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
