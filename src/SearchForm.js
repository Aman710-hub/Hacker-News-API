import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { searchValue, handleSearch } = useGlobalContext();
  return (
    // this onSubmit needed just to preventDefault
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <h2>search hacker news</h2>
      <input
        type="text"
        className="form-input"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
