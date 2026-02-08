// Create floating hearts background
const heartsBackground = document.getElementById('heartsBackground');
for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 6 + 's';
    heartsBackground.appendChild(heart);
}

// Get all the elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const funnyMessage = document.getElementById('funnyMessage');
const questionPage = document.getElementById('questionPage');
const envelopePage = document.getElementById('envelopePage');
const letterPage = document.getElementById('letterPage');
const envelope = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelopeContainer');

// Funny messages array
const funnyMessages = [
    "Are you sure? 🥺",
    "Really? Think again! 💭",
    "The No button is getting smaller... coincidence? 🤔",
    "Come on, you know you want to say yes! 😊",
    "Pretty please? 🙏",
    "The No button is disappearing... 👀",
    "Just click Yes already! 😄",
    "Okay, but actually yes though? 💕",
    "You're running out of No button! 😂",
    "Fine, but Yes is the right answer! ✨"
];

// Variables for button sizing
let noClickCount = 0;
let yesFontSize = 1.2;
let noFontSize = 1.2;
let noPadding = 15;

// No button click handler
noBtn.addEventListener('click', function() {
    if (noClickCount < funnyMessages.length) {
        funnyMessage.textContent = funnyMessages[noClickCount];
        funnyMessage.style.animation = 'none';
        setTimeout(() => {
            funnyMessage.style.animation = 'shake 0.5s ease';
        }, 10);
        
        // Increase Yes button size
        yesFontSize += 0.15;
        yesBtn.style.fontSize = yesFontSize + 'em';
        yesBtn.style.padding = (15 + noClickCount * 3) + 'px ' + (40 + noClickCount * 5) + 'px';
        
        // Decrease No button size
        noFontSize = Math.max(0.4, noFontSize - 0.15);
        noPadding = Math.max(5, noPadding - 2);
        noBtn.style.fontSize = noFontSize + 'em';
        noBtn.style.padding = noPadding + 'px ' + (noPadding * 2) + 'px';
        
        noClickCount++;

        // Make No button almost invisible after many clicks
        if (noClickCount > 7) {
            noBtn.style.opacity = Math.max(0.3, 1 - (noClickCount - 7) * 0.15);
        }
    }
});

// Yes button click handler
yesBtn.addEventListener('click', function() {
    questionPage.style.display = 'none';
    envelopePage.style.display = 'block';
    
    // Add more hearts celebration
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (20 + Math.random() * 20) + 'px';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heartsBackground.appendChild(heart);
    }
});

// Envelope click to open letter
envelopeContainer.addEventListener('click', function() {
    envelope.classList.add('open');
    
    setTimeout(() => {
        envelopePage.style.display = 'none';
        letterPage.style.display = 'block';
        
        // Add letter-container class for wider layout
        const container = document.querySelector('.container');
        container.classList.add('letter-container');
        
        startTypingEffect();
    }, 800);
});

// Typing effect for letter
function startTypingEffect() {
    const paragraphs = document.querySelectorAll('.letter-content p');
    const signature = document.querySelector('.signature');
    let currentParagraph = 0;

    function typeParagraph(element, text, callback) {
        element.classList.add('typing');
        let charIndex = 0;
        element.textContent = '';
        
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);

        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                cursor.before(text.charAt(charIndex));
                charIndex++;
            } else {
                cursor.remove();
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, 30);
    }

    function typeNextParagraph() {
        if (currentParagraph < paragraphs.length) {
            const p = paragraphs[currentParagraph];
            const text = p.getAttribute('data-text');
            
            typeParagraph(p, text, () => {
                currentParagraph++;
                setTimeout(typeNextParagraph, 200);
            });
        } else {
            signature.classList.add('show');
            // Show the final proposal button after everything is typed
            setTimeout(() => {
                const finalButtonContainer = document.getElementById('finalButtonContainer');
                if (finalButtonContainer) {
                    finalButtonContainer.classList.add('show');
                }
            }, 1000);
        }
    }

    typeNextParagraph();
}

// Proposal button click handler
document.addEventListener('DOMContentLoaded', function() {
    const proposalBtn = document.getElementById('proposalBtn');
    if (proposalBtn) {
        proposalBtn.addEventListener('click', function() {
            // Create magical transition effect
            createMagicalTransition();
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = 'proposal.html'; // Your proposal page
            }, 1500);
        });
    }
});

// Magical transition effect
function createMagicalTransition() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff8c42', '#e91e63', '#ff6bff'];
    
    // Create explosion of hearts and sparkles
    for (let i = 0; i < 50; i++) {
        const element = document.createElement('div');
        element.innerHTML = i % 2 === 0 ? '💖' : '✨';
        element.style.position = 'fixed';
        element.style.left = '50%';
        element.style.top = '50%';
        element.style.fontSize = (Math.random() * 30 + 20) + 'px';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '10000';
        element.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(element);
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 150 + Math.random() * 150;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        let rotation = 0;
        
        const animate = () => {
            posX += Math.cos(angle) * 8;
            posY += Math.sin(angle) * 8 - 2;
            opacity -= 0.015;
            rotation += 10;
            
            element.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg) scale(${opacity})`;
            element.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                element.remove();
            }
        };
        
        setTimeout(() => animate(), i * 20);
    }
    
    // Flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'radial-gradient(circle, rgba(233, 30, 99, 0.5), transparent)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.5s';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        flash.style.opacity = '0';
    }, 600);
    
    setTimeout(() => {
        flash.remove();
    }, 1100);
}