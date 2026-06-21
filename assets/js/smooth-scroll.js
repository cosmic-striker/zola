// Force scroll to top on page reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    // Remove hash from URL if present to prevent auto-scrolling
    if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let isScrolling = false;

    function scrollOnePage(direction) {
        isScrolling = true;
        window.scrollBy({
            top: window.innerHeight * direction,
            left: 0,
            behavior: 'smooth'
        });

        // Unlock scrolling after animation completes (~600ms)
        setTimeout(() => {
            isScrolling = false;
        }, 600);
    }

    // Handle mouse wheel scrolling
    window.addEventListener('wheel', (e) => {
        // Only hijack if we are not scrolling a scrollable div inside the page
        // (Like a long text area). For now, apply globally to window.
        e.preventDefault();
        
        if (isScrolling) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        scrollOnePage(direction);
    }, { passive: false });

    // Handle keyboard scrolling
    window.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) {
            // Ignore if typing in an input field
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag === 'input' || activeTag === 'textarea') {
                return;
            }

            e.preventDefault();
            if (isScrolling) return;

            let direction = 1;
            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                direction = -1;
            }

            scrollOnePage(direction);
        }
    }, { passive: false });
});
