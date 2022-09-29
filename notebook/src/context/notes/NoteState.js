import NoteContext from "./NoteContext";
import React, { useState } from 'react';
const NoteState = (props) => {

    const host = "http://localhost:5000"

    const notesIntail = []

    const [notes, setNotes] = useState(notesIntail);
    const [alert, setAlert] = useState(null);

    // Get Notes
    const getNote = async () => {
        console.log("calling fetch note");
        // To do api call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },

        })

        const json = await response.json();
        setNotes(json);
        console.log(json);
    }

    // Add note
    const addNote = async (title, description, tag) => {
        console.log("calling add note");
        // To do api call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();
        console.log(json);
        setNotes(notes.concat(json));
    }

    // Delete Note
    const deleteNote = async (id) => {
        // TODO API Call


        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            // body: JSON.stringify()
        })

        const json = await response.json();

        console.log(json);

        console.log("deleting note");
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes);
        console.log(id);
    }


    // update note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();

        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));


        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }

    // Show Alert
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })

        setTimeout(() => {
            setAlert(null)
        }, 3000);
    }

    return (
        <>
            <NoteContext.Provider value={{ notes, getNote, setNotes, addNote, deleteNote, editNote, alert, showAlert }} >
                {props.children}
            </NoteContext.Provider>
        </>
    )
}
export default NoteState;
