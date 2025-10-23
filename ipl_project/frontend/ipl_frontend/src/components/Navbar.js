import React from 'react';

function Navigation({ setActivePage }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => setActivePage('home')}>
          IPL Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActivePage('matches')}>Matches Per Year</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActivePage('stacked')}>Matches Won</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActivePage('extras')}>Extra Runs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActivePage('bowlers')}>Top Bowlers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActivePage('playedwon')}>Matches Played vs Won</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
