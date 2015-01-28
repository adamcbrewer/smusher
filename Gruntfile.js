'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            input: 'input',
            output: 'output'
        },

        clean: {
            input: [
                '<%= project.input %>/*'
            ]
        },

        imagemin: {
            input: {
                options: {
                    optimizationLevel: 4,
                    progressive: true,
                    pngquant: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= project.input %>',
                        src: [
                            '*.{png,jpg,jepg,gif}',
                            '**/*.{png,jepg,jpg,gif}',
                        ],
                        dest: '<%= project.output %>'
                    }
                ]
            }
        },

        watch: {
            options: {
                event: ['changed', 'added', 'deleted']
            },
            images: {
                options: {
                    event: ['changed', 'added', 'deleted']
                },
                files: '<%= project.input %>/{,*/}*',
                tasks: [
                    'imagemin'
                ]
            }
        }
    });

    grunt.registerTask('default', [ 'imagemin', 'watch' ]);

    grunt.registerTask('reset', [ 'clean:input' ]);

};
