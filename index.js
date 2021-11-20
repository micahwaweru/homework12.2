const { response } = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection')
require('console.table');






var cli = function(){
inquirer
  .prompt([
    {
      type: 'list',
      message: 'Whatt do you want to see?',
      name: 'selection',
      choices:[
        {
            name: 'View Teams',
            value: 'viewTeams'
        },
        {
            name: 'View Roles',
            value: 'viewRoles'
        },
        {
            name: 'View Employees',
            value: 'viewEmployees'
        },
        {
            name: 'Create new Team',
            value: 'createTeam'
        },
        {
            name: 'Create new Role',
            value: 'createRole'
        },
        {
            name: 'Create new Employee',
            value: 'createEmployee'
        },
        {
            name: 'Update Employee',
            value: 'updateEmployee'
        },
        {
            name:'Close App',
            value:'close'
        }
      ]
    },
  ])
  .then((response) =>
    {
    console.log(response.selection);
    
    switch(response.selection){
        case 'viewTeams':
            displayTeams();
            break;
        case 'viewRoles':
            viewRoles();
            break;
        case 'viewEmployees':
            viewEmployees();
            break;
        case 'createTeam':
            createTeam();
            break;
        case 'createRole':
            createRole();
            break;
        case 'createEmployee':
            createEmployee();
        case 'updateEmployee':
            updateEmployee();
            break;
        case 'close':
            closeApp();
            break;
        default:
            console.log('Default')
    }
    
    
    }
    
  );
}

  var displayTeams= function(){
      //console.log('Fisrt function triggered');
      db.query('SELECT * FROM team',function(err,results){
            console.log('\n')
            console.table(results)
          
      })
      cli();
  }

  var viewRoles=function(){
      console.log('Second function triggered');
      db.query('SELECT * FROM role',function(err,results){
        console.log('\n')
        console.table(results)
      })
      cli();
  }

  var viewEmployees=function(){
    console.log('view employees selected');
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, team.name AS team, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN team on role.team_id = team.id LEFT JOIN employee manager on manager.id = employee.manager_id;',function(err,results){
        console.log('\n')
        console.table(results)
    })
    cli();
  }

var createTeam = function(){
    inquirer.prompt([
        {
            name:'newTeam',
            message:'New Team Name'
        }
    ])
    .then(response=>{
        console.log(response.newTeam);
        db.query('INSERT INTO team (name) VALUES("'+response.newTeam+'")', function(err){
            console.log(err);
            cli();
        });
    })
}

var createRole = function(results){
    db.query('SELECT * FROM team',function(err,results){
        console.log('\n')
        console.table(results)
        console.log('\n')
  })


    inquirer.prompt([
        {
            name:'roleName',
            message:'New Role Name'
        },
        {
            name:'roleSalary',
            //type: 'number',
            message: 'Salary'
        },
        {
            name:'roleTeam',
            //type: 'number',
            message: 'Which team? (Use the ID!)'
        }


    ])
    .then(response=>{
        console.log(response.roleName, response.roleSalary, response.roleTeam)
        db.query(`INSERT INTO role (title, salary, team_id) VALUES('${response.roleName}',${response.roleSalary},${response.roleTeam})`, function(err){
            console.log('Error' + err);
            cli();
        });
    })
}

var createEmployee = function(results){
    db.query('SELECT * FROM role',function(err,results){
        console.log('\n')
        console.table(results)
        console.log('\n')

    })

    db.query('SELECT * FROM employee',function(err,results){
        console.log('\n')
        console.table(results)
        console.log('\n')

    })



    inquirer.prompt([
        {
            name:'firstName',
            message:'First name'
        },
        {
            name:'lastName',
            //type: 'number',
            message: 'Last Name'
        },
        {
            name:'roleId',
            //type: 'number',
            message: 'Which Role? (Use the ID!)'
        },
        {
            name:'manId',
            //type: 'number',
            message: 'Which Manager? (Use the ID!)'
        }


    ])
    .then(response=>{
        //console.log(response.roleName, response.roleSalary, response.roleTeam)
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${response.firstName}', '${response.lastName}', ${response.roleId}, ${response.manId})`, function(err){
            console.log('Error' + err);
            cli();
        });
    })
}

var updateEmployee = function(results){
    db.query('SELECT * FROM role',function(err,results){
        console.log('\n')
        console.table(results)
        console.log('\n')

    })
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, team.name AS team, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN team on role.team_id = team.id LEFT JOIN employee manager on manager.id = employee.manager_id;',function(err,results){
        console.log('\n')
        console.table(results)
        console.log('\n')
    })
    inquirer.prompt([
        {
            name:'empId',
            message: 'What is the employee ID#?'
        },
        {
            name:'newRoleId',
            message:'New Role ID#'
        }
        .then(response=>{
            db.query(`UPDATE employee SET role_id = ${response.newRoleId} WHERE id = ${response.empId}`)
        })
    ])
}



var closeApp = function(){
    process.exit();
}



  var start = function(){
    cli();
}
start();