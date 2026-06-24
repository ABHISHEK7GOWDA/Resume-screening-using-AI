import { FileText, Briefcase } from 'lucide-react';

export default function CandidateList({ candidates, requiredSkills = [] }) {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="glass-panel empty-state animate-fade-in">
        <FileText size={48} color="var(--border-glass)" style={{ margin: '0 auto 1rem auto' }} />
        <h3>No Candidates Found</h3>
        <p>Upload some resumes or adjust your filters to see results.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Ranked Candidates</h2>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem' }}>
          {candidates.length} profiles
        </span>
      </div>
      
      {candidates.map((candidate, index) => {
        let scoreClass = 'score-med';
        if (candidate.matchScore >= 80) scoreClass = 'score-high';
        if (candidate.matchScore < 40) scoreClass = 'score-low';

        return (
          <div key={candidate.id} className="candidate-card glass-panel" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="candidate-header">
              <div>
                <h3 className="candidate-name">{candidate.name}</h3>
                <div className="candidate-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Briefcase size={14} /> {candidate.experience} Years Exp.
                  </span>
                  <span>-</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FileText size={14} /> {candidate.filename}
                  </span>
                </div>
              </div>
              <div className={`match-score ${scoreClass}`} title="Match Score">
                {candidate.matchScore}
              </div>
            </div>
            
            <div className="skills-container">
              {candidate.skills.length > 0 ? (
                candidate.skills.map((skill, idx) => {
                  const isMatched = requiredSkills.some(rs => rs.toLowerCase() === skill.toLowerCase());
                  return (
                    <span key={idx} className={`skill-tag ${isMatched ? 'tag-matched' : ''}`}>
                      {skill}
                    </span>
                  );
                })
              ) : (
                <span className="skill-tag" style={{ background: 'transparent', borderColor: 'var(--border-glass)' }}>
                  No recognizable skills extracted
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
