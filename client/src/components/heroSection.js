import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <div
        className="relative bg-cover bg-center h-[60vh] flex items-center text-white"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg-img.jpg)`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 text-center p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s transition duration-1000">
            Marfat-ul-Quran
          </h1>
          <p className="text-lg md:text-xl mb-4 animate__animated animate__fadeIn animate__delay-2s transition duration-1000">
            Your Gateway towards eternal success
          </p>
          <p className="text-sm md:text-base mb-6 animate__animated animate__fadeIn animate__delay-3s transition duration-1000">
            Learn to Read and understand Quran in an innovative way
          </p>
          <Link to="/registration">
            <button className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-700 transition duration-300 animate__animated animate__fadeIn animate__delay-4s">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
