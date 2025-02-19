const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects =[];


// function initialize() {
//     projects = projectData.map(project => {
//     const sector = sectorData.find(s => s.id === project.sector_id);
//     if (sector) {
//         return { ...project, sector: sector.sector_name };
//     } else {
//         return { ...project, sector: "Unknown" };
//     }
// });
// }


function initialize(){
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(project => {
                const sector = sectorData.find(s => s.id === project.sector_id);
                if (sector) {
                    return { ...project, sector: sector.sector_name };
                } else {
                    return { ...project, sector: "Unknown" };
                }
            });
            resolve();
        } catch (error) {
            reject("Initialization failed: " + error);
        }
    });

}

// function getAllProjects() {
//     return projects;
// }

function getAllProjects(){
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found");
        }
    });
 
}


// function getProjectById(projectId) {
//     return projects.find((project) => project.id === projectId) || null;
// }



function getProjectById(projectId){
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject("Project not found");
        }
    });

}


// function getProjectsBySector(sector) {
//     const lowerCaseSector = sector.toLowerCase();
//     return projects.filter((project) =>
//         project.sector.toLowerCase().includes(lowerCaseSector)
//     );
// }


function getProjectBySector(sector){
    return new Promise((resolve, reject) => {
        const filteredProjects = projects.filter(p => 
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (filteredProjects.length > 0) {
            resolve(filteredProjects);
        } else {
            reject("No projects found for this sector");
        }
    });

}



module.exports = { initialize, getAllProjects, getProjectById, getProjectBySector };


initialize();
// console.log(`---------------------------PRINTING ALL PROJECTS---------------------------`);
// console.log("All Projects:", getAllProjects());
// console.log(`---------------------FINISHED PRINTING ALL PROJECTS------------------------`);

// console.log(`---------------------------PRINTING PROJECT WITH ID 9----------------------`);
// console.log("Project By ID (9):", getProjectById(9));
// console.log(`---------------------FINISHED PRINTING PROJECT WITH ID 9-------------------`);

// console.log(`---------------------------PRINTING PROJECT WITH SECTOR NAMED AGRICULTURE----------------------`);
// console.log("Projects By Sector ('agriculture'):", getProjectBySector("agriculture"));
// console.log(`---------------------FINISHED PRINTING PROJECT WITH SECTOR NAMED AGRICULTURE-------------------`);
// console.log(`Everything Done`);




/////Promises explained
// fetchDataFromServer(function(data) {
//     processData(data, function(processedData) {
//       saveData(processedData, function(savedData) {
//         console.log("Data saved!", savedData);
//       });
//     });
//   });

//   fetchDataFromServer()
//   .then(processData)
//   .then(saveData)
//   .then((savedData) => console.log("Data saved!", savedData))
//   .catch((error) => console.log("Something went wrong:", error));
