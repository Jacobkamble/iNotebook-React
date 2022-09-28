import React, { useState, useContext, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Addnotes from './Addnotes';
import NotesItem from './NotesItem';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNote, editNote, showAlert } = context;

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNote();
        }
        else {
            navigate("/login");
        }
    }
        // eslint-disable-next-line
        , [])

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleAddNote = (e) => {
        console.log("Updating note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert("Note Updated Successfully", 'primary');
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description,
            etag: currentNote.tag
        });
    }

    return (
        <>
            <Addnotes />

            <button ref={ref} type="button" className="btn btn-primary d-none"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-1">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title
                                    </label>
                                    <input type="text" className="form-control" name='etitle' id="etitle"
                                        aria-describedby="emailHelp" value={note.etitle}
                                        onChange={handleOnChange} minLength={5} required />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="exampleInputPassword1" className="form-label">
                                        Description</label>
                                    <textarea type="" className="form-control" id="edescription"
                                        name='edescription' value={note.edescription}
                                        onChange={handleOnChange} minLength={5} required />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name='etag' id="etag"
                                        aria-describedby="emailHelp" value={note.etag}
                                        onChange={handleOnChange} minLength={5} required />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription < 5 || note.etag.length < 5}
                                type="button" className="btn btn-danger" onClick={handleAddNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row  my-2 container">
                <h3>Your Notes</h3>
                <div className="container mx-2">
                    {notes.length === 0 && "No notes to display"}
                </div>

                {notes.map((notes) => {
                    return <NotesItem key={notes._id} note={notes} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}
