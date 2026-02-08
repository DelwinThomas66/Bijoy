// Navigate to next page
document.getElementById("nextPage").addEventListener("click", function() {
  // Add click effect
  this.style.transform = 'scale(0.95)';
  
  // Create explosion of hearts
  createHeartExplosion();
  
  setTimeout(() => {
    window.location.href = "love-story.html"; // Change to your next page
  }, 500);
});

// Floating hearts animation (continuous rain)
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  
  const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
  heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 1.5 + 1.5) + "rem";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  
  document.getElementById("heartsRain").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Create hearts continuously
setInterval(createHeart, 300);

// Create explosion of hearts on button click
function createHeartExplosion() {
  const button = document.getElementById("nextPage");
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = centerX + "px";
    heart.style.top = centerY + "px";
    heart.style.fontSize = "2rem";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";
    
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 200 + Math.random() * 100;
    
    document.body.appendChild(heart);
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
      posX += Math.cos(angle) * 5;
      posY += Math.sin(angle) * 5 - 2; // Add gravity effect
      opacity -= 0.02;
      
      heart.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX * 2}deg)`;
      heart.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        heart.remove();
      }
    };
    
    animate();
  }
}

// Add particle effect on mouse move
let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  
  // Throttle particle creation
  if (currentTime - lastParticleTime < 100) return;
  lastParticleTime = currentTime;
  
  const particle = document.createElement("div");
  particle.innerHTML = "✨";
  particle.style.position = "fixed";
  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";
  particle.style.fontSize = "1rem";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "999";
  particle.style.transition = "all 1s ease-out";
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.style.transform = `translateY(-50px) scale(0)`;
    particle.style.opacity = "0";
  }, 10);
  
  setTimeout(() => {
    particle.remove();
  }, 1000);
});

// Add hover effect sound (visual feedback)
const button = document.getElementById("nextPage");

button.addEventListener('mouseenter', () => {
  // Create ripple effect
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.width = '10px';
  ripple.style.height = '10px';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'rippleEffect 0.6s ease-out';
  
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    from {
      width: 10px;
      height: 10px;
      opacity: 1;
    }
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Random confetti burst every few seconds
setInterval(() => {
  createConfetti();
}, 5000);

function createConfetti() {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff8c42', '#ff6bff'];
  
  for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '5';
    
    document.body.appendChild(confetti);
    
    const fallDuration = 3 + Math.random() * 2;
    const horizontalDrift = (Math.random() - 0.5) * 100;
    
    confetti.animate([
      { 
        transform: `translateY(0) translateX(0) rotate(0deg)`,
        opacity: 1
      },
      { 
        transform: `translateY(110vh) translateX(${horizontalDrift}px) rotate(${Math.random() * 720}deg)`,
        opacity: 0
      }
    ], {
      duration: fallDuration * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => confetti.remove(), fallDuration * 1000);
  }
}

// Initial confetti burst on load
setTimeout(createConfetti, 500);