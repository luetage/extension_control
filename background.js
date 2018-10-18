os = {};
browser = {};
popup = {};

chrome.runtime.onStartup.addListener(function() {
    chrome.storage.sync.get({'popup': ''}, function(startup) {
        popup = startup.popup;
        chrome.browserAction.setPopup({popup});
    });
});

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install') {
        userAgent();
    }
    if (details.reason == 'update') {
        chrome.storage.sync.get({'os': ''}, function(getIt) {
            var os = getIt.os;
            if (os === '') {
                userAgent();
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function(message) {
    if (message === 'extensions pls') {
        chrome.storage.sync.get({'browser': ''}, function(getIt) {
            var browser = getIt.browser;
            if (browser === 'viv') {
                chrome.tabs.create({url: 'vivaldi://extensions/'});
            }
            else if (browser === 'opr') {
                chrome.tabs.create({url: 'opera://extensions/'});
            }
            else {
                chrome.tabs.create({url: 'chrome://extensions/'});
            }
        });
    }
});

function userAgent() {
    console.log('SETUP');
    const agent = navigator.userAgent;
    if (agent.includes('Windows') === true) {
        os = 'win';
    }
    else {
        os = 'other';
    }
    if (agent.includes('Vivaldi') === true) {
        browser = 'viv';
        popup = 'theme_dark.html';
    }
    else if (agent.includes('OPR') === true) {
        browser = 'opr';
        popup = 'theme_dark.html';
    }
    else {
        browser = 'chr';
        popup = 'theme_light.html';
    }
    chrome.storage.sync.set({
        'os': os,
        'browser': browser,
        'popup': popup
    }, function() {
        chrome.browserAction.setPopup({popup});
        console.log(agent);
        console.log(os + ' ' + browser + ' ' + popup);
        chrome.runtime.openOptionsPage();
    });
};
