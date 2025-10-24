const roads = ["A", "B", "C", "D"];
let currentRoad = null;

function resetLights(roadId) {
  const lights = document.querySelectorAll(`#road${roadId} .light`);
  lights.forEach(light => (light.style.backgroundColor = "#444"));
}

function setLight(roadId, color) {
  resetLights(roadId);
  const target = document.querySelector(`#road${roadId} .${color}`);
  target.style.backgroundColor =
    color === "red" ? "red" : color === "yellow" ? "yellow" : "lime";
  target.style.boxShadow = `0 0 20px ${color}`;
}

function detectVehicle(roadId) {
  document.getElementById(
    "status"
  ).innerText = `🚗 Vehicle detected on Road ${roadId}! Adjusting signals...`;

  if (currentRoad !== null) {
    // Set current road to red before switching
    setLight(currentRoad, "red");
  }

  currentRoad = roadId;
  setLight(roadId, "green");

  // After 5 seconds -> yellow -> then red
  setTimeout(() => {
    setLight(roadId, "yellow");
    document.getElementById("status").innerText = `⚠️ Road ${roadId}: Yellow Light`;

    setTimeout(() => {
      setLight(roadId, "red");
      document.getElementById("status").innerText = `⛔ Road ${roadId}: Red Light`;
      currentRoad = null;
    }, 2000);
  }, 5000);
}

// Initialize all to red
roads.forEach(r => setLight(r, "red"));
