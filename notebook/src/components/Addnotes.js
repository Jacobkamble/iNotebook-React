import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Addnotes() {
    const context = useContext(NoteContext);
    const { addNote, showAlert } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Added note succussfully...!!!", "success");
        setNote({ title: "", description: "", tag: "" });
    }

    return (
        <>
            <div className="container mt-3" style={{ width: "" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Add Note</h3>
                    <h6>Pratik</h6>

                </div>

                <form>
                    <div className="mb-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" name='title' id="title" aria-describedby="emailHelp" value={note.title} onChange={handleOnChange} minLength={5} required />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea type="" className="form-control" id="description" name='description' value={note.description} onChange={handleOnChange} minLength={5} required />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                        <input type="text" className="form-control" name='tag' id="tag" aria-describedby="emailHelp" value={note.tag} onChange={handleOnChange} minLength={5} required />
                    </div>
                    <button disabled={note.title.length < 5 || note.description < 5 || note.tag < 5} type="submit" className="btn btn-danger" onClick={handleAddNote}>Add Note</button>
                </form>
            </div>
        </>
    )
}
