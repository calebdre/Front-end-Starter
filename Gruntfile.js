var path = require('path')

module.exports = function(grunt) {
	grunt.initConfig({
		production: "html/",
		develop:"src/",

		express:{
			default_server:{
				options:{
					script:"app.js"
				}
			}
		},
		watch:{
			sass:{
				files:['public/sass/**/*.scss'],
				tasks:['sass']
			},
			options:{
				livereload:true
			}
		},
		sass:{
			dist:{
				options:{
					require:"sass-globbing",
					compass:true
				},
				files:{
					"public/css/main.css": "public/sass/main.scss"
				}
			}
		},
		imagemin:{
			options:{
				optimizationLevel:6
			},

			export:{
				files:[{
					expand:true,
					src:['public/img/**/*.{png,jpg,gif}'],
					des:['html/img/']
				}]
			}
		},



		
	});


	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['express','watch']);
	grunt.registerTask('export', ['imagemin:export'])

};