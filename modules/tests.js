var keys = require("../keys");
const inquirer = require("inquirer");
const baseURL = "https://www.hackerrank.com/x/api/v3";
const axios = require("axios");

function manageTests() {
  console.log("Managing tests...");

  inquirer
    .prompt({
      name: "testTask",
      type: "list",
      message: "What would you like to do with the tests?",
      choices: ["Create a Test", "List all tests", "Retrieve a Test", "Update a Test", "Delete a Test", "Archive a Test", "List all inviters for a test"]
    })
    .then( res => {
      switch (res.testTask) {
        case "Create a Test":
          let type = "tests";

          inquirer
            .prompt([
              {
                name: "name",
                type: "input",
                message: "What is the name of the test?"
              },
              {
                name: "duration",
                type: "input",
                message: "What is the duration of test in minutes?"
              },
              {
                name: "locked",
                type: "list",
                message: "Would you like to lock the test? Locked tests cannot be edited, but candidates can be invited to take the test ",
                choices: ["Yes", "No"]
              },
              {
                name: "cutoffScore",
                type: "input",
                message: "What is the cutoff score for this test? (Optional). If set, candidates scoring equal or more will automatically be qualified, while others would be disqualified: "
              },

              {
                name: "roles",
                type: "checkbox",
                message: "What are the job roles associated with this test?",
                choices: ["Software Developer", "Full-Stack Developer", "Front-end Developer", "Back-end Developer", "Java Developer", "C++ Developer", "Python Developer", "Ruby Developer", "Android Developer", "iOS Developer", "Data Scientist", "Test Automation Engineer", "Database Administrator", "System Administrator", "Site Reliability Engineer", "Network Engineer", "Other"]
              },
              {
                name: "experience",
                type: "checkbox",
                message: "What are the experience levels associated with this test?",
                choices: ["Intern", "New Graduate", "0-2 years", "2-5 years", ">5 years", "All Experience Levels"]
              },
              {
                name: "shuffleQuestions",
                type: "list",
                message: "Would you like the questions to be shuffled? ",
                choices: ["Yes", "No"]
              }
            ])
            .then( res => {
              let type = 'tests';
              let payload = {
                "name": res.name,
                "duration": parseInt(res.duration),
                "locked": res.locked === "Yes" ? true : false,
                "cutoff_score": parseInt(res.cutoffScore),
                "job_roles": res.roles,
                "experience": res.experience,
                "shuffle_questions": res.shuffleQuestions === "Yes" ? true : false
              };

              axios.post(`${baseURL}/${type}`, payload, 
                {
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              }).then( res => {
                console.log(res.data);
              }).catch( err => {
                console.log(err);
              })
            });
          break;
        case "List all tests":
          inquirer
            .prompt([
              {
                name: "limit",
                type: "input",
                message: "Max # of records to fetch (integer):"
              }, 
              {
                name: "offset",
                type: "input",
                message: "Offset of records (integer):"
              }
            ])
            .then( res => {
              let type = "tests";
              axios.get(`${baseURL}/${type}`, {
                params: {
                  limit: res.limit,
                  offset: res.offset,
                  state:  'active'  // can also be changed to 'archived' if needed
                },
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                console.log(res.data);
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Retrieve a Test":
          inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "What is the ID of the test you're trying to fetch? "
              }, 
            ])
            .then( res => {
              let type = "tests";
              axios.get(`${baseURL}/${type}/${res.id}`, {
                // params: {
                //   state: 'archived'
                // },
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                console.log(res.data);
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Update a Test":
          console.log("Updating a test might be easier through the UI, so I'd suggest logging in through the website.");
          break;
        case "Delete a Test":
          inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "What is the ID of the test you're trying to delete? "
              }, 
            ])
            .then( res => {
              let type = "tests";
              axios.delete(`${baseURL}/${type}/${res.id}`, {
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                res.status === 204 ? console.log('Successfully deleted the test.') : console.log('An error may have occurred.');
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Archive a Test":
          console.log('THIS NEEDS TO BE FIXED!!!!!!');
          inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "What is the ID of the test you're trying to archive? "
              }, 
            ])
            .then( res => {
              let type = "tests";
              let subtype = 'archive'
              axios.post(`${baseURL}/${type}/${res.id}/${subtype}`, {
                // params: {
                //   state: 'archived'
                // },
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                console.log(res);
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
          case "List all inviters for a test":
            inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "What is the ID of the test for which you want to retrieve all the inviters? "
              },
              {
                name: "limit",
                type: "input",
                message: "Max # of records to fetch (integer):"
              }, 
              {
                name: "offset",
                type: "input",
                message: "Offset of records (integer):"
              }
            ])
            .then( res => {
              let type = "tests";
              let subtype = 'inviters';
              axios.get(`${baseURL}/${type}/${res.id}/${subtype}`, {
                params: {
                  limit: res.limit,
                  offset: res.offset
                },
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                console.log(res.data);
              })
              .catch( err => {
                console.log(err);
              });
            })
            break;
        }
      });  
}

module.exports = manageTests;