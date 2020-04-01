import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReding from './currentlyReading.js'
import WantToRead from './WantToRead'
import Read from './read'
import { Route, Link } from 'react-router-dom'
import SearchLibrary from './searchLibrary'


class BooksApp extends React.Component {
  state = {
    books: {},
    isLoading: true,
  }

  componentDidMount() {
    this.handleFetchRequest()  
  }

  handleFetchRequest = async () => {
    const { isLoading } = this.state
    const books = await BooksAPI.getAll()
    this.setState({books, isLoading: !isLoading})
  }

  handleUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.books !== this.state.books) {
      const books = await BooksAPI.getAll()
      this.setState({ books })
    }
  }

  render() {
     const {books, isLoading} = this.state
    return (
       <div className="app">
        <Route path='/search' render={() => <SearchLibrary books={books}/>}/>
      {!isLoading && 
        <Route 
          exact path='/' render={() => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <CurrentlyReding currentlyReading={books.filter(book => (book.shelf === 'currentlyReading'))} handleUpdate={this.handleUpdate}/>
              <WantToRead wantToRead={books.filter(book => (book.shelf === 'wantToRead'))} handleUpdate={this.handleUpdate}/>
              <Read read={books.filter(book => book.shelf === 'read')} handleUpdate={this.handleUpdate}/>
            </div>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
          )}
        />  
      }       
    </div>
    )
  }
}

export default BooksApp
