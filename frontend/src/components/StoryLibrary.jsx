import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";

import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../actions/storyActions";

const StoryLibrary = () => {
  const dispatch = useDispatch();

  const { loading, error, stories } = useSelector((state) => state.stories);

  useEffect(() => {
    if (error) {
      console.log("error:", error);
    }
    dispatch(getStories());
  }, [dispatch, error]);

  return (
    <>
      <div className="col-span-3 bg-gray-700 rounded-lg h-full w-full m-5">
        <div className="col-span-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full text-white px-5">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            stories.map((story) => (
              <StoryCard key="1" id="1" heading="1" content="1" imgSrc="1" />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default StoryLibrary;
