(function() {
    'use strict';

    module.exports = function(grunt) {
        // Load grunt tasks automatically
        require('load-grunt-tasks')(grunt);

        // Time how long tasks take. Can help when optimizing build times
        require('time-grunt')(grunt);

        // Assign Serve-Static
        var serveStatic = require('serve-static');

        // Configurable paths for the application
        var config = {
            src: require('./bower.json').srcPath || 'src',
            dist: 'dist',
            package: grunt.file.readJSON('package.json')
        };

        // Define the configuration for all the tasks
        grunt.initConfig({

            // Project settings
            config: config,


            // Watches files for changes and runs tasks based on the changed files
            watch: {
                bower: {
                    files: ['bower.json'],
                    tasks: ['wiredep']
                },
                js: {
                    files: [
                        '<%= config.src %>/{,*/}*.js',
                        '!<%= config.src %>/{,*/}*.spec.js',
                        '!<%= config.src %>/{,*/}*.e2e.js'
                    ],
                    tasks: ['newer:jshint:all', 'jscs', 'karma'],
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    }
                },
                jsTest: {
                    files: ['<%= config.src %>/{,*/}*.spec.js'],
                    tasks: ['newer:jshint:test', 'karma']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= config.src %>/*.html',
                    ]
                }
            },

            // The actual grunt server settings
            connect: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35000
                },
                livereload: {
                    options: {
                        open: true,
                        middleware: function(connect) {
                            return [
                                serveStatic('.tmp'),
                                connect().use(
                                    '/bower_components',
                                    serveStatic('./bower_components')
                                ),
                                serveStatic(config.src)
                            ];
                        }
                    }
                },
                test: {
                    options: {
                        port: 9001,
                        middleware: function(connect) {
                            return [
                                serveStatic('.tmp'),
                                serveStatic('test'),
                                connect().use(
                                    '/bower_components',
                                    serveStatic('./bower_components')
                                ),
                                serveStatic(config.src)
                            ];
                        }
                    }
                },
                dist: {
                    options: {
                        open: true,
                        base: '<%= config.dist %>'
                    }
                }
            },

            // Empties folders to start fresh
            clean: {
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/{,*/}*',
                            '!<%= config.dist %>/.git{,*/}*'
                        ]
                    }]
                },
                server: '.tmp'
            },

            // Automatically inject Bower components into the app
            wiredep: {
                app: {
                    src: ['<%= config.src %>/index.html'],
                    ignorePath: /\.\.\//
                },
                test: {
                    devDependencies: true,
                    src: '<%= karma.unit.configFile %>',
                    ignorePath: /\.\.\//,
                    fileTypes: {
                        js: {
                            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                            detect: {
                                js: /'(.*\.js)'/gi
                            },
                            replace: {
                                js: '\'{{filePath}}\','
                            }
                        }
                    }
                }
            },

            // Test settings
            karma: {
                unit: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            },

            // Make sure code styles are up to par and there are no obvious mistakes
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    src: [
                        'Gruntfile.js',
                        '<%= config.src %>/{,*/}*.js',
                        '!<%= config.src %>/{,*/}*.spec.js',
                        '!<%= config.src %>/{,*/}*.e2e.js'
                    ]
                },
                test: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: ['<%= config.src %>/{,*/}*.spec.js']
                }
            },

            // JS Code Sniffer
            jscs: {
                src: [
                    'Gruntfile.js',
                    '<%= config.src %>/{,*/}*.js'
                ],
                options: {
                    config: '.jscsrc',
                    requireCurlyBraces: ['if']
                }
            },

            useminPrepare: {
                html: '<%= config.src %>/index.html',
                options: {
                    dest: '<%= config.dist %>',
                    flow: {
                        html: {
                            steps: {
                                js: ['concat', 'uglify:dist'],
                            },
                            post: {}
                        }
                    }
                }
            },

            // ng-annotate tries to make the code safe for minification automatically
            // by using the Angular long form for dependency injection.
            ngAnnotate: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }]
                }
            },
            copy: {
                dist: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '.tmp/concat/',
                        dest: '<%= config.dist %>',
                        src: ['*.js']
                    }]
                }
            },
            uglify: {
                options: {
                    banner: grunt.file.read('banner.tpl')
                },
                dist: {
                    files: {
                        '<%= config.dist %>/ng-intl-tel-input.min.js': [
                            '.tmp/concat/*.js'
                        ]
                    }
                }
            },
            concat: {
                options: {
                    stripBanners: true,
                    banner: grunt.file.read('banner.tpl')
                }
            },

            // Protractor Settings
            protractor: {
                options: {
                    configFile: 'protractor.conf.js',
                    keepAlive: true
                },
                run: {}
            }
        });

        grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
            if (target === 'dist') {
                return grunt.task.run(['build', 'connect:dist:keepalive']);
            }

            grunt.task.run([
                'clean:server',
                'wiredep',
                'connect:livereload',
                'watch',
            ]);
        });

        grunt.registerTask('e2e', [
            'clean:server',
            'wiredep',
            'connect:test',
            'protractor',
        ]);

        grunt.registerTask('test', [
            'clean:server',
            'wiredep',
            'connect:test',
            'karma'
        ]);

        grunt.registerTask('build', [
            'clean:dist',
            'wiredep',
            'useminPrepare',
            'concat',
            'ngAnnotate',
            'copy:dist',
            'uglify:dist'
        ]);

        grunt.registerTask('default', [
            'newer:jshint',
            'jscs',
            'test',
            'build'
        ]);
    };
})();
