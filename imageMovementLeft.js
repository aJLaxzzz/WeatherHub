let lastKnownScrollPosition = 0;
    let ticking = false;

    function updateTransformOnScroll(scrollPosition) {
        const image = document.querySelector('.weather-image-right img');
        const halfScreenWidth = window.innerWidth / 2;
        let transformValue = `translateX(${(scrollPosition - halfScreenWidth) / 3}px)`;

        if (scrollPosition >= halfScreenWidth) {
            transformValue = `translateX(-2%)`;
        }

        image.style.transform = transformValue;
    }

    window.addEventListener('scroll', function() {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateTransformOnScroll(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });