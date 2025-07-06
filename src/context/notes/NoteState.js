import noteContext from './noteContext';
import React from 'react';

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "686a230fee650cf29bf49ad1",
      "title": "I am sleeping",
      "description": "Sleeping note",
      "tag": "General",
      "userId": "686969f2708071f93e075e84",
      "date": "2025-07-06T07:17:35.201Z",
      "__v": 0
    },
    {
      "_id": "686a230fee650cf29bf49ad1",
      "title": "I am running",
      "description": "Sleeping note",
      "tag": "General",
      "userId": "686969f2708071f93e075e84",
      "date": "2025-07-06T07:17:35.201Z",
      "__v": 0
    }
  ];
  const [notes, setNotes] = React.useState(notesInitial);
  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  )
};

export default NoteState;