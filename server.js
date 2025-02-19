/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: JUBIN VERMA Student ID: 153629233 Date: 18/02/2025
*
********************************************************************************/

const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');
const app = express();
const port = 3000;

// Middleware to serve static files from "public" folder
app.use(express.static("public"));


projectData.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize data:', err);
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});


app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});


app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;
    if (sector) {
        projectData.getProjectBySector(sector)
            .then(projects => res.json(projects))
            .catch(err => res.status(404).send(err));
    } else {
        projectData.getAllProjects()
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send(err));
    }
});


app.get("/solutions/projects/:id", (req, res) => {
    const projectId = req.params.id;
    projectData.getProjectById(projectId)  
        .then(project => res.json(project))
        .catch(err => res.status(404).send(err));
});



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
