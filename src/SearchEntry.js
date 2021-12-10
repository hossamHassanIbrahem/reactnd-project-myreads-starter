import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Books';


class searchEntry extends Component {
    state = //query to measure the data entry for user
    {
        query: '',
        itemResult: 30,
        books: []
    };

    queryUpdater = (query) => {//query update fn to set the query
            this.setState(
                { query: query }
                );
            this.searchEntry(query);
        }
   
    searchEntry = (query) => {//handle the book state
        if (query === '') {
            this.setState({ books: [] });
        } else 
        {
            BooksAPI.search(query, this.itemResult).then(books => {
                if (Array.isArray(books)) 
                {
                    this.checkShelvesBooks(books, this.props.books);
                }
            });
        }
    };
    checkShelvesBooks = (searchEntry, currentBooks) => {//check to his helf
        const shelvedBooks = searchEntry.map(searchBook => {
            const currentBook = currentBooks.filter(
                Book => Book.id === searchBook.id
            )[0];
            if (currentBook) {
                searchBook.shelf = currentBook.shelf;
            } 
            else 
            {
                searchBook.shelf = 'none';
            }
            return searchBook;
        });

        this.setState({ books: shelvedBooks });
    };
    render() {

        return ( 
            <div className = "search-books" >
                <div className = "search-books-bar" >
                    <Link className = "close-search"
                        to = "/" >
                    Close </Link> 
                    <div className = "search-books-input-wrapper" >
                        <input type = "text"
                        placeholder = "Search by title or author"
                        value = { this.state.query }
                        onChange = { event => this.queryUpdater(event.target.value) }/> 
                    </div> 
                </div>  
                <div className = "search-books-results" >
                    <ol className = "books-grid" > {
                            this.state.books.map(book =>
                                <Book key = { book.id }
                                book = { book }
                                onShelfChange = { this.props.BookUpDater }
                                />
                            )
                        }
                    </ol>
                </div> 
            </div>
        );
    }
}
export default searchEntry;