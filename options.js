function setTheme() {
    chrome.storage.sync.set({'theme': theme}, function() {
        console.log(theme);
    });
};

function setDark() {
    if (theme !== 'dark') {
        theme = 'dark';
        optLight.classList.remove('enabled');
        optDark.classList.add('enabled');
        setTheme();
    }
};

function setLight() {
    if (theme !== 'light') {
        theme = 'light';
        optDark.classList.remove('enabled');
        optLight.classList.add('enabled');
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
    const show = document.getElementById('show');
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
const optLight = document.getElementById('light');
const optSmall = document.getElementById('small');
const optMedium = document.getElementById('medium');
const optLarge = document.getElementById('large');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
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
optDark.addEventListener('click', setDark);
optLight.addEventListener('click', setLight);
optSmall.addEventListener('click', setSmall);
optMedium.addEventListener('click', setMedium);
optLarge.addEventListener('click', setLarge);
document.getElementById('extPage').addEventListener('click', function() {
    chrome.runtime.sendMessage('extensions pls');
});
