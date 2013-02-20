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

  var GistsListView = Backbone.View.extend({
    el: '#js-gists',
    tmpl: _.template($('#tmpl-js-gists').html()),
    events: {
      'click [data-src]': 'preview'
    },
    initialize: function() {
      _.bindAll(this);
      $.ajax({
        method: 'GET',
        url: 'https://api.github.com/gists',
        data: oauthData,
        dataType: 'json'
      }).done(this.render);
    },
    preview: function(event) {
      gistPreview.show($(event.currentTarget).attr('data-src'));
      return false;
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

  var GistItemView = Backbone.View.extend({
    el: '#js-gist-preview',
    tmpl: _.template($('#tmpl-js-gist-preview').html()),
    events: {
      'click': 'close'
    },
    initialize: function() {
      _.bindAll(this);
    },
    show: function(src) {
      this.$el.html('<p>loading...</p>').addClass('show');
      $.ajax({
        method: 'GET',
        url: src,
        dataType: 'json'
      }).done(this.render);
    },
    render: function(data) {
      this.$el.html(this.tmpl(data));
      this.$el.find('pre').each(function() {
        hljs.highlightBlock(this);
      });
      return this;
    },
    close: function() {
      this.$el.removeClass('show');
    }
  });
  var gistPreview = new GistItemView();

});
