// ES6
// Export feature is like as it make the Note class public and it fisrt creates an object and sends and we need to destructure ({ }) it. 
export class Note {
    constructor(noteObject) {
        for (let key in noteObject) {
            this[key] = noteObject[key];
        }
        this.isMarked = false;
    }
    toggleMark() {
        this.isMarked = !this.isMarked;
    }
}

export default Note;
// export default Note  ,, at the end if we write this line then it does not create object ;
// default can be written only one time but export can be written many times
