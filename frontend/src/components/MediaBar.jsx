import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaQuestion, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { options } from "../alert/Alert";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getAudio } from "../actions/storyActions";

const MediaBar = () => {
  const location = useLocation();
  const story = location.state;

  const dispatch = useDispatch();
  const { loading, error, audio } = useSelector((state) => state.stories);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef();

  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

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

  return (
    <>
      {loading ? (
        "Loading.."
      ) : (
        <div
          className={`relative ${
            isHovered ? "w-32 h-14" : "w-14 h-14"
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
                  onClick={handlePlayPause}
                >
                  <div className="flex justify-center">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                </button>
                <button className="w-14 h-14 bg-base-300 text-white rounded-full">
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
      <audio ref={audioRef} controls hidden />
    </>
  );
};

export default MediaBar;
