chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "stopPlayback") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Sleep Timer",
      message: "Time's up! Stopping playback.",
    });

    // Send a message to the content script to stop playback
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopPlayback" }, (response) => {
        console.log(response.status);
      });
    });
  }
});