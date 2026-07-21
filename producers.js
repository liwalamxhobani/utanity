document.addEventListener('DOMContentLoaded', () => {
  const producerGrid = document.getElementById('producer-grid');
  const searchInput = document.getElementById('producer-search');
  const overlay = document.getElementById('producer-overlay');
  const content = document.getElementById('producer-content');

  const formatTime = (s) => isNaN(s) ? "0:00" : `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  function renderProducers(list) {
    if (!producerGrid) return;
    producerGrid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'artist-card';
      const specialtyText = p.specialty ? p.specialty : "Producer";
      
      card.innerHTML = `
        <img src="${p.photo}" class="artist-thumb">
        <h3>${p.name}</h3>
        <p style="font-size:0.8rem; opacity:0.6;">${specialtyText}</p>
      `;
      card.onclick = () => openProducerProfile(p);
      producerGrid.appendChild(card);
    });
  }

  function openProducerProfile(producer) {
    overlay.style.display = 'block';
    
    // Create the social icons HTML only if the links exist
    let socialHTML = '';
    if (producer.socials?.instagram) {
      socialHTML += `<a href="${producer.socials.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>`;
    }
    if (producer.socials?.tiktok) {
      socialHTML += `<a href="${producer.socials.tiktok}" target="_blank"><i class="fa-brands fa-tiktok"></i></a>`;
    }

    content.innerHTML = `
      <div class="profile-header">
        <img src="${producer.photo}" class="profile-main-img">
        <div class="profile-text-info">
          <div class="social-links">
            ${socialHTML}
          </div>
          <h1>${producer.name}</h1>
          <p>${producer.bio || 'No bio available.'}</p>
        </div>
      </div>
      <h2 style="margin: 30px 0 10px;">SELECT A <span class="accent">VIBE</span></h2>
      <div class="discography-grid" id="genre-grid"></div>
    `;

    // ... rest of the genre rendering code ...
    const genreGrid = document.getElementById('genre-grid');
    if (producer.genres) {
      producer.genres.forEach(genre => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <img src="${genre.cover}" class="album-art">
          <h3>${genre.type}</h3>
          <p>${genre.beats ? genre.beats.length : 0} Beats</p>
        `;
        card.onclick = () => renderBeatList(genre, producer);
        genreGrid.appendChild(card);
      });
    }
  }

  function renderBeatList(genre, producer) {
    // FIX: Correctly referencing instagram from socials for the 'Secure' link
    const igLink = producer.socials?.instagram || "#";

    content.innerHTML = `
      <button id="back-to-genres" class="buy-btn" style="margin-bottom:20px;">← Back to Genres</button>
      <div class="overlay-header">
        <img src="${genre.cover}" style="width:120px; border-radius:8px;">
        <div>
          <h1>${genre.type} Collection</h1>
          <p>Curated by ${producer.name}</p>
        </div>
      </div>
      <div id="beat-list" style="margin-top:20px;"></div>
    `;

    const beatList = document.getElementById('beat-list');
    genre.beats.forEach(beat => {
      const beatCard = document.createElement('div');
      beatCard.className = 'music-card';
      beatCard.innerHTML = `
        <div class="beat-info-row">
          <h3 class="static-title">${beat.title}</h3>
          <div class="beat-specs">
            <span class="spec-tag"><i class="fa-solid fa-key"></i> ${beat.key || 'N/A'}</span>
            <span class="spec-tag"><i class="fa-solid fa-metronome"></i> ${beat.bpm || '0'} BPM</span>
          </div>
        </div>
        <div class="player-controls">
          <div class="timer-row">
            <span class="current-time">0:00</span>
            <input type="range" class="seek-bar" value="0">
            <span class="duration">...</span>
          </div>
          <div class="button-row" style="display:flex; justify-content:space-between; align-items:center;">
            <button class="main-play-btn">Preview</button>
            <a href="${igLink}" target="_blank" class="buy-btn">Secure Beat</a>
          </div>
        </div>
      `;
      beatList.appendChild(beatCard);
      setupBeatAudio(beatCard, beat.file);
    });

    document.getElementById('back-to-genres').onclick = () => renderGenreFolders(producer);
  }

  function setupBeatAudio(container, file) {
    const audio = new Audio(file);
    const playBtn = container.querySelector('.main-play-btn');
    const seekBar = container.querySelector('.seek-bar');
    const durationTxt = container.querySelector('.duration');
    const currTimeTxt = container.querySelector('.current-time');

    audio.onloadedmetadata = () => { durationTxt.innerText = formatTime(audio.duration); };
    
    playBtn.onclick = () => {
      if (audio.paused) {
        document.querySelectorAll('audio').forEach(a => {
            a.pause();
            const btn = a.parentElement?.querySelector('.main-play-btn');
            if(btn) btn.innerText = "Preview";
        });
        audio.play();
        playBtn.innerText = "Stop";
      } else {
        audio.pause();
        playBtn.innerText = "Preview";
      }
    };

    audio.ontimeupdate = () => {
      seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
      currTimeTxt.innerText = formatTime(audio.currentTime);
    };

    seekBar.oninput = () => { audio.currentTime = audio.duration * (seekBar.value / 100); };
  }

  // Back to Genre Folders navigation helper
  function renderGenreFolders(producer) {
    openProducerProfile(producer);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = producers.filter(p => 
        p.name.toLowerCase().includes(term) || 
        (p.specialty && p.specialty.toLowerCase().includes(term))
      );
      renderProducers(filtered);
    });
  }

  renderProducers(producers);
  
  document.getElementById('close-producer').onclick = () => {
    overlay.style.display = 'none';
    document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
  };
});