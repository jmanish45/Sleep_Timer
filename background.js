chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "stopPlayback") {
    // Stop playback immediately
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stopPlayback" }, (response) => {
          if (response && response.status) {
            console.log("Playback stopped successfully:", response.status);
          } else {
            console.log("Failed to stop playback or no response.");
          }
        });
      }
    });

    sendResponse({ status: "Playback stopping initiated" });
  }
});