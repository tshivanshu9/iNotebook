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
        'auth-token': localStorage.getItem('token'),
      },
    });
    const data = (await response?.json())?.data;
    console.log("🚀 ~ fetchAllNotes ~ data:", data)
    setNotes(data);
  };

  const addNote = async (title, description, newTag) => {
    const newNote = {
      title,
      description,
      ...(newTag && { tag: newTag }),
    }
    try {
      const response = await fetch(apiHost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(newNote),
      });
      const finalResponse = await response?.json();
      if (finalResponse?.success) {
        setNotes(notes.concat(newNote));
        props.showAlert('Note added successfully', 'success');
        return finalResponse?.data;
      } else {
        props.showAlert('Failed to add note', 'danger');
      }
    } catch (error) {
      props.showAlert('Failed to add note', 'danger');
    }
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
    try {
      const response = await fetch(`${apiHost}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedNote),
      });
      const finalResponse = await response?.json();
      console.log("🚀 ~ editNote ~ finalResponse:", finalResponse)
      if (finalResponse?.success) {
        setNotes(updatedNotes);
        props.showAlert('Note updated successfully', 'success');
        return finalResponse?.data;
      } else {
        props.showAlert('Failed to update note', 'danger');
      }
    } catch (error) {
      props.showAlert('Failed to update note', 'danger');
    }
  };

  const deleteNote = async (id) => {
    console.log("Deleting note with id: " + id);
    const newNotes = notes.filter((note) => note._id !== id );
    try {
      const res = await fetch(`${apiHost}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const finalResponse = await res?.json();
      if (finalResponse?.success) {
        setNotes(newNotes);
        props.showAlert('Note deleted successfully', 'success');
      } else {
        props.showAlert('Failed to delete note', 'danger');
      }
    } catch (error) {
      props.showAlert('Failed to delete note', 'danger');
    }
  };

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
      {props.children}
    </noteContext.Provider>
  )
};

export default NoteState;