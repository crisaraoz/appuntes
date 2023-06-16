import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from '../src/screens/Home/HomeScreen';
import NoteScreen from '../src/screens/Note/NoteScreen';
 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/notes/:subjectId" element={<NoteScreen/>} />
      </Routes>
    </Router>
  );
};
 
export default App;