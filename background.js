browser.browserAction.onClicked.addListener(async (tab) => {
  try {
    await browser.tabs.executeScript(tab.id, {
      file: "content.js",
    });
  } catch (err) {
    console.error("Save as Markdown: failed to inject", err);
  }
});

// Listen for image fetch requests from content script (bypasses CORS)
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "fetchImage") {
    fetch(msg.url)
      .then((resp) => {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        var contentType = resp.headers.get("content-type") || "image/jpeg";
        return resp.arrayBuffer().then((buf) => ({ buf, contentType }));
      })
      .then(({ buf, contentType }) => {
        var bytes = new Uint8Array(buf);
        var binary = "";
        for (var i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        var b64 = btoa(binary);
        sendResponse({ dataUrl: "data:" + contentType + ";base64," + b64 });
      })
      .catch((e) => {
        console.error("SaveMD: image fetch failed", msg.url, e);
        sendResponse({ dataUrl: null });
      });
    return true; // keep channel open for async response
  }
});
