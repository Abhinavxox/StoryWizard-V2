import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaQuestion, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAudio } from "../actions/storyActions";
import { options } from "../alert/Alert";
import { toast } from "react-toastify";

const MediaBar = () => {
  const dispatch = useDispatch();
  const { loading, error, audio } = useSelector((state) => state.stories);

  const location = useLocation();
  const story = location.state;

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  useEffect(() => {
    if (!audio) {
      if (error) {
        toast.error(error, options);
      }
      dispatch(getAudio(story.id));
    } else {
      // console.log(audio);
    }
  }, [dispatch, error, audio]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div
          className={`relative ${
            isHovered ? "w-48 h-14" : "w-14 h-14"
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
                <button className="w-14 h-14 bg-base-300 text-white rounded-full">
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
    </>
  );
};

export default MediaBar;
