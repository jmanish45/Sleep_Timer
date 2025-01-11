let intervalId; // To store the interval for the countdown

document.getElementById("startTimer").addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("timer").value);
  if (!isNaN(minutes) && minutes > 0) {
    const endTime = Date.now() + minutes * 60000;

    // Save the end time in local storage
    chrome.storage.local.set({ sleepTimerEnd: endTime });

    // Start the countdown
    startCountdown(endTime);
    alert(`Timer set for ${minutes} minutes.`);
  } else {
    alert("Please enter a valid number of minutes.");
  }
});

// Function to start the countdown
function startCountdown(endTime) {
  clearInterval(intervalId); // Clear any existing countdown
  intervalId = setInterval(() => {
    const now = Date.now();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      document.getElementById("timerDisplay").innerText = "Time Left: 00:00";
      alert("Time's up! Playback will stop.");
      chrome.runtime.sendMessage({ action: "stopPlayback" });
    } else {
      // Update the timer display
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      document.getElementById("timerDisplay").innerText = `Time Left: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  }, 1000);
}

// Load the saved timer on popup open
chrome.storage.local.get(["sleepTimerEnd"], (result) => {
  if (result.sleepTimerEnd) {
    const endTime = result.sleepTimerEnd;
    if (Date.now() < endTime) {
      startCountdown(endTime);
    } else {
      // Timer already expired
      document.getElementById("timerDisplay").innerText = "Time Left: 00:00";
    }
  }
});
