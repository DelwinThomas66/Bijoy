// Create floating particles
function createParticles() {
  const container = document.querySelector('.floating-particles');
  const particles = ['✨', '💫', '⭐', '🌟', '💕', '💖', '💗'];
  
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'absolute';
    particle.style.fontSize = Math.random() * 20 + 15 + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    
    const keyframes = `
      @keyframes float${i} {
        from {
          bottom: -50px;
          transform: translateX(0) rotate(0deg);
        }
        to {
          bottom: 110%;
          transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    particle.style.animation = `float${i} infinite ease-in-out`;
    container.appendChild(particle);
  }
}

createParticles();

// Calculate days together
// CHANGE THIS DATE to your actual first date/start of relationship
const startDate = new Date('2026-01-06'); // Format: YYYY-MM-DD
const today = new Date();
const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

// Update the days count
const daysCountElement = document.getElementById('daysCount');
if (daysCountElement) {
  // Animate counting up
  let count = 0;
  const increment = daysTogether / 50; // 50 steps
  const timer = setInterval(() => {
    count += increment;
    if (count >= daysTogether) {
      count = daysTogether;
      clearInterval(timer);
    }
    daysCountElement.textContent = Math.floor(count);
  }, 30);
}

// Add some interactive effects
const polaroids = document.querySelectorAll('.empty-polaroid');
polaroids.forEach((polaroid, index) => {
  polaroid.addEventListener('mouseenter', function() {
    this.style.zIndex = 10;
  });
  
  polaroid.addEventListener('mouseleave', function() {
    this.style.zIndex = 3 - index;
  });
});

console.log('Gallery coming soon page loaded! ✨');