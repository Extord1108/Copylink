//初始化
function initContextMenus() {
  chrome.contextMenus.create({
    type: "normal",
    title: "复制网页链接",
    contexts: ["all"],
    id: "menu-page",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "Markdown格式    Ctrl+Shift+V",
    contexts: ["all"],
    parentId: "menu-page",
    id: "menu-page-md",
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
    title: "iframe格式",
    contexts: ["all"],
    parentId: "menu-page",
    id: "menu-page-iframe",
  });
}

//点击右键菜单
chrome.contextMenus.onClicked.addListener(async (data) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (data.menuItemId == "menu-page-link") {
    await chrome.tabs.sendMessage(tab.id, { format: "link" });
  } else if (data.menuItemId == "menu-page-md") {
    await chrome.tabs.sendMessage(tab.id, { format: "md" });
  } else if (data.menuItemId == "menu-page-iframe") {
    await chrome.tabs.sendMessage(tab.id, { format: "iframe" });
  }
});

//快捷键
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (command == "copy-md") {
    await chrome.tabs.sendMessage(tab.id, { format: "md" });
  }
});

//入口
chrome.runtime.onInstalled.addListener(() => {
  initContextMenus();
});
