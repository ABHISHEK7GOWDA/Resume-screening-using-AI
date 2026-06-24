const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// In-memory candidate database
let candidates = [];

// Predefined list of skills to match
const SKILLS_DB = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Express',
  'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'Machine Learning', 'NLP', 'Data Analysis',
  'Project Management', 'Agile', 'Scrum', 'Leadership', 'TypeScript',
  'Vue.js', 'Angular', 'HTML', 'CSS', 'Tailwind', 'Git'
];

// Helper to extract skills
function extractSkills(text) {
  const extracted = new Set();
  const lowerText = text.toLowerCase();
  
  SKILLS_DB.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      extracted.add(skill);
    }
  });
  
  return Array.from(extracted);
}

// Helper to estimate years of experience (naive regex)
function extractExperience(text) {
  const match = text.match(/(\d+)(?:\+|-)?\s*years?/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0; // Default if not found
}

// Upload endpoint
app.post('/upload', upload.array('resumes'), async (req, res) => {
  try {
    const files = req.files;
    const processedCandidates = [];

    for (const file of files) {
      if (file.mimetype === 'application/pdf') {
        const data = await pdf(file.buffer);
        const text = data.text;
        
        const skills = extractSkills(text);
        const experience = extractExperience(text);
        
        // Use filename as a placeholder name
        const name = file.originalname.replace('.pdf', '').replace(/_/g, ' ');
        
        const candidate = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          name: name,
          filename: file.originalname,
          skills: skills,
          experience: experience,
          matchScore: 0 // Will be calculated based on filters later
        };
        
        processedCandidates.push(candidate);
        candidates.push(candidate);
      }
    }
    
    res.json({ message: 'Files processed successfully', candidates: processedCandidates });
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ error: 'Failed to process files' });
  }
});

// Endpoint to get and filter candidates
app.post('/filter', (req, res) => {
  const { requiredSkills = [], minExperience = 0 } = req.body;
  
  const filteredAndScored = candidates.map(candidate => {
    let score = 0;
    
    // Score based on skills (10 points per matched skill)
    let matchedSkills = 0;
    if (requiredSkills.length > 0) {
      requiredSkills.forEach(reqSkill => {
        if (candidate.skills.some(s => s.toLowerCase() === reqSkill.toLowerCase())) {
          score += 10;
          matchedSkills++;
        }
      });
      // Normalize score out of 100 based on required skills
      score = (matchedSkills / requiredSkills.length) * 100;
    } else {
      score = 100; // If no skills required, baseline is 100
    }
    
    // Penalize if experience is below minimum
    if (candidate.experience < minExperience) {
      score = Math.max(0, score - 30); // 30 point penalty
    }
    
    return { ...candidate, matchScore: Math.round(score) };
  });
  
  // Sort by highest score first
  filteredAndScored.sort((a, b) => b.matchScore - a.matchScore);
  
  res.json({ candidates: filteredAndScored });
});

// Clear database (useful for testing)
app.post('/clear', (req, res) => {
  candidates = [];
  res.json({ message: 'Database cleared' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
