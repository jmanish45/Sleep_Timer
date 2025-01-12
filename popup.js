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

  // Start the countdown timer
  startCountdown(endTime);

  // Set a timeout to stop playback
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: "stopPlayback" });
    clearInterval(timerInterval); // Clear the interval when the timer ends
    updateTimerDisplay("--:--"); // Reset the timer display
  }, timeInMilliseconds);

  alert(`Timer set for ${timeInMinutes} minutes.`);
});

function startCountdown(endTime) {
  if (timerInterval) {
    clearInterval(timerInterval); // Clear any existing interval
  }

  timerInterval = setInterval(() => {
    const timeLeft = Math.max(0, endTime - Date.now()); // Calculate remaining time
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop the countdown
      return;
    }

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    updateTimerDisplay(`${padZero(minutes)}:${padZero(seconds)}`);
  }, 1000); // Update every second
}

function updateTimerDisplay(time) {
  document.getElementById("timerDisplay").textContent = `Time Left: ${time}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}