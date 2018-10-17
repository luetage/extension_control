function setTheme() {
    chrome.storage.sync.set({'theme': theme}, function() {
        chrome.browserAction.setPopup({popup});
        console.log(theme);
    });
};

function setLight() {
    if (theme !== 'light') {
        theme = 'light';
        popup = 'theme_light.html'
        optLight.classList.add('enabled');
        optDark.classList.remove('enabled');
        optAlt.classList.remove('enabled');
        optAlt2.classList.remove('enabled');
        setTheme();
    }
};

function setDark() {
    if (theme !== 'dark') {
        theme = 'dark';
        popup = 'theme_dark.html'
        optLight.classList.remove('enabled');
        optDark.classList.add('enabled');
        optAlt.classList.remove('enabled');
        optAlt2.classList.remove('enabled');
        setTheme();
    }
};

function setAlt() {
    if (theme !== 'alt') {
        theme = 'alt';
        popup = 'theme_alt.html';
        optLight.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optAlt.classList.add('enabled');
        optAlt2.classList.remove('enabled');
        setTheme();
    }
};

function setAlt2() {
    if (theme !== 'alt2') {
        theme = 'alt2';
        popup = 'theme_alt2.html';
        optLight.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optAlt.classList.remove('enabled');
        optAlt2.classList.add('enabled');
        setTheme();
    }
};

function setFontsize() {
    chrome.storage.sync.set({'fontsize': fontsize}, function() {
        console.log(fontsize);
    });
};

function setSmall() {
    if (fontsize !== 'small') {
        fontsize = 'small';
        optSmall.classList.add('enabled');
        optMedium.classList.remove('enabled');
        optLarge.classList.remove('enabled');
        setFontsize();
    }
};

function setMedium() {
    if (fontsize !== 'medium') {
        fontsize = 'medium';
        optSmall.classList.remove('enabled');
        optMedium.classList.add('enabled');
        optLarge.classList.remove('enabled');
        setFontsize();
    }
};

function setLarge() {
    if (fontsize !== 'large') {
        fontsize = 'large';
        optSmall.classList.remove('enabled');
        optMedium.classList.remove('enabled');
        optLarge.classList.add('enabled');
        setFontsize();
    }
};

function empty() {
    var empty = document.createElement('p');
    empty.classList.add('contrast');
    empty.innerHTML = 'empty';
    show.appendChild(empty);
}

function showEXT() {
    for (i=0; i<hidden.length; i++) {
        extID = hidden[i];
        chrome.management.get(extID, function(text) {
            var divID = text.id;
            var name = text.name
            var extItem = document.createElement('p');
            extItem.innerHTML = name;
            extItem.id = divID;
            extItem.classList.add('extensions');
            show.insertBefore(extItem, show.firstChild);
            extItem.addEventListener('click', function() {
                var remove = hidden.indexOf(divID);
                if (remove > -1) {
                    hidden.splice(remove, 1);
                }
                chrome.storage.sync.set({'hidden': hidden});
                extItem.outerHTML = '';
                if (!hidden.length > 0) {
                    empty();
                }
            })
        })
    }
};

function setup() {
    chrome.management.getSelf(function(info) {
        const ver = info.version;
        const version = document.getElementById('version');
        version.innerHTML = ' ' + ver;
    });

    chrome.storage.sync.get({
        'theme': '',
        'width': '195',
        'fontsize': 'medium',
        'hidden': []
    }, function(start) {
        width = start.width;
        slide.value = width;
        disp.innerHTML = width + 'px';
        theme = start.theme;
        if (theme === 'light') {
            optLight.classList.add('enabled');
        }
        else if (theme === 'alt') {
            optAlt.classList.add('enabled');
        }
        else if (theme === 'alt2') {
            optAlt2.classList.add('enabled');
        }
        else {
            optDark.classList.add('enabled');
        }
        fontsize = start.fontsize;
        if (fontsize === 'small') {
            optSmall.classList.add('enabled');
        }
        else if (fontsize === 'medium') {
            optMedium.classList.add('enabled');
        }
        else {
            optLarge.classList.add('enabled');
        }
        hidden = start.hidden;
        if (hidden.length > 0) {
            showEXT();
        }
        else {
            empty();
        }
    });
};

const optLight = document.getElementById('light');
const optDark = document.getElementById('dark');
const optAlt = document.getElementById('alt');
const optAlt2 = document.getElementById('alt2');
const optSmall = document.getElementById('small');
const optMedium = document.getElementById('medium');
const optLarge = document.getElementById('large');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
const show = document.getElementById('show');
width = {};
theme = {};
popup = {};
fontsize = {};
hidden = [];
setup();
slide.oninput = function() {
    width = this.value
    disp.innerHTML = width + 'px';
};
slide.onchange = function() {
    chrome.storage.sync.set({'width': width}, function() {
        disp.innerHTML = width + 'px';
    });
};
optLight.addEventListener('click', setLight);
optDark.addEventListener('click', setDark);
optAlt.addEventListener('click', setAlt);
optAlt2.addEventListener('click', setAlt2);
optSmall.addEventListener('click', setSmall);
optMedium.addEventListener('click', setMedium);
optLarge.addEventListener('click', setLarge);
document.getElementById('extPage').addEventListener('click', function() {
    chrome.runtime.sendMessage('extensions pls');
});
chrome.runtime.onMessage.addListener(function(message) {
    if (message === 'hide it!') {
        chrome.storage.sync.get({'hidden': []}, function(msg) {
            hidden = msg.hidden;
            show.innerHTML = '';
            showEXT();
        });
    }
});
