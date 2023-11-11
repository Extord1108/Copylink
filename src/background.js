//初始化
function initContextMenus() {
  /**************复制链接**************/
  chrome.contextMenus.create({
    type: "normal",
    title: "复制网页链接",
    contexts: ["page"],
    id: "menu-copy",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "Markdown格式    Ctrl+Shift+V",
    contexts: ["page"],
    parentId: "menu-copy",
    id: "menu-copy-md",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "纯链接格式",
    contexts: ["page"],
    parentId: "menu-copy",
    id: "menu-copy-link",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "iframe格式",
    contexts: ["page"],
    parentId: "menu-copy",
    id: "menu-copy-iframe",
  });

  /*************搜索内容***************/
  chrome.contextMenus.create({
    type: "normal",
    title: "搜索选中内容",
    contexts: ["selection"],
    id: "menu-search",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "在知乎中搜索",
    contexts: ["selection"],
    parentId: "menu-search",
    id: "menu-search-zhihu",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "在Bilibili中搜索",
    contexts: ["selection"],
    parentId: "menu-search",
    id: "menu-search-bili",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "在Bing中搜索",
    contexts: ["selection"],
    parentId: "menu-search",
    id: "menu-search-bing",
  });

  chrome.contextMenus.create({
    type: "normal",
    title: "在Google中搜索",
    contexts: ["selection"],
    parentId: "menu-search",
    id: "menu-search-Google",
  });
}

//点击右键菜单
chrome.contextMenus.onClicked.addListener(async (data) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  let func = data.menuItemId.split("-")[1];
  let target = data.menuItemId.split("-")[2];
  let content = data.selectionText;
  await chrome.tabs.sendMessage(tab.id, {
    func: func,
    target: target,
    content: content,
  });
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
