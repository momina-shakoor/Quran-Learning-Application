import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const CustomNextArrow = (props) => (
  <div
    {...props}
    className="slick-arrow slick-next "
    style={{ background: "#347deb", borderRadius: "50%" }}
  />
);

const CustomPrevArrow = (props) => (
  <div
    {...props}
    className="slick-arrow slick-prev"
    style={{ background: "#347deb", borderRadius: "50%" }}
  />
);

const MultipleItems = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const cardDataList = [
    {
      title: "Tajweed Course",
      description:
        "Delve into the art and science of Quranic recitation, mastering the rules of pronunciation and intonation to enhance your understanding and spiritual connection with the holy text of Allah Almighty.",
      imageSrc: process.env.PUBLIC_URL + "/images/course-1.jpg",
      altText: "Image Alt Text 1",
    },
    {
      title: "Tafseer Course",
      description:
        "Explore the profound meanings and interpretations of the Quran, unraveling the context, history, and wisdom behind its verses to deepen your comprehension of Islamic teachings.",
      imageSrc: process.env.PUBLIC_URL + "/images/course-2.avif",
      altText: "Image Alt Text 2",
    },
    {
      title: "Seerah Course",
      description:
        "Embark on a captivating journey through the life and times of Prophet Muhammad (PBUH), gaining insights into his character, teachings, and the historical context, fostering a profound understanding of Islamic history.",
      imageSrc: process.env.PUBLIC_URL + "/images/course-3.jpg",
      altText: "Image Alt Text 3",
    },
    {
      title: "Tarjuma Course",
      description:
        "Delve into the art of Quranic translation, exploring the meanings and interpretations of the Holy Quran, enhancing your comprehension and connection with the beautiful words of Allah.",
      imageSrc: process.env.PUBLIC_URL + "/images/course-4.jpg",
      altText: "Image Alt Text 3",
    },
  ];

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <div className="slider-container lg:mx-6 lg:pl-2 sm:pl-14 mr-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Courses</h1>
        <Slider {...settings}>
          {cardDataList.map((cardData, index) => (
            <div
              key={index}
              className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100"
            >
              <a href={cardData.link}>
                <img
                  className="rounded-t-lg"
                  src={cardData.imageSrc}
                  alt={cardData.altText}
                />
              </a>
              <div className="p-5">
                <a href={cardData.link}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
                    {cardData.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  {cardData.description}
                </p>
                <button
                  className="inline-flex items-center px-3 py-2 text-sm
                  font-medium text-center text-white bg-blue-700 rounded-lg
                  hover:bg-blue-800 focus:ring-4 focus:outline-none
                  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                  dark:focus:ring-blue-800"
                >
                  {" "}
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MultipleItems;
