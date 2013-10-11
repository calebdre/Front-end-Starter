module.exports = function(grunt) {
	grunt.initConfig({
		productionPath: "production/",
		developmentPath:"src/"

		compass:{
			dist:{
				options:{
					cssDir: "<%= developmentPath %>css",
					sassDir: "<%= developmentPath %>css/sass",
					config:"<%= developmentPath %>css/config.rb"
				}
			}
		},
		watch:{
			compass:{
					files:["<%= developmentPath %>css/sass/**/*"],
					tasks: ['compass']
			}
		},
		styleinjector: {
		            files: {
		                src : ['<%= developmentPath %>css/*.css', '*.html']
		            },
		            options: {
		                watchTask: true,
		                host: "127.0.0.1",
		                server: {
		                	baseDir: "./"
		                }
		     	}
		},
		smushit: {
			build:{
				expand:true,
				src:['<%= productionPath %>img/*.{png,jpg}', '<%= productionPath %>img/**/*.{png,jpg}'],
				dest:'<%= developmentPath %>img'
			}
		},
		cssmin: {
			build: {
				expand: true,
				dest:"<%=productionPath%>css/",
				src: '<%= developmentPath %>css/*.css',
				ext: '.min.css'
			}
		},
		uglify: {
			build: {
				files: [{
					expand:true,
					src:['<%= developmentPath %>js/*.js', '<%= developmentPath %>js/vendor/*.js'],
					dest:'<%= productionPath %>js/',
					ext:'.min.js'
				}]
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			js: {
				src: ['<%= productionPath %>js/vendor/*.js', '<%= productionPath %>js/*.js'],
				dest: '<%= productionPath %>js/all.min.js',
			},
			css:{
				src:'<%= productionPath %>css/*.css',
				dest:'<%= productionPath %>css/all.min.css'
			}
		},
		copy:{
			build:{
				files:[
					{
						expand:true,
						cwd:"src",
						src:['fonts/*','*'],
						dest:'production/'
					}
				]
			}
		},
		usemin:{
			html:"<%= productionPath %>*.html",
			css:"<%= productionPath %>css/all.min.css"
		},
		 useminPrepare: {
		            options: {
		                dest: '<%= productionPath %>'
		            },
		            html: '<%= developmentPath %>*.html'
		        }
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-style-injector');
	grunt.loadNpmTasks('grunt-smushit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('default', ['styleinjector','watch']);
	grunt.registerTask('build', ['copy','smushit','cssmin', 'uglify', 'concat','usemin']);

};