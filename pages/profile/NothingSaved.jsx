import Link from "next/link";
import React from "react";

const NothingSaved = () => {
  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold sm:text-3xl">Save useful news</h2>

      <p className="mx-auto mt-4 text-gray-500">
        You have nothing saved as of now.
      </p>

      <Link href="/">
        <div
          style={{ cursor: "pointer" }}
          className="flex items-center justify-between px-5 py-3 mt-8 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 group"
        >
          <span className="text-lg font-medium group-hover:text-white">
            Explore News Articles
          </span>

          <span className="flex-shrink-0 p-2 ml-4 bg-white border border-blue-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NothingSaved;
