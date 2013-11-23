'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BazaltGenerator = module.exports = function BazaltGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BazaltGenerator, yeoman.generators.Base);

BazaltGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    //console.log(this.yeoman);

    var prompts = [
        {
            name: 'siteName',
            message: 'Site name?',
            default: 'site'
        }
    ];

    this.prompt(prompts, function (props) {
        this.siteName = props.siteName;
        this.isHasBootstrap = props.isHasBootstrap;

        cb();
    }.bind(this));
};

BazaltGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('assets');
    this.mkdir('views');

    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');

    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('bazalt.js', 'bazalt.js');
    this.copy('config.js', 'config.js');
    this.template('_package.json', 'package.json');

    this.copy('index.html', 'index.html');

    this.copy('app/app.js', 'app/app.js');
    this.copy('app/main.js', 'app/main.js');
    this.copy('app/routes.js', 'app/routes.js');
    this.copy('app/controllers.js', 'app/controllers.js');
    this.copy('app/controllers/homeCtrl.js', 'app/controllers/homeCtrl.js');
    this.copy('app/controllers/loginCtrl.js', 'app/controllers/loginCtrl.js');

    this.copy('assets/less/theme.less', 'assets/less/theme.less');

    this.copy('views/index.html', 'views/index.html');
};


BazaltGenerator.prototype.askForBootstrap = function askForBootstrap() {
    var cb = this.async();

    this.prompt([{
        type: 'confirm',
        name: 'bootstrap',
        message: 'Would you like to include Twitter Bootstrap?',
        default: true
    }], function (props) {
        this.bootstrap = props.bootstrap;

        if (this.boostrap) {
            this.write('assets/less/theme.less', '@import "../../bower_components/bootstrap/less/bootstrap";');
        }

        this.template('_bower.json', 'bower.json');
        cb();
    }.bind(this));
};