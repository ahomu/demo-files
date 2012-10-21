module.exports = function(grunt) {
// Project configuration.
grunt.initConfig({
  concat: {
    js: {
      src: [
        'js/lib/jquery.js',
        'js/app/main.js',
        'js/app/sub.js'
      ],
      dest: 'js/all.js'
    },
    css: {
      src: ['css/main.css', 'css/sub.css'],
      dest: 'css/all.css'
    }
  },
  csso: {
    dist: {
      src: 'css/all.css',
      dest: 'css/all.min.css'
    }
  },
  min: {
   dist: {
      src: ['js/all.js'],
      dest: 'js/all.min.js'
    }
  },
  less: {
    dist: {
      files: {
        'css/main.css' : 'css/less/main.less',
        'css/sub.css' : 'css/less/sub.less'
      }
    }
  },
  server: { // ローカルサーバー
    port: 8000,
    base: '.'
  },
  reload: { // LiveReloadサーバー
    port: 35729,
    liveReload: {}
  },
  sample: {
    dist: {
      src: ['js/app/*.js'],
      dest: 'js/all.js',
      option: {
        hoge: 'fuga',
        peke: 'piyo'
      }
    }
  },
  img: {
    dist: {
      src: 'img'
    }
  },
  optipng: {
    args: ["-o5"]
  },
  dataUri: {
    dist: {
      src: ['css/raw/*.css'],
      dest: 'css',
      options: {
        target: ['img/data-uri/*.*'],
        fixDirLevel: false
      }
    }
  },
  watch: {
    css: {
      files: ['css/less/*.less'],
      tasks: ['cssbuild', 'reload']
    },
    js: {
      files: ['js/app/*.js', 'index.html'],
      tasks: ['jsbuild', 'reload']
    }
  }
});

// Load npm tasks
grunt.loadNpmTasks('grunt-contrib');
grunt.loadNpmTasks('grunt-reload');
grunt.loadNpmTasks('grunt-csso');
grunt.loadNpmTasks('grunt-img');
grunt.loadNpmTasks('grunt-data-uri');

// Load orignal tasks
grunt.loadTasks('tasks');

// JavaScript Build task
grunt.registerTask('jsbuild', ['concat:js', 'min']);

// CSS Build task
grunt.registerTask('cssbuild', ['less', 'concat:css', 'csso']);

// Develop task
grunt.registerTask('develop', ['server', 'reload', 'watch']);




};
