chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const title = document.title;
  const url = document.URL;
  const searchMap = {
    zhihu: "https://www.zhihu.com/search?type=content&q=",
    bili: "https://www.bilibili.com/search?keyword=",
    bing: "https://www.bing.com/search?q=",
    google: "https://www.google.com/search?q=",
    scholar: "https://scholar.google.com/scholar?q=",
  };
  if (request.func == "copy") {
    if (request.target === "link") {
      navigator.clipboard.writeText(url);
    } else if (request.target === "md") {
      navigator.clipboard.writeText("[" + title + "](" + url + ")");
    } else if (request.target === "iframe") {
      navigator.clipboard.writeText('<iframe src="' + url + '"></iframe>');
    }
  } else if (request.func == "search") {
    window.open(
      searchMap[request.target] +
        request.content
          .replace(/%/g, "%25")
          .replace(/\+/g, "%2B")
          .replace(/#/g, "%23")
          .replace(/&/g, "%26")
          .replace(/\?/g, "%3F")
          .replace(/=/g, "%3D")
          .replace(/ /g, "+")
    );
  }
});
