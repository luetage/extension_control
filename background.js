chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install") {
		chrome.runtime.openOptionsPage();
	}
});