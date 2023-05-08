const fs = require('fs');
// Creating a router for the notes file - meaning this entire file will have a root of notesRouter, and we only need to use a "/" for the path names in the routes in this file
const notesRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../fsUtils');

// Import unique ID from for node
const { v4: uuidv4 } = require('uuid');

// Get route on the home page for notes - gets all data from database, and then that data is returned in json format and parsed into the document.
// Data has to be parsed otherwise it will not show up
notesRouter.get('/', (req, res) => {
    readFromFile('db\db.json').then((data) => res.json(JSON.parse(data)));
})

// Post route for the home page on notes
notesRouter.post('/', (req, res) => {

    // Creating variable for a new note
    let newNote;

    // Destructuring the body of the request to only get the title and text elements
    // The names of these elements needs to match what we already have in the HTML
    const {title, text} = req.body;

    // if both elements on teh page exist - then we create and append the new note into the database
    if (title && text) {
        newNote = {
            title: title,
            text: text,

            // unique ID
            id: uuidv4()
        };

        // Reading from the database and then appending the new note
        readAndAppend(newNote, `./db/db.json`)
        res.send();
    } else {
        res.json(`error`)
    }
})

// Exporting the module into the index.js routes file
module.exports = notesRouter;