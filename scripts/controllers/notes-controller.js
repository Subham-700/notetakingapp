// Controller (I/O) + Events + Talk to Services    ,, ye Screen se baat krta hai

// destructuring 
import { noteOperations } from '../services/note-services.js'; // { } used when the export is not Default;
window.addEventListener('load', init);   // JS me On word nhi hota isme add Event use hota hai.
function init() {
  showCounts();
  bindEvents();
  disableButtonDelete();
  disableButtonUpdate();
  sortEvents();
  
  document.querySelector(`#id`).value = count() ;
}
const disableButtonDelete = () => document.querySelector('#delete').disabled = true;
const enableButtonDelete = () => document.querySelector('#delete').disabled = false;
const disableButtonUpdate = () => document.querySelector('#update').disabled = true;
const enableButtonUpdate = () => document.querySelector('#update').disabled = false;

function sortEvents() {
  document.querySelector('#tup').addEventListener('click', sorttUp);
  document.querySelector('#tdown').addEventListener('click', sorttDown);
  document.querySelector('#cdup').addEventListener('click', sortcUp);
  document.querySelector('#cddown').addEventListener('click', sortcDown);
}

function sorttUp() {
  // Ascending order
  // console.log(noteOperations.sortUp());
  
  printNotes(noteOperations.sortUp(title));
}
function sorttDown() {
  // Descending Order
  printNotes(noteOperations.sortDown(title));
}
function sortcUp() {
  // Ascending order
  // console.log(noteOperations.sortUp());

  printNotes(noteOperations.sortUp(cdate));
}
function sortcDown() {
  // Descending Order
  printNotes(noteOperations.sortDown(cdate));
}

function bindEvents() {
  document.querySelector('#add').addEventListener('click', addNote);
  document.querySelector('#delete').addEventListener('click', deleteMarked);
  document.querySelector('#clear').addEventListener('click', clearAll);
  document.querySelector('#update').addEventListener('click', addNote);
  document.querySelector('#searchId').addEventListener('click',searchById);
  document.querySelector('#searchTitle').addEventListener('click', searchByTitle);

}

function searchById(){
  const id = prompt("Enter ID to Search");
  const tbody = document.querySelector('#notes');
  tbody.innerHTML = '';
  printNote(noteOperations.searchById(id));
}

function searchByTitle() {
  const title = prompt("Enter Title to Search");
  const tbody = document.querySelector('#notes');
  tbody.innerHTML = '';
  printNote(noteOperations.searchByTitle(title));
}

function deleteMarked() {
  noteOperations.remove();
  printNotes(noteOperations.getNotes());
}

function initCount() {
  let c = 0;
  function counter() {
    c++;
    return c;
  }
  return counter;
}
const count  = initCount();

function showCounts() {
  noteOperations.markTotal() > 0 ? enableButtonDelete() : disableButtonDelete();
  document.querySelector('#total').innerText = noteOperations.total();
  document.querySelector('#marktotal').innerText = noteOperations.markTotal();
  document.querySelector('#unmarktotal').innerText = noteOperations.unMarkTotal();
}


function clearAll(){
  const fields = ['id', 'title', 'desc', 'cdate', 'importance'];
  for (let x of fields) {
    // console.log(obj[x]);
    document.querySelector(`#${x}`).value ="";
  }
}

function addNote() {
  // read id,title,desc,date of completion , importance ,operations
  //    DOM
  const fields = ['id', 'title', 'desc', 'cdate', 'importance'];

  const noteObject = {}; // Object Literal
  for (let field of fields) {
    noteObject[field] = document.querySelector(`#${field}`).value.trim();
  }
  noteOperations.add(noteObject);
  printNote(noteObject);
  showCounts();
  document.querySelector(`#id`).value = count();

  //   const id = document.querySelector('#id').value;
  //   const title = document.querySelector('#title').value;
}

function printIcon(myClassName = 'trash', fn, id) {
  // <i class="fa-solid fa-trash"></i>
  // <i class="fa-solid fa-user-pen"></i>
  const iTag = document.createElement('i');
  iTag.className = `fa-solid fa-${myClassName} me-3 hand`;  // me fa-solid  hand are classes
  iTag.setAttribute('note-id', id);
  iTag.addEventListener('click', fn);
  return iTag;
}




function toggleMark() {
  // console.log('ToggleMark....',this);
  const icon = this;
  const id = this.getAttribute('note-id');
  noteOperations.toggleMark(id);
  const tr = icon.parentNode.parentNode;
  // tr.className='table-danger';
  tr.classList.toggle('table-danger');
  showCounts();
}

function printNotes(notes) {
  const tbody = document.querySelector('#notes');
  tbody.innerHTML = '';
  notes.forEach(note => printNote(note));
  showCounts();
  disableButtonUpdate();
}

function printNote(noteObject) {
  console.log(noteObject);
  const tbody = document.querySelector('#notes');
  const row = tbody.insertRow();// <tr>

  console.log(noteObject.id);

  for (let key in noteObject) {
    if(key=='isMarked')
    continue;
    const td = row.insertCell(); // <td>
    td.innerText = noteObject[key];

  }
  const td = row.insertCell();

  console.log(noteObject.id);

  td.appendChild(printIcon('trash', toggleMark, noteObject.id));
  td.appendChild(printIcon('pen-to-square', edit, noteObject.id));
  disableButtonUpdate();

}
function edit() {
  enableButtonUpdate();
  const icon = this;
  const id = this.getAttribute('note-id');
  const obj = noteOperations.searchById(id);
 
  // console.log(obj);

  
 
  for (let x in obj) {
    // console.log(obj[x]);
    if(x=='isMarked')
    continue;
    document.querySelector(`#${x}`).value = obj[x];
  }

  printNotes(noteOperations.deleteById(id)) ;
  enableButtonUpdate();
  
}