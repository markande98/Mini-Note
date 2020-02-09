import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Divider, Button} from '@material-ui/core';
import SideBarItemComponent from '../sidebaritems/sidebaritems';

class SideBarComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null
        }
    }

    render () {

        const { notes, classes, selectedIndexNote } = this.props;

        if(notes){
            return (
                <div className={classes.sidebarContainer}>
                    <button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel':'New Note'}</button>
                    {
                        this.state.addingNote ?
                        <div>
                            <input type = "text"
                            className={classes.newNoteInput}
                            placeholder="Enter Title"
                            onKeyUp={(e) => this.updateTitle(e.target.value)}>
                            </input>
                            <button className={classes.newNoteSubmitBtn} onClick={this.newNote}>Submit Note</button>
                        </div> :
                        null
                    }
                    <List>
                        {
                            notes.map((_note, _index) => {
                                return (
                                    <div key={_index}>
                                        <SideBarItemComponent
                                            _note = {_note}
                                            _index = {_index}
                                            selectedIndexNote = {selectedIndexNote}
                                            selectNote = {this.selectNote}
                                            deleteNote = {this.deleteNote}>
                                        </SideBarItemComponent>
                                        <Divider classes={{root: classes.dividerColor}}></Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>    
            );
        } else{
            return <div></div>
        }
    }

    newNoteBtnClick = () => {
        this.setState({ title: null, addingNote: !this.state.addingNote});
    }

    updateTitle = (txt) => {
        this.setState({ title: txt});
    }

    newNote = () =>{
        this.props.newNote(this.state.title)
        this.setState({ addingNote: false, title: null})
    }
    selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote = (note) => this.props.deleteNote(note)
}

export default withStyles(styles)(SideBarComponent)

