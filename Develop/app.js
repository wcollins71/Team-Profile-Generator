const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const staffArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createManager() {
    inquirer.prompt([{
        message: "What is your manager's name?",
        name: "managerName"
    },
    {
        message: "What is your manager's id?",
        name: "managerId"
    },
    {
        message: "What is your manager's email?",
        name: "managerEmail"
    },
    {
        message: "What is your manager's office number?",
        name: "managerNumber"
    },
    ])
        .then(function (response) {
            manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerNumber)
            staffArray.push(manager);
            selectRole()
        });
}

function selectRole() {
    inquirer.prompt({
        type: "list",
        message: "Which type of manager would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
        ],
        name: "staffRole"
    })
        .then((selectedRole) => {
            if (selectedRole.staffRole === "Engineer") {
                createEngineer();
            } else if (selectedRole.staffRole === "Intern") {
                createIntern();
            } else {
                createHTML();
            };

        });
};

function createEngineer() {
    inquirer.prompt([{
        message: "What is your engineer's name?",
        name: "engineerName"
    },
    {
        message: "What is your engineer's id?",
        name: "engineerId"
    },
    {
        message: "What is your engineer's email?",
        name: "engineerEmail"
    },
    {
        message: "What is your engineer's GitHub username?",
        name: "engineerGitHub"
    },
    ])
        .then(function (response) {
            engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub);
            staffArray.push(engineer);
            selectRole()
        });
};

function createIntern() {
    inquirer.prompt([{
        message: "What is your intern's name?",
        name: "internName"
    },
    {
        message: "What is your intern's id?",
        name: "internId"
    },
    {
        message: "What is your intern's email?",
        name: "internEmail"
    },
    {
        message: "What is your intern's school?",
        name: "internSchool"
    },
    ])

        .then((response) => {
            intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            staffArray.push(intern);
            selectRole();
        });
}

async function createHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.copyFile(`templates/style.css`, `${OUTPUT_DIR}/style.css`, (err) => {
        if (err) throw err;
    });
    const renderStaff = render(staffArray);
    fs.writeFileSync(outputPath, renderStaff);
    console.log(`HTML page created ${OUTPUT_DIR}/team.html`)
}

createManager();

