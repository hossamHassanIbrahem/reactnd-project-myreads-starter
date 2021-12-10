import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';

class ListBooks extends React.Component {
    state = {
        bookShelves: [//idea to recaver the type and scheduling for classification
            { 
                id: 'currentlyReading', 
                title: 'Currently Reading' 
            },
            { 
                id: 'wantToRead', 
                title: 'Want to Read' 
            },
            { 
                id: 'read', 
                title: 'Read' 
            }
        ]
    };  
        getBooks = shelf => {//books to fillter to id and shelf
            return this.props.books.filter(book => shelf.id === book.shelf);
        };

        render() { 
                return ( 
                    <div className = "list-books">
                        <div className ="list-books-title"> 
                        </div> 
                        <div className="list-books-content" >
                            <div> {
                                    this.state.bookShelves.map(shelf =>
                                        <BookShelf key = { shelf.id }
                                        shelf = { shelf }
                                        books = { this.getBooks(shelf) }
                                        BookUpDater = { this.props.BookUpDater }
                                        />
                                    )
                                } 
                            </div> 
                        </div>
                        <div className = "open-search" >
                            <Link to = "/search" > Add book </Link>
                        </div>
                    </div>
                );
            } 
    } 
export default ListBooks;