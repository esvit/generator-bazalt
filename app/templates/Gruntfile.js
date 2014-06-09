var fs = require('fs'),
    url = require('url'),
    urlRewrite = function (rootDir, indexFile) {
        indexFile = indexFile || "index.html";
        return function (req, res, next) {
            var path = url.parse(req.url).pathname;
            return fs.readFile('./' + rootDir + path, function (err, buf) {
                if (!err) {
                    return next();
                }
                if (path.substring(path.length - 4) == 'html') { // if html file not found
                    res.writeHead(404);
                    return res.end('Not found');
                }
                return fs.readFile('./' + rootDir + '/' + indexFile, function (error, buffer) {
                    var resp;
                    if (error) {
                        return next(error);
                    }
                    resp = {
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Length': buffer.length
                        },
                        body: buffer
                    };
                    res.writeHead(200, resp.headers);
                    return res.end(resp.body);
                });
            });
        };
    };

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('serve', [
        'copy:assets', 'connect:dev', 'watch'
    ]);
    grunt.registerTask('serve-build', [
        'copy:assets', 'connect:build', 'watch'
    ]);

    grunt.registerTask('build', [
        // CSS
        'less:assets',
        'copy:assets',

        // HTML
        'html2js',
        'htmlmin',
        'replace',

        // JS
        'requirejs',
        'uglify:requirejs',
        'uglify:app',
    ]);
    grunt.registerTask('default', [
        'build', 'serve-build'
    ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_dir: './build',
        app_build_file: '_bootstrap.js',
        banner: 'Developed by Vitalii Savchuk (esvit666@gmail.com)', // write your copyright

        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        src: ['assets/**', '!assets/less/**', 'favicon.png'],
                        dest: '<%= build_dir %>'
                    }
                ]
            }
        },
        less: {
            assets: {
                src: 'assets/less/theme.less',
                dest: 'assets/css/theme.css'
            }
        },
        requirejs: {
            frontend: {
                options: {
                    baseUrl: './app',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    mainConfigFile: 'app/requireConfig.js',
                    name: '_bootstrap',
                    include: [],
                    exclude: ['./views.js'],
                    out: '<%= build_dir %>/<%= app_build_file %>'
                }
            }
        },
        uglify: {
            requirejs: {
                src: ['bower_components/requirejs/require.js'],
                dest: '<%= build_dir %>/r.js'
            },
            app: {
                src: ['<%= build_dir %>/<%= app_build_file %>'],
                dest: '<%= build_dir %>/<%= app_build_file %>'
            },
            options: {
                compress: false,
                mangle: false,
                preserveComments: false,
                beautify: {
                    ascii_only: true
                },
                sourceMappingURL: function (fileName) {
                    return fileName.replace(/^build\/js\//, '').replace(/\.js$/, '.map');
                },
                sourceMap: function (fileName) {
                    return fileName.replace(/\.js$/, '.map');
                }
            }
        },
        watch: {
            css: {
                files: 'assets/**/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['views/**/*.html'],
                tasks: ['i18nextract'],
                options: {
                    livereload: true
                }
            }
        },
        htmlmin: {
            backend: {
                files: {
                    'build/index.html': 'index.html'
                },
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost'
            },
            dev: {
                options: {
                    middleware: function(connect, options) {
                        return [
                            urlRewrite('.'),
                            connect["static"](options.base),
                            connect.directory(options.base)
                        ];
                    }
                }
            },
            build: {
                options: {
                    base: './build',
                    middleware: function(connect, options) {
                        return [
                            urlRewrite('./build'),
                            connect["static"](options.base),
                            connect.directory(options.base)
                        ];
                    }
                }
            }
        },
        replace: {
            admin: {
                src: '<%= build_dir %>/index.html',
                overwrite: true,
                replacements: [
                    {
                        from: /<script src="(.*)\/require.js"(.*)><\/script>/gm,
                        to: '<script src="/r.js" data-main="_bootstrap"></script>'
                    },
                    {
                        from: '<script src="/bazalt.js"></script>',
                        to: ''
                    }
                ]
            }
        },
        i18nextract: {
            backend: {
                lang: ['en_GB'],
                src: ['views/**/*.html', 'index.html'],
                dest: 'locale',
                safeMode: false
            }
        },
        html2js: {
            options: {
                base: '.',
                module: 'views',
                singleModule: true,
                rename: function (moduleName) {
                    return '/' + moduleName;
                },
                htmlmin: {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeAttributeQuotes:          true,
                    removeComments:                 true, // Only if you don't use comment directives!
                    removeEmptyAttributes:          true,
                    removeRedundantAttributes:      true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                }
            },
            app: {
                src: ['views/**/*.html'],
                dest: '<%= build_dir %>/views.js'
            }
        }
    });
};