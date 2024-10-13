export default function Footer() {
  return (
    <footer className="m-4 rounded-lg bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="md:flex md:items-center md:justify-between">
          <a
            href="/"
            className="mb-4 flex items-center space-x-3 md:mb-0 rtl:space-x-reverse"
          >
            <img
              data-cy="footer-logo"
              src="/bwspotchase.png"
              className="h-8"
              alt="SpotChase Logo"
            />
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a href="/about" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>

          

          
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2024{" "}
          <a href="/" className="hover:underline">
            SpotChase™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
