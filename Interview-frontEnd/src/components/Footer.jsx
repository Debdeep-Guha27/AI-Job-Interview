import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black z-50 text-white py-6 text-center flex">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-end px-5">
        <button
          className="block mt-4 text-sm text-center border border-white text-white px-4 py-2 rounded-full"
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
