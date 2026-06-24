import { useState } from 'react';
import UploadZone from './components/UploadZone';
import FilterPanel from './components/FilterPanel';
import CandidateList from './components/CandidateList';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({ requiredSkills: [], minExperience: 0 });

  const fetchFilteredCandidates = async (currentFilters) => {
    try {
      const response = await fetch('http://localhost:3000/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentFilters),
      });
      const data = await response.json();
      if (response.ok) {
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.error("Filter error:", error);
    }
  };

  const handleUploadSuccess = () => {
    // Re-run filter on the server to get updated scores for everyone
    fetchFilteredCandidates(filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchFilteredCandidates(newFilters);
  };

  return (
    <div className="app-container">
      <header className="animate-fade-in">
        <h1>TalentRank AI</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
          Bulk resume screening and candidate ranking engine.
        </p>
      </header>
      
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <UploadZone onUpload={handleUploadSuccess} />
      </section>

      <section className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <aside>
          <FilterPanel onFilterChange={handleFilterChange} />
        </aside>
        <main>
          <CandidateList candidates={candidates} requiredSkills={filters.requiredSkills} />
        </main>
      </section>
    </div>
  );
}

export default App;
