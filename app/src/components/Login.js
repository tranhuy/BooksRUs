import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { LOGIN_USER, LOGGED_IN_USER } from '../queries'

const Login = ({ show, setUser, setToken, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userResult = useQuery(LOGGED_IN_USER)
    
    const client = useApolloClient()
    const usernameRef = useRef()

    const [login, result] = useMutation(LOGIN_USER, {
        onError: (error) => {
            setNotification(error.message, true)
            usernameRef.current.focus()
        },
        onCompleted: (data) => {
            const token = data.login.value 
            setToken(token)       
            localStorage.setItem('libraryApp-user-token', token)
            //need to refetch this query after setting token so that it can be added to authorization header
            client.refetchQueries({ include: [LOGGED_IN_USER] })
        }
    })

    useEffect(() => {
        if (userResult.data && userResult.data.currentUser) {
            const loggedInUser = userResult.data.currentUser
            setUser(loggedInUser)
        }
    }, [userResult.data])

    if (!show) {
        return null
    }

    const loginUser = async (event) => {
        event.preventDefault()

        const result = await login({ variables: { username, password } })

        // if (result.data && result.data.login) {
        //     const token = result.data.login.value    
        //     setToken(token)       
        //     localStorage.setItem('libraryApp-user-token', token)            
        // }
        
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <div>username: <input value={username} onChange={({target}) => setUsername(target.value)} ref={usernameRef} autoFocus /></div>
                <div>password: <input type='password' value={password} onChange={({target}) => setPassword(target.value)} /></div>
                <button>login</button>
            </form>
        </div>
    )
}

export default Login

