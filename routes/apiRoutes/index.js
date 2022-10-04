const router = require('express').Router();
const { db } = require('../../db/db');
const fs = require('fs');
const path = require('path');

function createNewNote(body, dbArray) {
  const notes = body;
  dbArray.push(notes);
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes: dbArray }, null, 2)
  )
  return notes;
}

router.get('/notes', (req, res) => {
  let results = db
  res.json(results);
});

router.post('/notes', (req, res) => {
  req.body.id = db.length.toString();

  const note = createNewNote(req.body, db)
  res.json(note);
  
})

module.exports = router;

// GET /api/notes should read the db.json file and return all saved notes as JSON.
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return
// the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm
// packages that could do this for you

// function createNewAnimal(body, animalsArray) {
//   const animal = body;
//   animalsArray.push(animal);
//   fs.writeFileSync(
//     path.join(__dirname, '../data/animals.json'),
//     JSON.stringify({ animals: animalsArray }, null, 2)
//   );
//   return animal;
// }