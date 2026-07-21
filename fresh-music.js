document.addEventListener('DOMContentLoaded', () => {
  const musicGrid = document.getElementById('music-grid');
  const studioOverlay = document.getElementById('artist-profile-overlay');
  const profileContent = document.getElementById('profile-content');

  // --- 1. CORE UTILITIES ---
  const formatTime = (s) => isNaN(s) ? "0:00" : `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  function recordActivity(title, type) {
    let stats = JSON.parse(localStorage.getItem('uta_stats')) || {};
    if (!stats[title]) stats[title] = { score: 0 };
    stats[title].score += (type === 'play' ? 1 : 2);
    localStorage.setItem('uta_stats', JSON.stringify(stats));
  }

  // --- 2. PLAYER ENGINE ---
  function initPlayer(container, track) {
    const audio = new Audio(track.file);
    const playBtn = container.querySelector('.main-play-btn');
    const seekBar = container.querySelector('.seek-bar');
    const durationTxt = container.querySelector('.duration');
    const currTimeTxt = container.querySelector('.current-time');

    audio.onloadedmetadata = () => { durationTxt.innerText = formatTime(audio.duration); };
    
    playBtn.onclick = () => {
      if (audio.paused) {
        // Stop all other audio playing on the page
        document.querySelectorAll('audio').forEach(a => a.pause());
        audio.play();
        playBtn.innerText = "Stop";
        recordActivity(track.title, 'play');
      } else {
        audio.pause();
        audio.currentTime = 0;
        playBtn.innerText = "Play";
      }
    };

    audio.ontimeupdate = () => {
      seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
      currTimeTxt.innerText = formatTime(audio.currentTime);
    };

    seekBar.oninput = () => { audio.currentTime = audio.duration * (seekBar.value / 100); };
  }

  // --- 3. PROJECT RENDERING (The fix for the blank screen) ---
  function openFreshProject(proj, artistName) {
    studioOverlay.style.display = 'block';
    profileContent.innerHTML = `
      <div class="overlay-header">
        <img src="${proj.cover}" style="width:150px; border-radius:10px;">
        <div>
          <h1>${proj.title}</h1>
          <p style="color:var(--maroon); font-weight:bold;">${artistName} • ${proj.type}</p>
        </div>
      </div>
      <div class="track-list-full" id="fresh-track-list"></div>
    `;

    const listView = document.getElementById('fresh-track-list');
    proj.tracks.forEach(t => {
      const wrapper = document.createElement('div');
      wrapper.className = "music-card";
      wrapper.innerHTML = `
        <div class="title-window"><h3 class="marquee-text">${t.title}</h3></div>
        <div class="player-controls">
          <div class="timer-row">
            <span class="current-time">0:00</span>
            <input type="range" class="seek-bar" value="0">
            <span class="duration">...</span>
          </div>
          <button class="main-play-btn">Play</button>
        </div>
      `;
      listView.appendChild(wrapper);
      initPlayer(wrapper, t);
    });
  }

  // --- 4. INITIALIZE GRID (3 Newest Per Artist Logic) ---
  if (musicGrid) {
    let freshReleases = [];

    artists.forEach(artist => {
      // Sort this specific artist's work by date (newest first)
      let sortedDiscography = [...artist.discography].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      
      // Take only the top 3
      let top3 = sortedDiscography.slice(0, 3);
      
      // Add them to our global fresh list
      top3.forEach(proj => {
        freshReleases.push({ ...proj, artistName: artist.name });
      });
    });

    // Final Sort: Order the entire grid by date so the newest of the new is at the top
    freshReleases.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    freshReleases.forEach(item => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <img src="${item.cover}" class="album-art">
        <h3>${item.title}</h3>
        <p>${item.artistName}</p>
      `;
      
      card.onclick = () => openFreshProject(item, item.artistName);
      musicGrid.appendChild(card);
    });
  }

  // --- 5. CLOSE OVERLAY ---
  document.querySelector('.close-overlay').onclick = () => {
    studioOverlay.style.display = 'none';
    document.querySelectorAll('audio').forEach(a => {
      a.pause();
      a.currentTime = 0;
    });
  };
});