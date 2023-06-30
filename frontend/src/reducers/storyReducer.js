import {
  ALL_STORIES_REQUEST,
  ALL_STORIES_SUCCESS,
  ALL_STORIES_FAIL,
  STORY_DETAILS_SUCCESS,
  STORY_DETAILS_REQUEST,
  STORY_DETAILS_FAIL,
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

    default:
      return state;
  }
};
