// Songs using free CDN-hosted romantic music
// You can replace these URLs with your own MP3 files
const songs = [
  {
    title: "Dooron Dooron",
    artist: "Paresh Pahuja",
    note: "The first song you said you like",
    icon: "🎶",
    // Using a sample romantic instrumental - replace with actual song URL
    audioUrl: "music/Dooron Dooron(KoshalWorld.Com).mp3"
  },
  {
    title: "Baakhuda Tumhi Ho",
    artist: "Atif Aslam",
    note: "Reminds me of you",
    icon: "💕",
    audioUrl: "music/Bakhuda Tumhi Ho(KoshalWorld.Com).mp3"
  },
  {
    title: "Kahin Toh.. -  AR Rahman",
    artist: "A R Rahman",
    note: "Forever and always fan",
    icon: "🌟",
    audioUrl: "music/Kahin To - Jaane Tu.. Ya Jaane Na 128 Kbps.mp3"
  },
  {
    title: "Perfect - Ed Sheeran",
    artist: "Ed Sheeran",
    note: "You PERFECT !",
    icon: "✨",
    audioUrl: "music/Edd_Sheeran_-_Perfect_(mp3.pm).mp3"
  },
  {
    title: "What makes you beautiful - One Direction",
    artist: "One Direction",
    note: "You beautiful SOUL",
    icon: "🎵",
    audioUrl: "music/One_Direction_-_Makes_you_beautiful._(mp3.pm).mp3"
  }
];

const audioPlayer = document.getElementById('audioPlayer');
const vinylRecord = document.getElementById('vinylRecord');
const tonearm = document.getElementById('tonearm');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songNote = document.getElementById('songNote');
const nowPlaying = document.getElementById('nowPlaying');
const songItems = document.querySelectorAll('.song-item');
const audioControls = document.getElementById('audioControls');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');

let currentSong = null;
let isPlaying = false;

// Audio player event listeners
audioPlayer.addEventListener('loadedmetadata', function() {
  durationDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', function() {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = progress + '%';
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  }
});

audioPlayer.addEventListener('play', function() {
  isPlaying = true;
  playPauseIcon.textContent = '⏸️';
  vinylRecord.classList.add('spinning');
  tonearm.classList.add('playing');
});

audioPlayer.addEventListener('pause', function() {
  isPlaying = false;
  playPauseIcon.textContent = '▶️';
  vinylRecord.classList.remove('spinning');
  tonearm.classList.remove('playing');
});

audioPlayer.addEventListener('ended', function() {
  playNextSong();
});

audioPlayer.addEventListener('error', function(e) {
  console.error('Audio error:', e);
  alert('Error loading song. Please try another one.');
});

// Song selection
songItems.forEach((item, index) => {
  item.addEventListener('click', function() {
    loadSong(index);
  });
});

function loadSong(index) {
  // Remove active from all songs
  songItems.forEach(s => s.classList.remove('active'));
  
  // Add active to selected song
  songItems[index].classList.add('active');
  
  // Update now playing info
  const song = songs[index];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songNote.textContent = `"${song.note}"`;
  nowPlaying.textContent = song.icon;
  
  currentSong = index;
  
  // Show audio controls
  audioControls.classList.add('active');
  
  // Load and play audio
  audioPlayer.src = song.audioUrl;
  audioPlayer.load();
  
  // Play after a brief moment
  setTimeout(() => {
    audioPlayer.play().catch(error => {
      console.error('Play failed:', error);
      // If autoplay fails, user needs to click play button
      isPlaying = false;
      playPauseIcon.textContent = '▶️';
    });
  }, 100);
}

// Play/Pause button
playPauseBtn.addEventListener('click', function() {
  if (!audioPlayer.src) {
    alert('Please select a song first!');
    return;
  }
  
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play().catch(error => {
      console.error('Play failed:', error);
    });
  }
});

// Volume control
volumeSlider.addEventListener('input', function() {
  audioPlayer.volume = this.value / 100;
});

// Set initial volume
audioPlayer.volume = 0.7;

// Progress bar click to seek
progressBar.addEventListener('click', function(e) {
  if (!audioPlayer.duration) return;
  
  const rect = this.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  audioPlayer.currentTime = audioPlayer.duration * percentage;
});

// Play next song
function playNextSong() {
  if (currentSong === null) return;
  const nextIndex = (currentSong + 1) % songs.length;
  loadSong(nextIndex);
}

// Format time helper
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Create animated music notes
function createMusicNotes() {
  setInterval(() => {
    if (isPlaying) {
      const note = document.createElement('div');
      note.textContent = ['🎵', '🎶', '♪', '♫'][Math.floor(Math.random() * 4)];
      note.style.position = 'fixed';
      note.style.left = Math.random() * window.innerWidth + 'px';
      note.style.bottom = '-50px';
      note.style.fontSize = Math.random() * 20 + 20 + 'px';
      note.style.opacity = '0';
      note.style.pointerEvents = 'none';
      note.style.zIndex = '1';
      note.style.transition = 'all 4s ease-out';
      
      document.body.appendChild(note);
      
      setTimeout(() => {
        note.style.bottom = '120%';
        note.style.opacity = '0.7';
        note.style.transform = `translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
      }, 100);
      
      setTimeout(() => {
        note.remove();
      }, 4000);
    }
  }, 500);
}

createMusicNotes();

// Keyboard controls
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && audioPlayer.src) {
    e.preventDefault();
    playPauseBtn.click();
  } else if (e.code === 'ArrowRight' && currentSong !== null) {
    playNextSong();
  } else if (e.code === 'ArrowLeft' && currentSong !== null) {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    loadSong(prevIndex);
  }
});

console.log('Playlist initialized and ready!');
