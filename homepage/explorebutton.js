document.addEventListener('DOMContentLoaded', function () {
    // Your code here
    checkScroll();

    window.addEventListener('scroll', () => {
        checkScroll();
    });

    document.getElementById('explore-button').addEventListener('click', () => {
        window.scrollTo({
            top: 1.2 * window.innerHeight,
            behavior: 'smooth',
        });
    });

    function checkScroll() {
        const exploreButton = document.getElementById('explore-button');
        if (window.scrollY === 0) {
            exploreButton.style.opacity = 1;
            exploreButton.style.pointerEvents = 'auto';
        } else {
            exploreButton.style.opacity = 0;
            exploreButton.style.pointerEvents = 'none';
        }
    }
});
