function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById('darkModeBtn');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        if(btn) btn.innerText = "☀️"; // Sun for Light mode toggle
        localStorage.setItem('theme', 'dark');
    } else {
        if(btn) btn.innerText = "🌙"; // Moon for Dark mode toggle
        localStorage.setItem('theme', 'light');
    }
}

// Aa function badha page par theme apply karshe
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.getElementById('darkModeBtn');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if(btn) btn.innerText = "☀️";
    } else {
        document.body.classList.remove('dark-theme');
        if(btn) btn.innerText = "🌙";
    }
}

// Page load thay tyre theme check karva
window.addEventListener('DOMContentLoaded', applyTheme);