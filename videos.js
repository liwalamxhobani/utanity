document.addEventListener('DOMContentLoaded', () => {
  const videoGrid = document.getElementById('video-grid');
  const videoOverlay = document.getElementById('video-overlay');
  const closeVideoBtn = document.getElementById('close-video-btn');
  
  // Players containers
  const ytContainer = document.getElementById('youtube-player-container');
  const mp4Container = document.getElementById('mp4-player-container');
  
  // Custom Player Controls
  const videoElement = document.getElementById('custom-video-element');
  const playPauseBtn = document.getElementById('video-play-pause');
  const back10Btn = document.getElementById('video-back-10');
  const forward10Btn = document.getElementById('video-forward-10');
  const fullscreenBtn = document.getElementById('video-fullscreen');
  const videoSeek = document.getElementById('video-seek');
  const currentTimeTxt = document.getElementById('vid-current');
  const durationTimeTxt = document.getElementById('vid-duration');

  // --- RENDER CLIPS TO SCREEN ---
  if (videoGrid) {
    videoGrid.innerHTML = '';
    musicVideos.forEach(vid => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `
        <div class="thumbnail-wrapper">
          <img src="${vid.thumbnail}" alt="${vid.title}">
          <div class="play-icon-badge"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="video-info">
          <h3>${vid.title}</h3>
          <p>${vid.artistName}</p>
        </div>
      `;
      card.onclick = () => launchVideoStudio(vid);
      videoGrid.appendChild(card);
    });
  }

  // --- INTERMEDIARY PLAYER DEPLOYER ---
  function launchVideoStudio(video) {
    videoOverlay.style.display = 'block';
    document.getElementById('overlay-video-title').innerText = video.title;
    document.getElementById('overlay-video-artist').innerText = video.artistName;

    // Flush platforms out clean first
    ytContainer.style.display = 'none';
    ytContainer.innerHTML = '';
    mp4Container.style.display = 'none';
    videoElement.pause();
    videoElement.src = '';

    if (video.type === 'youtube') {
      ytContainer.style.display = 'block';
      ytContainer.innerHTML = `<iframe src="${video.source}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } 
    else if (video.type === 'mp4') {
      mp4Container.style.display = 'block';
      videoElement.src = video.source;
      videoElement.play();
      playPauseBtn.innerText = "Pause";
    }
  }

  // --- NATIVE MP4 PLAYER REGISTRATION ENGINES ---
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  videoElement.onloadedmetadata = () => {
    durationTimeTxt.innerText = formatTime(videoElement.duration);
  };

  videoElement.ontimeupdate = () => {
    currentTimeTxt.innerText = formatTime(videoElement.currentTime);
    // Sync slider timeline position indicator
    videoSeek.value = (videoElement.currentTime / videoElement.duration) * 100 || 0;
  };

  // Toggle state
  playPauseBtn.onclick = () => {
    if (videoElement.paused) {
      videoElement.play();
      playPauseBtn.innerText = "Pause";
    } else {
      videoElement.pause();
      playPauseBtn.innerText = "Play";
    }
  };

  // 10 Seconds Skipping Engines
  back10Btn.onclick = () => { videoElement.currentTime -= 10; };
  forward10Btn.onclick = () => { videoElement.currentTime += 10; };

  fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
      // Requests the browser to make the video element go full screen
      videoElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  // Manual Seek adjustments via range slider
  videoSeek.oninput = () => {
    videoElement.currentTime = videoElement.duration * (videoSeek.value / 100);
  };

  // --- DEACTIVATION OVERLAY ENGINE ---
  closeVideoBtn.onclick = killActivePlayers;
  
  function killActivePlayers() {
    videoOverlay.style.display = 'none';
    ytContainer.innerHTML = ''; // Wipes the YouTube frame entirely to cut the streaming audio track instantly
    videoElement.pause();
    videoElement.src = '';
  }
});