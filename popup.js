document.getElementById("startTimer").addEventListener("click", () => {
  const timerInput = document.getElementById("timer");
  const timeInMinutes = parseInt(timerInput.value);

  if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
    alert("Please enter a valid time in minutes.");
    return;
  }

  const endTime = Date.now() + timeInMinutes * 60 * 1000;

  // Store the timer's end time in chrome.storage
  chrome.storage.local.set({ timerEndTime: endTime }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "startFloatingTimer", endTime: endTime });
    });
  });

  alert(`Timer set for ${timeInMinutes} minutes.`);
});
