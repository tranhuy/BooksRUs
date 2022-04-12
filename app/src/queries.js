import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
        genres
    }
`

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        bookCount
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
    query findByGenre($genre: String) {
        allBooks(
            genre: $genre
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const LOGGED_IN_USER = gql`
    query {
        currentUser {
            username
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author {
                ...AuthorDetails
            }
            published
            genres
        }
    }
    ${AUTHOR_DETAILS}
`

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthorBirthYear($name: String!, $birthYear: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $birthYear
        ) {
            name
            born
        }
    }
`

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`