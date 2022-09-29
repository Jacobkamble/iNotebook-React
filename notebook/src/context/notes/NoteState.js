import NoteContext from "./NoteContext";
import React, { useState } from 'react';
const NoteState = (props) => {

    const host = "http://localhost:5000"

    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState("");
    const [noOfNotes, setNoOfNotes] = useState(0);
    const [timestamp, setTimestamp] = useState("");

    // Get Notes
    const getNote = async () => {
        // To do api call
        getUserdata();

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },

        })

        const json = await response.json();
        setNoOfNotes(json.length);
        setNotes(json);
    }

    // Add note
    const addNote = async (title, description, tag) => {
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
        setNoOfNotes(noOfNotes + 1);
        setNotes(notes.concat(json));
    }

    // Delete Note
    const deleteNote = async (id) => {
        // TODO API Call


        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            // body: JSON.stringify()
        })

        // const json = await response.json();
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNoOfNotes(noOfNotes - 1);
        setNotes(newNotes);
    }


    // update note
    const editNote = async (id, title, description, tag) => {
        // API Call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })

        // const json = await response.json();

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


    const capatalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    // get User data

    const getUserdata = async () => {
        // To do api call

        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },

        })
        
        const json = await response.json();
        const userFetch = capatalize(json.name);
        
        const date = new Date(json.timestamp);
        const strTime = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        setTimestamp(strTime);
        setUser(userFetch)

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
            <NoteContext.Provider value={{ notes, user, noOfNotes, timestamp, getNote, setNotes, addNote, deleteNote, editNote, getUserdata, alert, showAlert }} >
                {props.children}
            </NoteContext.Provider>
        </>
    )
}
export default NoteState;
