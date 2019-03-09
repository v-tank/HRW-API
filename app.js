require("dotenv").config();
const inquirer = require("inquirer");
const manageUsers = require("./modules/users");
const manageMemberships = require("./modules/memberships");
const manageTests = require("./modules/tests");
const manageInterviews = require("./modules/interviews");
const manageQuestions = require("./modules/questions");
const manageTemplates = require("./modules/templates");
const manageAuditLogs = require("./modules/auditlogs");

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

todoPrompt();