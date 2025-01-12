let timerInterval; // To store the interval ID for the timer

document.getElementById("startTimer").addEventListener("click", () => {
  const timerInput = document.getElementById("timer");
  const timeInMinutes = parseInt(timerInput.value);

  if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
    alert("Please enter a valid time in minutes.");
    return;
  }

  const timeInMilliseconds = timeInMinutes * 60 * 1000;
  const endTime = Date.now() + timeInMilliseconds;

  // Send a message to the content script to display the floating timer
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "startFloatingTimer",
      endTime: endTime,
    });
  });

  // Set a timeout to stop playback
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: "stopPlayback" });
  }, timeInMilliseconds);

  alert(`Timer set for ${timeInMinutes} minutes.`);
});
