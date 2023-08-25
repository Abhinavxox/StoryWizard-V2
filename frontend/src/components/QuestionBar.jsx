import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { options } from "../alert/Alert";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { questionAnswer } from "../actions/storyActions";

const QuestionBar = () => {
  const dispatch = useDispatch();
  const { loading, error, answer } = useSelector((state) => state.questions);

  const location = useLocation();
  const story = location.state;

  const [question, setQuestion] = useState("");

  const handleQuestion = () => {
    dispatch(questionAnswer(story.story, question));
  };
  return (
    <div className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full relative shadow-md">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        Ask a question
      </h2>
      <div className="relative mb-4">
        <textarea
          id="message"
          name="message"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="You can ask all your queries here..."
        ></textarea>
      </div>
      <button
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={() => handleQuestion()}
      >
        Ask
      </button>
    </div>
  );
};

export default QuestionBar;
