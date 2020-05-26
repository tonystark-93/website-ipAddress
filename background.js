chrome.runtime.setUninstallURL("https://www.thebyteseffect.com/2018/11/sorry-to-see-you-go.html", null);

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.tabs.create({url: "https://www.thebyteseffect.com/2018/10/features-of-download-thumbnail-extension.html"});
    }
});

var websiteInfoMap = {}
chrome.webRequest.onCompleted.addListener(function (request, sender, senderRespone) {
    return websiteInfoMap[request.url] = request.ip;
}, {urls: [], types: []});
chrome.webRequest.onResponseStarted.addListener(function (request, sender, senderRespone) {
    return websiteInfoMap[request.url] = request.ip;
}, {urls: [], types: []});
chrome.webRequest.onBeforeRedirect.addListener(function (request, sender, senderRespone) {
    return websiteInfoMap[request.url] = request.ip;
}, {urls: [], types: []});  
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.getCurentTabInfo === true && websiteInfoMap[message.url]) {
        sendResponse({
            ip: websiteInfoMap[message.url]
        });
    } else if (websiteInfoMap[message.url + "/"]) {
        sendResponse({
            ip: websiteInfoMap[message.url + "/"]
        });
    } else {
        for (var elem in websiteInfoMap) {
            if (websiteInfoMap[elem]) {
                if (websiteInfoMap[elem].includes(message.url)) {
                    return websiteInfoMap[elem];
                }
            }
        }
        fetch(message.url).then(function () {
            setTimeout(function () {
                sendResponse({ip: websiteInfoMap[message.url]});
            }, 50)
        })
    }
});