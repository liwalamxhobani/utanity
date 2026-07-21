document.addEventListener('DOMContentLoaded', () => {
  const chartSongs = document.getElementById('chart-songs');
  const chartProjects = document.getElementById('chart-projects');
  const chartArtists = document.getElementById('chart-artists');
  
  const stats = JSON.parse(localStorage.getItem('uta_stats')) || {};

  const formatScore = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num;
  };

  // --- 1. TOP 10 SONGS ---
  if (chartSongs) {
    let flatTracks = [];
    artists.forEach(a => a.discography.forEach(p => p.tracks.forEach(t => {
      flatTracks.push({
        title: t.title,
        artistName: a.name,
        cover: p.cover,
        score: stats[t.title]?.score || 0
      });
    })));

    flatTracks.sort((a, b) => b.score - a.score).slice(0, 10).forEach((t, i) => {
      const div = document.createElement('div');
      div.className = 'chart-item';
      div.innerHTML = `
        <span class="rank-number">${i + 1}</span>
        <img src="${t.cover}" class="chart-mini-cover">
        <div class="chart-details">
          <h4>${t.title}</h4>
          <p>${t.artistName}</p>
        </div>
        <div style="text-align:right;">
            <span class="stats-badge">${formatScore(t.score)}</span>
        </div>
      `;
      chartSongs.appendChild(div);
    });
  }

  // --- 2. TOP 10 PROJECTS ---
  if (chartProjects) {
    let projectList = [];
    artists.forEach(a => a.discography.forEach(p => {
      let pScore = 0;
      p.tracks.forEach(t => { pScore += (stats[t.title]?.score || 0); });
      
      projectList.push({
        title: p.title,
        artistName: a.name,
        cover: p.cover,
        score: pScore
      });
    }));

    projectList.sort((a, b) => b.score - a.score).slice(0, 10).forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'chart-item';
      div.innerHTML = `
        <span class="rank-number">${i + 1}</span>
        <img src="${p.cover}" class="chart-mini-cover">
        <div class="chart-details">
          <h4>${p.title}</h4>
          <p>${p.artistName}</p>
        </div>
        <span class="stats-badge">${formatScore(p.score)}</span>
      `;
      chartProjects.appendChild(div);
    });
  }

  // --- 3. TOP 10 ARTISTS ---
  if (chartArtists) {
    let artistRanking = [];
    artists.forEach(a => {
      let aScore = 0;
      a.discography.forEach(p => {
        p.tracks.forEach(t => { aScore += (stats[t.title]?.score || 0); });
      });

      artistRanking.push({
        name: a.name,
        photo: a.photo,
        score: aScore
      });
    });

    artistRanking.sort((a, b) => b.score - a.score).slice(0, 10).forEach((a, i) => {
      const div = document.createElement('div');
      div.className = 'chart-item';
      div.innerHTML = `
        <span class="rank-number">${i + 1}</span>
        <img src="${a.photo}" class="chart-mini-cover" style="border-radius: 50%;">
        <div class="chart-details">
          <h4>${a.name}</h4>
          <p>Total Reach</p>
        </div>
        <span class="stats-badge">${formatScore(a.score)}</span>
      `;
      chartArtists.appendChild(div);
    });
  }
});