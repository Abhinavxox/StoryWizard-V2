import axios from "axios";
import {
  ALL_STORIES_REQUEST,
  ALL_STORIES_SUCCESS,
  ALL_STORIES_FAIL,
  STORY_DETAILS_SUCCESS,
  STORY_DETAILS_REQUEST,
  STORY_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/storyConstant";
const BackendUrl = "http://localhost:8000/api";

// Get all stories
export const getStories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STORIES_REQUEST });

    const { data } = await axios.get(BackendUrl + "/stories");

    dispatch({
      type: ALL_STORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_STORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
