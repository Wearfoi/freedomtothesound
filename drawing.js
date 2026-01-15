'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleSize = 4;
    let isDrawing = false;

    // Music unlock function
    function startMusic() {
        const audio = document.getElementById('bg-audio');
        if (audio && audio.paused) {
            audio.play().catch(err => console.log("Audio waiting for user interaction"));
        }
    }

    function disableSelection() {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
    }
    
    function enableSelection() {
        document.body.style.userSelect = 'auto';
        document.body.style.webkitUserSelect = 'auto';
    }

    // Mouse events
    document.addEventListener('mousedown', (e) => {
        isDrawing = true;
        disableSelection();
        startMusic();
        addParticles(e.clientX, e.clientY);
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
        enableSelection();
    });
    document.addEventListener('mousemove', (e) => {
        if (isDrawing) addParticles(e.clientX, e.clientY);
    });

    // Touch events - Updated to allow scrolling in .scroll-view
    document.addEventListener('touchstart', (e) => {
        // Check if the touch is inside the artist scroll area
        const isInsideScroll = e.target.closest('.scroll-view');
        if (isInsideScroll) {
            isDrawing = false; // Don't draw if we are trying to scroll
            return;
        }

        isDrawing = true;
        disableSelection();
        startMusic();
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchend', () => {
        isDrawing = false;
        enableSelection();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDrawing) {
            // Check if drawing was initiated inside the scroll area
            const isInsideScroll = e.target.closest('.scroll-view');
            if (isInsideScroll) return;

            const touch = e.touches[0];
            addParticles(touch.clientX, touch.clientY);
            
            // Only stop scroll when drawing on the main background
            if (e.cancelable) e.preventDefault();
        }
    }, { passive: false });

    function addParticles(x, y) {
        for (let i = 0; i < 5; i++) {
            particles.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                size: particleSize + Math.random() * 2,
                alpha: 1,
                createdAt: Date.now()
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();

        particles.forEach((p, i) => {
            const age = (now - p.createdAt) / 1000;
            if (age > 5) {
                particles.splice(i, 1);
            } else {
                p.alpha = 1 - (age / 4);
                ctx.fillStyle = `rgba(0, 0, 0, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
});