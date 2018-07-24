
const fs = require('fs');

var fetchNotes = ()=>{
    try{
        var noteString = fs.readFileSync('notes-data.json');
         return JSON.parse(noteString);
       }
       catch(e){
        return [];
       }
}

var saveNotes = (notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
    
}

addNote=(title, body)=>{

  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title == title);
   if(duplicateNotes.length == 0){ 
    notes.push(note);
    saveNotes(notes);
    return note;
    }
    else{
        return ;
    }
    
}



getAll =()=>{
    return fetchNotes();

}
//The filter() method creates a new array with all 
//elements that pass the test implemented by the 
//provided function.


var removeNote=(title)=>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);

    return notes.length == filteredNotes.length;
}

var getNote=(title)=>{
    // fetch notes
    var notes = fetchNotes();
    // filter note
    var filteredNote = notes.filter((note)=> note.title === title);
    // read note
    //console.log(filteredNote[0].title);
    return filteredNote[0];
    
    //console.log(`The ${filteredNote[0].title} reads... ${filteredNote.body}`);
}

var logNote =(note)=>{
    debugger;
    console.log(note.title);
    console.log(note.body);
}

module.exports = {
    addNote,
    getAll   ,
    removeNote,
    getNote,
    logNote
}