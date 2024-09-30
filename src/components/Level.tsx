import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import logo from "./../assets/logo.png";
import './Level.css';

function Level() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedLevel) {
      localStorage.setItem('level', selectedLevel);
      navigate('/gameplay');
    } else {
      alert('Veuillez sélectionner un niveau');
    }
  };

  return (
    <main className="level-container">
      <img className="logo-level" src={logo} alt="Logo" />
      <h1 className='titre-level'>Choisissez un niveau</h1>
      <form onSubmit={handleSubmit} className="level-form">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="1"
              checked={selectedLevel === 'Facile'}
              onChange={handleLevelChange}
            />
            Facile
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="2"
              checked={selectedLevel === 'Moyen'}
              onChange={handleLevelChange}
            />
            Moyen
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="3"
              checked={selectedLevel === 'Difficile'}
              onChange={handleLevelChange}
            />
            Difficile
          </label>
        </div>
        <button type="submit" className="submit-button">
          Valider
        </button>
      </form>
    </main>
  );
}

export default Level;