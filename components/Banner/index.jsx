import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <section className="relative bg-white">
      <img
        className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 mobile:opacity-100"
        src="https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80"
        alt="Couple on a bed with a dog"
      />

      <div className="hidden mobile:block mobile:inset-0 mobile:absolute mobile:bg-gradient-to-r mobile:from-white mobile:to-transparent"></div>

      <div className="relative max-w-screen-xl mobile:py-20 mobile:px-5 mx-auto desktop:h-screen desktop:items-center desktop:justify-center tablet:justify-center tablet:flex desktop:flex">
        <div className="max-w-xl text-center mobile:text-left">
          <h1 className="text-3xl font-extrabold mobile:text-5xl">
            All the latest news
            <strong className="font-extrabold text-rose-700 mobile:block">
              At Your Finger Tip
            </strong>
          </h1>

          <p className="max-w-lg mt-4 desktop:leading-relaxed desktop:text-xl text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="flex flex-wrap gap-4 mt-8 text-center justify-center">
            <Link href="/profile">
              <div
                className="block w-full px-12 py-3 text-mobile font-medium text-white rounded shadow bg-rose-600 mobile:w-auto active:bg-rose-500 hover:bg-rose-700 focus:outline-none focus:ring text-decoration:none"
                style={{cursor: 'pointer'}}
              >
                Become a Creator
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
