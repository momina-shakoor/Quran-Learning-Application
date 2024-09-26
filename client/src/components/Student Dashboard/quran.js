import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function QuranVerses() {
  const [surahs, setSurahs] = useState([]);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurah = async (surahNumber) => {
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Surah data");
        }
        const data = await response.json();
        return data.data.ayahs.map((ayah) => ayah.text);
      } catch (error) {
        console.error("Error fetching Surah data:", error);
        setError(error.message);
        return [];
      }
    };

    const fetchAllSurahs = async () => {
      try {
        const surahsArray = [];
        for (let i = 1; i <= 114; i++) {
          const verses = await fetchSurah(i);
          surahsArray.push({ number: i, verses });
        }
        setSurahs(surahsArray);
      } catch (error) {
        console.error("Error fetching all Surahs:", error);
        setError(error.message);
      }
    };

    fetchAllSurahs();
  }, []);

  const handleNextSurah = () => {
    if (currentSurahIndex < surahs.length - 1) {
      setCurrentSurahIndex(currentSurahIndex + 1);
    }
  };

  const handlePreviousSurah = () => {
    if (currentSurahIndex > 0) {
      setCurrentSurahIndex(currentSurahIndex - 1);
    }
  };

  if (error) {
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;
  }

  const currentSurah = surahs[currentSurahIndex];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-70 bg-black">
      <Link to="/Dashboard">
        <button className="text-gray-500 absolute top-4 right-4 p-2 hover:bg-gray-700 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>
      <div className="lg:w-[60%] p-6 mx-4 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[80%]">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Quran
        </h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handlePreviousSurah}
            disabled={currentSurahIndex === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
          >
            Previous Surah
          </button>
          <button
            onClick={handleNextSurah}
            disabled={currentSurahIndex === surahs.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
          >
            Next Surah
          </button>
        </div>
        {currentSurah && (
          <div>
            <h2 className="text-2xl font-medium mb-4 text-center text-gray-700">
              Surah {currentSurah.number}
            </h2>
            <div className="space-y-4">
              {currentSurah.verses.map((verse, verseIndex) => (
                <p
                  key={verseIndex}
                  className="text-lg leading-relaxed text-gray-900"
                >
                  {verse}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuranVerses;
