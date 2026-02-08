// Create animated stars
function createStars() {
  const starsContainer = document.querySelector('.stars-background');
  const numberOfStars = 100;
  
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.background = '#fff';
    star.style.borderRadius = '50%';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.boxShadow = '0 0 5px #fff';
    
    starsContainer.appendChild(star);
  }
}

createStars();

// Gift box click handlers
const giftBoxes = document.querySelectorAll('.gift-box');

giftBoxes.forEach(box => {
  box.addEventListener('click', function() {
    // Add opening animation
    this.classList.add('opening');
    
    // Get the target page
    const targetPage = this.getAttribute('data-page');
    
    // Wait for animation then navigate
    setTimeout(() => {
      window.location.href = targetPage;
    }, 800);
  });
});

// Back button
document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'valentine.html';
});

// Add hover sound effect (optional - you can add actual sounds later)
giftBoxes.forEach(box => {
  box.addEventListener('mouseenter', function() {
    this.querySelector('.sparkles').style.opacity = '1';
  });
  
  box.addEventListener('mouseleave', function() {
    if (!this.classList.contains('opening')) {
      this.querySelector('.sparkles').style.opacity = '0';
    }
  });
});