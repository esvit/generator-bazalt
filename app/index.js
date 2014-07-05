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
    this.template('_package.json', 'package.json');

    this.copy('index.html', 'index.html');

    this.copy('app/requireConfig.js', 'app/requireConfig.js');
    this.copy('app/app.js', 'app/app.js');
    this.copy('app/_bootstrap.js', 'app/_bootstrap.js');
    this.copy('app/views.js', 'app/views.js');

    this.copy('app/base/config.js', 'app/base/config.js');
    this.copy('app/base/module.js', 'app/base/module.js');

    this.copy('app/base/config/config.js', 'app/base/config/config.js');
    this.copy('app/base/config/module.js', 'app/base/config/module.js');

    this.copy('app/base/home/config.js', 'app/base/home/config.js');
    this.copy('app/base/home/module.js', 'app/base/home/module.js');
    this.copy('app/base/home/controllers/BaseHomeCtrl.js', 'app/base/home/controllers/BaseHomeCtrl.js');

    this.copy('app/modules/auth/config.js', 'app/modules/auth/config.js');
    this.copy('app/modules/auth/module.js', 'app/modules/auth/module.js');

    this.copy('app/modules/auth/login/config.js', 'app/modules/auth/login/config.js');
    this.copy('app/modules/auth/login/module.js', 'app/modules/auth/login/module.js');
    this.copy('app/modules/auth/login/controllers/AuthLoginCtrl.js', 'app/modules/auth/login/controllers/AuthLoginCtrl.js');

    this.copy('assets/less/theme.less', 'assets/less/theme.less');
    this.copy('public.key', 'public.key');

    this.copy('views/home.html', 'views/home.html');
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

        if (this.bootstrap) {
            this.write('assets/less/theme.less', '@import "../../bower_components/bootstrap/less/bootstrap";');
        }

        this.template('_bower.json', 'bower.json');
        cb();
    }.bind(this));
};