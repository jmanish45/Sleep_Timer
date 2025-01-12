document.getElementById("startTimer").addEventListener("click", () => {
  const timerInput = document.getElementById("timer");
  const timeInMinutes = parseInt(timerInput.value);

  if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
    alert("Please enter a valid time in minutes.");
    return;
  }

  // Calculate the time in milliseconds
  const timeInMilliseconds = timeInMinutes * 60 * 1000;

  // Set a timeout to stop playback
  setTimeout(() => {
    // Send a message to the background script to stop playback
    chrome.runtime.sendMessage({ action: "stopPlayback" });
  }, timeInMilliseconds);

  alert(`Timer set for ${timeInMinutes} minutes.`);
});
