const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/KeepUp');

function toLower(v) {
  return v.toLowerCase();
}

const taskSchema = mongoose.Schema({
  task_type: {type: String, set: toLower },
  task: {type: String, set: toLower },
  priority: {type: String, set: toLower },
});

const Task = mongoose.model('Task', taskSchema);

const addTask = (task) => {
  Task.create(task, (err) => {
    assert.equal(null, err);
    console.info('Added to To Do list');
    db.disconnect();
  });
};

const getTask = (task) => {
  const search = new RegExp(task, 'i');
  Task.find({$or: [{task: search }]})
  .exec((err, tasks) => {
    assert.equal(null, err);
    console.info(tasks);
    console.info('${tasks.length} mastches');
    db.disconnect();
  });
};

module.exports = { addTask, getTask };
