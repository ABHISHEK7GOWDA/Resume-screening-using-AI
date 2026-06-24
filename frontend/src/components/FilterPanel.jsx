import { useState } from 'react';
import { Filter, Search } from 'lucide-react';

export default function FilterPanel({ onFilterChange }) {
  const [skillsInput, setSkillsInput] = useState('');
  const [minExperience, setMinExperience] = useState(0);

  const handleApplyFilters = () => {
    const requiredSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    onFilterChange({ requiredSkills, minExperience: parseInt(minExperience, 10) || 0 });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  return (
    <div className="glass-panel" style={{ position: 'sticky', top: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Filter size={20} color="var(--accent-primary)" />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Screening Filters</h2>
      </div>
      
      <div className="input-group">
        <label className="input-label">Required Skills (Comma separated)</label>
        <input 
          type="text" 
          className="text-input" 
          placeholder="e.g. React, Python, Management" 
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Candidates matching these skills will score higher.
        </p>
      </div>
      
      <div className="input-group">
        <label className="input-label">Minimum Years of Experience</label>
        <input 
          type="number" 
          className="text-input" 
          min="0"
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      <button className="btn" style={{ width: '100%', marginTop: '1rem' }} onClick={handleApplyFilters}>
        <Search size={18} />
        Apply Filters & Rank
      </button>
    </div>
  );
}
