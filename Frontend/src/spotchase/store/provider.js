"use client";
import { SessionProvider } from "next-auth/react";

export const SessionContextProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
