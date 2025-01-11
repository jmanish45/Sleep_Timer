// Create the timer container
const timerContainer = document.createElement("div");
timerContainer.id = "sleep-timer-overlay";
document.body.appendChild(timerContainer);

// Update the timer display
let remainingTime = 0;
function updateTimerDisplay() {
  if (remainingTime <= 0) {
    timerContainer.textContent = "Timer Ended";
    timerContainer.style.backgroundColor = "red"; // Change color when timer ends
  } else {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerContainer.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    remainingTime--;
    setTimeout(updateTimerDisplay, 1000);
  }
}

// Listen for timer messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startTimer") {
    remainingTime = message.duration * 60; // Convert minutes to seconds
    updateTimerDisplay();
  }
});
