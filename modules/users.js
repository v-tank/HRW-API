var keys = require("../keys");
const inquirer = require("inquirer");
const baseURL = "https://www.hackerrank.com/x/api/v3";
const axios = require("axios");

function manageUsers() {
  console.log("Managing Users...");

  inquirer
    .prompt({
      name: "userTask",
      type: "list",
      message: "What would you like to do with the users?",
      choices: ["Create a User", "List all users", "Retrieve a User", "Update a User", "Lock User", "Search for users"]
    })
    .then( res => {
      switch (res.userTask) {
        case "Create a User":
          inquirer
            .prompt([
              {
                name: "firstname",
                type: "input",
                message: "What is the user's first name?"
              },
              {
                name: "lastname",
                type: "input",
                message: "What is the user's last name?"
              },
              {
                name: "email",
                type: "input",
                message: "What is the user's email address?"
              },
              {
                name: "role",
                type: "list",
                message: "What is the user's role?",
                choices: ["recruiter", "developer"]
              },
              {
                name: "teamID",
                type: "input",
                message: "What is the team ID to which the user will belong?"
              }
            ])
            .then( res => {
              let type = "users";
              let teams = [
                {
                  "tests_permission": 3,
                  "questions_permission": 3,
                  "candidates_permission": 3,
                  "interviews_permission": 3,
                  "id": res.teamID // team to which the user will belong;
                }
              ];  // array of teams and the permissions the user has on that specific team

              let sendEmail = true;
              let payload = {
                "email": res.email,
                "firstname": res.firstname,
                "lastname": res.lastname,
                "role": res.role,
                "send_email": sendEmail,
                "questions_permission": 3,
                "tests_permission": 3,
                "interviews_permission": 3,
                "candidates_permission": 3,
                "teams": teams
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
        case "List all users":
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
              let type = "users";
              axios.get(`${baseURL}/${type}`, {
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
        case "Retrieve a User":
          inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "What is/are the ID(s) of the user(s) you're trying to fetch? Separate them using a `,` for multiple queries: "
              }, 
            ])
            .then( res => {
              let type = "users";
              axios.get(`${baseURL}/${type}`, {
                params: {
                  id: res.id
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
        case "Update a User":
          console.log("Needs to be built...");
          break;
        case "Lock User":
          inquirer
            .prompt([
              {
                name: "id",
                type: "input",
                message: "What is the ID of the user you're trying to lock? "
              }, 
            ])
            .then( res => {
              let type = "users";
              axios.delete(`${baseURL}/${type}/${res.id}`, {
                auth: {
                  username: keys.auth.ACCESS_TOKEN,
                  password: keys.auth.PASSWORD
                }
              })
              .then( res => {
                res.status === 204 ? console.log('Successfully deleted the user.') : console.log('An error may have occurred.');
              })
              .catch( err => {
                console.log(err);
              });
            })
          break;
        case "Search for users":
          inquirer
            .prompt([
              {
                name: "searchTerm",
                type: "input",
                message: "What would you like to search for? "
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
              let type = "users";
              let subtype = "search";
              axios.get(`${baseURL}/${type}/${subtype}`, {
                params: {
                  search: res.searchTerm,
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
            });
          break;
        }
      });
}

module.exports = manageUsers;