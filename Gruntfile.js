module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
          name: 'Pirellone APP',
          autore: 'Filippo Guadenzi',
          version: '0.0.1',

          banner: '/*! <%= meta.name %> - v<%= meta.version %> - ' +
            ' Copyright (c) <%= grunt.template.today("yyyy") %> <%= meta.autore %> */'
        },
   //our JSHint options
        jshint: {
            all: ['server/*/*.js','common/*/*.js'] //files to lint
        },
        //html builder






        //our concat options
        concat: {
            options: {
                separator: ';' //separates scripts
            },
            dist: {
                src: ['public/js/*.js'], //Using mini match for your scripts to concatenate
                dest: 'dist/public/js/script.js' //where to output the script
            }
        },
        min: {
          dist: {
            src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
            dest: 'js/main.min.js'
          }
        },

        //our uglify options
        uglify: {
            js: {
                files: {
                    'js/script.js': ['js/script.js'] //save over the newly created script
                }
            }
        },
    //angular part

  loopback_sdk_angular: {
    services: {
      options: {
        input: 'server/server.js',
        output: 'public/js/lb-services.js'
      }
    }
  },
  docular: {
    groups: [
      {
        groupTitle: 'LoopBack',
        groupId: 'loopback',
        sections: [
          {
            id: 'lbServices',
            title: 'LoopBack Services',
            scripts: [ 'js/lb-services.js' ]
          }
        ]
      }
    ]
  }

});

    //load our tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-loopback-sdk-angular');

    grunt.loadNpmTasks('grunt-docular');
    grunt.registerTask('minimize', 'concat min');
    grunt.registerTask('default', [
  'jshint',
  'loopback_sdk_angular', 'docular']);
}

