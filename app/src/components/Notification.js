import React from 'react'

const Notification = ({ notification }) => {
    const errorStyle = {
        color: 'red',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '5px',
        marginBottom: '10px',
        marginTop: '10px'
    }

    const infoStyle = {
      color: 'green',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '5px',
      marginBottom: '10px',
      marginTop: '10px'
  }

  if (!notification) {
    return null
  }

  return (
    <div style={notification.isError === true ? errorStyle : infoStyle }>
      {notification.message}
    </div>
  )
}

export default Notification