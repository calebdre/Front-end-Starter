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
		cssmin: {
			build: {
				expand: true,
				dest:"<%=production%>css/",
				src: '<%= develop %>css/*.css',
				ext: '.min.css'
			}
		},
		uglify: {
			build: {
				files: [{
					expand:true,
					src:['<%= develop %>js/*.js', '<%= develop %>js/vendor/*.js'],
					dest:'<%= production %>js/',
					ext:'.min.js'
				}]
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			js: {
				src: ['<%= production %>js/vendor/*.js', '<%= production %>js/*.js'],
				dest: '<%= production %>js/all.min.js',
			},
			css:{
				src:'<%= production %>css/*.css',
				dest:'<%= production %>css/all.min.css'
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
			html:"<%= production %>*.html",
			css:"<%= production %>css/all.min.css"
		},
		 useminPrepare: {
		            options: {
		                dest: '<%= production %>'
		            },
		            html: '<%= develop %>*.html'
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