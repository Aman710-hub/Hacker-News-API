import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { isLoading, page, numberOfPages, handlePage } = useGlobalContext();
  return (
    <div className="btn-container">
      {/* if "loading" is true then this btn will be disabled */}
      <button disabled={isLoading} onClick={() => handlePage("decrease")}>
        prev
      </button>
      <p>
        {page + 1} of {numberOfPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("increase")}>
        next
      </button>
    </div>
  );
};

export default Buttons;
