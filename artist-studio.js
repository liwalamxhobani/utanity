document.addEventListener('DOMContentLoaded', () => {
  const artistGrid = document.getElementById('artist-grid');
  const searchInput = document.getElementById('artist-search');
  const studioOverlay = document.getElementById('artist-profile-overlay');
  const profileContent = document.getElementById('profile-content');

  // --- RENDERING ARTIST LIST ---
  function renderArtists(artistList) {
    if (!artistGrid) return;
    artistGrid.innerHTML = ''; 
    artistList.forEach(a => {
      const card = document.createElement('div');
      card.className = 'artist-card';
      card.innerHTML = `
        <img src="${a.photo}" class="artist-thumb">
        <h3>${a.name}</h3>
      `;
      card.onclick = () => openArtistStudio(a);
      artistGrid.appendChild(card);
    });
  }

  // --- SEARCH ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = artists.filter(a => 
        a.name.toLowerCase().includes(term) || 
        a.bio.toLowerCase().includes(term)
      );
      renderArtists(filtered);
    });
  }

  // --- OVERLAY: ARTIST PROFILE ---
  function openArtistStudio(artist) {
    studioOverlay.style.display = 'block';
    
    const socials = artist.socials || {};
    profileContent.innerHTML = `
      <div class="profile-header">
        <img src="${artist.photo}">
        <div>
          <div class="social-links">
            <a href="${socials.facebook || '#'}" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="${socials.instagram || '#'}" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="${socials.twitter || '#'}" target="_blank"><i class="fab fa-x-twitter"></i></a>
            <a href="${socials.tiktok || '#'}" target="_blank"><i class="fab fa-tiktok"></i></a>
            <a href="${socials.youtube || '#'}" target="_blank"><i class="fab fa-youtube"></i></a>
          </div>
          <h1>${artist.name}</h1>
          <p>${artist.bio}</p>
        </div>
      </div>
      <div class="discography-grid" id="disco-grid"></div>
    `;

    const discoGrid = document.getElementById('disco-grid');
    artist.discography.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <span class="project-type-badge">${proj.type}</span>
        <img src="${proj.cover}" class="album-art">
        <h3>${proj.title}</h3>
        <p>Click to View</p>
      `;
      card.onclick = () => openProject(proj, artist.name);
      discoGrid.appendChild(card);
    });
  }

  // --- OVERLAY: PROJECT VIEW (WITH TRACKING) ---
  function openProject(proj, artistName) {
    profileContent.innerHTML = `
      <button id="back-to-artist" class="buy-btn" style="margin-bottom:20px;">← Back to Artist</button>
      <div class="overlay-header">
        <img src="${proj.cover}" style="width:150px; border-radius:10px;">
        <div>
          <h1>${proj.title}</h1>
          <p style="color:var(--maroon); font-weight:bold;">${artistName} • ${proj.type}</p>
        </div>
      </div>
      <div class="track-list-full" id="track-list-container"></div>
    `;

    const trackListContainer = document.getElementById('track-list-container');

    proj.tracks.forEach(track => {
      const trackCard = document.createElement('div');
      trackCard.className = "music-card";
      trackCard.innerHTML = `
        <div class="title-window">
          <h3 class="static-title">${track.title}</h3>
        </div>
        <div class="player-controls">
          <div class="timer-row">
            <span class="current-time">0:00</span>
            <input type="range" class="seek-bar" value="0">
            <span class="duration">...</span>
          </div>
          <div class="button-row" style="display: flex; gap: 10px; align-items: center;">
            <button class="main-play-btn">Play</button>
            <a href="${track.file}" download="${track.title}" class="download-icon-btn" onclick="recordActivity('${track.title}', 'download')">
              <i class="fa-solid fa-download"></i>
            </a>
          </div>
        </div>
      `;
      trackListContainer.appendChild(trackCard);
      initPlayer(trackCard, track);
    });

    document.getElementById('back-to-artist').onclick = () => {
      const artist = artists.find(a => a.name === artistName);
      openArtistStudio(artist);
    };
  }

  // --- PLAYER ENGINE (WITH PLAY TRACKING) ---
  function initPlayer(container, track) {
    const audio = new Audio(track.file);
    const playBtn = container.querySelector('.main-play-btn');
    const seekBar = container.querySelector('.seek-bar');
    const durationTxt = container.querySelector('.duration');
    const currTimeTxt = container.querySelector('.current-time');

    const formatTime = (s) => isNaN(s) ? "0:00" : `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

    audio.onloadedmetadata = () => { 
      durationTxt.innerText = formatTime(audio.duration); 
    };
    
    playBtn.onclick = () => {
      if (audio.paused) {
        document.querySelectorAll('audio').forEach(a => {
          a.pause();
          const otherBtn = a.parentElement?.querySelector('.main-play-btn');
          if(otherBtn) otherBtn.innerText = "Play";
        });
        audio.play();
        playBtn.innerText = "Stop";

        // TRACKING: Record the play
        if (typeof recordActivity === "function") {
            recordActivity(track.title, 'play');
        }

      } else {
        audio.pause();
        playBtn.innerText = "Play";
      }
    };

    audio.ontimeupdate = () => {
      seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
      currTimeTxt.innerText = formatTime(audio.currentTime);
    };

    seekBar.oninput = () => { 
      audio.currentTime = audio.duration * (seekBar.value / 100); 
    };
  }

  // Initial Load
  renderArtists(artists);

  // Close Overlay Logic
  const closeBtn = document.querySelector('.close-overlay');
  if (closeBtn) {
      closeBtn.onclick = () => {
        studioOverlay.style.display = 'none';
        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
      };
  }
});