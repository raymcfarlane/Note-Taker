const notesRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../../fsUtils');

const { v4: uuidv4 } = require('uuid');
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notesRouter.post('/', (req, res) => {
    let newNote;
    const {title, text} = req.body;
    if (title && text) {
        newNote = {
            title: title,
            text: text,
            id: uuidv4()
        };

        readAndAppend(newNote, `./db/db.json`)
        res.send();
    } else {
        res.json(`error`)
    }
})

module.exports = notesRouter;