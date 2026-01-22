const out = document.getElementById("out");
const API_BASE = "http://localhost:3000";
const blobs = document.querySelectorAll('.blob');

// 1. Theme Configuration
const themes = {
  fortune: ['#f59e0b', '#78350f', '#fef3c7'],
  joke: ['#ec4899', '#831843', '#fbcfe8'],
  happy: ['#22c55e', '#064e3b', '#dcfce7'],
  tired: ['#64748b', '#0f172a', '#f1f5f9'],
  stressed: ['#ef4444', '#7f1d1d', '#fee2e2'],
  smash: ['#ff0000', '#000000', '#444444'],
  secret: ['#a855f7', '#3b0764', '#000000']
};

// 2. The "Pretty" Display Function
function showPretty(obj, themeKey) {
  const colors = themes[themeKey] || ['#4f46e5', '#9333ea', '#06b6d4'];
  blobs[0].style.background = colors[0];
  blobs[1].style.background = colors[1];
  blobs[2].style.background = colors[2];

  out.classList.remove('fade-in-up');
  
  // Extract text from object or string
  const message = typeof obj === 'object' ? Object.values(obj)[0] : obj;
  out.textContent = message;
  
  void out.offsetWidth; 
  out.classList.add('fade-in-up');
}

// 3. API Helper
async function getJSON(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return "Offline: Check your Node server 🌐";
  }
}

// 4. Event Listeners
document.getElementById("btnFortune").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/fortune`);
  showPretty(data, 'fortune');
});

document.getElementById("btnJoke").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/joke`);
  showPretty(data, 'joke');
});

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    showPretty(data, mood);
  });
});

// THE FIXED SMASH BUTTON
document.getElementById("btnSmash").addEventListener("click", async () => {
  try {
    const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
    const data = await res.json();
    
    // This displays the message and the permanent count
    showPretty(`${data.message} 💥 (Total: ${data.count})`, 'smash');
  } catch (err) {
    showPretty("Offline: Check your Node server 🌐", 'stressed');
  }
});

document.getElementById("btnSecret").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  showPretty(data, 'secret');
});