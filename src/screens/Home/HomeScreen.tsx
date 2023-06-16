import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Matemática' },
    { id: '2', name: 'Física' },
    { id: '3', name: 'Química' },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSubjectName, setEditedSubjectName] = useState('');
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubjectClick = (subjectId) => {
    if (selectedSubject === subjectId) {
      navigate(`/notes/${subjectId}`);
    } else {
      setSelectedSubject(subjectId);
    }
  };

  const handleSubjectDoubleClick = (subjectId) => {
    navigate(`/notes/${subjectId}`);
  };

  const handleSubjectNameChange = (subjectId, newName) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === subjectId) {
        return { ...subject, name: newName };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
    setSearchQuery(""); // Limpiar la cadena de búsqueda al cambiar el nombre de una materia
  };

  const handleEditButtonClick = () => {
    setIsEditMode(true);
    const selectedSubjectObj = subjects.find((subject) => subject.id === selectedSubject);
    if (selectedSubjectObj) {
      setEditedSubjectName(selectedSubjectObj.name);
    }
  };

  const handleSaveButtonClick = () => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === selectedSubject) {
        return { ...subject, name: editedSubjectName };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
    setIsEditMode(false);
  };

  const handleCancelButtonClick = () => {
    setIsEditMode(false);
  };

  const handleCreateSubject = () => {
    if (newSubjectName.trim() !== '') {
      const newSubjectId = String(subjects.length + 1);
      const newSubject = { id: newSubjectId, name: newSubjectName };
      setSubjects([...subjects, newSubject]);
      closeModal();
      setNewSubjectName('');
    }
  };
  

  const handleConfirmCreateSubject = () => {
    const newSubjectId = (subjects.length + 1).toString();
    const newSubject = { id: newSubjectId, name: newSubjectName };
    setSubjects([...subjects, newSubject]);
    setIsCreatePopupOpen(false);
    setNewSubjectName('');
  };

  const handleCancelCreateSubject = () => {
    setIsCreatePopupOpen(false);
    setNewSubjectName('');
  };

  const handleDeleteSubject = () => {
    if (selectedSubject) {
      const updatedSubjects = subjects.filter((subject) => subject.id !== selectedSubject);
      setSubjects(updatedSubjects);
      setSelectedSubject(null);
    }
  };
  const filterSubjects = () => {
    return subjects.filter((subject) =>
      subject.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchQuery
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
        )
    );
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setNewSubjectName('');
  };
  return (
    <>
      <Header />
      <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar materia..."
        className="search-input"
      />
      </div>
      <div className="cards-container">
        {filterSubjects().map((subject) => (
          <div
            key={subject.id}
            className={`card ${selectedSubject === subject.id ? 'selected' : ''}`}
            onClick={() => handleSubjectClick(subject.id)}
            onDoubleClick={() => handleSubjectDoubleClick(subject.id)}
          >
            <div className="card-title">
              {isEditMode && selectedSubject === subject.id ? (
                <input
                  type="text"
                  value={editedSubjectName}
                  onChange={(e) => setEditedSubjectName(e.target.value)}
                  className="card-title-input"
                  style={{ background: 'transparent', border: 'none' }}
                />
              ) : (
                subject.name
              )}
            </div>
            <div className="card-buttons">
              {isEditMode ? (
                <>
                  <button className="card-save-button" onClick={handleSaveButtonClick}>
                    Guardar
                  </button>
                  <button className="card-cancel-button" onClick={handleCancelButtonClick}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button className="card-edit-button" onClick={handleEditButtonClick}>
                  Editar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button className="create-subject-button" onClick={openModal}>
          Crear Materia
        </button>
        <button className="delete-subject-button" onClick={handleDeleteSubject} disabled={!selectedSubject}>
          Borrar Materia
        </button>
      </div>
      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              className="modal-input"
              placeholder="Ingrese el nombre de la materia"
            />
            <button className="modal-button" onClick={handleCreateSubject}>
              Crear
            </button>
            <button className="modal-button" onClick={closeModal}>
              Cancelar
            </button>

          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomeScreen;
