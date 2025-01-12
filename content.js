let timerInterval; // Store the interval ID for the floating timer

// Function to create or retrieve the floating timer overlay
function createFloatingTimer() {
  let timerOverlay = document.getElementById("sleep-timer-overlay");
  if (!timerOverlay) {
    timerOverlay = document.createElement("div");
    timerOverlay.id = "sleep-timer-overlay";
    timerOverlay.style.position = "fixed";
    timerOverlay.style.bottom = "10px";
    timerOverlay.style.right = "10px";
    timerOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    timerOverlay.style.color = "white";
    timerOverlay.style.fontSize = "16px";
    timerOverlay.style.padding = "10px 15px";
    timerOverlay.style.borderRadius = "5px";
    timerOverlay.style.zIndex = "9999";
    timerOverlay.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(timerOverlay);
  }
  return timerOverlay;
}

// Function to start or resume the floating timer
function startFloatingTimer(endTime) {
  const timerOverlay = createFloatingTimer();

  if (timerInterval) {
    clearInterval(timerInterval); // Clear any existing timer interval
  }

  timerInterval = setInterval(() => {
    const timeLeft = Math.max(0, endTime - Date.now()); // Calculate remaining time
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerOverlay.textContent = "Time's up!";
      setTimeout(() => timerOverlay.remove(), 5000); // Remove overlay after 5 seconds
      return;
    }

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    timerOverlay.textContent = `Time Left: ${padZero(minutes)}:${padZero(seconds)}`;
  }, 1000);
}

// Helper function to pad numbers with leading zeros
function padZero(number) {
  return number.toString().padStart(2, "0");
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startFloatingTimer") {
    startFloatingTimer(message.endTime);
  }
});

// Restore the timer if the content script reloads
chrome.storage.local.get("timerEndTime", (data) => {
  if (data.timerEndTime && Date.now() < data.timerEndTime) {
    startFloatingTimer(data.timerEndTime);
  }
});
