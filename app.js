
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs'); 
const notes = require('./note.js');

var command = process.argv[2];

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: '-t'

}

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias:'-b'
}

const argv = yargs
.command('add','adds a title',{
    title: titleOptions,
    body: bodyOptions
})
.command('list', 'Lists all the notes',{
})
.command('remove','Remove the note',{
    title: titleOptions
})
.command('read','Read a Note',{
    title:titleOptions
})
.help()
.argv;
//console.log('yargs: ', argv);

if(command == 'add'){
    
    console.log('Adding a new note');
    var newNote = notes.addNote(argv.title, argv.body);
    if(newNote == undefined){
        console.log('Title already exists');
    }
    else{
        console.log(`Note created with a title ${newNote.title} `)
    }

}
else if(command == 'list'){
    console.log('Call to list all notes');
    var allNotes = notes.getAll();
    
    allNotes.forEach(note => notes.logNote(note));
}
else if( command == 'remove'){
    var result = notes.removeNote(argv.title);
    if(result)
    console.log('No such note exist');
    else
    console.log('Note deleted');
}
else if(command == 'read'){
    console.log('reding the note');
    var readNote = notes.getNote(argv.title);
    if(readNote)
    {
    
    notes.logNote(readNote);
    }
    else
    console.log('No such note exists');
}
else{
    console.log('command not recognized');
}