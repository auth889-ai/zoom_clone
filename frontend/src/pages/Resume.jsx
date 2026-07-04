import React, { useEffect, useMemo, useState } from 'react';
import { Button, Chip, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const STORAGE_KEY = 'connectLearningResume';

const defaultResume = {
    name: 'Jannatul Ferdous Eva',
    title: 'Full Stack Developer',
    location: 'Dhaka, Bangladesh',
    email: 'your.email@example.com',
    phone: '+880 1XXX-XXXXXX',
    portfolio: 'https://your-portfolio-link.com',
    summary: 'I build responsive web applications with React, Node.js, Express, MongoDB, and real-time communication features.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Material UI'],
    projects: [
        {
            name: 'Connect Your Learning',
            role: 'Full Stack Video Collaboration App',
            details: 'Built authentication, meeting history, and real-time video meeting workflows for online collaboration.'
        }
    ],
    resumeUrl: ''
};

export default function Resume() {
    const navigate = useNavigate();
    const [resume, setResume] = useState(defaultResume);
    const [skillInput, setSkillInput] = useState('');
    const [saved, setSaved] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
        const storedResume = localStorage.getItem(STORAGE_KEY);
        if (storedResume) {
            setResume(JSON.parse(storedResume));
        }
    }, []);

    const uploadedFileUrl = useMemo(() => {
        if (!uploadedFile) return '';
        return URL.createObjectURL(uploadedFile);
    }, [uploadedFile]);

    useEffect(() => {
        return () => {
            if (uploadedFileUrl) {
                URL.revokeObjectURL(uploadedFileUrl);
            }
        };
    }, [uploadedFileUrl]);

    const updateField = (field, value) => {
        setResume((current) => ({
            ...current,
            [field]: value
        }));
        setSaved(false);
    };

    const updateProject = (index, field, value) => {
        setResume((current) => ({
            ...current,
            projects: current.projects.map((project, projectIndex) => (
                projectIndex === index ? { ...project, [field]: value } : project
            ))
        }));
        setSaved(false);
    };

    const addSkill = () => {
        const nextSkill = skillInput.trim();
        if (!nextSkill || resume.skills.includes(nextSkill)) return;
        updateField('skills', [...resume.skills, nextSkill]);
        setSkillInput('');
    };

    const removeSkill = (skill) => {
        updateField('skills', resume.skills.filter((item) => item !== skill));
    };

    const addProject = () => {
        updateField('projects', [
            ...resume.projects,
            { name: '', role: '', details: '' }
        ]);
    };

    const removeProject = (index) => {
        updateField('projects', resume.projects.filter((_, projectIndex) => projectIndex !== index));
    };

    const saveResume = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
        setSaved(true);
    };

    return (
        <div className="resumePage">
            <header className="resumeHeader">
                <Button startIcon={<HomeIcon />} onClick={() => navigate('/')}>
                    Home
                </Button>
                <div>
                    <p>Resume Builder</p>
                    <h1>{resume.name || 'Your Name'}</h1>
                </div>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={saveResume}>
                    Save
                </Button>
            </header>

            <main className="resumeLayout">
                <section className="resumeEditor">
                    <div className="resumeSection">
                        <h2>Profile</h2>
                        <div className="resumeGrid">
                            <TextField label="Full Name" value={resume.name} onChange={(e) => updateField('name', e.target.value)} />
                            <TextField label="Professional Title" value={resume.title} onChange={(e) => updateField('title', e.target.value)} />
                            <TextField label="Location" value={resume.location} onChange={(e) => updateField('location', e.target.value)} />
                            <TextField label="Email" value={resume.email} onChange={(e) => updateField('email', e.target.value)} />
                            <TextField label="Phone" value={resume.phone} onChange={(e) => updateField('phone', e.target.value)} />
                            <TextField label="Portfolio / LinkedIn" value={resume.portfolio} onChange={(e) => updateField('portfolio', e.target.value)} />
                        </div>
                        <TextField
                            label="Summary"
                            value={resume.summary}
                            onChange={(e) => updateField('summary', e.target.value)}
                            multiline
                            minRows={4}
                            fullWidth
                        />
                    </div>

                    <div className="resumeSection">
                        <h2>Skills</h2>
                        <div className="resumeSkillInput">
                            <TextField label="Add Skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addSkill();
                                }
                            }} />
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={addSkill}>Add</Button>
                        </div>
                        <div className="resumeSkills">
                            {resume.skills.map((skill) => (
                                <Chip key={skill} label={skill} onDelete={() => removeSkill(skill)} />
                            ))}
                        </div>
                    </div>

                    <div className="resumeSection">
                        <div className="resumeSectionTitle">
                            <h2>Projects</h2>
                            <Button startIcon={<AddIcon />} onClick={addProject}>Add Project</Button>
                        </div>
                        {resume.projects.map((project, index) => (
                            <div className="projectEditor" key={`${project.name}-${index}`}>
                                <TextField label="Project Name" value={project.name} onChange={(e) => updateProject(index, 'name', e.target.value)} />
                                <TextField label="Role / Stack" value={project.role} onChange={(e) => updateProject(index, 'role', e.target.value)} />
                                <TextField label="Details" value={project.details} onChange={(e) => updateProject(index, 'details', e.target.value)} multiline minRows={3} />
                                <Button color="error" startIcon={<DeleteIcon />} onClick={() => removeProject(index)}>Remove</Button>
                            </div>
                        ))}
                    </div>

                    <div className="resumeSection">
                        <h2>Resume File</h2>
                        <TextField
                            label="Resume Link"
                            value={resume.resumeUrl}
                            onChange={(e) => updateField('resumeUrl', e.target.value)}
                            fullWidth
                        />
                        <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
                            Upload PDF
                            <input hidden accept="application/pdf" type="file" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                        </Button>
                        {saved && <p className="saveStatus">Resume details saved in this browser.</p>}
                    </div>
                </section>

                <aside className="resumePreview">
                    <p className="previewLabel">Preview</p>
                    <h2>{resume.name}</h2>
                    <h3>{resume.title}</h3>
                    <p>{resume.location} | {resume.email} | {resume.phone}</p>
                    <p>{resume.summary}</p>

                    <div className="previewBlock">
                        <h4>Skills</h4>
                        <div className="previewSkills">
                            {resume.skills.map((skill) => <span key={skill}>{skill}</span>)}
                        </div>
                    </div>

                    <div className="previewBlock">
                        <h4>Projects</h4>
                        {resume.projects.map((project, index) => (
                            <article key={`${project.role}-${index}`}>
                                <strong>{project.name || 'Project Name'}</strong>
                                <span>{project.role}</span>
                                <p>{project.details}</p>
                            </article>
                        ))}
                    </div>

                    <div className="resumeActions">
                        {resume.portfolio && (
                            <Button href={resume.portfolio} target="_blank" rel="noreferrer" variant="outlined">
                                Portfolio
                            </Button>
                        )}
                        {(uploadedFileUrl || resume.resumeUrl) && (
                            <Button
                                href={uploadedFileUrl || resume.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                variant="contained"
                                startIcon={<DownloadIcon />}
                            >
                                View Resume
                            </Button>
                        )}
                    </div>
                </aside>
            </main>
        </div>
    );
}
