import React from 'react';
import './App.css';
import DreamScapeContainer from './DreamScapeContainer';

/**
 * PUBLIC_INTERFACE
 * App root for DreamScape Creations.
 * Renders navbar and the main DreamScapeContainer.
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> DreamScape Creations
            </div>
            <button className="btn" tabIndex={-1} style={{ opacity: 0.65, cursor: "not-allowed" }}>
              Powered by KAVIA
            </button>
          </div>
        </div>
      </nav>
      <main>
        <DreamScapeContainer />
      </main>
    </div>
  );
}

export default App;