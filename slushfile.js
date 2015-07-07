var gulp = require('gulp'); // the gulp running the tasks with gulp
var inquirer = require('inquirer'); // ask the question
var template = require('gulp-template');

gulp.task('default', function(done) { // build the package

  // ask the questions
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'What do you want to name your theme?', default: getNameProposal()},
    {type: 'input', name: 'description', message: 'describe your wordpress theme', default: ''},
    {type: 'input', name: 'url', message: 'the url of the theme?', default: ''},
    {type: 'input', name: 'author', message: 'who is the author of the theme?', default: ''},
    {type: 'input', name: 'authorUrl', message: 'what is the author url?', default: ''},
    {type: 'input', name: 'license', message: 'what is the license?', default: ''},
    {type: 'input', name: 'licenseUrl', message: 'does the license have url?', default: ''},
    {type: 'input', name: 'tags', message: 'the theme tags', default: ''}
  ],
  function(answers) { // get the answers
    gulp.src(__dirname + '/templates/app/**')
    .pipe(template(answers))
    .pipe(gulp.dest('./'));
  });
});

function getNameProposal() {
  var path = require('path');
  try {
    return require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}
