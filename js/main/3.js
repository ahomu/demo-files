$(function() {

  //============================================================================
  // Atuhorize configurations
  //============================================================================
  var oauthData = {
        client_id: config.client_id,
        client_secret: config.client_secret
      };

  $.ajaxSettings.beforeSend = function(xhr) {
    if (config.username && config.password) {
      xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(config.username + ':' + config.password));
    } else {
      xhr.setRequestHeader('Authorization', 'token ' + config.access_token);
    }
  };

  //============================================================================
  // Listup own public Gists
  //============================================================================

  // templateの分離
  var GistsListView = Backbone.View.extend({
    el: '#js-gists',
    tmpl: _.template($('#tmpl-js-gists').html()),
    initialize: function() {
      _.bindAll(this);
      $.ajax({
        method: 'GET',
        url: 'https://api.github.com/gists',
        data: oauthData,
        dataType: 'json'
      }).done(this.render);
      this.$el.on('click', '[data-src]', previewGist);
    },
    render: function(data) {
      this.$el.html(this.tmpl({items: data}));
      return this;
    }
  });
  var gistsList = new GistsListView();

  //============================================================================
  // Preview selected Gist
  //============================================================================

  var $preview = $('#js-gist-preview'),
      escape = function(text) {
        return $('<div />').text(text).html();
      };

  function previewGist() {
    $preview.html('<p>loading...</p>').addClass('show');

    $.ajax({
      method: 'GET',
      url: $(this).attr('data-src'),
      dataType: 'json'
    }).done(function(data) {
      var fileNames = Object.keys(data.files),
          i = 0, html = '', file;
      while (file = data.files[fileNames[i++]]) {
        html += '<h2>'+file.filename+'</h2>'+
                '<pre class="'+file.language+'">'+escape(file.content)+'</pre>';
      }
      $preview.html(html);
      $preview.find('pre').each(function() {
        hljs.highlightBlock(this);
      });

    });
    return false;
  }

  $preview.on('click', function() {
    $(this).removeClass('show');
  });

});
