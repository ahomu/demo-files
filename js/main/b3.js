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
  // Model & Collection
  //============================================================================

  var Gist = Backbone.Model.extend({
    url: function() {
      return this.get('url');
    }
  });

  var Gists = Backbone.Collection.extend({
    url: 'https://api.github.com/gists?' + $.param(oauthData),
    model: Gist,
    orderRule: 'id',
    comparator: function(gist) {
      switch(this.orderRule) {
        case 'id':
          return gist.get('id');
        case 'updated_at':
          return - new Date(gist.get('updated_at')).getTime();
        case 'desc_length_asc':
          return gist.get('description').length;
        case 'desc_length_desc':
          return -gist.get('description').length;
      }
    },
    orderBy: function(rule) {
      this.orderRule = rule;
      this.sort();
    }
  });

  //============================================================================
  // Listup own public Gists
  //============================================================================

  var GistsListView = Backbone.View.extend({
    el: '#js-gists',
    tmpl: _.template($('#tmpl-js-gists').html()),
    events: {
      'click [data-id]': 'preview',
      'click #js-sort-updated': 'sortByUpdatedAt',
      'click #js-sort-title-length-asc': 'sortByTitleLengthAsc',
      'click #js-sort-title-length-desc': 'sortByTitleLengthDesc',
    },
    collection: null,
    initialize: function() {
      _.bindAll(this);
      this.collection.fetch({
        success: this.render
      });
      this.collection.on('sort', this.render);
    },
    sortByUpdatedAt: function() {
      this.collection.orderBy('updated_at');
    },
    sortByTitleLengthAsc: function() {
      this.collection.orderBy('desc_length_asc');
    },
    sortByTitleLengthDesc: function() {
      this.collection.orderBy('desc_length_desc');
    },
    preview: function(event) {
      gistPreview.model = this.collection.findWhere({
        id: $(event.currentTarget).attr('data-id')
      });
      gistPreview.show();
      return false;
    },
    render: function() {
      this.$el.html(this.tmpl({items: this.collection.toJSON()}));
      return this;
    }
  });
  var gistsList = new GistsListView({
    collection: new Gists()
  });

  //============================================================================
  // Preview selected Gist
  //============================================================================

  var GistItemView = Backbone.View.extend({
    el: '#js-gist-preview',
    tmpl: _.template($('#tmpl-js-gist-preview').html()),
    events: {
      'click': 'close'
    },
    model: null,
    initialize: function() {
      _.bindAll(this);
    },
    show: function() {
      this.$el.html('<p>loading...</p>').addClass('show');
      this.model.fetch({
        success: this.render
      });
    },
    render: function(data) {
      this.$el.html(this.tmpl(this.model.toJSON()));
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
