document.getElementById("startTimer").addEventListener("click", () => {
    const minutes = parseInt(document.getElementById("timer").value);
    if (!isNaN(minutes) && minutes > 0) {
      chrome.storage.local.set({ sleepTimer: Date.now() + minutes * 60000 });
      chrome.runtime.sendMessage({ action: "startTimer", duration: minutes });
      alert(`Timer set for ${minutes} minutes.`);
    } else {
      alert("Please enter a valid number of minutes.");
    }
  });
  