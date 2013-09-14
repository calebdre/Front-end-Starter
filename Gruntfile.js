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
			compass:{
					files:["css/sass/**/*"],
					tasks: ['compass']
			}
		},
		styleinjector: {
		            files: {
		                src : ['css/*.css', '*.html']
		            },
		            options: {
		                watchTask: true,
		                // host: "127.0.0.1",
		                // server: {
		                // 	baseDir: "./"
		                // }
		     	}
		},
	});
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-style-injector');

	grunt.registerTask('default', ['styleinjector','watch']);
};