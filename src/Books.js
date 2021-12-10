import React, { Component } from 'react';

class Book extends Component {
    theChange = event => {//handle event to reupdate
        this.props.onShelfChange(this.props.book, event.target.value);
    };
    render() {
        return ( 
            <li>
                <div className = "book" >
                    <div className = "book-top" >
                        <div className = "book-cover"style = {
                    {/*taken vallue */
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail};)`} }/> 
                        <div className = "book-shelf-changer" >
                            <select defaultValue = { this.props.book.shelf }
                                onChange = { this.theChange } >
                                <option value = "choose" disabled >move to new shelf</option> 
                                <option value = "currentlyReading" > Currently Reading </option> 
                                <option value = "wantToRead" > Want to Read </option> 
                                <option value = "read" > Read </option> 
                                <option value = "none" > None </option> 
                            </select> 
                        </div> 
                    </div> 
                    <div className = "book-title"> 
                        { this.props.book.title } 
                    </div> 
                    <div className = "book-authors"> 
                        { this.props.book.authors } 
                    </div> 
                </div> 

            </li>
        );
    }
}
export default Book;