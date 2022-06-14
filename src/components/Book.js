import React from "react";
import noimg from "../images/noimg.png";

const Book = function({ book, changeShelf }) {
  const imageURL = book.imageLinks ? book.imageLinks.thumbnail : noimg;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageURL})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={(event) => changeShelf(event, book)}
              value={book.shelf ? book.shelf : "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : ""}
        </div>
      </div>
    </li>
  );
};

export default Book;
