// Gruntfile.js
module.exports = grunt => {
    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);
	const sass = require('node-sass');

    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	dirs: {
    		dest: 'dest',
            scss: "scss",
            js: "js"
        },

        // minify / uglify js
		uglify: {
		    my_target: {
		      	files: {
		        	'<%= dirs.dest %>/jsmain.min.js': ['<%= dirs.js %>/libs/*.js']
		      	}
		    }
		},
        cssmin: {
			options:{
				keepSpecialComments: 0
			},
			my_target: {
				files: [{	
					'<%= dirs.dest %>/style.min.css' : ['<%= dirs.dest %>/style.css']
				}]
			}
		},
		sass: {
		    dist: {
		    	options: {
		        	style: 'compressed',
		        	sourcemap: false,
					//lineNumbers: true,
					implementation: sass
		      	},
			    files: {
			       	'<%= dirs.dest %>/style.css': '<%= dirs.scss %>/style.scss'
			    }
		    }
		},

		watch: {
			options: {
			    livereload: true,
			    spawn: false,
			},

	      	sass: {
		        files: "<%= dirs.scss %>/**/*.scss",
		        tasks: ['sass']
		    },
		    cssmin: {
		        files: "<%= dirs.dest %>/style.min.css",
		        tasks: ['cssmin']
		    },
		    // uglify: {
		    //     files: ['<%= dirs.js %>/*.js'],
		    //     tasks: ['uglify']
		    // },
	    },

	    browserSync: {
            dev: {
                bsFiles: {
                    src : [
						'<%= dirs.dest %>/style.min.css',
						'<%= dirs.dest %>/style.css',
	                    '*.html',
	                    '<%= dirs.js %>/*.js',
                    ]
                },
                options: {
                    watchTask: true,
                	server:'./'
                },
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['browserSync','watch']);
};

