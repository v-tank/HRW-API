var keys = require("../keys");
const inquirer = require("inquirer");
const baseURL = "https://www.hackerrank.com/x/api/v3";
const axios = require("axios");

function manageTestCandidates() {
  console.log("Managing test candidates...");

  inquirer
    .prompt({
      name: "testCandidateTask",
      type: "list",
      message: "What would you like to do with the test candidates?",
      choices: ["List all candidates", "Invite a candidate", "Show a candidate", "Delete a report", "Cancel an invite", "Search for candidates"]
    })
    .then( res => {
      switch (res.testCandidateTask) {
        case "List all candidates":
          inquirer
            .prompt([
              {
                name: "testID",
                type: "input",
                message: "What is the test ID? "
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
              let subtype = "candidates";

              axios.get(`${baseURL}${type}/${res.testID}/${subtype}`, {
                params: {
                  limit: res.limit,
                  offset: res.offset,
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
        case "Invite a candidate":
          inquirer
            .prompt([
              {
                name: "testID",
                type: "input",
                message: "What is the test ID for which you want to invite a candidate?"
              },
              {
                name: "fullName",
                type: "input",
                message: "What is the candidate's full name? (first & last) "
              },
              {
                name: "email",
                type: "input",
                message: "What is the candidate's email address?"
              }
            ])
            .then( res => {
              let type = "tests";
              let subtype = "candidates";
              let payload = {
                "full_name": res.fullName,
                "email": res.email
              }

              axios.post(`${baseURL}${type}/${res.testID}/${subtype}`, payload, 
                {
                  auth: {
                    username: keys.auth.ACCESS_TOKEN,
                    password: keys.auth.PASSWORD
                  }
                }
              )
              .then( res => {
                console.log(res.data);
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Show a candidate":
          inquirer
            .prompt([
              {
                name: "testID",
                type: "input",
                message: "What is the test ID for which you want to show the candidate?"
              },
              {
                name: "candidateID",
                type: "input",
                message: "What is the candidate ID? "
              }
            ])
            .then( res => {
              let type = "tests";
              let subtype = "candidates";

              axios.get(`${baseURL}${type}/${res.testID}/${subtype}/${res.candidateID}`, 
                {
                  auth: {
                    username: keys.auth.ACCESS_TOKEN,
                    password: keys.auth.PASSWORD
                  }
                }
              )
              .then( res => {
                console.log(res.data);
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Delete a report":
          inquirer
            .prompt([
              {
                name: "testID",
                type: "input",
                message: "What is the test ID for which you want to delete the candidate report?"
              },
              {
                name: "candidateEmail",
                type: "input",
                message: "What is the candidate's email address? "
              }
            ])
            .then( res => {
              let type = "tests";
              let subtype = "candidates";
              // Make a GET request to find the candidate's ID
              axios.get(`${baseURL}/${type}/${res.testID}/${subtype}/search`, {
                params: {
                  search: res.candidateEmail,
                  limit: 10,
                  offset: 0,
                },
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                // console.log(res.data.data);
                let entry = res.data.data.filter(el => el.email === res.config.params.search);
                if (entry.length > 0) {
                  let candidateID = entry[0].id;
                  let testID = entry[0].test;
                  let type = 'tests';
                  let subtype = 'candidates';
                  axios.delete(`${baseURL}/${type}/${testID}/${subtype}/${candidateID}/report`, {
                    auth: {
                      username: keys.auth.ACCESS_TOKEN,
                      password: keys.auth.PASSWORD
                    }
                  })
                  .then( res => {
                    console.log(res.data[0]);
                  })
                  .catch( err => {
                    console.log(err);
                  });
                  //
                } else {
                  console.log('Email not found. Please try again.');
                }
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Cancel an invite":
          inquirer
            .prompt([
              {
                name: "testID",
                type: "input",
                message: "What is the test ID for which you want to cancel the invite?"
              },
              {
                name: "candidateEmail",
                type: "input",
                message: "What is the candidate's email address? "
              }
            ])
            .then( res => {
              let type = "tests";
              let subtype = "candidates";
              // Make a GET request to find the candidate's ID
              axios.get(`${baseURL}/${type}/${res.testID}/${subtype}/search`, {
                params: {
                  search: res.candidateEmail,
                  limit: 10,
                  offset: 0,
                },
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                // console.log(res.data.data);
                let entry = res.data.data.filter(el => el.email === res.config.params.search);
                if (entry.length > 0) {
                  let candidateID = entry[0].id;
                  let testID = entry[0].test;
                  let type = 'tests';
                  let subtype = 'candidates';
                  axios.delete(`${baseURL}/${type}/${testID}/${subtype}/${candidateID}/invite`, {
                    auth: {
                      username: keys.auth.ACCESS_TOKEN,
                      password: keys.auth.PASSWORD
                    }
                  })
                  .then( res => {
                    console.log(res.data[0]);
                  })
                  .catch( err => {
                    console.log(err);
                  });
                  //
                } else {
                  console.log('Email not found. Please try again.');
                }
              })
              .catch( err => {
                console.log(err);
              });
            })
      }   
    })
}

module.exports = manageTestCandidates;