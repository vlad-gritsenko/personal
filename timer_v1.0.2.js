// Set the countdown duration in seconds
const countdownDuration = 2640; // Example: 1 hour (3600 seconds)

function startCountdown() {
  const heroHoursElement = document.getElementById("h-hours");
  const heroMinutesElement = document.getElementById("h-minutes");
  const heroSecondsElement = document.getElementById("h-seconds");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  let endTime = localStorage.getItem("endTime");

  // If there's no endTime in localStorage or the endTime has passed, set a new one
  if (!endTime || new Date().getTime() > endTime) {
    resetEndTime();
    endTime = localStorage.getItem("endTime");
  }

  const interval = setInterval(() => {
    const now = new Date().getTime();
    let timeLeft = endTime - now;

    if (timeLeft <= 0) {
      // Restart the countdown
      resetEndTime();
      endTime = localStorage.getItem("endTime");
      timeLeft = endTime - now;
    }

    // Calculate hours, minutes, and seconds
    const totalSecondsLeft = Math.floor(timeLeft / 1000);
    const hours = Math.floor(totalSecondsLeft / 3600);
    const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
    const seconds = totalSecondsLeft % 60;

    // Update the HTML elements
    heroHoursElement.textContent = pad(hours);
    heroMinutesElement.textContent = pad(minutes);
    heroSecondsElement.textContent = pad(seconds);
    hoursElement.textContent = pad(hours);
    minutesElement.textContent = pad(minutes);
    secondsElement.textContent = pad(seconds);
  }, 1000);
}

function resetEndTime() {
  const newEndTime = new Date().getTime() + countdownDuration * 1000;
  localStorage.setItem("endTime", newEndTime);
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", startCountdown);
