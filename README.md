#Frontrend Vol.4 jQuery to Backbone デモファイルセット

Frontrendでデモした構成です。簡易なGistビューワー。

+ スライド [https://speakerdeck.com/ahomu/jquery-to-backbone-into-javascript-architecture](https://speakerdeck.com/ahomu/jquery-to-backbone-into-javascript-architecture) 
+ ビデオ [https://vimeo.com/album/2260782/video/59558632](https://vimeo.com/album/2260782/video/59558632)

##ファイル構成

`js/main`以下が、各段階のJavaScriptファイルです。

+ css
+ img
+ js
  + main
      + 0.js - プレーンなjQueryの状態
      + 1.js - とりあえずViewにしてみた状態
      + 2.js - renderメソッドを抽出した状態
      + 3.js - templateを分離した状態
      + 4.js - イベントデリゲーションを利用した常態
      + 5.js - デモ前半終了時点の状態
      + b1.js - AjaxをCollectionにした状態
      + b2.js - ModelをCollectionと関係させた状態
      + b3.js - Collectionによるソートを実装した状態
  + config.js - 認証情報の設定ファイル
  + higlight.js
+ Gruntfile.js - Gruntの設定
+ index.html - デモhtml
+ index_b3.html - Collectionによるソートのとき限定のデモhtml
+ package.json - npm設定（Grunt）
+ README.md - このファイル

本編では、すべての工程をデモ紹介はしていませんが、詳細は個別のファイルをご覧ください。

##実際に動かすとき

localhost動作 + ベーシックまたはOAuth認証によるAPIリクエストを想定しています。

###認証情報の設定

`js/config.js`が認証系情報の設定ファイルです。設定を行うことでHTTPS + ベーシック認証によるリクエストでAPIが利用されます。

```
var config = {
  client_id    : '', // 空欄でok
  client_secret: '', // 空欄でok
  access_token : '', // 空欄でok
  username     : 'GitHubのアカウント名',
  password     : 'GitHubのパスワード'
};
```

※ OAuthを利用する場合は、各種情報を自力で取得する必要があります。あんまりおすすめしません。

###Webサーバー

Macであれば`python -m SimpleHTTPServer 8000`でローカルサーバ—を立ち上げるのが簡単です。XAMPPやMAMPなどのお手軽アプリを利用するのも良いでしょう。

※ 別途、Gruntを利用したローカルサーバ— + ファイルの更新監視＆LiveReloadの設定も同梱しています。  
※ grunt0.4系を実行可能な環境で、`npm link`を実行してから、`grunt default`(defaultは省略可)を叩けば`localhost:8000`で閲覧できるようになります。