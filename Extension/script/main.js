var simulateClick = function(element) {
  var dispatchEvent = function (elt, name) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(name, true, true);
    elt.dispatchEvent(clickEvent);
  };
  dispatchEvent(element, 'mouseover');
  dispatchEvent(element, 'mousedown');
  dispatchEvent(element, 'click');
  dispatchEvent(element, 'mouseup');
};

simulateClick(document.getElementsByClassName("ytp-button ytp-button-volume")[0]);
simulateClick(document.getElementsByClassName("ytp-button ytp-button-play")[0]);

var iframe = document.createElement('iframe');
iframe.src = "../microphone.html";
document.body.appendChild(iframe);
