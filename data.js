const featuredContent = {
  artistOfMonth: {
    name: "Chustil Lante",  // Must match the name in your artists/producers array exactly
    month: "July 2026",
    quote: "CHOSEN1",
    specialLink: "artist-studio.html" // Where the 'View Profile' button goes
  }
};

const artists = [
  { 
    name: "Leewar The Maniac", 
    photo: "profile/leewar.jpg", 
    bio: "UTA's Last Hope.",
    socials: {
      facebook: "#",
      instagram: "https://www.instagram.com/leewar_the_maniac/",
      twitter: "#",
      tiktok: "#",
      youtube: "#"
    },
    discography: [
      // { 
      //   title: "Entloko", 
      //   type: "Single", 
      //   cover: "cover/leewar/entloko.jpg", 
      //   dateAdded: "2026-12-01",
      //   tracks: [{ title: "Entloko (feat. Klaus Lenyora)", file: "music/leewar/Entloko (feat. Klaus Lenyora).mp3" }]
      // },
      // { 
      //   title: "Take Turns", 
      //   type: "Single", 
      //   cover: "cover/leewar/take turns.jpg", 
      //   dateAdded: "2026-11-01",
      //   tracks: [{ title: "Take Turns (feat. Nathi Faya)", file: "music/leewar/Take Turns (feat. Nathi Faya).mp3" }]
      // },
      // { 
      //   title: "Copy or Cut (Then Paste Me)", 
      //   type: "Single", 
      //   cover: "cover/leewar/copy.jpg", 
      //   dateAdded: "2026-10-01",
      //   tracks: [{ title: "Copy or Cut (Then Paste Me)", file: "music/leewar/Copy or Cut (Then Paste Me).mp3" }]
      // },
      { 
        title: "I'm Fine", 
        type: "Album", 
        cover: "cover/leewar/im fine deluxe.jpg", 
        dateAdded: "2026-07-01",
        tracks: [
          { title: "Headlight (feat. Amahle Tru)", file: "music/leewar/I'm Fine/1. Headlight (ft. Amahle Tru).mp3" },
          { title: "Nguwe Lona (feat. Jay Da April)", file: "music/leewar/I'm Fine/2. Nguwe Lona (ft. Jay Da April).mp3" },
          { title: "What About Us (feat. ms_ngani)", file: "music/leewar/I'm Fine/3. What About Us (ft. Ms Ngani).mp3" },
          { title: "Show Us to The World (feat. Klaus Lenyora)", file: "music/leewar/I'm Fine/4. Show Me To The World (ft. Klaus Lenyora).mp3" },
          { title: "Time Wasted (feat. Lucy Charisma)", file: "music/leewar/I'm Fine/5. Time Wasted (ft. Lucy Charisma).mp3" },
          { title: "Lendlela", file: "music/leewar/I'm Fine/6. Lendlela (ft. Jaylor).mp3" },
          { title: "Tonight", file: "music/leewar/I'm Fine/7. Tonight.mp3" },
          { title: "Don't Worry", file: "music/leewar/I'm Fine/8. Don't Worry.mp3" },
          { title: "I'm Fine", file: "music/leewar/I'm Fine/9. I'm Fine.mp3" },
          { title: "All On You", file: "music/leewar/I'm Fine/10. All On You.mp3" }
        ]
      },
      { 
        title: "It's War Time 3", 
        type: "EP", 
        cover: "cover/leewar/its war time.jpg", 
        dateAdded: "2026-07-17",
        tracks: [
          { title: "Embho [Traphone] (feat. PainBlock, Jay Da April, MacB & Nowan)", file: "music/leewar/It's War Time 3/01. Embho [Traphone] (feat. PainBlock, Jay Da April, MacB & Nowan).mp3" },
          { title: "Shimmy Yaa (feat. Nowan, TooMuchPresha & Airthic)", file: "music/leewar/It's War Time 3/02. Shimmy Yaa (feat. Nowan, TooMuchPresha & Airthic).mp3" },
          { title: "Hawk (feat. Young Austin, MacB, Nowan & PainBlock)", file: "music/leewar/It's War Time 3/03. Hawk (feat. Young Austin, MacB, Nowan & PainBlock).mp3" },
          { title: "Gweb'Indlala (feat. Young Austin, PainBlock, M.I.B, MacB, Nowan & SoulTheSon)", file: "music/leewar/It's War Time 3/04. Gweb'Indlala (feat. Young Austin, PainBlock, M.I.B, MacB, Nowan & SoulTheSon).mp3" },
          { title: "yAH (feat. Nowan & PainBlock)", file: "music/leewar/It's War Time 3/05. yAH (feat. Nowan & PainBlock).mp3" },
          { title: "What She Wrote (feat. M.I.B, Nowan, Jay Da April, PainBlock & MacB)", file: "music/leewar/It's War Time 3/06. What She Wrote (feat. M.I.B, Nowan, Jay Da April, PainBlock & MacB).mp3" },
        ]
      },
      { 
        title: "Solo Soul", 
        type: "Single", 
        cover: "cover/leewar/Solo Soul.jpg", 
        dateAdded: "2026-03-20",
        tracks: [{ title: "Solo Soul", file: "music/leewar/Solo Soul.mp3" }]
      },
      { 
        title: "M.A.M Outro", 
        type: "Single", 
        cover: "cover/leewar/m.a.m outro.jpg", 
        dateAdded: "2026-02-20",
        tracks: [{ title: "M.A.M Outro", file: "music/leewar/M.A.M Outro.mp3" }]
      },
      { 
        title: "Take A Walk", 
        type: "Single", 
        cover: "cover/leewar/take a walk.png", 
        dateAdded: "2026-01-20",
        tracks: [{ title: "Take A Walk", file: "music/leewar/Take A Walk.mp3" }]
      }
    ]
  },
  { 
    name: "Valley 5099", 
    photo: "profile/valley.png", 
    bio: "What a time to be alive!",
    discography: [
      { 
        title: "Yiva", 
        type: "Single", 
        cover: "cover/yiva.jpg", 
        dateAdded: "2026-07-17",
        tracks: [{ title: "Yiva (feat. King TMD)", file: "music/KING TMD - YIVA!.mp3" }]
      }
    ]
  },
  { 
    name: "Chustil Lante", 
    photo: "profile/chustil.png", 
    bio: "CHOSEN1",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      tiktok: "#",
      youtube: "#"
    },
    discography: [
      { 
        title: "Phakathi Egamin", 
        type: "Single", 
        cover: "cover/chustil/phakathi egamin.png", 
        dateAdded: "2026-07-17",
        tracks: [{ title: "Phakathi Egamin (feat. Dyna Steez)", file: "music/chustil/Phakathi eGamin (feat. Dyna Steeze).mp3" }]
      }
    ]
  },
  { 
    name: "Klaus Lenyora", 
    photo: "profile/klaus.jpg", 
    bio: "",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      tiktok: "#",
      youtube: "#"
    },
    discography: [
      { 
        title: "Shifting Things", 
        type: "EP", 
        cover: "cover/klaus/shifting things.jpg", 
        dateAdded: "2026-03-29",
        tracks: [
          { title: "Nick's Intro", file: "music/klaus/Shifting Things/1. Nick's intro.mp3" },
          { title: "UP (ft. Papii & King Kolisi)", file: "music/klaus/Shifting Things/2. UP (ft. Papii & King Kolisi).mp3" },
          { title: "Feeling Good (ft. Lucy & Ngu Tinde Lo)", file: "music/klaus/Shifting Things/3. Feeling Good (ft. Lucy & Ngu Tinde Lo).mp3" },
          { title: "Let's Rock", file: "music/klaus/Shifting Things/4. Let's Rock.mp3" },
          { title: "Morning View (ft. Nick Pagemat)", file: "music/klaus/Shifting Things/5. Morning View (ft. Nick Pagemat).mp3" },
          { title: "Let's Get High (ft. ElCrizzy)", file: "music/klaus/Shifting Things/6. Let's Get High (ft. ElCrizzy).mp3" },
          { title: "BlueTick", file: "music/klaus/Shifting Things/7. BlueTick.mp3" },
        ]
      }
    ]
  }
];

// This is the 5099 feed section 
const feedItems = [
  {
    id: 1,
    type: "merch",
    badge: "Artist Merch",
    title: "5099 Skyline Hoodie",
    image: "images/xhobani-hoodies.png",
    desc: "Limited edition heavyweight cotton. Available in Maroon and Black.",
    extraImages: [
      "images/xhobani-hoodies.png", 
      "images/xhobani-premium.png", 
      "images/xhobani-hoodies.png"
    ]
  },
  {
    id: 2,
    type: "sponsor",
    badge: "Official Sponsor",
    title: "Xhobani Studio",
    image: "images/xhobani-premium.png",
    desc: "Partnering with Mthatha's finest to bring you premium content."
  },
  {
    id: 3,
    type: "gig",
    badge: "Gig Guide",
    title: "Summer Jam 2026",
    image: "images/mthatha-fest.jpg",
    desc: "Join us at the CBD Hub. Gates open at 18:00. R150 at the door."
  },
  {
    id: 4,
    type: "booth",
    badge: "The Booth",
    title: "Behind the Mic",
    image: "images/elcrizzy-cook-up.jpg",
    desc: "Artist A working on a new secret project."
  }
];

// This is the Producers section
const producers = [
  {
    name: "Leewar The Maniac",
    photo: "profile/leewar.jpg",
    bio: "Multi-genre architect from the East Side.",
    socials: { 
      instagram: "https://www.instagram.com/leewar_the_maniac/", 
      tiktok: "#" 
    },
    // Discography is now split by genre
    genres: [
      {
        type: "Hip Hop",
        cover: "beat covers/hip-hop.jpg",
        beats: [
           { title: "N8", file: "beats/leewar/N8- 123bpm- E Minor.mp3", key: "E Min", bpm: 123 },
          { title: "Loose Thoughts", file: "beats/leewar/Loose Thoughts (F6)- 126bpm.wav", key: "G# Maj", bpm: 140 }
        ]
      },
      {
        type: "Trap",
        cover: "beat covers/trap.jpg",
        beats: [
          {  key: "E Min", bpm: 123 },
          { title: "Remember Me", file: "beats/leewar/Remember Me (D3).mp3", key: "C Maj", bpm: 90 }
        ]
      }
    ]
  }
];

// VIDEO REPOSITORY DATA ARRAY
const musicVideos = [
  {
    id: "vid1",
    title: "Gunz And Goonz",
    artistName: "Leewar The Maniac & Nowan", // Ready to match your artist array configurations later
    type: "youtube",
    source: "https://youtube.com/embed/M2d5iXqzQMc?si=HVAsyyaLN1z7K2AW", // Use embed link style
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500"
  },
  {
    id: "vid2",
    title: "IBHEKILE (Pain Block)Verse VISUALIZER",
    artistName: "Valley 5099",
    type: "mp4",
    source: "videos/soultheson_ft_valley_5099_ibhekile_pain_block_verse_visualizer_h264_50723.mp4", // Path to your local asset
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500"
  }
];

// --- GLOBAL TRACKING SYSTEM ---
function recordActivity(trackTitle, type) {
  // Get existing stats or start fresh
  let stats = JSON.parse(localStorage.getItem('uta_stats')) || {};

  // If this song hasn't been tracked yet, initialize it
  if (!stats[trackTitle]) {
    stats[trackTitle] = { score: 0, plays: 0, downloads: 0 };
  }

  // Logic: 1 play = 1 point, 1 download = 5 points (downloads show more loyalty!)
  if (type === 'play') {
    stats[trackTitle].plays += 1;
    stats[trackTitle].score += 1;
  } else if (type === 'download') {
    stats[trackTitle].downloads += 1;
    stats[trackTitle].score += 5; 
  }

  // Save back to localStorage
  localStorage.setItem('uta_stats', JSON.stringify(stats));
  console.log(`Activity Recorded: ${trackTitle} | Type: ${type}`);
}