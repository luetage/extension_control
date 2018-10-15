chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        userAgent();
    }
    if (details.reason == "update") {
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
    let os = {};
    let browser = {};
    let theme = {};
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
        theme = 'dark';
    }
    else if (agent.includes('OPR') === true) {
        browser = 'opr';
        theme = 'dark';
    }
    else {
        browser = 'chr';
        theme = 'light';
    }
    chrome.storage.sync.set({
        'os': os,
        'browser': browser,
        'theme': theme
    }, function() {
        console.log(agent);
        console.log(os + ' ' + browser + ' ' + theme);
        chrome.runtime.openOptionsPage();
    });
};
