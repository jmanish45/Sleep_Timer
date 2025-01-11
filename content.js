// content.js
function stopPlayback() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "stopPlayback") {
      stopPlayback();
      sendResponse({ status: "Playback stopped" });
    }
  });