// CRUD
import Note from '../models/note.js';
export const noteOperations = {
    notes: [],
    add(noteObject) {
        const note = new Note(noteObject);
        this.notes.push(note);
    },

    total() {
        return this.notes.length;
    },
    searchById(id) {
        return this.notes.find(note => note.id == id);
    },

    searchByTitle(title) {
        return this.notes.find(note => note.title == title);
    },
    
    toggleMark(id) {
        this.searchById(id).toggleMark();
        //   const noteObject = this.searchById(id);
        //   noteObject.isMarked = !noteObject.isMarked;
    },
    markTotal() {
        return this.notes.filter(note => note.isMarked).length;
    },
    unMarkTotal() {
        return this.total() - this.markTotal();
    },
    getNotes() {
        return this.notes;
    },
    remove() {
        this.notes = this.notes.filter(note => !note.isMarked);
    },
    sortUp(key) {
        
        const arr = [...this.notes];
     if(key==title)
       return arr.sort((a, b) => a.title.localeCompare(b.title));
         else
      return arr.sort((a, b) => a.cdate.localeCompare(b.cdate));
        
    },
    sortDown(key) {
        const arr = [...this.notes];
        if (key == title)
            return arr.sort((b, a) => a.title.localeCompare(b.title));
        else
            return arr.sort((b, a) => a.cdate.localeCompare(b.cdate));
    },

    

    save() {

    },
    update() {

    },
    load() {

    },
    deleteById(id) {
        console.log(id);
       return this.notes = this.notes.filter(note => note.id!=id);
    },

}