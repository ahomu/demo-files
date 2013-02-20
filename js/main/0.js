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
  var $list    = $('#js-gists');
  $.ajax({
    method: 'GET',
    url: 'https://api.github.com/gists',
    data: oauthData,
    dataType: 'json'
  }).done(function(data) {
    var i = 0,
        html = '',
        item;
    while (item = data[i++]) {
      html += '<li>'+
        '<a data-src="'+item.url+'" href="#">'+item.description+'</a>'+
        '<a href="'+item.html_url+'">Show in gists</a>'+
        '</li>';
    }
    $list.html(html);
  });
  $list.on('click', '[data-src]', previewGist);

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