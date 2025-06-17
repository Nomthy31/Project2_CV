var Uname = prompt("What is your name?");
confirm("Do yoe want to the 5 days weather forecast for your location?");
document.querySelector("h2").innerHTML =
  "Thank you " + Uname + " for visiting my website";
const icons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  56: "🌧️",
  57: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  66: "🌨️",
  67: "🌨️",
  71: "🌨️",
  73: "🌨️",
  75: "❄️",
  77: "❄️",
  80: "🌧️",
  81: "🌧️",
  82: "🌧️",
  85: "❄️",
  86: "❄️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

navigator.geolocation.getCurrentPosition((p) => {
  const lat = p.coords.latitude,
    lon = p.coords.longitude;

  // Get weather data
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
  )
    .then((r) => r.json())
    .then((d) => {
      const html = d.daily.time
        .slice(0, 5)
        .map((date, i) => {
          const dayName = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return `
          <div class="day">
            <div class="date">${dayName}</div>
            <div class="icon">${icons[d.daily.weathercode[i]] || "❓"}</div>
            <div class="temp">⬆ ${d.daily.temperature_2m_max[i]}°C</div>
            <div class="temp">⬇ ${d.daily.temperature_2m_min[i]}°C</div>
          </div>
        `;
        })
        .join("");
      document.getElementById("forecast").innerHTML = html;
    });

  // Get city name using reverse geocoding
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  )
    .then((res) => res.json())
    .then((data) => {
      const town =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.municipality ||
        "your area";
      document.getElementById(
        "location"
      ).textContent = `This is your 5-day Weather forecast for ${town}`;
    });
});
