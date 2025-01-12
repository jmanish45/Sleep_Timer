chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "stopPlayback") {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        // Send a message to the content script to stop playback
        chrome.tabs.sendMessage(tabs[0].id, { action: "stopPlayback" });
      }
    });
    sendResponse({ status: "Playback stopping initiated" });
  }
});