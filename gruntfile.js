module.exports = function (grunt) {


	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'src',
		dist: 'dist',

		php: {
			dist: {
				options: {
					hostname: '127.0.0.1',
					port: 9000,
					base: '<%= app %>',
					keepalive: false,
					open: false
				}
			}
		},

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
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss',
					'<%= app %>/css/foundation.css': '<%= app %>/scss/foundation.scss'
				}
			}
		},

		postcss: {
			options: {
				processors: [
					require('cssgrace')
				]
			},
			dist: {
				src: ['<%= app %>/css/app.css'],
				dest: '<%= app %>/css/app.cross.css'
			}
		},

		autoprefixer: {
			options: {
				browsers: ['> 3%', 'ie 8', 'ie 9']
			},
			your_target: {
				src: ['<%= app %>/css/app.cross.css'],
				dest: '<%= app %>/css/app.cross2.css'
			},
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'<%= app %>/css/app.min.css': '<%= app %>/css/app.cross2.css'
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
				files: ['<%= app %>/scss/base/*.scss',
					'<%= app %>/scss/layout/*.scss',
					'<%= app %>/scss/module/*.scss',
					'<%= app %>/scss/state/*.scss',
					'<%= app %>/scss/theme/*.scss',
					'<%= app %>/scss/*.scss'
				],
				tasks: 'sass'
			},
			jade: {
				files: ['<%= app %>/jade/*.jade',
					'<%= app %>/jade/modules/*.jade'
				],
				tasks: 'jade'
			}
		}
	});

	grunt.registerTask('default', [
		'sass',
		'cssmin',
		'jade',
		'php:dist', // Start PHP Server 
		'browserSync:dist', // Using the php instance as a proxy 
		'watch' // Any other watch tasks you want to run 
	]);

	grunt.registerTask('build', [
		'sass',
		'postcss',
		'autoprefixer',
		'cssmin',
		'jade'
	]);

};