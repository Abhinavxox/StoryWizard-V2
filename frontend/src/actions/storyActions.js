import axios from "axios";
import {
  ALL_STORIES_REQUEST,
  ALL_STORIES_SUCCESS,
  ALL_STORIES_FAIL,
  STORY_AUDIO_REQUEST,
  STORY_AUDIO_SUCCESS,
  STORY_AUDIO_FAIL,
  STORY_GENERATE_REQUEST,
  STORY_GENERATE_SUCCESS,
  STORY_GENERATE_FAIL,
  CLEAR_ERRORS,
  FOLLOWUP_QUESTION_REQUEST,
  FOLLOWUP_QUESTION_FAIL,
  FOLLOWUP_QUESTION_SUCCESS,
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

//generate a story
export const generateStory = (storyData) => async (dispatch) => {
  try {
    dispatch({ type: STORY_GENERATE_REQUEST });

    const { data } = await axios.post(BackendUrl + "/stories/", storyData);

    dispatch({
      type: STORY_GENERATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORY_GENERATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get audio
export const getAudio = (storyId) => async (dispatch) => {
  try {
    dispatch({ type: STORY_AUDIO_REQUEST });

    const data = await fetch(BackendUrl + "/stories/" + storyId + "/audio");
    const blob = await data.blob();
    const file = new File([blob], "audio.mp3", { type: "audio/mp3" });

    dispatch({
      type: STORY_AUDIO_SUCCESS,
      payload: file,
    });
  } catch (error) {
    dispatch({
      type: STORY_AUDIO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get followup question answer
export const questionAnswer = (story, question) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOWUP_QUESTION_REQUEST });
    const request = {
      question: question,
      context: story,
    };
    const data = await fetch(BackendUrl + "/questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const blob = await data.blob();
    const file = new File([blob], "audio.mp3", { type: "audio/mp3" });

    dispatch({
      type: FOLLOWUP_QUESTION_SUCCESS,
      payload: file,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FOLLOWUP_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
