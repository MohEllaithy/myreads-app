import React from "react";
import Book from "./Book";

const BookShelf = function({ title, books, type, changeShelf }) {
  const shelfBooks = books.filter((book) => book.shelf === type);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map((book) => (
            <Book book={book} key={book.id} changeShelf={changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
