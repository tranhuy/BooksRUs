  import React from 'react'
  import { ALL_AUTHORS } from '../queries'
  import { useQuery } from '@apollo/client'

  import EditAuthor from './EditAuthor'
  import EditAuthorSelect from './EditAuthorSelect'

const Authors = ({ show, isLoggedIn, setNotification }) => {
  // eslint-disable-next-line
  const { loading, error, data} = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading authors...</div>
  }

  const authors = data.allAuthors

  if (authors.length === 0) {
    return (
      <div>
        <h2>Authors</h2>
        <div>No authors to display.</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <EditAuthor setNotification={setNotification} /> */}
      {
        isLoggedIn && <EditAuthorSelect authors={authors} setNotification={setNotification} />
      }
    </div>
  )
}

export default Authors
