import React from "react";

const QuestionBar = () => {
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
        ></textarea>
      </div>
      <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Ask
      </button>
    </div>
  );
};

export default QuestionBar;
