var gulp = require('gulp'); // the gulp running the tasks with gulp
var inquirer = require('inquirer'); // ask the question
var template = require('gulp-template');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('default', function(done) { // build the package

  // ask the questions
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'What do you want to name your theme?', default: getNameProposal()},
    {type: 'input', name: 'description', message: 'describe your wordpress theme', default: 'short description'},
    {type: 'input', name: 'url', message: 'the url of the theme?', default: ''},
    {type: 'input', name: 'author', message: 'who is the author of the theme?', default: ''},
    {type: 'input', name: 'authorUrl', message: 'what is the author url?', default: ''},
    {type: 'input', name: 'license', message: 'what is the license?', default: 'MIT'},
    {type: 'input', name: 'tags', message: 'the theme tags', default: ''}
  ],
  function(answers) { // get the answers
    gulp.src(__dirname + '/templates/app/**')
    .pipe(template(answers))
    .pipe(gulp.dest('./'))
    .on('finish', function() {
      done();
    });
  });
});

gulp.task('custom-page', function(done) { // build the package
  var modelName = gulp.args ? gulp.args[0] : 'custom-page';

  gulp.src(__dirname + '/templates/custom-page/custom-page.php')
  .pipe(template({name: modelName}))
  .pipe(rename(modelName + '.php'))
  .pipe(gulp.dest('./'))
  .on('finish', function() {
    done();
  });
});

gulp.task('post-type', function(done) { // build the package

  inquirer.prompt([
    {type: 'input', name: 'text_domain', message: 'What is the text domain?', default: getNameProposal()},
    {type: 'input', name: 'name', message: 'What is the post-type name? (use underscore and single)', default: gulp.args ? gulp.args[0] : ''},
    {type: 'checkbox', name: 'supports', message: 'supports', choices: [{name:'title', checked:true}, {name:'editor', checked:true}, {name:'excerpt', checked:true}, {name:'author', checked:true}, {name:'thumbnail', checked:true}, {name:'comments', checked:true}, {name:'trackbacks', checked:true}, {name:'revisions', checked:true}, {name:'custom-fields', checked:true}, {name:'page-attributes', checked:true}, {name:'post-formats', checked:true}] },
    {type: 'checkbox', name: 'taxonomies', message: 'taxonomies', choices: [{name:'category', checked:true}, {name:'post_tag', checked:true}] },
    {type: 'confirm', name: 'hierarchical', message: 'hierarchical', default: false},
    {type: 'confirm', name: 'public', message: 'public', default: true},
    {type: 'confirm', name: 'show_ui', message: 'show_ui', default: true},
    {type: 'confirm', name: 'show_in_menu', message: 'show_in_menu', default: true},
    {type: 'input', name: 'menu_position', message: 'menu_position', default: 5},
    {type: 'confirm', name: 'show_in_admin_bar', message: 'show_in_admin_bar', default: true},
    {type: 'confirm', name: 'show_in_nav_menus', message: 'show_in_nav_menus', default: true},
    {type: 'confirm', name: 'can_export', message: 'can_export', default: true},
    {type: 'confirm', name: 'has_archive', message: 'has_archive', default: true},
    {type: 'confirm', name: 'exclude_from_search', message: 'exclude_from_search', default: false},
    {type: 'list', name: 'capability_type', message: 'capability_type', choices: ['page', 'post'] },
    {type: 'confirm', name: 'publicly_queryable', message: 'publicly_queryable', default: true}
    ],

  function(answers) { // get the answers
    var templateAnswers = answers;
    templateAnswers.labelName = answers.name.replace(/\_/g, ' ');

    gulp.src(['./functions.php', __dirname + '/templates/functions/post-type.php'])
    .pipe(template(templateAnswers))
    .pipe(concat('functions.php'))
    .pipe(gulp.dest('./'))
    .on('finish', function() {
      done();
    });
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
