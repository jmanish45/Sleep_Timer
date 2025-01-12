function stopPlayback() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => video.pause());

  const audios = document.querySelectorAll('audio');
  audios.forEach((audio) => audio.pause());
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "stopPlayback") {
    stopPlayback();
    sendResponse({ status: "Playback stopped" });
  }
});