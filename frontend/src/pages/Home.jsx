import React from "react";
import StoryLibrary from "../components/StoryLibrary";

const Home = () => {
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
                className="input input-bordered input-primary w-full h-40 text-xl my-5"
              />
              <div className="flex justify-center my-5">
                <button className="btn btn-primary">Generate</button>
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
