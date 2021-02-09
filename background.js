os = {};
browser = {};
popup = {};

chrome.runtime.onStartup.addListener(function() {
    theme();
});

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install' || details.reason == 'update') {
        theme();
        userAgent();
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
    }
    else if (agent.includes('OPR') === true) {
        browser = 'opr';
    }
    else {
        browser = 'chr';
    }
    chrome.storage.sync.set({
        'os': os,
        'browser': browser,
    }, function() {
        console.log(agent);
        console.log(os + ' ' + browser);
        chrome.runtime.openOptionsPage();
    });
};

function theme() {
    chrome.storage.sync.get({'popup': 'theme_dark.html'}, function(start) {
        popup = start.popup;
        chrome.browserAction.setPopup({popup});
    });
};
