module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        watchify: {
            dist: {
                src: './lib/demo-bootstrap.js',
                dest: './public/bootstrap-booty-grid.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'public',
                    keepalive: true
                }
            }
        },
        simplemocha: {
            options: {
                timeout: 2000,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/**/*.js']
            }
        },
        jshint2: {
            options: {
                jshintrc: '.jshintrc',
                force: false,
                cache: true,
                reporter: 'default',
                globals: {
                    module: true,
                    require: true,
                    it: true,
                    describe: true,
                    beforeEach: true,
                    afterEach: true,
                    global: true
                }
            },
            all: ['index.js', 'Gruntfile.js', 'test/**/*.js', 'lib/**/*.js']
        },
        less: {
            development: {
                files: {
                    'public/grid.css': 'lib/grid.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jshint2');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-watchify');


    grunt.registerTask('default', ['watchify', 'less:development', 'connect']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('lint', ['jshint2']);

};
