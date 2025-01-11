chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "stopPlayback") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Sleep Timer",
      message: "Time's up! Stopping playback.",
    });

    // Optionally stop playback (this requires additional permissions or scripts on content pages)
    console.log("Playback stopped.");
  }
});
