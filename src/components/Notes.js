import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes } = context;
  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h2>Your notes</h2>
      {
        notes?.map((note) => <Noteitem key={note._id} note={note}></Noteitem>)
      }
    </div>
    </>
  )
}

export default Notes
