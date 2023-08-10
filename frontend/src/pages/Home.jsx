import React, { useState } from "react";
import StoryLibrary from "../components/StoryLibrary";

import { useDispatch, useSelector } from "react-redux";
import { generateStory } from "../actions/storyActions";

import { options } from "../alert/Alert";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, story } = useSelector((state) => state.stories);

  const [topic, setTopic] = useState("");

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  const generate = () => {
    if (topic === "") {
      toast.error("Please enter a topic", options);
      return;
    }
    const storyData = {
      topic: topic,
    };
    dispatch(generateStory(storyData));
  };

  return (
    <>
      <div className="mx-auto h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-10">
          <div className="col-span-3 flex justify-center items-center h-[50vh] lg:h-[90vh]">
            <div className="w-full px-5">
              <h2 className="text-3xl uppercase my-5 text-center font-bold">
                Generate a New Story
              </h2>
              <input
                type="text"
                placeholder="Type here"
                value={topic}
                className="input input-bordered input-primary w-full h-40 text-xl my-5"
                onChange={handleInputChange}
              />
              <div className="flex justify-center my-5">
                <button className="btn btn-primary" onClick={() => generate()}>
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-7 flex justify-center items-center h-[90vh]">
            <StoryLibrary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
