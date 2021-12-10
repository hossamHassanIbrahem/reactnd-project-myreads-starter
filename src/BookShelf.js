import React, { Component } from 'react';
import Book from './Books';
//# sourcegrid shelf place data
class BookShelf extends Component {
    render() {
        return (
            <div className = "bookshelf" key = { this.props.shelf.id } >
                <h2 className = "bookshelf-title" > { this.props.shelf.title } </h2> 
                <div className = "bookshelf-books" >
                    <ol className = "books-grid" > {
                            this.props.books.map(book =>
                                <Book key = { book.id }
                                book = { book }
                                onShelfChange = { this.props.BookUpDater }/>
                            )
                        } 
                    </ol>
                </div> 
            </div>
        );
    }
}
export default BookShelf;