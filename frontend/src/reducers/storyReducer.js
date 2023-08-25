import {
  ALL_STORIES_REQUEST,
  ALL_STORIES_SUCCESS,
  ALL_STORIES_FAIL,
  STORY_GENERATE_REQUEST,
  STORY_GENERATE_SUCCESS,
  STORY_GENERATE_FAIL,
  STORY_AUDIO_REQUEST,
  STORY_AUDIO_SUCCESS,
  STORY_AUDIO_FAIL,
  FOLLOWUP_QUESTION_FAIL,
  FOLLOWUP_QUESTION_REQUEST,
  FOLLOWUP_QUESTION_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/storyConstant";

export const storiesReducer = (state = { stories: [] }, action) => {
  switch (action.type) {
    case ALL_STORIES_REQUEST:
      return {
        loading: true,
        stories: [],
      };

    case ALL_STORIES_SUCCESS:
      return {
        loading: false,
        stories: action.payload,
      };

    case ALL_STORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case STORY_GENERATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case STORY_GENERATE_SUCCESS:
      return {
        loading: false,
        story: action.payload,
      };

    case STORY_GENERATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case STORY_AUDIO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case STORY_AUDIO_SUCCESS:
      return {
        loading: false,
        audio: action.payload,
      };

    case STORY_AUDIO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOWUP_QUESTION_REQUEST:
      return {
        ...state,
        loadingAnswer: true,
      };

    case FOLLOWUP_QUESTION_SUCCESS:
      return {
        loadingAnswer: false,
        answer: action.payload,
      };

    case FOLLOWUP_QUESTION_FAIL:
      return {
        ...state,
        errorAnswer: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errorAnswer: null,
      };

    default:
      return state;
  }
};
