require("dotenv").config();
var keys = require("./keys");

const inquirer = require("inquirer");
const baseURL = "https://www.hackerrank.com/x/api/v3";
const axios = require("axios");

function todoPrompt() {
  inquirer
    .prompt({
      name: "todo",
      type: "list",
      message: "What would you like to manage?",
      choices: ["Teams", "Users", "User Memberships", "Tests", "Test Candidates", "Interviews", "Questions", "Templates", "Audit Logs", "Exit"]
    })
    .then( res => {
      switch (res.todo) {
        case "Teams":
          manageTeams();
          break;
        case "Users":
          manageUsers();
          break;
        case "User Memberships":
          manageMemberships();
          break;
        case "Tests":
          manageTests();
          break;
        case "Test Candidates":
          manageTestCandidates();
          break;
        case "Interviews":
          manageInterviews();
          break;
        case "Questions":
          manageQuestions();
          break;
        case "Templates":
          manageTemplates();
          break;
        case "Audit Logs":
          manageAuditLogs();
          break;
        case "Exit":
          return;
      }
    })
}

// ["Teams", "Users", "User Memberships", "Tests", "Test Candidates", "Interviews", "Questions", "Templates", "Audit Logs", "Exit"]
function manageTeams() {
  console.log("Teams management coming soon...");
}

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

function manageMemberships() {
  console.log("Membership management coming soon...");
}

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
                "shuffle_questions": res.shuffleQuestions
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

function manageInterviews() {
  let type = "interviews";
  let payload = {
    "title": "Interview with Mark",
    "notes": "Assess the candidate for system design concepts",
    "resume_url": "www.example.com/resumes/71884928",
    "interviewers": [
      "vaibhav+100@hackerrank.com"
    ],
    "result_url": "www.techcorp.org/interview_ended",
    "candidate": {
      "name": "Mark Ramone",
      "email": "v.tank@yahoo.com"
    },
    "send_email": false,
    "metadata": {}
  }

  axios.post(baseURL + type, payload, 
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
}

todoPrompt();