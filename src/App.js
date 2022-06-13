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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  clearSearchResults = () => {
    this.setState((currentState) => ({
      ...currentState,
      query: "",
      searchResults: [],
    }));
  };

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
        if (book) return { ...result, shelf: book.shelf };
        else return result;
      });
      this.setState(() => ({ searchResults: results }));
    }
  };

  shelfChangeHandler = (event, book) => {
    const { value } = event.target;
    const { books } = this.state;
    const bookExists = books.find((item) => item.id === book.id);

    if (bookExists) {
      const newBooks = books.map((item) =>
        item.id === bookExists.id ? { ...item, shelf: value } : item
      );
      this.setState(() => ({
        books: [...newBooks],
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
    console.log(this.state);
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
