module.exports = function(grunt) {
  if (!grunt.file.expandFiles) {
    grunt.file.expandFiles = function(filesPattern) {
      return grunt.file.expand({filter: 'isFile'}, filesPattern);
    }
  }

  grunt.initConfig({
    server: {
      port: 8000,
      base: '.'
    },
    reload: {
      port: 35729,
      liveReload: {}
    },
    watch: {
      all: {
        files: ['js/*', 'css/*.styl', '*.html'],
        tasks: ['stylus', 'reload']
      }
    },
    stylus: {
      dist: {
        src: 'css/*.styl',
        dest: 'css/anim.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-reload');

  grunt.loadTasks("tasks");

  grunt.registerTask('default', ['server', 'reload', 'watch']);
};
