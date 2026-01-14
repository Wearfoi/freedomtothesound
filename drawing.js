'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    // Resize handling
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleSize = 4;

    // Drawing state
    let isDrawing = false;

    // Mouse events
    document.addEventListener('mousedown', () => isDrawing = true);
    document.addEventListener('mouseup', () => isDrawing = false);
    document.addEventListener('mousemove', (e) => {
        if (isDrawing) addParticles(e.clientX, e.clientY);
    });

    // Touch events (for mobile)
    document.addEventListener('touchstart', (e) => {
        isDrawing = true;
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY);
    });
    document.addEventListener('touchend', () => isDrawing = false);
    document.addEventListener('touchmove', (e) => {
        if (isDrawing) {
            const touch = e.touches[0];
            addParticles(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
    // Add class to body when drawing starts
    function disableSelection() {
        document.body.classList.add('no-selection');
    }
    
    // Remove class when drawing ends
    function enableSelection() {
        document.body.classList.remove('no-selection');
    }

    // Update your event listeners:
    document.addEventListener('mousedown', function(e) {
        isDrawing = true;
        disableSelection();
        addParticles(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseup', function() {
        isDrawing = false;
        enableSelection();
    });
    
    // Same for touch events
    document.addEventListener('touchstart', function(e) {
        isDrawing = true;
        disableSelection();
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY);
    });
    
    document.addEventListener('touchend', function() {
        isDrawing = false;
        enableSelection();
    });

    // ... rest of your existing drawing code ...
});

    // Add particles
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

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();

        particles.forEach((p, i) => {
            const age = (now - p.createdAt) / 1000;
            if (age > 5) particles.splice(i, 1);
            else {
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