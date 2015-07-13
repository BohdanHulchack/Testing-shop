module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'src',
		dist: 'dist',

		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [{
					cwd: "<%= app %>/jade/",
					src: "**/*.jade",
					dest: "<%= app %>",
					expand: true,
					ext: ".html"
				}]
			}
		},

		sass: {
			options: {
				sourceMap: true,
				trace: false,
				check: true,
				debugInfo: true,
				noCache: false,
				update: true,
				sourceComments: true,
				quiet: false,
				includePaths: [
					'<%= app %>/bower_components/foundation/scss',
					'<%= app %>/bower_components/compass-mixins/lib'
				]
			},
			dev: {
				options: {
					outputStyle: 'expanded' //nested, compact, compressed, expanded
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss',
					'<%= app %>/css/foundation.css': '<%= app %>/scss/foundation.scss'
				}
			},
			prod: {
				options: {
					sourceMap: false,
					sourceComments: false,
					outputStyle: 'expanded' //nested, compact, compressed, expanded
				},
				files: {
					'<%= dist %>/css/app.min.css': ['<%= app %>/scss/app.scss'],
					'<%= dist %>/css/foundation.min.css': ['<%= app %>/scss/foundation.scss']
				}
			}
		},

		php: {
			dist: {
				options: {
					hostname: '127.0.0.1',
					port: 9000,
					base: '<%= app %>',
					keepalive: false,
					open: false
				}
			},
			prod: {
				options: {
					hostname: '127.0.0.1',
					port: 1234,
					base: '<%= dist %>',
					keepalive: true,
					open: true
				}
			}
		},

		browserSync: {
			dist: {
				bsFiles: {
					src: [
						'<%= app %>/*.php',
						'<%= app %>/*.html',
						'<%= app %>/css/app.css',
						'<%= app %>/js/*.js',
						'<%= app %>/fonts/*'
					]
				},
				options: {
					proxy: '<%= php.dist.options.hostname %>:<%= php.dist.options.port %>',
					watchTask: true,
					notify: true,
					open: true,
					logLevel: 'silent',
					ghostMode: {
						clicks: true,
						scroll: true,
						links: true,
						forms: true
					}
				}
			}
		},

		watch: {
			sass: {
				files: [
					'<%= app %>/scss/base/*.scss',
					'<%= app %>/scss/layout/*.scss',
					'<%= app %>/scss/module/*.scss',
					'<%= app %>/scss/state/*.scss',
					'<%= app %>/scss/theme/*.scss',
					'<%= app %>/scss/*.scss'
				],
				tasks: 'sass:dev'
			},
			jade: {
				files: ['<%= app %>/jade/*.jade'],
				tasks: 'jade'
			}
		},

		processhtml: {
			dist: {
				options: {
					process: true
				},
				files: {
					'<%= dist %>/index.html' :'<%= app %>/index.html'
				}
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'<%= dist %>/js/app.min.js': [
						'<%= app %>/bower_components/jquery/dist/jquery.min.js',
						'<%= app %>/bower_components/Stepper/jquery.fs.stepper.min.js',
						'<%= app %>/bower_components/handlebars/handlebars.min.js',
						'<%= app %>/js/basketAdoptive.js',
						'<%= app %>/js/slider.js',
						'<%= app %>/js/categories.js',
						'<%= app %>/js/galleries.js',
						'<%= app %>/js/product.js',
						'<%= app %>/js/basket.js',
						'<%= app %>/js/app.js'
					]
				}
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: [
						'<%= app %>/img/*',
					], dest: '<%= dist %>/img/'},

					{expand: true, flatten: true, src: [
						'<%= app %>/data/*'
					], dest: '<%= dist %>/data/'},
					[{
						expand: true,
						cwd: '<%= app %>/images/',
						src: ['**'],
						dest: '<%= dist %>/images/'
					}],


					{expand: true, flatten: true, src: [
						'<%= app %>/css/jquery.fs.stepper-arrows.png'
					], dest: '<%= dist %>/css/'}
				]
			}
		},

		concat: {
			options: {
				separator: '  '
			},
			dist: {
				src: [
					'<%= dist %>/css/foundation.min.css',
					'<%= dist %>/css/app.min.css',
					'<%= app %>/css/jquery.fs.stepper.css'
				],
				dest: '<%= dist %>/css/app.min.css'
			}
		}

	});

	grunt.registerTask('default', [
		'sass:dev',
		'jade',
		'php:dist',
		'browserSync:dist',
		'watch'
	]);

	grunt.registerTask('build', [
		'sass:prod',
		'jade',
		'uglify',
		'copy',
		'concat',
		'processhtml'
	]);

	grunt.registerTask('show', [
		'php:prod'
	]);

};