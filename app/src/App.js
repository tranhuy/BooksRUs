
import React, { useState, useEffect, useRef } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  const newBookRef = useRef()

  useEffect(() => {
    const loggedInUserToken = localStorage.getItem('libraryApp-user-token')

    if (loggedInUserToken) {
      setToken(loggedInUserToken)
    }
  }, [])

  //go to authors page after user logs in or logs out
  useEffect(() => {
    setPage('authors')
  }, [token])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      const { allBooks } = client.readQuery({ query: ALL_BOOKS })

      if (!allBooks.includes(newBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: {
            allBooks: allBooks.concat(newBook)
          }
        })
      }

      const { allAuthors } = client.readQuery({ query: ALL_AUTHORS })
      const author = allAuthors.find(author => author.name === newBook.author.name)
      
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: !author ? allAuthors.concat(newBook.author) : allAuthors
        }
      })

      notify(`BOOK ADDED: ${newBook.title} by ${newBook.author.name}`)
    }
  })

  const notify = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification(null)
    }, 3000);
  }

  const logout = () => {   
    localStorage.clear()
    setToken(null)
    setUser(null)
    setPage('authors')
    client.resetStore()
    newBookRef.current.clearFormFields()
  }

  return (
    <div>
      <h2>Books 'R' US</h2>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? 
              <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>author picks</button>
                <button onClick={logout}>logout</button>
              </> : 
              <button onClick={() => setPage('login')}>login</button>
        }      
      </div>
      <Notification notification={notification} />
      <Authors
        show={page === 'authors'}
        isLoggedIn={token !== null}
        setNotification={notify}
      />

      <Books
        show={page === 'books'}
        isLoggedIn={token !== null}
      />

      <RecommendedBooks
        show={page === 'recommend'}
        user={user}
      />

      <NewBook
        show={page === 'add'} 
        user={user}
        setNotification={notify}
        ref={newBookRef}
      />

      <Login
        show={page === 'login'} 
        setUser={setUser}
        setToken={setToken}
        setNotification={notify}
      />

    </div>
  )
}

export default App