import React, { useState, useImperativeHandle } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOKS_BY_GENRE } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = React.forwardRef(({ show, user, setNotification }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    //refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }], 
    onError: (error) => {
      setNotification(error.message, true)
    },
    update: (cache, { data }) => {
      const { allBooks } = cache.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: user.favoriteGenre } })
      
      if (data.addBook.genres.includes(user.favoriteGenre)) {
        cache.writeQuery({
          query: BOOKS_BY_GENRE,
          data: {
            allBooks: [ ...allBooks, data.addBook ]
          },
          variables: {
            genre: user.favoriteGenre
          }
        })
      }
    }
  })

  const clearFormFields = () => {
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  useImperativeHandle(ref, () => {
    return {
      clearFormFields
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    if (!title || !author || !published || genres.length === 0) {
      setNotification('Cannot have empty fields', true)
      return
    }

    console.log('add book...')

    await addBook({ variables: { title, published: Number(published), author, genres }})

    clearFormFields()
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title: <input value={title} onChange={({ target }) => setTitle(target.value)} autoFocus />
        </div>
        <div>
          author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published: <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
})

export default NewBook
