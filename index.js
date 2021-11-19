const inquirer = require('inquirer');
const db = require('./db/connection')






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
          console.log('\m');
          for(i=0;i<results.length;i++){
              console.log(results[i].name);
          }
          
      })
      cli();
  }

  var viewRoles=function(){
      console.log('Second function triggered');
      db.query('SELECT * FROM role',function(err,results){
          console.log('\n');
        for(i=0;i<results.length;i++){
              console.log(results[i].title);
          }
      })
      cli();
  }

  var viewEmployees=function(){
    console.log('view employees selected');
    db.query('SELECT * FROM employee',function(err,results){
        console.log('\n');
        for(i=0;i<results.length;i++){
            console.log(results[i].first_name + ' ' + results[i].last_name)
        }
    })
    cli();
  }


var closeApp = function(){
    process.exit();
}



  var start = function(){
    cli();
}
start();