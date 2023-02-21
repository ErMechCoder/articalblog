import React from "react";
import "./css/autocomplete.css";
import { Link } from "react-router-dom";

const AutoComplete = ({ recommendSearch, setInput, setRecommendSearch }) => {
  const urlify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "*") // reg ex
      .split("*")
      .filter((word) => word.length > 1)
      .join("-");
  };
  return (
    <div className="autocomplete">
      {recommendSearch.length > 0 ? (
        recommendSearch.map((item, index) => {
          return (
            <a
              href={`/article/${urlify(item.URL)}`}
              className="autocomplete-item text-center py-2 px-2"
              onClick={() => {
                setInput("");
                setRecommendSearch([]);
              }}
            >
              {item.title}
            </a>
          );
        })
      ) : (
        <p className="autocomplete-item text-center py-2 px-2">
          No result found
        </p>
      )}
    </div>
  );
};

export default AutoComplete;
