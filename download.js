function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function extractHostname (url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

function checkLink(data) {
  var res = data.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

  if (res == undefined) {
    return false;
  }
  return getParameterByName("v", data);
}
window.addEventListener("load", mainFunc, false);


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    mainFunc();
  });
function extractRootDomain (url) {
  var domain = extractHostname(url),
    splitArr = domain.split('.'),
    arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain 
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain;
    }
  }
  return domain;
}
function mainFunc(evt) {
  var url = checkLink(location.href);

  if (url !== false) {
    setTimeout(function () {
      $("#custom-thumbnail-downlaoder").remove();
      var element = $("<a/>", {
        target: "_blank",
        text: "Download thumbnail",
        class: "style-scope ytd-menu-renderer style-text force-icon-button",
        id: "custom-thumbnail-downlaoder",
        href: 'https://youtube-thumbnail-grabber.com/?id=' + url
      }).css({
        color: "gray",
        "text-decoration": "none",
        "font-weight": "bold",
        "font-size": "15px",
        "padding-top": "8px",
      })
      $("#menu-container").find("#top-level-buttons").append(element);
      console.log(element);
    }, 1000);

  }
  if (extractRootDomain(location.href) === "instagram.com"){
    url=location.href;
    setTimeout(function () {
      $("#custom-thumbnail-downlaoder").remove();
      var imgIcon = $("<img/>", {
        src: "chrome-extension://" + chrome.runtime.id + "/d.png"
      });
      $("#instaDwnLnk").remove();
      var link = $("<a/>", {
        id: "instaDwnLnk",
        href: "https://youtube-thumbnail-grabber.com/instagram.html?url=" + url,
        target: "_blank",
        title: "Download Image"
      }).css({
        "margin-top": "9px"
      });
      $(link).append(imgIcon);

      $(link).insertAfter("._5e4p");

    }, 1000);
  }

}
mainFunc();
console.log("hererere")