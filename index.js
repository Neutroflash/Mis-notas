const storedNotes = JSON.parse(localStorage.getItem('notas'));
const defaultNotes = [
  { body: "Mi Primera Nota" },
  { body: "Esta es una nota larga que ocupa más de una línea" },
  { body: "Otra nota de ejemplo" },
  { body: "Última nota de ejemplo" },
];
let notes = storedNotes.length ? storedNotes : defaultNotes.slice();

function startNote(note) {
  const div = document.createElement("div");
  div.className = "note";
  
  const p = document.createElement("p");
  p.textContent = note.body;
  
  const button = document.createElement("button");
  button.textContent = "Delete";

  function handleClick() {
    deleteNote(note);
    showNotes();
  }
  button.addEventListener('click', handleClick);
  
  div.append(p, button);
  
  return div;
}
  
function showNotes() {
  const bottomBox = document.querySelector(".bottomBox");
  bottomBox.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const noteFinal = startNote(note);
    bottomBox.append(noteFinal);
  }
}

function deleteNote(note) {
  const noteIndex = notes.indexOf(note);
  notes.splice(noteIndex, 1);
  savedData();
}
  
function createNote(body) {
  notes.push({ body });
  savedData();
}
  
function noteSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const body = form.elements.note.value;
  createNote(body);
  showNotes();
  form.reset();
}

function savedData() {
  localStorage.setItem('notas', JSON.stringify(notes));
}
  
const form = document.querySelector("form");
form.addEventListener("submit", noteSubmit);
  
showNotes();
