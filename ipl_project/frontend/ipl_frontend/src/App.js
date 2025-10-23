import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MatchesPerYear from './components/MatchesPerYear';
import MatchesWon from './components/MatchesWon';
import ExtraRuns from './components/ExtraRuns';
import TopBowlers from './components/TopBowlers';
import MatchesPlayedVsWon from './components/MatchesPlayedVsWon';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [year, setYear] = useState(2016); 

  const renderPage = () => {
    switch (activePage) {
      case 'matches':
        return <MatchesPerYear />;
      case 'stacked':
        return <MatchesWon />;
      case 'extras':
        return <ExtraRuns year={year} />;
      case 'bowlers':
        return <TopBowlers year={year} />;
      case 'playedwon':
        return <MatchesPlayedVsWon year={year} />;
      default:
       
        return (
          <div className="landing-page">
            <h3 className="text-center mb-4">IPL Insights Dashboard</h3>

            <div className="card p-3 shadow-sm mb-4">
              <h5 className="text-center mb-3">Matches Played Per Year</h5>
              <MatchesPerYear />
            </div>

            <div className="card p-3 shadow-sm mb-4">
              <h5 className="text-center mb-3">Matches Won by Teams (All Seasons)</h5>
              <MatchesWon />
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      <div className="container mt-4">{renderPage()}</div>
    </div>
  );
}

export default App;
