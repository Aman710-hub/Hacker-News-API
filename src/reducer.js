import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

// state - rihgt before update
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      // ...state - returning prev values || get all the values
      return { ...state, isLoading: true };

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        numberOfPages: action.payload.numberOfPages,
      };

    case REMOVE_STORY:
      return {
        ...state,
        // fillter everything that we have in hits and return only the once thats id is not match this id of click item
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };

    case HANDLE_SEARCH:
      return { ...state, searchValue: action.payload, page: 0 };

    case HANDLE_PAGE:
      if (action.payload === "increase") {
        let nextPage = state.page + 1;
        // if "nextPage" is bigger then last page then will be equel to 0
        if (nextPage > state.numberOfPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "decrease") {
        let prevPage = state.page - 1;
        //
        if (prevPage <= 0) {
          prevPage = state.numberOfPages - 1;
        }
        return { ...state, page: prevPage };
      }
    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
export default reducer;
