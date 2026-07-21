document.addEventListener('DOMContentLoaded', () => {
  const heroAOTM = document.getElementById('hero-aotw'); 
  const overlay = document.getElementById('artist-profile-overlay');
  const profileContent = document.getElementById('profile-content');

  // --- 1. MANUAL ARTIST OF THE MONTH LOGIC ---
  if (heroAOTM && typeof featuredContent !== 'undefined') {
    const aotm = artists.find(a => a.name === featuredContent.artistOfMonth.name);
    
    if (aotm) {
      heroAOTM.style.backgroundImage = `url(${aotm.photo})`;
      heroAOTM.innerHTML = `
        <div class="hero-content">
          <span class="aotw-badge">Artist of the Month: ${featuredContent.artistOfMonth.month}</span>
          <h1>${aotm.name}</h1>
          <p style="font-size: 1.2rem; opacity: 0.8;">"${featuredContent.artistOfMonth.quote}"</p>
          <button class="main-play-btn" id="play-aotm" style="margin-top: 30px; width: 200px;">View Studio</button>
        </div>
      `;

      document.getElementById('play-aotm').onclick = () => {
        overlay.style.display = 'block';
        openHomeArtistStudio(aotm);
      };
    }
  }

  // --- 2. ARTIST VIEW (Matches Artist Page Layout) ---
  function openHomeArtistStudio(artist) {
    profileContent.innerHTML = `
      <div class="profile-header">
        <img src="${artist.photo}">
        <div>
          <div class="social-links">
            <a href="${artist.socials?.facebook || '#'}" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="${artist.socials?.instagram || '#'}" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="${artist.socials?.tiktok || '#'}" target="_blank"><i class="fab fa-tiktok"></i></a>
          </div>
          <h1>${artist.name}</h1>
          <p>${artist.bio}</p>
        </div>
      </div>
      <div class="discography-grid" id="home-disco-grid"></div>
    `;

    const discoGrid = document.getElementById('home-disco-grid');
    artist.discography.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <span class="project-type-badge">${proj.type}</span>
        <img src="${proj.cover}" class="album-art">
        <h3>${proj.title}</h3>
        <p>Click to View</p>
      `;
      card.onclick = () => openHomeProject(proj, artist.name);
      discoGrid.appendChild(card);
    });
  }

  // --- 3. PROJECT VIEW (Matches Artist Page Tracklist) ---
  function openHomeProject(proj, artistName) {
    profileContent.innerHTML = `
      <button id="back-to-home-artist" class="buy-btn" style="margin-bottom:20px;">← Back to Artist</button>
      <div class="overlay-header">
        <img src="${proj.cover}" style="width:150px; border-radius:10px;">
        <div>
          <h1 style="color:white; text-transform:uppercase;">${proj.title}</h1>
          <p style="color:var(--maroon); font-weight:bold;">${artistName} • ${proj.type}</p>
        </div>
      </div>
      <div class="track-list-full" id="home-track-list"></div>
    `;

    const trackList = document.getElementById('home-track-list');
    proj.tracks.forEach(track => {
      const trackDiv = document.createElement('div');
      trackDiv.className = 'music-card';
      trackDiv.innerHTML = `
        <div class="title-window"><h3 class="static-title">${track.title}</h3></div>
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
      trackList.appendChild(trackDiv);
      setupHomeAudio(trackDiv, track);
    });

    document.getElementById('back-to-home-artist').onclick = () => {
      const artist = artists.find(a => a.name === artistName);
      openHomeArtistStudio(artist);
    };
  }

  // --- 4. AUDIO ENGINE (With Tracking) ---
  function setupHomeAudio(container, track) {
    const audio = new Audio(track.file);
    const playBtn = container.querySelector('.main-play-btn');
    const seekBar = container.querySelector('.seek-bar');
    const currTimeTxt = container.querySelector('.current-time');
    const durationTxt = container.querySelector('.duration');

    const formatTime = (s) => isNaN(s) ? "0:00" : `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

    audio.onloadedmetadata = () => { durationTxt.innerText = formatTime(audio.duration); };

    playBtn.onclick = () => {
      if (audio.paused) {
        document.querySelectorAll('audio').forEach(a => {
            a.pause();
            const btn = a.parentElement?.querySelector('.main-play-btn');
            if(btn) btn.innerText = "Play";
        });
        audio.play();
        playBtn.innerText = "Stop";
        if (typeof recordActivity === "function") recordActivity(track.title, 'play');
      } else {
        audio.pause();
        playBtn.innerText = "Play";
      }
    };

    audio.ontimeupdate = () => {
      seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
      currTimeTxt.innerText = formatTime(audio.currentTime);
    };

    seekBar.oninput = () => { audio.currentTime = audio.duration * (seekBar.value / 100); };
  }

  // --- 5. FRESH PREVIEW (Newest 5 Projects) ---
  const freshPrev = document.getElementById('fresh-preview-grid');
  if (freshPrev) {
    let allProjs = [];
    artists.forEach(a => a.discography.forEach(p => allProjs.push({...p, artistName: a.name})));
    allProjs.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    allProjs.slice(0, 5).forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<img src="${proj.cover}" class="album-art"><h4>${proj.title}</h4><p>${proj.artistName}</p>`;
      card.onclick = () => {
          overlay.style.display = 'block';
          openHomeProject(proj, proj.artistName);
      };
      freshPrev.appendChild(card);
    });
  }

  // --- 6. STUDIO PREVIEW (Newest 5 Artists) ---
  const studioPrev = document.getElementById('studio-preview-grid');
  if (studioPrev) {
    artists.slice(0, 5).forEach(a => {
      const card = document.createElement('div');
      card.className = 'artist-card';
      card.innerHTML = `<img src="${a.photo}" class="artist-thumb"><h4>${a.name}</h4>`;
      card.onclick = () => {
          overlay.style.display = 'block';
          openHomeArtistStudio(a);
      };
      studioPrev.appendChild(card);
    });
  }

  // --- 7. FEED PREVIEW (Latest 5 News Items - RESTORED) ---
  const feedPrev = document.getElementById('feed-preview-grid');
  if (feedPrev && typeof feedItems !== 'undefined') {
    feedItems.slice(0, 5).forEach(item => {
      const card = document.createElement('div');
      card.className = 'feed-card-small'; 
      card.style.background = '#1a1a1a';
      card.style.padding = '10px';
      card.style.borderRadius = '10px';
      card.innerHTML = `
        <img src="${item.image}" style="width:100%; height:100px; object-fit:cover; border-radius:5px;">
        <h5 style="margin-top:10px; text-transform:uppercase; font-size:0.75rem; color:white;">${item.title}</h5>
      `;
      feedPrev.appendChild(card);
    });
  }

  // --- CLOSE OVERLAY ---
  const closeBtn = document.querySelector('.close-overlay');
  if (closeBtn) {
      closeBtn.onclick = () => {
        overlay.style.display = 'none';
        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
      };
  }
});