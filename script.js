const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
const bgContainer = document.querySelector('.background-container');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 75;

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 2.2 + 0.6;
        this.speedY = Math.random() * 0.7 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4500';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ff4500';
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

let currentX = 0, currentY = 0;
let targetX = 0, targetY = 0;
const lerpFactor = 0.05;

window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 30;
    targetY = (e.clientY / window.innerHeight - 0.5) * 30;
});

function renderFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;
    bgContainer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
    requestAnimationFrame(renderFrame);
}
renderFrame();

const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        bgContainer.style.filter = 'brightness(0.3) blur(3px)';
    });
    input.addEventListener('blur', () => {
        bgContainer.style.filter = 'brightness(0.5) blur(1px)';
    });
});
            
