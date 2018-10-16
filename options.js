function setTheme() {
    chrome.storage.sync.set({'theme': theme}, function() {
        console.log(theme);
    });
};

function setdark() {
    if (theme !== 'dark') {
        theme = 'dark';
        optLight.classList.remove('enabled');
        optLighter.classList.remove('enabled');
        optDarker.classList.remove('enabled');
        optDark.classList.add('enabled');
        setTheme();
    }
};

function setlight() {
    if (theme !== 'light') {
        theme = 'light';
        optLighter.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optDarker.classList.remove('enabled');
        optLight.classList.add('enabled');
        setTheme();
    }
};

function setlighter() {
    if (theme !== 'lighter') {
        theme = 'lighter';
        optLight.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optDarker.classList.remove('enabled');
        optLighter.classList.add('enabled');
        setTheme();
    }
};

function setdarker() {
    if (theme !== 'darker') {
        theme = 'darker';
        optLight.classList.remove('enabled');
        optLighter.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optDarker.classList.add('enabled');
        setTheme();
    }
};

function setFontsize() {
    chrome.storage.sync.set({'fontsize': fontsize}, function(smallToLarge) {
        console.log(fontsize);
    });
};

function setSmall() {
    if (fontsize !== 'small') {
        fontsize = 'small';
        optMedium.classList.remove('enabled');
        optLarge.classList.remove('enabled');
        optSmall.classList.add('enabled');
        setFontsize();
    }
};

function setMedium() {
    if (fontsize !== 'medium') {
        fontsize = 'medium';
        optMedium.classList.add('enabled');
        optLarge.classList.remove('enabled');
        optSmall.classList.remove('enabled');
        setFontsize();
    }
};

function setLarge() {
    if (fontsize !== 'large') {
        fontsize = 'large';
        optMedium.classList.remove('enabled');
        optLarge.classList.add('enabled');
        optSmall.classList.remove('enabled');
        setFontsize();
    }
};

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
            show.appendChild(extItem);
            extItem.addEventListener('click', function() {
                var remove = hidden.indexOf(divID);
                if (remove > -1) {
                    hidden.splice(remove, 1);
                }
                chrome.storage.sync.set({'hidden': hidden});
                extItem.outerHTML = '';
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
        'hidden': ''
    }, function(start) {
        width = start.width;
        slide.value = width;
        disp.innerHTML = width + 'px';
        theme = start.theme;
        if (theme === 'dark') {
            optDark.classList.add('enabled');
        }
        else {
            optLight.classList.add('enabled');
        }
        fontsize = start.fontsize;
        if (fontsize === 'large') {
            optLarge.classList.add('enabled');
        }
        else if (fontsize === 'small') {
            optSmall.classList.add('enabled');
        }
        else {
            optMedium.classList.add('enabled');
        }
        hidden = start.hidden;
        if (hidden !== '') {
            showEXT();
        }
    });
};

const optDark = document.getElementById('dark');
const optDarker = document.getElementById('darker');
const optLight = document.getElementById('light');
const optLighter = document.getElementById('lighter');
const optSmall = document.getElementById('small');
const optMedium = document.getElementById('medium');
const optLarge = document.getElementById('large');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
const show = document.getElementById('show');
width = {};
theme = {};
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

optLight.addEventListener('click', setlight);
optLighter.addEventListener('click', setlighter);
optDark.addEventListener('click', setdark);
optDarker.addEventListener('click', setdarker);
optSmall.addEventListener('click', setSmall);
optMedium.addEventListener('click', setMedium);
optLarge.addEventListener('click', setLarge);
document.getElementById('extPage').addEventListener('click', function() {
    chrome.runtime.sendMessage('extensions pls');
});
chrome.runtime.onMessage.addListener(function(message) {
    if (message === 'hide extension') {
        chrome.storage.sync.get({'hidden': ''}, function(msg) {
            hidden = msg.hidden;
            show.innerHTML = '';
            showEXT();
        });
    }
});
