const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Whatt do you want to see?',
      name: 'selection',
      choices:[
        {
            name: 'First option',
            value: 'firstOption!'
        },
        {
            name: 'Second option',
            value: 'secondOption!'
        }
      ]
    },
  ])
  .then((response) =>
    {
    console.log(response.selection);
    
    switch(response.selection){
        case 'firstOption!':
            firstFunction();
            break;
        case 'secondOption!S':
            secondFunction();
            break;
        default:
            console.log('Default')
    }
    
    
    }
    
  );

  var firstFunction= function(){
      console.log('Fisrt function triggered');
  }

  var secondFunction=function(){
      console.log('Second function triggered');
  }