import React from "react";
import { useLocation } from "react-router-dom";
import MediaBar from "../components/MediaBar";

const Story = (props) => {
  const location = useLocation();
  const story = location.state;
  return (
    <div>
      <section className=" body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
              {story.title}
            </h1>
            <p className="mb-8 leading-relaxed">{story.story}</p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={story.image}
            />
          </div>
        </div>
      </section>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex justify-center w-full">
          <MediaBar />
        </div>
      </div>
    </div>
  );
};

export default Story;
