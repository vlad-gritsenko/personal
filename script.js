async function getUserIP() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  return data.ip;
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function startCountdown(endTime, onExpiry) {
  const timerDisplay = document.getElementById("countdown-timer");
  
  function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;
    
    if (distance < 0) {
      clearInterval(countdownInterval);
      onExpiry();
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    timerDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  
  updateTimer();
  const countdownInterval = setInterval(updateTimer, 1000);
}

function onExpiryAction() {
  document.getElementById("countdown-timer").style.display = "none";
  window.location.href = "https://your-redirect-url.com"; // Redirect after expiry
}
