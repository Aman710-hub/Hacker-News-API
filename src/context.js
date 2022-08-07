import React, { useContext, useEffect, useReducer } from "react";
// this action is basicly need for to not make mistakes when writeng long actions name
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";
// default link
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";
// initail state for our Reducer
// "initialState" holds all values for "state" ?????????????????????????????????
const initialState = {
  isLoading: true,
  hits: [],
  searchValue: "react",
  page: 0,
  numberOfPages: 0,
};
// this is how context is created
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await fetch(url);
      const data = await response.json();
      // An action object has a type:
      // {
      //   type: "DELETE_POST",
      //   id: 123
      // }
      // besides the type, it usually has some kind of data that provides more information about this action. This is called "payload". In the above action object, the id is the payload.
      // Some programmers would write it in such a way:
      // {
      //   type: "DELETE_POST",
      //   payload: {
      //     id: 123
      //   }
      // }
      dispatch({
        // we get access to both "type" and "payload" throu "action"
        type: SET_STORIES,
        // these values we access with "action"
        payload: { hits: data.hits, numberOfPages: data.nbPages },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const handleSearch = (searchValue) => {
    dispatch({ type: HANDLE_SEARCH, payload: searchValue });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  useEffect(() => {
    // query is for searching
    fetchStories(
      `${API_ENDPOINT}query=${state.searchValue}&page=${state.page}`
    );
  }, [state.searchValue, state.page]);
  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
