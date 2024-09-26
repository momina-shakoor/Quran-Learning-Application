import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Information = () => {
  useEffect(() => {
    AOS.init({
      duration: 6000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  const courses = [
    {
      title: "Tajweed Course",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto iure animi placeat laudantium culpa, voluptatum cum eum repellat eligendi facilis?",
      points: [
        "Mastery of Tajweed Principle",
        "Enhance Accuracy of Recitation",
        "Learn Precise Phonetic rules",
      ],
      image: process.env.PUBLIC_URL + "/images/course-1.jpg",
    },
    {
      title: "Tafseer Course",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto iure animi placeat laudantium culpa, voluptatum cum eum repellat eligendi facilis?",
      points: [
        "Indepth study of Quranic Verses",
        "Understand meaning, context and historical background of Quranic Verses",
        "Linguistic Analysis",
        "Insights into the spiritual and practical implications of the Quran",
      ],
      image: process.env.PUBLIC_URL + "/images/course-2.avif",
    },
    {
      title: "Seerah Course",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto iure animi placeat laudantium culpa, voluptatum cum eum repellat eligendi facilis?",
      points: [
        "Explore the historical, social, and spiritual aspects of the Prophet's life",
        "Get insights into his character, actions, and the events that shaped early Islamic history",
      ],
      image: process.env.PUBLIC_URL + "/images/course-3.jpg",
    },
    {
      title: "Tarjuma Course",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto iure animi placeat laudantium culpa, voluptatum cum eum repellat eligendi facilis?",
      points: [
        "Develop language proficiency",
        "Deeper comprehension of Islamic teachings",
        "Cultural understanding",
      ],
      image: process.env.PUBLIC_URL + "/images/course-4.jpg",
    },
  ];

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <div className="p-8">
        <h1 className="text-center text-4xl font-bold mb-8">Courses</h1>

        {courses.map((course, index) => (
          <div
            key={index}
            className={`mb-8 ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } lg:flex items-center`}
          >
            <div className="lg:w-1/2 lg:pr-8 mb-4">
              <img
                src={course.image}
                alt={`Course ${index + 1}`}
                className="w-full h-auto rounded"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
              <p className="mb-4">{course.description}</p>
              <ul className="list-disc list-inside mb-4">
                {course.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Information;
