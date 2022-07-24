import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl px-4 pt-16 pb-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <strong className="block text-xl font-medium text-center text-white sm:text-3xl">
            Want us to email you with the latest blockbuster news?
          </strong>

          <form className="mt-6">
            <div className="relative max-w-lg">
              <label className="sr-only" htmlFor="email">
                {" "}
                Email{" "}
              </label>

              <input
                className="w-full p-4 pr-16 text-sm font-medium bg-white border-none rounded-full"
                id="email"
                type="email"
                placeholder="john@doe.com"
              />

              <button
                className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-blue-600 p-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-blue-700"
                type="button"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="pt-8 mt-16 border-t border-white/10">
          <p className="text-xs leading-relaxed text-center text-gray-300">
            © Headlines.com 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
