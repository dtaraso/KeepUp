#!/usr/bin/env node

const program = require('commander');
const { addTask, getTask, updateTask, deleteTask, getToDoList } = require('./logic');
const { prompt } = require('inquirer');

const questions = [
  {
    type : 'input',
    name : 'task_type',
    message : 'Enter task type: '
  },
  {
    type : 'input',
    name : 'task',
    message : 'Enter task: '
  },
  {
    type : 'input',
    name : 'priority',
    message : 'Enter priority level: '
  }
];

program 
  .version('0.0.1')
  .description('To Do List Management System')

program
  .command('addTask') // <task_type> <task> <priority>')
  .alias('a')
  .description('add a to-do item')
  .action(() => {
    prompt(questions).then(answers =>
      addTask(answers));
  });
  //.action((task_type, task, priority) => {
  //  addTask({task_type, task, priority});

program
  .command('getTask <task>')
  .command('g')
  .description('Retrieve the to-do item')
  .action(task => getTask(task));

program
  .command('updateTask <_id>')
  .alias('u')
  .description('Update a task')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateTask(_id, answers));
  });

program
  .command('deleteTask <_id>')
  .alias('d')
  .description('Delete Task')
  .action(_id => deleteTask(_id));

program
  .command('getToDoList')
  .alias('l')
  .description('Display To Do List')
  .action(() => getToDoList());

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);
