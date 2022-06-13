import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";

const Search = function({ query, results, changeShelf, clear }) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link onClick={clear} to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={query}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((result) => (
            <Book book={result} key={result.id} changeShelf={changeShelf} />
          ))}
        </ol>
        {results.length === 0 ? (
          <div>
            <p style={{ textAlign: "center" }}>
              <strong>No Results Found!</strong>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
