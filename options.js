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
        optAlt.classList.remove('enabled');
        optAlt2.classList.remove('enabled');
        document.body.style.setProperty('--accent', 'hsl(349, 83%, 61%)');
        document.body.style.setProperty('--bg', 'hsl(0, 0%, 100%)');
        document.body.style.setProperty('--headerBg', 'hsl(240,3%,96%)');
        document.body.style.setProperty('--headerFg', 'hsl(349, 83%, 61%)');
        document.body.style.setProperty('--headerAccent', 'hsl(0,0%,28%)');
        document.body.style.setProperty('--fg', 'hsl(240, 5%, 69%)');
        document.body.style.setProperty('--secondFg', 'hsl(0,0%,28%)');
        setTheme();
    }
};

function setDark() {
    if (popup !== 'theme_dark.html') {
        popup = 'theme_dark.html'
        optLight.classList.remove('enabled');
        optDark.classList.add('enabled');
        optAlt.classList.remove('enabled');
        optAlt2.classList.remove('enabled');
        document.body.style.setProperty('--accent', 'hsl(228,57%,73%)');
        document.body.style.setProperty('--bg', 'hsl(0,0%,10%)');
        document.body.style.setProperty('--headerBg', 'hsl(240,3%,12%)');
        document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
        document.body.style.setProperty('--headerAccent', 'hsl(228,57%,73%)');
        document.body.style.setProperty('--fg', 'hsl(228,3%,66%)');
        document.body.style.setProperty('--secondFg', 'hsl(208,8%,48%)');
        setTheme();
    }
};

function setAlt() {
    if (popup !== 'theme_alt.html') {
        popup = 'theme_alt.html';
        optLight.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optAlt.classList.add('enabled');
        optAlt2.classList.remove('enabled');
        document.body.style.setProperty('--accent', 'hsl(228, 57%, 73%)');
        document.body.style.setProperty('--bg', 'hsl(0, 0%, 100%)');
        document.body.style.setProperty('--headerBg', 'hsl(0, 0%, 99%)');
        document.body.style.setProperty('--headerFg', 'hsl(228, 57%, 73%)');
        document.body.style.setProperty('--headerAccent', 'hsl(0,0%,28%)');
        document.body.style.setProperty('--fg', 'hsl(240, 5%, 69%)');
        document.body.style.setProperty('--secondFg', 'hsl(0, 0%, 32%)');
        setTheme();
    }
};

function setAlt2() {
    if (popup !== 'theme_alt2.html') {
        popup = 'theme_alt2.html';
        optLight.classList.remove('enabled');
        optDark.classList.remove('enabled');
        optAlt.classList.remove('enabled');
        optAlt2.classList.add('enabled');
        document.body.style.setProperty('--accent', 'hsl(197, 67%, 48%)');
        document.body.style.setProperty('--bg', 'hsl(220, 5%, 8%)');
        document.body.style.setProperty('--headerBg', 'hsl(220, 5%, 7%)');
        document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
        document.body.style.setProperty('--headerAccent', 'hsl(197, 67%, 48%)');
        document.body.style.setProperty('--fg', 'hsl(228,3%,66%)');
        document.body.style.setProperty('--secondFg', 'hsl(208,8%,48%)');
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
            document.body.style.setProperty('--accent', 'hsl(349, 83%, 61%)');
            document.body.style.setProperty('--bg', 'hsl(0, 0%, 100%)');
            document.body.style.setProperty('--headerBg', 'hsl(240,3%,96%)');
            document.body.style.setProperty('--headerFg', 'hsl(349, 83%, 61%)');
            document.body.style.setProperty('--headerAccent', 'hsl(0,0%,28%)');
            document.body.style.setProperty('--fg', 'hsl(240, 5%, 69%)');
            document.body.style.setProperty('--secondFg', 'hsl(0,0%,28%)');
        }
        else if (popup === 'theme_alt.html') {
            optAlt.classList.add('enabled');
            document.body.style.setProperty('--accent', 'hsl(228, 57%, 73%)');
            document.body.style.setProperty('--bg', 'hsl(0, 0%, 100%)');
            document.body.style.setProperty('--headerBg', 'hsl(0, 0%, 99%)');
            document.body.style.setProperty('--headerFg', 'hsl(228, 57%, 73%)');
            document.body.style.setProperty('--headerAccent', 'hsl(0,0%,28%)');
            document.body.style.setProperty('--fg', 'hsl(240, 5%, 69%)');
            document.body.style.setProperty('--secondFg', 'hsl(0, 0%, 32%)');
        }
        else if (popup === 'theme_alt2.html') {
            optAlt2.classList.add('enabled');
            document.body.style.setProperty('--accent', 'hsl(197, 67%, 48%)');
            document.body.style.setProperty('--bg', 'hsl(220, 5%, 8%)');
            document.body.style.setProperty('--headerBg', 'hsl(220, 5%, 7%)');
            document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
            document.body.style.setProperty('--headerAccent', 'hsl(197, 67%, 48%)');
            document.body.style.setProperty('--fg', 'hsl(228,3%,66%)');
            document.body.style.setProperty('--secondFg', 'hsl(208,8%,48%)');
        }
        else {
            optDark.classList.add('enabled');
            document.body.style.setProperty('--accent', 'hsl(228,57%,73%)');
            document.body.style.setProperty('--bg', 'hsl(0,0%,10%)');
            document.body.style.setProperty('--headerBg', 'hsl(240,3%,12%)');
            document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
            document.body.style.setProperty('--headerAccent', 'hsl(228,57%,73%)');
            document.body.style.setProperty('--fg', 'hsl(228,3%,66%)');
            document.body.style.setProperty('--secondFg', 'hsl(208,8%,48%)');
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
