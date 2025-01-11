chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "startTimer") {
      const duration = message.duration * 60000; // Convert minutes to milliseconds
      setTimeout(() => {
        stopPlayback();
        notifyUser();
      }, duration);
    }
  });
  
  function stopPlayback() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const videos = document.querySelectorAll("video");
          const audios = document.querySelectorAll("audio");
          videos.forEach(video => video.pause());
          audios.forEach(audio => audio.pause());
        }
      });
    });
  }
  
  function notifyUser() {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon48.png",
      title: "Sleep Timer Ended",
      message: "Playback has been stopped. Would you like to extend the timer?",
      buttons: [{ title: "Extend Timer" }]
    });
  }
  
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) { // Extend Timer button
      chrome.runtime.sendMessage({ action: "startTimer", duration: 60 }); // Extend by 1 hour
    }
  });
  