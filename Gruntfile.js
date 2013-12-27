module.exports = function(grunt) {
	grunt.initConfig({
		production: "production/",
		develop:"src/",

		compass:{
			dist:{
				options:{
					cssDir: "<%= develop %>css",
					sassDir: "<%= develop %>sass",
					config:"<%= develop %>sass/config.rb"
				}
			}
		},
		watch:{
			compass:{
					files:["<%= develop %>sass/**/*"],
					tasks: ['compass']
			}
		},
		styleinjector: {
		            files: {
		                src : ['<%= develop %>css/*.css', '<%= develop %>*.html']
		            },
		            options: {
		                watchTask: true,
		                host: "127.0.0.1",
		                server: {
		                	baseDir: "<%= develop %>"
		                }
		     	}
		},
		smushit: {
			build:{
				expand:true,
				src:['<%= production %>img/*.{png,jpg}', '<%= production %>img/**/*.{png,jpg}'],
				dest:'<%= develop %>img'
			}
		},
		copy:{
			build:{
				files:[
					{
						expand:true,
						cwd:"src",
						src:['fonts/*','*', '!sass','!vendor'],
						dest:'production/'
					}
				]
			}
		},
		useref:{
			html:'<%= production %>*.html',
			temp:'<%= production %>'
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-style-injector');
	grunt.loadNpmTasks('grunt-smushit');
	grunt.loadNpmTasks('grunt-useref');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['styleinjector','watch']);
	grunt.registerTask('build', ['copy','useref','concat', 'uglify', 'cssmin','smushit']);

};