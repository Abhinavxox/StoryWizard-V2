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
      <div className="flex justify-center">
        <audio ref={audioRef} controls />
      </div>
    </>
  );
};

export default MediaBar;
