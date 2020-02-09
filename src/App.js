import React from 'react';
import './App.css';
import SideBarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

class App extends React.Component {

  constructor() {
    super();
  
    this.state = {
       selectedIndexNote : null,
       selectedNote: null,
       notes: null
    }
  }

  componentDidMount = () => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes});
    });
  }
  
  render (){

    return(
       <div>
         <SideBarComponent selectedIndexNote={this.state.selectedIndexNote} notes={this.state.notes}
         deleteNote={this.deleteNote} selectNote = {this.selectNote} newNote={this.newNote}/>
         {
           this.state.selectedNote ?
           <EditorComponent selectedNote={this.state.selectedNote} selectedIndexNote ={this.state.selectedIndexNote}
           notes = {this.state.notes} noteUpdate = {this.noteUpdate}>
           </EditorComponent>:
           null
         }
       </div>
    )
 
  }

  selectNote = (note, index) => this.setState({selectedIndexNote: index, selectedNote: note});
  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection('notes').doc(id).update({
      title: noteObj.title,
      Body: noteObj.text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  newNote = async (title) => {
    const note = {
      title: title,
      Body: ''
    }

    const newFromDB = await firebase.firestore().collection('notes').add({
      title: note.title,
      Body: note.Body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const newID = newFromDB.id
    await this.setState({ notes: [...this.state.notes, note]})
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
    this.setState({ selectNote: this.state.notes[newNoteIndex], selectedIndexNote: newNoteIndex})
  }
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note)
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)})
    if(this.state.selectedIndexNote === noteIndex){
      this.setState({ selectedNote: null, selectedIndexNote: null})
    }else{
      this.state.notes.length > 1?
      this.selectNote(this.state.notes[this.state.selectedIndexNote - 1], this.state.selectedIndexNote - 1):
      this.setState({ selectedNote: null, selectedIndexNote: null})
    }

    firebase.firestore().collection('notes').doc(note.id).delete()

  }
}

export default App;
