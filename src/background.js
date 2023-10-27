chrome.contextMenus.create({
  type: "normal",
  title: "复制网页链接",
  contexts: ["all"],
  id: "menu-page",
});

chrome.contextMenus.create({
  type: "normal",
  title: "纯链接格式",
  contexts: ["all"],
  parentId: "menu-page",
  id: "menu-page-link",
});

chrome.contextMenus.create({
  type: "normal",
  title: "Markdown格式",
  contexts: ["all"],
  parentId: "menu-page",
  id: "menu-page-md",
});

chrome.contextMenus.onClicked.addListener(async function (data) {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (data.menuItemId == "menu-page-link") {
    await chrome.tabs.sendMessage(tab.id, { format: "link" });
  } else if (data.menuItemId == "menu-page-md") {
    await chrome.tabs.sendMessage(tab.id, { format: "md" });
  }
});
