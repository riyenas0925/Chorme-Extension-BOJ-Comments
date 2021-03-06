chrome.tabs.onActivated.addListener(function (info) {
    chrome.tabs.get(info.tabId, function (change) {
        if(change.url == undefined){
            chrome.browserAction.setPopup({tabId: info.tabId, popup: ''});
            chrome.browserAction.setIcon({path: '../images/icon-disabled.png', tabId: info.tabId});
        }
        else if (change.url.match(/https:\/\/www\.acmicpc\.net\/problem\/*/) == null) {
            chrome.browserAction.setPopup({ tabId: info.tabId, popup: '' });
            chrome.browserAction.setIcon({ path: '../images/icon-disabled.png', tabId: info.tabId });
        }
        else {
            chrome.browserAction.setPopup({ tabId: info.tabId, popup: 'popup.html' });
            chrome.browserAction.setIcon({ path: '../images/icon.png', tabId: info.tabId });
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
    if(change.url == undefined){
        return;
    }
    else if (tab.url.match(/https:\/\/www\.acmicpc\.net\/problem\/*/) == null) {
        chrome.browserAction.setPopup({ tabId: tabId, popup: '' });
        chrome.browserAction.setIcon({ path: '../images/icon-disabled.png', tabId: tabId });
    }
    else {
        chrome.browserAction.setPopup({ tabId: tabId, popup: 'popup.html' });
        chrome.browserAction.setIcon({ path: '../images/icon.png', tabId: tabId });
    }
});