/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: JUBIN VERMA Student ID: 153629233 Date: 12/03/2025
********************************************************************************/

const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');
const app = express();
const port = 3000;

async function findSector(value) {
  let sector = [];
  sector = await projectData.getProjectsBySector(value);

  return sector;
}

async function getID(id) {
  let project = [];
  project = await projectData.getProjectByID(id);
  return project;
}


app.use(express.static("public"));
app.set('view engine', 'ejs'); 
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));


projectData.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize data:', err);
});


app.get("/", (req, res) => {
    res.render("home", {showSearchBar: true});
});


app.get("/about", (req, res) => {
    res.render("about", {showSearchBar: false});
});


app.get("/solutions/projects", async (req, res) => {
    let projects = await projectData.getAllProjects();
let { sector } = req.query;

  if (sector) {
    findSector(sector)
      .then((data) => {
        res.render("projects", {projects:data, showSearchBar:true});
      })
      .catch(() => {
        res.status(404).render("404", {message: `No projects found for sector: ${sector}`, showSearchBar:false});
      });
  } else {
    res.render("projects", {projects: projects, showSearchBar: true});
  }
});


app.get("/solutions/projects/:id", async (req, res) => {
    let { id } = req.params;
    if (id) {
      getID(id)
        .then((data) => {
          res.render("project", {project:data, showSearchBar:false});
        })
        .catch(() => {
          res.status(404).render("404", {message: "Unable to find request project.", showSearchBar:false});
        });
    }
});



app.use((req, res) => {
    res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for", showSearchBar:false});
});

