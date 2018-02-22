'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the remarkable ' + chalk.red('generator-czgit') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.log('appname', props.appname);
      this.props = props;
    });
  }

  writing() {
    this.log(this.props);
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  }

  install() {
    this.installDependencies({npm: true, bower: false, yarn: false});
    this.npmInstall(['cz-conventional-changelog', 'standard-version', 'commitizen'], {
      'save-dev': true
    });
  }
};
