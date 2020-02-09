import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../need';

class SideBarItemComponent extends React.Component {

    render () {

        const { _index, _note, classes, selectedIndexNote} = this.props;

        return (
            <div key={_index}>
                <ListItem
                className={classes.listItem}
                selected={selectedIndexNote === _index}
                alignItems='flex-start'>
                    <div
                    className={classes.textSection}
                    onClick={() => this.selectNote(_note, _index)}>
                        <ListItemText
                        primary={_note.title}
                        secondary={removeHTMLTags(_note.Body.substring(0,30)) + '...'}></ListItemText>
                    </div>
                </ListItem>
                <DeleteIcon
                onClick={() => this.deleteNote(_note)}
                className={classes.deleteIcon}></DeleteIcon>
            </div>
        );
    }
    selectNote = (_note, _index) => this.props.selectNote(_note, _index);
    deleteNote = (_note) => {
        if(window.confirm(`Are you sure you want to delete: ${_note.title}`)){
            this.props.deleteNote(_note);
        }
    }
}

export default withStyles(styles)(SideBarItemComponent)