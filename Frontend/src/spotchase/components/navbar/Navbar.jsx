import Link from "next/link";

// Simple Navbar component, changes color based on the page
export default function Navbar(props) {
  const color = props.page === "Home" ? "white" : "pink";
  const textGradient =
    "bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent";

  return (
    <nav className="bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="items-center justify-center gap-7 py-10  sm:mt-0 sm:flex md:py-10">
          <a href="/" className="cursor-pointer">
            {color === "white" ? (
              <img
                src={"/wbspotchase.png"}
                alt="SpotChase Logo"
                width={300}
                height={300}
                className="mx-auto mt-8 justify-center"
              />
            ) : (
              <img
                src={"/wbspotchase.png"}
                alt="SpotChase Logo"
                width={300}
                height={300}
                className="mx-auto justify-center pt-6 md:pt-1"
              />
            )}
          </a>

          <div className="ml-auto flex justify-center gap-2 sm:mt-8 sm:justify-end md:mt-7">
            <a href="/about" className="flex items-center justify-end px-2 py-4">
              <span
                className={`text-sm font-medium ${
                  color === "white" ? "text-white" : textGradient
                } md:text-xl`}
              >
                About
              </span>
            </a>

            <a href="/contact" className="flex items-center justify-end px-2 py-4">
              <span
                className={`text-sm font-medium ${
                  color === "white" ? "text-white" : textGradient
                } md:text-xl`}
              >
                Contact
              </span>
            </a>

            {/* Conditional rendering: Only show Log in on the Home page */}
            {props.page === "Home" ? (
              <Link href="/login">
                <div
                  className={`cursor-pointer rounded-xl ${
                    color === "white"
                      ? "bg-white"
                      : "bg-gradient-to-r from-blue-500 to-green-500"
                  } px-3 py-1 hover:scale-95 md:px-7`}
                >
                  <span
                    className={`whitespace-nowrap ${
                      color === "white" ? textGradient : "text-white"
                    } text-sm font-bold  md:text-xl`}
                  >
                    Log in
                  </span>
                </div>
              </Link>
            ) : (
              <>
                {/* Show Set Preferences on other pages */}
                {props.page !== "Preferences" && (
                  <Link href="/preferences">
                    <div
                      className={`cursor-pointer rounded-xl ${
                        color === "white"
                          ? "bg-white"
                          : "bg-gradient-to-r from-blue-500 to-green-500"
                      } px-3 py-1 hover:scale-95 md:px-7`}
                    >
                      <span
                        className={`whitespace-nowrap ${
                          color === "white" ? textGradient : "text-white"
                        } text-sm font-bold  md:text-xl`}
                      >
                        Set Preferences
                      </span>
                    </div>
                  </Link>
                )}

                {/* Show Share an Itinerary button on other pages */}
                <Link href="/share-itinerary">
                  <div
                    className={`cursor-pointer rounded-xl ${
                      color === "white"
                        ? "bg-white"
                        : "bg-gradient-to-r from-blue-500 to-green-500"
                    } px-3 py-1 hover:scale-95 md:px-7`}
                  >
                    <span
                      className={`whitespace-nowrap ${
                        color === "white" ? textGradient : "text-white"
                      } text-sm font-bold  md:text-xl`}
                    >
                      Share an Itinerary here
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
