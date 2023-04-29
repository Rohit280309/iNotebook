import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import colorContext from '../context/bgColor/colorContext';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default"});
    let history = useNavigate();
    const contextColor = useContext(colorContext);
    const { mode } = contextColor;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNote()
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            {/* Disabled button required for editing modal */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" style={{ color: mode === 'light' ? 'black' : 'white'}}id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " style={{ backgroundColor: mode === 'light' ? 'wihte' : 'black' }}>
                    <div className="modal-content" style={{ backgroundColor: mode === 'light' ? 'wihte' : 'grey' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" placeholder='Minimum length 1' defaultValue={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' placeholder='Minimum length 5' defaultValue={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' placeholder='Leave blank for Default tag' defaultValue={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<1 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3" style={{ color: mode === 'light' ? 'black' : 'white' }}>
                <h2>Your notes</h2>
                <div className="container">
                    {notes.length === 0 && "No note to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
