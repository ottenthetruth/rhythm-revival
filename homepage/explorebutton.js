document.addEventListener('DOMContentLoaded', function () { /* check scroll height upon loading the page */
    checkScroll();
    window.addEventListener('scroll', () => { /* check after scrolling */
    checkScroll(); });
    document.getElementById('explore-button').addEventListener('click', () => { /* scroll to second part of the page upon clicking the button */
        window.scrollTo({
        top: 1.2 * window.innerHeight,
        behavior: 'smooth', });
    });

function checkScroll() { /* update visibility of "explore"-button */
    const exploreButton = document.getElementById('explore-button');
    const exploreText = document.getElementById('myexploretext');
    if (window.scrollY === 0) {
        exploreButton.style.opacity = 1;
        exploreText.style.opacity = 1;
        exploreButton.style.pointerEvents = 'auto'; } 
    else {
            exploreButton.style.opacity = 0;
            exploreText.style.opacity = 0;
            exploreButton.style.pointerEvents = 'none'; }
    } /* end checkScroll */
});
