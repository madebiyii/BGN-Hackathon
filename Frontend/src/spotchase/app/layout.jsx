import "./globals.css";
import { UserContextProvider } from "../store/user-context";
import { FeedbackContextProvider } from "../store/feedback-context";
import { SessionContextProvider } from "../store/provider";
import { MatchesContextProvider } from "../store/matches-context";
import { PlayerContextProvider } from "../store/player-context";
import Player from "../components/player/Player";
import Script from "next/script";

export const metadata = {
  title: "SpotChase",
  description: "Chasing the moments that matter!.",
  icons: {
    icon: "/spotchasesubmark.png",
  },
};
// Root layout for the app, Context Providers for global state management and Player component around the whole app
export default function RootLayout({ children }) {
  return (
    <SessionContextProvider>
      <UserContextProvider>
        <MatchesContextProvider>
          <FeedbackContextProvider>
            <PlayerContextProvider>
              <html lang="en">
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9CZblzpgvWGt-Z0w3PorZx_Uwf0mAla4&libraries=places&loading=async" />
                <body className={"font-avenir"}>
                  <Player />
                  {children}
                </body>
              </html>
            </PlayerContextProvider>
          </FeedbackContextProvider>
        </MatchesContextProvider>
      </UserContextProvider>
    </SessionContextProvider>
  );
}
