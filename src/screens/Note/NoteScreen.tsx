import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NoteScreen.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Define la interfaz para el tipo de nota
interface Note {
  id: string;
  subjectId: string;
  title: string;
  content: string;
}

const NoteScreen = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTitle, setEditableTitle] = useState('');
  const [editableContent, setEditableContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', subjectId: '1', title: 'Nota 1', content: 'Contenido de la nota 1' },
    { id: '2', subjectId: '1', title: 'Nota 2', content: 'Contenido de la nota 2' },
  ]);

  const filteredNotes = notes.filter((note) => note.subjectId === subjectId);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteDoubleClick = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setEditableTitle(note.title);
    setEditableContent(note.content);
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: `${notes.length + 1}`,
      subjectId: subjectId!,
      title: 'Nuevo Apunte',
      content: '',
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setIsModalOpen(true);
    setEditableTitle(newNote.title);
    setEditableContent(newNote.content);
  };

  const handleSaveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, title: editableTitle, content: editableContent } : note
      );
      setNotes(updatedNotes);
    }
    setIsModalOpen(false);
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);
      setNotes(updatedNotes);
      setSelectedNote(null);
      setIsModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      <div className="notes-container">
        <h2>Notas de la materia {subjectId}</h2>
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`note-card ${selectedNote?.id === note.id ? 'selected' : ''}`}
              onClick={() => handleNoteClick(note)}
              onDoubleClick={() => handleNoteDoubleClick(note)}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>

        {/* Botones para "Crear Nota" y "Borrar Nota" */}
        <div className="buttons-container">
          <button className="create-note-button" onClick={handleCreateNote}>
            Crear Nota
          </button>
          <button className="delete-note-button" onClick={handleDeleteNote} disabled={!selectedNote}>
            Borrar Nota
          </button>
        </div>
        <div className="headerHome">
          <button onClick={handleGoBack} className="back-button">
            Volver atrás
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal" onClick={handleModalClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="modal-title"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
              />
              <textarea
                className="modal-content-textarea"
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
              />
              <button className="save-note-button" onClick={handleSaveNote}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NoteScreen;
