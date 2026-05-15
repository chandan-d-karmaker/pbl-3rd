"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  fetchAllWords,
  fetchLevels,
  fetchWordDetails,
  fetchWordsByLevel,
  pronounceWord,
} from "@/lib/api";

export default function VocabularySection() {
  const [lessons, setLessons] = useState([]);
  const [activeLevel, setActiveLevel] = useState(null);
  const [words, setWords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchLevels()
      .then(setLessons)
      .catch(console.error);
  }, []);

  const handleSelectLevel = async (levelNo) => {
    setActiveLevel(levelNo);
    setLoading(true);
    try {
      const data = await fetchWordsByLevel(levelNo);
      setWords(data || []);
    } catch (error) {
      console.error(error);
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const searchValue = searchQuery.trim().toLowerCase();
    if (!searchValue) return;

    setActiveLevel(null);
    setLoading(true);

    try {
      const allWords = await fetchAllWords();
      const filtered = allWords.filter((word) =>
        word.word?.toLowerCase().includes(searchValue)
      );
      setWords(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = async (wordId) => {
    setLoadingDetails(true);
    try {
      const detail = await fetchWordDetails(wordId);
      setSelectedWord(detail);
      modalRef.current?.showModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const showEmptyLesson = words === null;
  const showNoWords = words !== null && words.length === 0;

  return (
    <>
      <section id="learn" className="w-4/5 mx-auto space-y-9 mb-10">
        <h2 className="text-4xl font-bold text-center">
          <span className="text-[#00BCFF]">Let&apos;s</span> Learn Vocabularies
        </h2>

        <div className="flex justify-center gap-5 flex-wrap">
          {lessons.map((lesson) => (
            <button
              key={lesson.level_no}
              type="button"
              onClick={() => handleSelectLevel(lesson.level_no)}
              className={`btn btn-outline btn-primary lesson-btn ${
                activeLevel === lesson.level_no ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-book-open" /> Lesson - {lesson.level_no}
            </button>
          ))}
        </div>
      </section>

      <section className="flex justify-center mb-10">
        <div className="join">
          <label className="input validator join-item">
            <input
              type="text"
              placeholder="Search Word Now"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </label>
          <button
            type="button"
            className="btn btn-primary join-item"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </section>

      <section
        className={`flex justify-center items-center py-10 ${
          loading ? "" : "hidden"
        }`}
      >
        <span className="loading loading-dots loading-xl" />
      </section>

      <section
        className={`w-4/5 mx-auto gap-7 bg-base-200 rounded-3xl text-center mb-40 p-7 ${
          loading ? "hidden" : ""
        } ${
          words && words.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "py-16"
        }`}
      >
        {showEmptyLesson && (
          <div className="col-span-full">
            <p className="bangla-font mb-3 text-[#79716B]">
              আপনি এখনো কোন Lesson Select করেন ন
            </p>
            <h3 className="text-3xl bangla-font font-medium text-[#292524]">
              একটি Lesson Select করুন।
            </h3>
          </div>
        )}

        {showNoWords && (
          <div className="col-span-full py-16">
            <Image
              src="/assets/alert-error.png"
              alt="No vocabulary"
              width={120}
              height={120}
              className="mx-auto"
            />
            <p className="bangla-font mb-3 text-[#79716B]">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h3 className="text-3xl bangla-font font-medium text-[#292524]">
              নেক্সট Lesson এ যান
            </h3>
          </div>
        )}

        {words?.map((word) => (
          <div
            key={word.id}
            className="text-center bg-base-100 rounded-xl p-10"
          >
            <h2 className="text-2xl font-bold text-black mb-6">
              {word.word || "Word not found"}
            </h2>
            <p className="font-medium text-black mb-6">Meaning/Pronunciation</p>
            <h1 className="text-2xl font-bold text-black bangla-font">
              {word.meaning || "Meaning not found"} /{" "}
              {word.pronunciation || "Pronunciation not found"}
            </h1>

            <div className="flex justify-between mt-14">
              <button
                type="button"
                onClick={() => handleShowDetails(word.id)}
                className="btn bg-[#1A91FF1A] hover:bg-[#1a90ff85]"
              >
                <i className="fa-solid fa-circle-info" />
              </button>
              <button
                type="button"
                onClick={() => pronounceWord(word.word)}
                className="btn bg-[#1A91FF1A] hover:bg-[#1a90ff85]"
              >
                <i className="fa-solid fa-volume-high" />
              </button>
            </div>
          </div>
        ))}
      </section>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {loadingDetails ? (
            <div className="flex justify-center py-6">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : selectedWord ? (
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold bangla-font">
                  {selectedWord.word} (
                  <i className="fa-solid fa-microphone-lines" />:
                  {selectedWord.pronunciation})
                </h2>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Meaning</h2>
                <p>{selectedWord.meaning}</p>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Example</h2>
                <p>{selectedWord.sentence}</p>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold bangla-font">
                  সমার্থক শব্দ গুলো
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(selectedWord.synonyms || []).map((syn) => (
                    <span key={syn} className="btn">
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="modal-action flex justify-start">
            <form method="dialog">
              <button type="submit" className="btn btn-primary text-left">
                Complete leaning
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
