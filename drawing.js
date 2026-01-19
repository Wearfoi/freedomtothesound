'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    // Resize canvas to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Get drawing context
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleSize = 4;
    let isDrawing = false;

    // Disable text selection while drawing
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
        addParticles(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseup', () => {
        isDrawing = false;
        enableSelection();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            addParticles(e.clientX, e.clientY);
        }
    });

    // Touch events
    document.addEventListener('touchstart', (e) => {
        isDrawing = true;
        disableSelection();
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY);
        
        // Prevent scrolling while drawing
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
        isDrawing = false;
        enableSelection();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDrawing) {
            const touch = e.touches[0];
            addParticles(touch.clientX, touch.clientY);
            e.preventDefault(); // Prevent scrolling while drawing
        }
    }, { passive: false });

    // Create particles at mouse/touch position
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
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const age = (now - p.createdAt) / 1000;
            
            // Remove old particles
            if (age > 2) {
                particles.splice(i, 1);
                continue;
            }
            
            // Fade out particles
            p.alpha = 1 - (age / 2);
            ctx.fillStyle = `rgba(0, 0, 0, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
    
    console.log("Drawing canvas initialized successfully!");
});