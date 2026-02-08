// Create floating hearts in background
function createFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💓', '💘'];
  
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 25 + 15 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.opacity = Math.random() * 0.4 + 0.2;
    heart.style.pointerEvents = 'none';
    
    const animDuration = Math.random() * 10 + 12;
    const animDelay = Math.random() * 5;
    const drift = Math.random() * 100 - 50;
    
    heart.animate([
      {
        bottom: '-50px',
        transform: `translateX(0) rotate(0deg)`,
        opacity: Math.random() * 0.4 + 0.2
      },
      {
        bottom: '110%',
        transform: `translateX(${drift}px) rotate(${Math.random() * 360}deg)`,
        opacity: 0
      }
    ], {
      duration: animDuration * 1000,
      delay: animDelay * 1000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
    
    container.appendChild(heart);
  }
}

createFloatingHearts();

// The complete poem
const poemLines = [
  "I've known your name",
  "for almost five years,",
  "long before I knew",
  "the way you smile mid-sentence",
  "or pause before a joke",
  "like you're deciding how much of yourself to reveal.",
  "",
  "We arrived through a common friend,",
  "like two parallel lines",
  "aware of each other,",
  "never quite meeting.",
  "I asked for coffee once,",
  "then twice—",
  "life said no both times,",
  "not you.",
  "That matters.",
  "",
  "The third time, you said yes.",
  "Time, of course, laughed at us.",
  "Your free days met my busy ones,",
  "plans fell apart—",
  "but somehow we didn't.",
  "",
  "We texted instead.",
  "Words did what calendars couldn't.",
  "My jokes landed,",
  "yours stayed longer than laughter should.",
  "Somewhere between replies,",
  "something quietly clicked.",
  "",
  "When we finally met,",
  "I was nervous—",
  "you weren't a stranger anymore,",
  "and that's always dangerous.",
  "But there was no silence to fill,",
  "no pretending to be cooler,",
  "or less,",
  "or more.",
  "",
  "I showed up jolly,",
  "exactly as I am.",
  "You showed up witty,",
  "and gently sensitive,",
  "like someone who notices small things",
  "and remembers them.",
  "",
  "I roast you sometimes—",
  "that's how I get comfortable.",
  "But I like being there,",
  "in that space where we're just us,",
  "not trying,",
  "not proving.",
  "",
  "I don't know how to say",
  "I like you",
  "without making it heavy,",
  "so I'll say this instead:",
  "",
  "I like how it feels",
  "to sit across from you",
  "and not want to be anywhere else.",
  "",
  "And for now,",
  "that feels honest enough. 💕"
];

// Typewriter effect variables
let currentLine = 0;
let currentChar = 0;
let isTyping = false;
let typingSpeed = 50; // milliseconds per character

function typeWriter() {
  if (currentLine >= poemLines.length) {
    isTyping = false;
    return;
  }
  
  isTyping = true;
  const lineElement = document.getElementById(`line${currentLine + 1}`);
  
  if (!lineElement) {
    currentLine++;
    setTimeout(typeWriter, 100);
    return;
  }
  
  const currentText = poemLines[currentLine];
  
  // Mark line as being typed
  if (!lineElement.classList.contains('typed')) {
    lineElement.classList.add('typed');
  }
  
  if (currentChar === 0) {
    // Add cursor at start
    lineElement.innerHTML = '<span class="cursor"></span>';
  }
  
  if (currentChar < currentText.length) {
    // Type next character
    const textBefore = currentText.substring(0, currentChar + 1);
    lineElement.innerHTML = textBefore + '<span class="cursor"></span>';
    currentChar++;
    
    // Variable speed for more natural typing
    const charDelay = currentText[currentChar - 1] === ' ' ? typingSpeed * 0.5 : typingSpeed;
    setTimeout(typeWriter, charDelay);
  } else {
    // Line complete
    lineElement.innerHTML = currentText;
    lineElement.classList.add('complete');
    currentChar = 0;
    currentLine++;
    
    // Pause between lines
    const pauseDelay = currentText === '' ? 200 : 300;
    setTimeout(typeWriter, pauseDelay);
  }
}

// Start typing when page loads
setTimeout(() => {
  typeWriter();
}, 1500);

// Replay button functionality
document.getElementById('replayBtn').addEventListener('click', function() {
  // Reset variables
  currentLine = 0;
  currentChar = 0;
  
  // Clear all lines (now 64 lines total)
  for (let i = 1; i <= 64; i++) {
    const line = document.getElementById(`line${i}`);
    if (line) {
      line.innerHTML = '';
      line.classList.remove('typed', 'complete');
    }
  }
  
  // Create button click effect
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = '';
  }, 150);
  
  // Restart typing
  setTimeout(() => {
    typeWriter();
  }, 500);
});

// Add sparkle effect when typing
function addSparkle(element) {
  const sparkle = document.createElement('div');
  sparkle.textContent = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.fontSize = '1em';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.opacity = '0';
  sparkle.style.transition = 'all 1s ease-out';
  
  element.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.style.opacity = '1';
    sparkle.style.transform = 'translateY(-20px)';
  }, 10);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Periodically add sparkles while typing
setInterval(() => {
  if (isTyping) {
    const pages = document.querySelectorAll('.book-page');
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    if (randomPage && Math.random() > 0.7) {
      addSparkle(randomPage);
    }
  }
}, 2000);

// Smooth scroll for pages
document.querySelectorAll('.book-page').forEach(page => {
  page.addEventListener('wheel', (e) => {
    e.preventDefault();
    page.scrollTop += e.deltaY;
  }, { passive: false });
});