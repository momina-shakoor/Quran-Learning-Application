import React, { useEffect } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  { id: 1, name: "Courses", value: 20 },
  { id: 2, name: "Instructors", value: 100 },
  { id: 3, name: "Satisfied students", value: 300 },
];

export default function Example() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <div className="bg-white py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-1"
              >
                <dt className="text-base leading-5 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  <CountUp start={4} end={stat.value} duration={4} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
