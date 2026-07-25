document.addEventListener('DOMContentLoaded', () => {
    // Play feature videos only when scrolled into view; pause when out
    const featureVideos = document.querySelectorAll('.feature-video video');
    if (featureVideos.length && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => { /* autoplay may be blocked; ignore */ });
                    }
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.35 });

        featureVideos.forEach(video => videoObserver.observe(video));
    } else {
        // Fallback: just play them
        featureVideos.forEach(video => { video.play().catch(() => {}); });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// Mobile menu toggle function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');

    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}
