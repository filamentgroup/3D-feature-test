module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! 3D feature test - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Authored by Filament Group, Inc.\n' +
				'* <%= pkg.homepage %> */\n\n',
		concat: {
			options: {
				banner: '<%= banner %>'
			},
			js_initial: {
				src: [
					'_dev/js/_lib/modernizr.js',
					'_dev/js/initial.config.js'
				],
				dest: 'example/js/initial.js'
			},
			js_main: {
				src: [
					'_dev/js/_lib/jquery.js',
					'_dev/js/_lib/flip.js'
				],
				dest: 'example/js/main.js'
			},
			css_main: {
				src: [
					'_dev/css/demo.css',
					'_dev/css/card.css',
					'_dev/css/_lib/flip.css'
				],
				dest: 'example/css/all.css'
			},
		},		
		copy: {
			dist: {
				files: [
					{ expand: true, cwd: '_dev', src: ["*.html"], dest: "example/" }
				]
			},
		},
		watch: {
			all: {
				files: ['!_dev/_css/**/*','!_dev/_js/**/*', '_tmpl/**/*'],
				tasks: 'watch-default'
			}
		},
		cssmin: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			css_main: {
				src: [
					'<%= concat.css_main.dest %>',
				],
				dest: '<%= concat.css_main.dest %>'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js_initial: {
				src: [
					'<%= concat.js_initial.dest %>',
				],
				dest: '<%= concat.js_initial.dest %>'
			},
			js_main: {
				src: [
					'<%= concat.js_main.dest %>',
				],
				dest: '<%= concat.js_main.dest %>'
			}
		}
	});


	// Tasks
	grunt.registerTask('default', ['concat', 'copy']);
	grunt.registerTask('production', ['concat', 'copy', 'cssmin', 'uglify']);
	grunt.registerTask('watch-default', ['concat', 'copy']);

};
