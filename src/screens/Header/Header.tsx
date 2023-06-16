import React from 'react';
import './Header.css';
 
const subjects = [
  { name: 'Matemática', href: '#' },
  { name: 'Física', href: '#' },
  { name: 'Química', href: '#' },
  { name: 'Analisis', href: '#' },
  { name: 'Informatica', href: '#' },
  { name: 'Ingles', href: '#' },
];
 
const Header = () => {
  const handleGoBack = () => {
    history.back();
  };
  return (
    <header className="header">
      <nav className="navbar">
      <div className="headerHome">
        <button onClick={handleGoBack} className="back-button">Home</button>
      </div>
        <div className="menu-item">
          <span>Materias</span>
          <div className="dropdown">
            {subjects.map((subject) => (
              <a key={subject.name} href={subject.href} className="dropdown-item">
                {subject.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
 
export default Header;