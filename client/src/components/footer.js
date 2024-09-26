import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 5000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 lg:mr-20">
              <a href="#home" className="flex items-center">
                <img
                  src={process.env.PUBLIC_URL + "/images/logo-s.png"}
                  className="h-8 me-3"
                  alt="Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Marfat-al-Quran
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#home" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#blog" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:underline">
                      Courses
                    </a>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a href="#facebook" className="hover:underline ">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#instagram" className="hover:underline">
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Marfat-al-Quran™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
              <a
                href="#facebook"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                {/* Add Facebook icon */}
              </a>
              <a
                href="#instagram"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                {/* Add Instagram icon */}
              </a>
              {/* Add other social media icons here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
