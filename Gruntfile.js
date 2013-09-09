module.exports = function(grunt) {
	grunt.initConfig({
		compass:{
			dist:{
				options:{
					cssDir: "css",
					sassDir: "css/sass",
					config:"css/config.rb"
				}
			}
		},
		watch:{
			options:{
				livereload:true
			},
			compass:{
					files:["css/sass/**/*"],
					tasks: ['compass']
			},
			html:{
				files:['*.html']
			},
			js:{
				files:'js/*.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib');

	grunt.registerTask('default', ['watch']);
};