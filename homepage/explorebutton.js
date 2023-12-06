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

    const pages = document.querySelectorAll('.explorepage');
    let currentPage = 0;

    function showPage(pageIndex) {
      for (let i = 0; i < pages.length; i++) {
        if (i === pageIndex) {
          pages[i].classList.add('show');
          pages[i].classList.remove('hide-left', 'hide-right');
        } else if (i < pageIndex) {
          pages[i].classList.remove('show', 'hide-right');
          pages[i].classList.add('hide-left');
        } else {
          pages[i].classList.remove('show', 'hide-left');
          pages[i].classList.add('hide-right');
        }
      }
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
      }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
      }
    });

    showPage(currentPage);
