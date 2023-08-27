import React, { useEffect, useState } from "react";
import StoryLibrary from "../components/StoryLibrary";

import { useDispatch, useSelector } from "react-redux";
import { generateStory } from "../actions/storyActions";

import { options } from "../alert/Alert";
import { toast } from "react-toastify";

import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, story } = useSelector((state) => state.stories);

  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  const generate = () => {
    if (topic === "") {
      toast.error("Please enter a topic", options);
      return;
    }
    setIsGenerating(true);
    const storyData = {
      topic: topic,
    };
    dispatch(generateStory(storyData));
  };

  useEffect(() => {
    if (loading == false && !error && story) {
      navigate(`/story/${story.title}`, { state: story });
    }
  }, [loading]);

  return (
    <>
      {isGenerating ? (
        <div className="min-h-[90vh] mx-auto flex justify-center items-center">
          <div>
            <h2 className="text-3xl uppercase text-center font-bold my-10">
              Generating a New Content 🪄
            </h2>
            <PacmanLoader color={"white"} size={100} />
          </div>
        </div>
      ) : (
        <div className="mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            <div className="col-span-3 flex justify-center items-center h-[50vh] lg:h-[90vh]">
              <div className="w-full px-5">
                <h2 className="text-3xl uppercase my-5 text-center font-bold">
                  Generate a New Story
                </h2>
                <input
                  type="text"
                  placeholder="Use your imagination and Create amazing stories🪄"
                  value={topic}
                  className="input input-bordered input-primary w-full h-40 text-xl my-5 text-center"
                  onChange={handleInputChange}
                />
                <div className="flex justify-center my-5">
                  <button
                    className="btn btn-primary"
                    onClick={() => generate()}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-7 flex justify-center items-center h-[90vh] overflow-y-auto">
              <StoryLibrary />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
