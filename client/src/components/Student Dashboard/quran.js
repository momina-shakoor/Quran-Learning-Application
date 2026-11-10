import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";

const API_URL = "https://api.alquran.cloud/v1";
const EDITION = "ar.alafasy";

function QuranVerses() {
  const [surahs, setSurahs] = useState([]);
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [loadingVerses, setLoadingVerses] = useState(true);
  const [surahListError, setSurahListError] = useState("");
  const [versesError, setVersesError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSurahs = async () => {
      setLoadingSurahs(true);
      setSurahListError("");

      try {
        const response = await fetch(`${API_URL}/surah`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load the surah list.");
        }

        const result = await response.json();

        if (result.code !== 200 || !Array.isArray(result.data)) {
          throw new Error("The surah list response was invalid.");
        }

        setSurahs(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSurahListError(error.message || "Could not load the surah list.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingSurahs(false);
        }
      }
    };

    fetchSurahs();

    return () => controller.abort();
  }, [retry]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSelectedSurah = async () => {
      setLoadingVerses(true);
      setVersesError("");
      setCurrentSurah(null);

      try {
        const response = await fetch(
          `${API_URL}/surah/${currentSurahNumber}/${EDITION}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Could not load this surah.");
        }

        const result = await response.json();

        if (result.code !== 200 || !result.data?.ayahs) {
          throw new Error("The surah response was invalid.");
        }

        setCurrentSurah(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setVersesError(error.message || "Could not load this surah.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingVerses(false);
        }
      }
    };

    fetchSelectedSurah();

    return () => controller.abort();
  }, [currentSurahNumber, retry]);

  const goToPreviousSurah = () => {
    setCurrentSurahNumber((number) => Math.max(1, number - 1));
  };

  const goToNextSurah = () => {
    setCurrentSurahNumber((number) => Math.min(114, number + 1));
  };

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to dashboard
        </Link>

        <header className="mt-7 rounded-3xl bg-gradient-to-br from-[#12372a] to-emerald-800 p-6 text-white sm:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-300">
            <FaBookOpen className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
            Quran reader
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Read Quran</h1>
          <p className="mt-3 max-w-2xl leading-7 text-emerald-50/80">
            Select a surah to read its verses.
          </p>
        </header>

        <section className="mt-6 overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-emerald-950/10 bg-[#fbfaf5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="surah-select"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Choose a surah
              </label>

              <select
                id="surah-select"
                value={currentSurahNumber}
                onChange={(event) =>
                  setCurrentSurahNumber(Number(event.target.value))
                }
                disabled={loadingSurahs || surahListError}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 sm:max-w-md"
              >
                {loadingSurahs ? (
                  <option>Loading surahs…</option>
                ) : (
                  surahs.map((surah) => (
                    <option key={surah.number} value={surah.number}>
                      {surah.number}. {surah.englishName} ({surah.name})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goToPreviousSurah}
                disabled={currentSurahNumber <= 1 || loadingVerses}
                className="flex-1 rounded-lg border border-emerald-900/15 bg-white px-4 py-3 text-sm font-semibold text-[#12372a] transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goToNextSurah}
                disabled={currentSurahNumber >= 114 || loadingVerses}
                className="flex-1 rounded-lg bg-[#12372a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Next
              </button>
            </div>
          </div>

          {surahListError ? (
            <div className="p-6" role="alert">
              <p className="text-red-700">{surahListError}</p>
              <button
                type="button"
                onClick={() => setRetry((value) => value + 1)}
                className="mt-4 rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                Try again
              </button>
            </div>
          ) : loadingSurahs || loadingVerses ? (
            <div className="p-10 text-center text-slate-600" role="status">
              Loading surah…
            </div>
          ) : versesError ? (
            <div className="p-6" role="alert">
              <p className="text-red-700">{versesError}</p>
              <button
                type="button"
                onClick={() => setRetry((value) => value + 1)}
                className="mt-4 rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                Try again
              </button>
            </div>
          ) : currentSurah ? (
            <>
              <div className="border-b border-emerald-950/10 px-5 py-7 text-center sm:px-8">
                <p
                  className="text-3xl font-semibold text-emerald-900"
                  lang="ar"
                  dir="rtl"
                >
                  {currentSurah.name}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#12372a]">
                  {currentSurah.englishName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {currentSurah.englishNameTranslation} ·{" "}
                  {currentSurah.numberOfAyahs} verses
                </p>
              </div>

              <div
                className="divide-y divide-emerald-950/10 px-5 sm:px-8"
                lang="ar"
                dir="rtl"
              >
                {currentSurah.ayahs.map((ayah) => (
                  <p
                    key={ayah.numberInSurah}
                    className="py-5 text-right font-serif text-2xl leading-[2.2] text-slate-800 sm:py-7 sm:text-3xl"
                  >
                    <span>{ayah.text}</span>
                    <span className="mx-2 inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-amber-500/40 px-2 align-middle font-sans text-xs text-emerald-800">
                      {ayah.numberInSurah}
                    </span>
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
}

export default QuranVerses;
