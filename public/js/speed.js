let lastTime = null;
let lastY = null;

window.addEventListener("devicemotion", (event) => {
  const acc = event.accelerationIncludingGravity;
  if (lastTime && lastY !== null) {
    const now = Date.now();
    const dt = (now - lastTime) / 1000;
    const dy = acc.y - lastY;
    const speed = Math.abs(dy / dt).toFixed(2);
    document.getElementById("speed").textContent = speed;
  }
  lastTime = Date.now();
  lastY = acc.y;
});
