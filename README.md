# Books 'R' Us App

## About and Usage

This a simple book catalog application that offers the following features:
-  logging in as an existing user and logging out
-  UI for displaying a list of books and filtering by genres
-  UI for displaying a list of authors
-  an authenticated user is able to add a new book, edit the birthyear of an existing author, and is presented with a view of all books that belong to their favourite genre

## Technical Overview

- GraphQL API is used for communication with the server
- Apollo platform was selected for GraphQL communication
- GraphQL DataLoader library is used to optimize data fetching performance on the server
- User authentication is achieved with JWT and the user token is stored in local storage
- Data is saved to a MongoDB database and the Mongoose library is used for performing database CRUD operations

## Requirements

Make sure to use Node version 16.  If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## Installation

1. Clone the repo by running 
```sh
git clone git@github.com:tranhuy/BooksRUs.git
```
2. Launch code editor in the app subdirectory

3. Install npm packages by running
```sh
npm install
```

4. Start the app by running
```sh
npm start
```

## Note about user login

Since the application currently does not have a UI for registering new users, you can use the following username/password for logging in: `testuser/password`.