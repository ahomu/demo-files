module.exports = function(grunt) {
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
        files: ['js/*', 'css/*', '*.html'],
        tasks: ['reload']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-reload');

  grunt.registerTask('default', ['server', 'reload', 'watch']);
};
