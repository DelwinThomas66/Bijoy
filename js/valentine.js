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
    "Fine, but Yes is the right answer! ✨",
    "Nope. I’m rejecting your rejection. 😌",
    "Plot twist: the No button is on a diet. 🥗",
    "This button is shrinking faster than my patience. 🤏",
    "Stop bullying the No button, it’s innocent. 😭",
    "If you can still see 'No', you’re too powerful. 🧙‍♀️",
    "Okay… now it’s basically a speck. 🔍",
    "Congratulations, you’re about to lose the No button forever. 🫥",
    "Where did it go? I swear it was here a second ago. 👀",
    "No button has left the chat. 🚪",
    "We only accept 'Yes' in this household. 🏠",
    "Last chance to be cute and click YES. 😇",
    "Fine. I’ll make YES huge and obvious. 💖",
    "At this point, 'No' is just a rumor. 🤫",
    "If you’re looking for No… try the next universe. 🌌",
    "No button status: missing. Reward: your smile. 😄"
];

// Variables for button sizing
let noClickCount = 0;
let yesFontSize = 1.2;
let noFontSize = 1.2;
let noPadding = 15;

// No button click handler
noBtn.addEventListener('click', function() {
    {
        const msgIndex = Math.min(noClickCount, funnyMessages.length - 1);
        funnyMessage.textContent = funnyMessages[msgIndex];
        funnyMessage.style.animation = 'none';
        setTimeout(() => {
            funnyMessage.style.animation = 'shake 0.5s ease';
        }, 10);
        
        // Increase Yes button size
        yesFontSize += 0.16;
        yesBtn.style.fontSize = yesFontSize + 'em';
        yesBtn.style.padding = (15 + noClickCount * 3) + 'px ' + (40 + noClickCount * 5) + 'px';
        
        // Decrease No button size
        noFontSize = Math.max(0.12, noFontSize - 0.14);
        noPadding = Math.max(1, noPadding - 2);
        noBtn.style.fontSize = noFontSize + 'em';
        noBtn.style.padding = noPadding + 'px ' + (noPadding * 2) + 'px';
        noBtn.style.transform = `scale(${Math.max(0.05, 1 - noClickCount * 0.08)})`;
        
        noClickCount++;

        // Make No button basically impossible to find after a point
        if (noClickCount >= 9) {
            noBtn.style.opacity = Math.max(0.15, 1 - (noClickCount - 8) * 0.22);
        }
        if (noClickCount >= 12) {
            noBtn.style.opacity = '0';
            noBtn.style.visibility = 'hidden';
            noBtn.style.pointerEvents = 'none';
            funnyMessage.textContent = "Wait… where’s the NO button? I only see YES now. 😇";
        }
        if (noClickCount >= 14) {
            noBtn.style.display = 'none';
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

// Final button click handler (keeps everything on this page)
const proposalBtn = document.getElementById('proposalBtn');
if (proposalBtn) {
    proposalBtn.addEventListener('click', function() {
        createMagicalTransition();

        setTimeout(() => {
            proposalBtn.disabled = true;

            const buttonText = proposalBtn.querySelector('.button-text');
            if (buttonText) buttonText.textContent = "Happy Valentine's Day 💖";
        }, 900);
    });
}

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