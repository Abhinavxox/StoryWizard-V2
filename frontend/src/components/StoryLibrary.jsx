import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";

import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../actions/storyActions";
import { Link } from "react-router-dom";

import { options } from "../alert/Alert";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";

const StoryLibrary = () => {
  const dispatch = useDispatch();

  const { loading, error, stories } = useSelector((state) => state.stories);

  useEffect(() => {
    if (error) {
      toast.error(error, options);
    }
    //dispatch action to get all stories
    dispatch(getStories());
  }, [dispatch, error]);

  return (
    <>
      <div className="col-span-3 rounded-lg h-[90%] w-full m-5">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <h1>
              <PuffLoader color={"white"} size={100} />
            </h1>
          </div>
        ) : (
          <div className="col-span-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full text-white px-5">
            {stories &&
              stories.map((story) => (
                <Link to={`/story/${story.title}`} key={story.id} state={story}>
                  <StoryCard
                    id={story.id}
                    heading={story.title}
                    content={story.story}
                    imgSrc={story.image}
                  />
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StoryLibrary;
