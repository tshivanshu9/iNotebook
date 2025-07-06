import noteContext from './noteContext';
import React from 'react';

const NoteState = (props) => {
  const apiHost = process.env.REACT_APP_NOTES_API_URL;
  const [notes, setNotes] = React.useState([]);

  const fetchAllNotes = async () => {
    const response = await fetch(apiHost, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': process.env.REACT_APP_MOCK_TOKEN,
      },
    });
    const data = await response?.json();
    setNotes(data);
  };

  const addNote = async (title, description, newTag) => {
    const newNote = {
      title,
      description,
      ...(newTag && { tag: newTag }),
    }
    setNotes(notes.concat(newNote));
    const response = await fetch(apiHost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': process.env.REACT_APP_MOCK_TOKEN,
      },
      body: JSON.stringify(newNote),
    });
    return response?.json();
  };

  const editNote = async (id, newTitle, newDescription, newTag) => {
    console.log("Editing note with id: " + id);
    let updatedNote = {
      ...(newTitle && { title: newTitle }),
      ...(newDescription && { description: newDescription }),
      ...(newTag && { tag: newTag }),
    };
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          ...updatedNote,
        }
      }
      return note;
    });
    setNotes(updatedNotes);
    const response = await fetch(`${apiHost}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': process.env.REACT_APP_MOCK_TOKEN,
      },
      body: JSON.stringify(updatedNote),
    });
    return response?.json();
  };

  const deleteNote = (id) => {
    console.log("Deleting note with id: " + id);
    const newNotes = notes.filter((note) => note._id !== id );
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
      {props.children}
    </noteContext.Provider>
  )
};

export default NoteState;