import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 5000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <div className="flex flex-wrap gap-3 justify-center items-center mt-6 p-6">
        <h1 className="w-[100%] text-center text-4xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s transition duration-1000">
          Why Choose Us?
        </h1>
        <div className="sm:w-[full] sm:mx-3 bg-blue-300 p-4 mb-4 rounded-md hover:bg-blue-400 transition duration-100 ease-in-out animate__animated animate__fadeIn animate__delay-1s">
          <h1 className="text-xl font-semibold">Worldwide recognition</h1>
        </div>
        <div className="sm:w-[full] sm:mx-3 bg-blue-300 p-4 mb-4 rounded-md hover:bg-blue-400 transition duration-100 ease-in-out animate__animated animate__fadeIn animate__delay-2s">
          <h1 className="text-xl font-semibold">Best tutoring system</h1>
        </div>
        <div className="sm:w-[full] sm:mx-3 bg-blue-300 p-4 mb-4 rounded-md hover:bg-blue-400 transition duration-100 ease-in-out animate__animated animate__fadeIn animate__delay-4s">
          <h1 className="text-xl font-semibold">Evaluation of Assessments</h1>
        </div>
        <div className="sm:w-[full] sm:mx-3 bg-blue-300 p-4 mb-4 rounded-md hover:bg-blue-400 transition duration-100 ease-in-out animate__animated animate__fadeIn animate__delay-5s">
          <h1 className="text-xl font-semibold">24/7 Support</h1>
        </div>
      </div>
    </div>
  );
};

export default Services;
