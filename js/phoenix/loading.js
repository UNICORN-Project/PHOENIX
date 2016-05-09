var loadingCnt = 0;
var loadingSelector = '#screen-loading';
var showLoading = function(argLoadingSelector){
	if (typeof argLoadingSelector == 'string' && 0 < argLoadingSelector.length){
		loadingSelector = argLoadingSelector;
	}
	if (0 < $(loadingSelector).size()){
		loadingCnt++;
		$(loadingSelector).fadeIn();
	}
}
var hideLoading = function(argLoadingSelector){
	if (0 < $(loadingSelector).size()){
		loadingCnt--;
		if (0 >= loadingCnt){
			loadingCnt = 0;
			$(loadingSelector).fadeOut();
		}
	}
}
