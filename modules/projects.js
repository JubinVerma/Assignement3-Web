const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    projectData.forEach((project) => {
      sectorData.forEach((sector) => {
        if (project.sector_id === sector.id) {
          project["sector"] = sector.sector_name;
          projects.push(project);
        }
      });
    });
    resolve();
  });
}

function getAllProjects() {
  return Promise.resolve(projects);
}

async function getProjectByID(projectId) {
  let projects = await getAllProjects();

  return new Promise((resolve, reject) => {
    let a = projects.find((project) => {
      if (project.id == projectId) {
        resolve(project);
      }
    });

    if (!a) {
      reject("Unable to find requested project");
    }
  });
}

async function getProjectsBySector(sector) {
  sector = sector.toLowerCase();
  let projects = await getAllProjects();
  let out = [];

  out = projects.filter((project) => {
    let commonCase = project.sector.toLowerCase();
    if (commonCase.includes(sector)) {
      return project;
    }
  });

  return new Promise((resolve, reject) => {
    if (out.length !== 0) {
      resolve(out);
    } else {
      reject("unable to find requested projects");
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectByID,
  getProjectsBySector,
};
