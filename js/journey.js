document.getElementById("nextPage").addEventListener("click", function() {
  window.location.href = "gift-ideas.html"; 
});

// Create floating hearts animation
function createFloatingHeart() {
  const heartsContainer = document.querySelector('.hearts-background');
  const heart = document.createElement('div');
  const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞'];
  const randomHeart = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  
  heart.textContent = randomHeart;
  heart.style.position = 'absolute';
  heart.style.fontSize = Math.random() * 15 + 15 + 'px';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '-50px';
  heart.style.opacity = '0';
  
  const animationDuration = Math.random() * 10 + 12 + 's';
  const animationDelay = Math.random() * 5 + 's';
  const animations = ['float', 'float2', 'float3'];
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
  
  heart.style.animation = `${randomAnimation} ${animationDuration} ${animationDelay} infinite`;
  
  heartsContainer.appendChild(heart);
}

// Create multiple floating hearts
for (let i = 0; i < 15; i++) {
  createFloatingHeart();
}

// Get path and SVG elements
const path = document.getElementById("wavePath");
const svg = document.getElementById("journeyPath");
const pathLength = path.getTotalLength();

// Function to convert SVG coordinates to page coordinates
function svgToPageCoords(svgX, svgY) {
  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  
  const scaleX = svgRect.width / viewBox.width;
  const scaleY = svgRect.height / viewBox.height;
  
  return {
    x: svgRect.left + (svgX * scaleX),
    y: svgRect.top + (svgY * scaleY)
  };
}

// Get milestones from DOM
const milestoneElements = document.querySelectorAll('.milestone');
const milestones = Array.from(milestoneElements).map(el => ({
  id: el.id,
  position: parseFloat(el.getAttribute('data-position')),
  element: el,
  revealed: false,
  visited: false
}));

function positionMilestones() {
  milestones.forEach(milestone => {
    const point = path.getPointAtLength(pathLength * milestone.position);
    const pageCoords = svgToPageCoords(point.x, point.y);
    milestone.element.style.left = pageCoords.x + 'px';
    milestone.element.style.top = pageCoords.y + 'px';
  });
}

// Position milestones initially and on window resize
positionMilestones();
window.addEventListener('resize', positionMilestones);

// Animate a heart moving along the wave path
const heart = document.createElementNS("http://www.w3.org/2000/svg", "text");
heart.textContent = "❤️";
heart.setAttribute("font-size", "28");
heart.setAttribute("text-anchor", "middle");
svg.appendChild(heart);

let progress = 0;
let isPaused = false;
let pauseTimer = null;
let currentMilestoneIndex = 0;

function animateHeart() {
  if (!isPaused) {
    const point = path.getPointAtLength(progress);
    heart.setAttribute("x", point.x);
    heart.setAttribute("y", point.y);
    
    // Check if we've reached a milestone
    const currentProgress = progress / pathLength;
    
    milestones.forEach((milestone, index) => {
      // Reveal milestone when heart approaches
      if (currentProgress >= milestone.position - 0.02 && !milestone.revealed) {
        milestone.element.classList.add("show");
        milestone.revealed = true;
      }
      
      // Pause and expand when heart reaches milestone
      if (currentProgress >= milestone.position && 
          currentProgress < milestone.position + 0.01 && 
          !milestone.visited) {
        
        milestone.visited = true;
        isPaused = true;
        
        // Expand milestone
        milestone.element.classList.add("active");
        
        // Resume after 3 seconds
        pauseTimer = setTimeout(() => {
          milestone.element.classList.remove("active");
          isPaused = false;
          currentMilestoneIndex = index + 1;
        }, 6000);
      }
    });
    
    progress = (progress + 1.5) % pathLength;
    
    // Reset visited status when loop completes
    if (progress < 10) {
      milestones.forEach(m => m.visited = false);
    }
  }
  
  requestAnimationFrame(animateHeart);
}

animateHeart();