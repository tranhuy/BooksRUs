import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { LOGGED_IN_USER, BOOKS_BY_GENRE } from '../queries'


const RecommendedBooks = ({ show, user }) => {
    const [books, setBooks] = useState([])
    const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE)

    const getBooksByGenre = genre => {
        getBooks({ variables: { genre } })  
    }   

    useEffect(() => {
        if (user) {
            getBooksByGenre(user.favoriteGenre)
        }
    }, [user])

    useEffect(() => {
        if (booksResult.data) {
            setBooks(booksResult.data.allBooks)
        }
    }, [booksResult.data])

    if (!show) {
        return null
    }
    
    if (booksResult.loading) {
        return <div>loading recommendations...</div>
    }

    if (books.length === 0) {
        return (
          <div>
            <h2>Recommendations from {user.username}</h2>
            <div>No books were found in genre <strong>{user.favoriteGenre}</strong>.</div>
          </div>
        )
    }
    
    return (
        <div>
            <h2>Recommendations from {user.username}</h2>
            <div>Books in your favorite genre <strong>{user.favoriteGenre}</strong></div>
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
                {books.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendedBooks