const router = require('express').Router();
const { notes } = require('../../db/notes');
const fs = require('fs');
const path = require('path');

// I tried this extra credit for a bit.  I decided not to spend too much time
// because I don't much care about the extra points, and I'm not really sure how
// practical this exercise is.

// function deleteNote(id, dbArray) {
//   const remove = id;
//   dbArray.splice(remove, 1)
//   fs.writeFileSync(
//     path.join(__dirname, '../../notes.json'),
//     JSON.stringify({notes: deleted}, null, 2)
//   )
//   return
// }

// This is the function to add notes
function createNewNote(body, dbArray) {
  const notes = body;
  dbArray.push(notes);
  fs.writeFileSync(
    path.join(__dirname, '../../db/notes.json'),
    JSON.stringify({ notes: dbArray }, null, 2)
  )
  return notes;
}

// This runs when the notes page is opened to bring current notes
router.get('/notes', (req, res) => {
  res.json(notes);
});

// This call the function to add a note then sends notes
router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();

  const note = createNewNote(req.body, notes)
  res.json(note);
  
})
// I tried this extra credit for a bit.  I decided not to spend too much time
// because I don't much care about the extra points, and I'm not really sure how
// practical this exercise is.

// router.delete('/notes/:id', (req, res) =>{
//   const deleted = notes
//   console.log(notes);
//   console.log(req.params.id);
//   deleted.splice(req.params.id, 1);
//   console.log(notes);
  
//   res.json(notes)
// })

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