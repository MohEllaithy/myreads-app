import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    searchResults: [],
  };

  //Get all books from api
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  //Clear search results and query string
  clearSearchResults = () => {
    this.setState((currentState) => ({
      ...currentState,
      query: "",
      searchResults: [],
    }));
  };

  //Handle the search results
  queryHandler = async (event) => {
    const query = event.target.value;
    const { books } = this.state;
    if (query) this.setState(() => ({ query }));

    const searchResults = query ? await BooksAPI.search(query) : [];

    if (searchResults.error === "empty query" || query === "") {
      this.setState(() => ({
        searchResults: [],
      }));
    } else {
      const results = searchResults.map((result) => {
        const book = books.find((item) => item.id === result.id);
        return book ? { ...result, shelf: book.shelf } : result;
      });
      this.setState(() => ({ searchResults: results }));
    }
  };

  //Handle shelf change menu
  shelfChangeHandler = (event, book) => {
    const { value } = event.target;
    const { books, searchResults } = this.state;
    const bookExists = books.find((item) => item.id === book.id);

    if (bookExists && value !== "none") {
      const newBooks = books.map((item) =>
        item.id === bookExists.id ? { ...item, shelf: value } : item
      );
      const newResults = searchResults.map((item) =>
        item.id === bookExists.id ? { ...item, shelf: value } : item
      );
      this.setState(() => ({
        books: newBooks,
        searchResults: newResults,
      }));
    }

    if (bookExists && value === "none") {
      const newBooks = books.filter((item) => item.id !== bookExists.id);
      const newResults = searchResults.map((item) =>
        item.id === bookExists.id ? { ...item, shelf: value } : item
      );
      this.setState(() => ({
        books: newBooks,
        searchResults: newResults,
      }));
    }

    if (!bookExists) {
      book.shelf = value;
      this.setState(() => ({
        books: [...books, book],
      }));
    }
  };

  render() {
    const { searchResults, books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Home books={books} changeShelf={this.shelfChangeHandler} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              changeShelf={this.shelfChangeHandler}
              query={this.queryHandler}
              results={searchResults}
              clear={this.clearSearchResults}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
