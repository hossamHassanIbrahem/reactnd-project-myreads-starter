import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import SearchEntry from './SearchEntry'

class BooksApp extends Component {
    state = {
            books: [],
            showSearchPage: false
        }
//fn  to componentDidMount
    componentDidMount() {
            BooksAPI.getAll().then(books => 
                {
                this.setState({ books });
                });
        }
// up date book 
    BookUpDater = (book, shelf) => {
        this.setState(previousType => {
            if (shelf === 'none') 
            {
                return {
                      books: previousType.books.filter(
                      currentBook => currentBook.id !== book.id
                    )
                };
            }
            return {//mapping the finds book
                books: previousType.books.map(currentBook => 
                  {
                    if (currentBook.id === book.id) 
                    {
                        currentBook.shelf = shelf;
                    }
                    return currentBook;
                })
            };
        });
    };
//new book handel 
    newBook = (book, shelf) => {
        this.setState(previousType => {
            book.shelf = shelf;
            previousType.books.push(book);
            return {
                books: previousType.books
            };
        });
    };
    bookCheck = book => {//to  update the book in in menu
        const shelfBooks = this.state.books.filter(
            shelfBook => shelfBook.id === book.id
        );
        return shelfBooks.length === 0;//df value 
    };
//change with last mark  
    changeShelfBook = (book, shelf) => {
        if (this.bookCheck(book)) 
        {
            this.newBook(book, shelf);
        } else 
        {
            this.BookUpDater(book, shelf);
        }
        BooksAPI.update(book, shelf);
    };
    //search progr
    searchUpdater = showSearchPage => {
            this.setState({ showSearchPage: true });
        }

    render() {
      return ( 
        <div className = "app" >
          <Route exact path = "/" render = {
            () =>
              <BooksList 
                books = { this.state.books }
                BookUpDater = { this.changeShelfBook }/>
              } />
          <Route path = "/search" render = {
            () =>
              <SearchEntry
                books = { this.state.books }
                BookUpDater = { this.changeShelfBook }
                showSearchPage = { this.searchUpdater }/>
              } />
        </div>
              );
      }
    }
            export default BooksApp
