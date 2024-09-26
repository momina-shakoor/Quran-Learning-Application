import React from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const NamazStreaks = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="lg:w-[40%] mx-2 p-2 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-between items-center w-full gap-2">
          <div className="flex gap-2">
            <img
              src={process.env.PUBLIC_URL + "/images/ramadan-icon.png"}
              alt="Namaz"
              width={40}
              height={40}
            />
            <h1 className="text-xl">Namaz Streaks</h1>
          </div>
          <Link to="/Dashboard">
            <RxCross1 className="mt-2" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center p-2 gap-2 text-3xl">
          <img
            src={process.env.PUBLIC_URL + "/images/rose-flower-icon.png"}
            alt="Fire"
            width={40}
            height={20}
          />
          <h2 className="pt-4">5 Days</h2>
        </div>
        <div>
          <h3 className="text-blue-600 text-md p-4">
            Good Job! You Can proceed on APP
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NamazStreaks;
