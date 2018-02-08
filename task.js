#!/usr/bin/env node

const program = require('commander');
const { addTask, getTask } = require('./logic');
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

program.parse(process.argv);
