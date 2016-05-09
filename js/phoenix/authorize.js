//var signupLocation = "javascript:(function(){var url='./js/phoenix/signup.js';var d=document;var e=d.createElement('script');e.src=url;d.getElementsByTagName('head')[0].appendChild(e);})();";
var signupLocation = "https://console.aws.amazon.com/cloudformation/home?#cstack=sn%7ESharePoint%7Cturl%7Ehttps://s3-ap-northeast-1.amazonaws.com/phoenix-cloud/cloudformation-templates/phoenix-iam-role.template";

$(function(){
	// ログインメソッドの定義
	var authorize = function (accessKey, accessSecret, callbackBlock){
		var post = {};
		if (accessKey !== null && accessSecret !== null){
			post.accesskey = accessKey;
			post.accesssecret = accessSecret;
		}
		else {
			var token = $.cookie('token');
			if (!(typeof $.cookie('token') !== 'undefined' && null != $.cookie('token') && 0 < $.cookie('token').length)){
				// 初回アクセス
				// リフレッシュAuthエラー
				if (null != callbackBlock && typeof callbackBlock == 'function'){
					callbackBlock(false);
				}
				return false;
			}
			post.token = token;
		}
		showLoading();
		// ログイン OR 会員登録処理
		var apigClient = apigClientFactory.newClient();
		apigClient.authorizePost(null, post)
		.then(function(result){
			hideLoading();
			//This is where you would put a success callback
			console.log(result);
			if (!('undefined' != typeof result.data && null !== result.data && 'undefined' != typeof result.data.token && 36 < result.data.token.length)){
				if (accessKey !== null && accessSecret !== null){
					// ログインエラー
					$('#signup .error').text('このアクセスキー、アクセスシークレットは無効か、或いは外部から参照する事が許可されていません。');
				}
				else {
					// リフレッシュAuthエラー
					if (null != callbackBlock && typeof callbackBlock == 'function'){
						callbackBlock(false);
					}
				}
				return false;
			}
			// ログイン処理
			$.cookie("token", result.data.token, {path: "/"});
			console.log("cookie=");
			console.log($.cookie("token"));
			if (null != callbackBlock && typeof callbackBlock == 'function'){
				callbackBlock(true, result.data);
			}
		})
		.catch( function(result){
			hideLoading();
			//This is where you would put an error callback
			console.log(result);
		});
	};
	// ログインViewの最初期化メソッドの定義
	var showAuthorize = function (showAuthorized, data){
		if (showAuthorized){
			// ログイン後のView
			$('.accountName').text(data.name);
			$('#authorized').show();
			$('#unauthorize').show();
			$('#signup').hide();
			$('#ctlpnl').show();
		}
		else {
			// 未ログイン
			$('#authorized').hide();
			$('#unauthorize').hide();
			$('#signup').show();
			$('#ctlpnl').hide();
		}
	}

	// ログイン周りのViewの初期化
	$('#authorized').hide();
	$('#unauthorize').hide();
	$('#signup').hide();
	$('#ctlpnl').hide();

	// ログイン判定
	authorize(null, null, showAuthorize);

	// ログインボタン設定
	if (0 < $('#signup .signinbtn').size()){
		$('#signup .signinbtn').click(function (){
			var accessKey = null;
			var accessSecret = null;
			if (0 < $('#signup input[name=id]').size() && 'undefined' != typeof $('#signup input[name=id]').val() && 0 < $('#signup input[name=id]').val().length){
				accessKey = $('#signup input[name=id]').val()
			}
			if (0 < $('#signup input[name=pass]').size() && 'undefined' != typeof $('#signup input[name=pass]').val() && 0 < $('#signup input[name=pass]').val().length){
				accessSecret = $('#signup input[name=pass]').val()
			}
			var valid = true;
			if (accessKey === null){
				// エラー
				$('#signup .error').text('AWSのアクセスキーを指定して下さい');
				valid = false;
			}
			if (accessSecret === null){
				// エラー
				$('#signup .error').text('AWSのアクセスシークレットを指定して下さい');
				valid = false;
			}
			if (valid === false){
				// CloudFormationでIAMロールを作成してもらうフローへ誘導する
				if(confirm('このサービスを利用するには\nAWSアカウントを作成し、アクセスキーとアクセスシークレットを発行する必要があります。\nこのまま新しいウィンドウでアクセスキーとアクセスシークレットの発行をしますか？')){
					window.open(signupLocation);
				}
			}
			// ログイン OR 会員登録の実行
			authorize(accessKey, accessSecret, function(){
				showAuthorize();
				// サービス画面の切り替えと移動
				location.href = '/controlpanel/';
			});
			return false;
		});
	}

	// 登録ボタン設定
	if (0 < $('#signup .signuplink').size()){
		$('#signup .signuplink').attr('href', signupLocation);
		$('#signup .signuplink').attr('target', '_blank');
	}

	// ログアウトボタン設定
	if (0 < $('#unauthorize .signoutlink').size()){
		$('#unauthorize .signoutlink').click(function (){
			if(confirm('直ちにログアウトします。')){
				$.cookie("token", null, {path: "/"});
				showAuthorize(false, null);
			}
			return false;
		});
	}
});
