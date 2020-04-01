import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksApi from './BooksAPI'



class SearchLibrary extends Component {

    state = {
        books: undefined,
    }

    handleEvent = async (event) => {
        const { value } = event.target
        const books =  await BooksApi.search(value)
        books === undefined ? this.setState({books: undefined}) : this.setState({books})
    }

    handleUpdate = (book, shelf) => {
        BooksApi.update(book, shelf)
    }

    render() {
        const { books, query } = this.state
        return (
              <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                  <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author" 
                        onChange={(event) => this.handleEvent(event)}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                  {books === undefined ? <span></span> : books.length > 0 ? 
                        books.map(book => {
                         let shelf = 'none'
                         this.props.books.map(b => ( b.id === book.id ? shelf = b.shelf :  ''))
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={shelf} onChange={(event) => this.handleUpdate(book, event.target.value)}> 
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading" >Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors ? book.authors.map(author => (<span key={author}>{author}</span>)) : ''}</div>
                                    </div>
                                </li>
                            )
                        }
                        ) : <span>Sorry no restults found</span>
                    }
                  </ol>
                </div>
              </div>
        )
    }
}

export default SearchLibrary