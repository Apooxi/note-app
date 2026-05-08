let noteList = document.getElementById("noteList");
let noteForm = document.getElementById("noteForm");
let noteTitle = document.getElementById("noteTitle");
let noteContent = document.getElementById("noteContent");

let submitButton = document.getElementById("js-submit-btn");

let allNotes = [];
let editId = null;


noteForm.addEventListener('submit', async (e) => {
  e.preventDefault(); //sayfanın yenilenmesinin önüne geçiyoruz.

  if(editId == null) {
    await fetch('/api/notes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: noteTitle.value,
        content: noteContent.value,
        complete: false,
      })
    });
  } else {
    await fetch(`/api/notes/${editId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: noteTitle.value,
        content: noteContent.value,
        complete: false,
      })
    })
  }
  
  noteTitle.value = "";
  noteContent.value = "";
  editId = null;
  submitButton.innerHTML = "Ekle"

  fetchNotes();

  
})

async function fetchNotes() {
  noteList.innerHTML = ``;

  let response = await fetch('/api/notes'); // fetch içinde varsyılan metot get olduğu için metot belirtmedik

  allNotes = await response.json();

  allNotes.forEach((note) => {
    let listElement = document.createElement("li");
    listElement.innerHTML =`
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <button onclick = "deleteNote(${note.id})">Sil</button>
    <button onclick = "prepareEdit(${note.id})">Düzenle</button>
    `;
    noteList.appendChild(listElement);
  });
       
};

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, {
    method: 'DELETE'
  });
  fetchNotes();
};

function prepareEdit(id) {
  let foundNote = allNotes.find((note) => {
    return note.id == id;
  })
  submitButton.innerHTML = "Güncelle";
  noteTitle.value = foundNote.title;
  noteContent.value = foundNote.content;
  editId = id;
}

fetchNotes();