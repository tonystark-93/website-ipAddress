function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function getIPInfo([currentTab]) {
    if(currentTab.url.indexOf("chrome://") !==-1){
        return;
    }
    document.getElementById('userURL').value = currentTab.url;
    if (isValidURL(currentTab.url)) {
        document.getElementById(("loader")).classList.remove("hidden");
        fetch(currentTab.url).finally(function () {
            setTimeout(function () {
                chrome.runtime.sendMessage({getCurentTabInfo: true, url: currentTab.url}, function (response) {
                    document.getElementById(("loader")).classList.add("hidden");
                    if (response && response.ip) {
                        document.getElementById('ipAddress').parentElement.classList.remove("hidden");
                        document.getElementById('ipAddress').textContent = response.ip;
                    } else {

                    }
                })
            }, 50)
        })

    } else {

    }
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.style.width = "0px";
    el.style.height = "0px";
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
window.onload = function () {
    var query = {active: true, currentWindow: true};
    document.getElementById("inputForm").addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();
        let tabURL = [{url: document.getElementById('userURL').value}];
        getIPInfo(tabURL);
    });
    document.getElementById("copyBtn").addEventListener("click", function () {
        copyToClipboard(document.getElementById('ipAddress').textContent);
    })


    // document.getElementsByClassName("rating")[0].onclick = function () {
    //     window.open("https://chrome.google.com/webstore/detail/download-thumbnails/gcdfmaggdilgcopoipaglabdejakibdf/reviews");
    // };
    chrome.tabs.query(query, getIPInfo);
}