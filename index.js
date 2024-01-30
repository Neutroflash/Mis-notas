const notes = JSON.parse(localStorage.getItem('notas'));

function startNote(note) {
  const div = document.createElement("div");
  div.className = "note";
  
  const p = document.createElement("p");
  p.textContent = note.body;
  
  const button = document.createElement("button");
  button.textContent = "Borrar";

  function handleClick() {
    deleteNote(note);
    showNotes();
    console.log("Funciona el click")
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
  console.log("Nota Borrada")
  savedData();
}
  
function createNote(body) {
  if (body !== "") {
    notes.push({ body });
    console.log("Nota creada")
    savedData();
  }
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
