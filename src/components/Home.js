import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const Home = function({ books, changeShelf }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            changeShelf={changeShelf}
            type="currentlyReading"
            books={books}
            title="Currently Reading"
          />
          <BookShelf
            changeShelf={changeShelf}
            type="wantToRead"
            books={books}
            title="Want to Read"
          />
          <BookShelf
            changeShelf={changeShelf}
            type="read"
            books={books}
            title="Read"
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
