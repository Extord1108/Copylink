chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const title = document.title;
  const url = document.URL;
  if (request.format === "link") {
    navigator.clipboard.writeText(url);
  } else if (request.format === "md") {
    navigator.clipboard.writeText("[" + title + "](" + url + ")");
  }
});
