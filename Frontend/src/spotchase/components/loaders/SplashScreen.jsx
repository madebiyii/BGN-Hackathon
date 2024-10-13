"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Simple splash screen component

export default function SplashScreen(props) {
  const { setSplash } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSplash(false);
    setTimeout(() => {
      setLoading(false);
      setSplash(true);
    }, 3000);
  }, []);

  return <>{loading && <Splash />}</>;
}

export const Splash = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-none fixed  animate-pulse md:relative md:top-0"
      data-cy="splash"
    >
      <div className="flex h-dvh flex-col items-center justify-center p-5 ">
        <img
          src="/bwspotchase.png"
          alt="Spotchase Logo"
          width={700}
          height={700}
          className="md:p-0"
        />
      </div>
    </motion.div>
  );
};
