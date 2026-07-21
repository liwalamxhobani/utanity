document.addEventListener('DOMContentLoaded', () => {
  const feedGrid = document.getElementById('feed-grid');
  const feedOverlay = document.getElementById('feed-overlay');
  const feedContent = document.getElementById('feed-detail-content');
  const closeFeed = document.getElementById('close-feed');

  // 1. RENDER CARDS
  if (feedGrid) {
    feedItems.forEach(item => {
      const card = document.createElement('div');
      card.className = `feed-card ${item.type}`;
      card.innerHTML = `
        <span class="feed-badge">${item.badge}</span>
        <img data-src="${item.image}" class="lazy-img" alt="${item.title}">
        <div class="feed-card-info">
          <h3>${item.title}</h3>
          <p>Click for details</p>
        </div>
      `;
      
      card.onclick = () => openFeedDetail(item);
      feedGrid.appendChild(card);
    });

    // Lazy Loading Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('.lazy-img').forEach(img => observer.observe(img));
  }

  // 2. DETAILED OVERLAY LOGIC
  function openFeedDetail(item) {
    feedOverlay.style.display = 'block';
    
    // Safety Check for Extra Images (Merch Gallery)
    let extraContent = '';
    if (item.extraImages && item.extraImages.length > 0) {
      extraContent = `
        <div class="merch-gallery">
          ${item.extraImages.map(imgSrc => `
            <img src="${imgSrc}" alt="Detail View" onerror="this.parentElement.style.display='none'">
          `).join('')}
        </div>
      `;
    }

    feedContent.innerHTML = `
      <div class="detail-view" style="padding: 30px; color: white;">
        <img src="${item.image}" style="width: 100%; max-height: 450px; object-fit: cover; border-radius: 12px;">
        
        <div class="detail-text-content">
          <h1 style="font-size: 2.5rem; font-weight: 900; text-transform: uppercase; margin: 20px 0 10px;">${item.title}</h1>
          <p style="font-size: 1.1rem; opacity: 0.7; line-height: 1.6;">${item.desc}</p>
          
          ${extraContent} 
          
          <button class="main-play-btn" style="margin-top: 40px; width: 100%; height: 60px; font-weight: 800; font-size: 1.1rem;">
            Inquire / Order Now
          </button>
        </div>
      </div>
    `;
  }

  // 3. CLOSE OVERLAY
  if (closeFeed) {
    closeFeed.onclick = () => {
      feedOverlay.style.display = 'none';
    };
  }

  // Close when clicking outside content
  window.onclick = (event) => {
    if (event.target == feedOverlay) {
      feedOverlay.style.display = 'none';
    }
  };
});