import Link from "next/link";
// Customized 404 page

export default async function NotFound() {
  return (
    <div className="grid h-dvh place-items-center bg-gradient-to-r from-peach to-peach-dark">
      <div className="justify-center text-center font-avenir md:scale-150">
        <h3 className="text-[100px] font-semibold text-white md:text-[200px]">
          404{" "}
        </h3>
        <p className="-mt-5 pb-5 text-5xl font-normal text-white md:-mt-12">
          Page not found
        </p>
        <Link
          href="/"
          className="text-2xl font-normal text-white hover:underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
