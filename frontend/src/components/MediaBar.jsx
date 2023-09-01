import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaQuestion,
  FaTimes,
  FaMicrophone,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { options } from "../alert/Alert";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getAudio } from "../actions/storyActions";

import QuestionBar from "./QuestionBar";
import PuffLoader from "react-spinners/PuffLoader";

const MediaBar = () => {
  const location = useLocation();
  const story = location.state;

  const dispatch = useDispatch();

  //get states from redux store
  const { loading, error, audio } = useSelector((state) => state.stories);
  const { loadingAnswer, errorAnswer, answer } = useSelector(
    (state) => state.questions
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuestioning, setIsQuestioning] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  //audio refrenced objects for story and questions
  const audioRef = useRef(null);
  const answerRef = useRef(null);

  //handle hover for media bar
  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  //handle play and pause for story
  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  //handle question
  const handleQuestion = () => {
    if (!loadingAnswer) {
      if (isPlaying) handlePlayPause();
      setIsQuestioning((prev) => !prev);
    }
  };

  //useEffect to keep eye on audio state
  useEffect(() => {
    if (!audio) {
      if (error) {
        toast.error(error, options);
      }
      dispatch(getAudio(story.id));
    } else {
      audioRef.current.src = URL.createObjectURL(audio);
    }
  }, [dispatch, error, audio]);

  //useEffect to keep eye on answer state
  useEffect(() => {
    if (loadingAnswer === false && !errorAnswer && answer) {
      setIsAnswering(true);
      const audio = answerRef.current;

      //handle end of answers
      const handleAudioEnd = () => {
        setIsAnswering(false);
        answerRef.current = null;
      };

      audio.addEventListener("ended", handleAudioEnd);

      audio.src = URL.createObjectURL(answer);
      audio.play();

      return () => {
        audio.removeEventListener("ended", handleAudioEnd);
      };
    } else {
      if (errorAnswer) {
        toast.error(errorAnswer, options);
      }
    }
  }, [dispatch, errorAnswer, answer]);

  return (
    <>
      {loading ? (
        <>
          <PuffLoader color={"white"} size={50} />
        </>
      ) : (
        <>
          {isQuestioning ? (
            <div className="mb-10 lg:mb-28">
              {isAnswering ? (
                <div className="mb-36 lg:mb-24">
                  <div className="rounded-full w-40 h-40 text-white bg-red-500 flex justify-center items-center animate-pulse">
                    <FaMicrophone className="w-20 h-20" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <QuestionBar />
                  <div
                    className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-red-500 flex justify-center items-center cursor-pointer text-white"
                    onClick={() => handleQuestion()}
                  >
                    <FaTimes />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`relative ${
                isHovered ? "w-40 h-14" : "w-14 h-14"
              } rounded-full cursor-pointer overflow-hidden transition-all`}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <div
                className={`absolute top-0 left-0 w-full h-full flex justify-between items-center ${
                  isHovered ? "animate-expand-height" : "animate-shrink-height"
                }`}
              >
                {isHovered ? (
                  <>
                    <button
                      className="w-14 h-14 bg-base-300 text-white rounded-full"
                      onClick={() => handlePlayPause()}
                    >
                      <div className="flex justify-center">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </div>
                    </button>
                    <button
                      className="w-14 h-14 bg-base-300 text-white rounded-full"
                      onClick={() => handleQuestion()}
                    >
                      <div className="flex justify-center">
                        <FaQuestion />
                      </div>
                    </button>
                  </>
                ) : (
                  <button className="w-14 h-14 bg-base-300 text-white rounded-full">
                    <div className="flex justify-center">
                      <FaTimes />
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <audio ref={audioRef} controls hidden />
      <audio ref={answerRef} controls hidden />
    </>
  );
};

export default MediaBar;
