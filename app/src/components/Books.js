import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [selectedBooks, setSelectedBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      setSelectedBooks(allBooks)
      setSelectedGenre('all genres')
      setGenres([...new Set(allBooks.map(book => book.genres).flat())])
    }   
  }, [result.data, props.isLoggedIn])

  useEffect(() => {
      const booksToDisplay = selectedGenre === 'all genres' ? books : books.filter(book => book.genres.includes(selectedGenre))
      setSelectedBooks(booksToDisplay)
  }, [selectedGenre])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading books...</div>
  }

  if (books.length === 0) {
    return (
      <div>
        <h2>Books</h2>
        <div>No books to display.</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>
      <div>In genre <strong>{selectedGenre}</strong></div>
      <table style={{ marginTop: 5, marginBottom: 10 }}>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {selectedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {
              genres.map((genre, index) => 
                  <button key={index} onClick={() => setSelectedGenre(genre)}>{genre}</button>
              )
            }
            <button onClick={() => setSelectedGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books