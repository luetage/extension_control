function setTheme() {
    chrome.storage.sync.set({'popup': popup}, function() {
        chrome.browserAction.setPopup({popup});
        console.log(popup);
    });
};

function setLight() {
    if (popup !== 'theme_light.html') {
        popup = 'theme_light.html'
        optLight.classList.add('enabled');
        optDark.classList.remove('enabled');
        setTheme();
    }
};

function setDark() {
    if (popup !== 'theme_dark.html') {
        popup = 'theme_dark.html'
        optLight.classList.remove('enabled');
        optDark.classList.add('enabled');
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
    document.getElementById('hint').style.visibility = 'hidden';
    var empty = document.createElement('p');
    empty.classList.add('contrast');
    empty.innerHTML = 'nothing to hide';
    show.appendChild(empty);
}

function showEXT() {
    document.getElementById('hint').style.visibility = 'visible';
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
        'popup': 'theme_dark.html',
        'width': '195',
        'fontsize': 'medium',
        'hidden': []
    }, function(start) {
        popup = start.popup;
        chrome.browserAction.setPopup({popup});
        width = start.width;
        slide.value = width;
        disp.innerHTML = width + 'px';
        popup = start.popup;
        if (popup === 'theme_light.html') {
            optLight.classList.add('enabled');
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
const optSmall = document.getElementById('small');
const optMedium = document.getElementById('medium');
const optLarge = document.getElementById('large');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
const show = document.getElementById('show');
width = {};
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
