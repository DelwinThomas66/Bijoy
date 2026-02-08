// Create floating hearts in background
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts-bg');
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘', '❤️'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.pointerEvents = 'none';
        
        container.appendChild(heart);
        
        const duration = Math.random() * 5000 + 8000;
        const drift = (Math.random() - 0.5) * 100;
        
        heart.animate([
            {
                bottom: '-50px',
                transform: `translateX(0) rotate(0deg)`,
                opacity: heart.style.opacity
            },
            {
                bottom: '110%',
                transform: `translateX(${drift}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => heart.remove(), duration);
    }, 500);
}

createFloatingHearts();

// Handle background music
const backgroundMusic = document.getElementById('backgroundMusic');

// Try to play music automatically
function playMusic() {
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5; // Set volume to 50%
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Music playing automatically');
            }).catch(error => {
                console.log('Autoplay prevented, waiting for user interaction');
                // If autoplay is blocked, play on first user interaction
                document.addEventListener('click', () => {
                    backgroundMusic.play();
                }, { once: true });
            });
        }
    }
}

// Start music when page loads
window.addEventListener('load', () => {
    playMusic();
});

// Volume control functionality
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');
let isMuted = false;

if (volumeSlider && backgroundMusic) {
    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value / 100;
        updateMuteIcon();
    });
}

if (muteBtn && backgroundMusic) {
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        backgroundMusic.muted = isMuted;
        updateMuteIcon();
    });
}

function updateMuteIcon() {
    if (!muteBtn) return;
    
    if (isMuted || backgroundMusic.volume === 0) {
        muteBtn.textContent = '🔇';
    } else if (backgroundMusic.volume < 0.5) {
        muteBtn.textContent = '🔉';
    } else {
        muteBtn.textContent = '🔊';
    }
}

// Create floating music notes
function createMusicNotes() {
    const notes = ['🎵', '🎶', '♪', '♫'];
    
    setInterval(() => {
        if (!isMuted && backgroundMusic && !backgroundMusic.paused) {
            const note = document.createElement('div');
            note.className = 'music-note';
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = window.innerHeight + 'px';
            note.style.color = ['#ffd700', '#ff69b4', '#ffffff'][Math.floor(Math.random() * 3)];
            
            document.body.appendChild(note);
            
            setTimeout(() => note.remove(), 4000);
        }
    }, 3000);
}

createMusicNotes();

// Ring box interaction
const ringBox = document.getElementById('ringBox');
const messageContainer = document.getElementById('messageContainer');
let boxOpened = false;

// Automatically open the box when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        openRingBox();
    }, 1500); // Wait 1.5 seconds after page loads
});

// Also allow manual click
ringBox.addEventListener('click', function() {
    if (!boxOpened) {
        openRingBox();
    }
});

function openRingBox() {
    if (!boxOpened) {
        boxOpened = true;
        
        // Open the box
        ringBox.classList.add('open');
        
        // Show message after a delay
        setTimeout(() => {
            messageContainer.classList.add('show');
            
            // Start hearts explosion
            setTimeout(() => {
                startHeartsExplosion();
            }, 1000);
        }, 1200);
    }
}

// Hearts explosion effect
function startHeartsExplosion() {
    const explosion = document.getElementById('heartsExplosion');
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '✨', '⭐'];
    
    // Create continuous hearts
    const interval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createExplosionHeart(explosion, hearts);
        }
    }, 200);
    
    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, 10000);
}

function createExplosionHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.fontSize = (Math.random() * 40 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1001';
    
    container.appendChild(heart);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 300 + 200;
    const duration = Math.random() * 2000 + 2000;
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    let rotation = 0;
    let scale = 1;
    
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            posX += Math.cos(angle) * 5;
            posY += Math.sin(angle) * 5 - 1; // Add gravity
            opacity = 1 - progress;
            rotation += 5;
            scale = 1 + progress * 0.5;
            
            heart.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg) scale(${scale})`;
            heart.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    }
    
    animate();
}

// Add sparkle effects around the ring box
function createSparkles() {
    setInterval(() => {
        if (boxOpened) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = (Math.random() * 200 - 50) + 'px';
            sparkle.style.top = (Math.random() * 200 - 50) + 'px';
            sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.opacity = '0';
            sparkle.style.transition = 'all 1s ease-out';
            
            ringBox.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.style.opacity = '1';
                sparkle.style.transform = 'translateY(-30px) scale(1.5)';
            }, 10);
            
            setTimeout(() => {
                sparkle.style.opacity = '0';
            }, 700);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }, 300);
}

createSparkles();

// Add glow particles
function createGlowParticles() {
    const colors = ['#ffd700', '#ff69b4', '#ffffff', '#ffb6c1'];
    
    setInterval(() => {
        if (boxOpened) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = (Math.random() * 8 + 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.borderRadius = '50%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 100;
            const duration = Math.random() * 2000 + 1500;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            });
            
            setTimeout(() => particle.remove(), duration);
        }
    }, 100);
}

createGlowParticles();

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});