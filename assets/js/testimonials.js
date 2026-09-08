/* =========================================================
   HIMACHALRIDE — TESTIMONIAL AUTO CAROUSEL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector(".testimonials-carousel");
    const track = document.querySelector(".testimonials-track");

    if (!carousel || !track) return;


    /* =====================================================
       ORIGINAL REVIEWS
       ===================================================== */

    const originalCards = Array.from(
        track.querySelectorAll(".review-card")
    );

    if (originalCards.length < 2) return;


    /* =====================================================
       CREATE INFINITE LOOP
       ===================================================== */

    const total = originalCards.length;

    const beforeClones = originalCards.map(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove("is-active");
        clone.setAttribute("aria-hidden", "true");
        return clone;
    });

    const afterClones = originalCards.map(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove("is-active");
        clone.setAttribute("aria-hidden", "true");
        return clone;
    });


    beforeClones.reverse().forEach(clone => {
        track.insertBefore(clone, track.firstChild);
    });


    afterClones.forEach(clone => {
        track.appendChild(clone);
    });


    const cards = Array.from(
        track.querySelectorAll(".review-card")
    );


    /* =====================================================
       STATE
       ===================================================== */

    let currentIndex = total;

    let autoSlideTimer = null;

    let isAnimating = false;

    let isPaused = false;


    /* =====================================================
       ACTIVE CARD
       ===================================================== */

    function setActiveCard(index) {

        cards.forEach((card, cardIndex) => {

            card.classList.toggle(
                "is-active",
                cardIndex === index
            );

        });

    }


    /* =====================================================
       CENTER ACTIVE CARD
       ===================================================== */

    function moveTo(index, animate = true) {

        if (!cards[index]) return;


        currentIndex = index;


        setActiveCard(currentIndex);


        const activeCard = cards[currentIndex];


        /*
         * Calculate where the active card should sit
         * in the exact center of the viewport.
         */

        const carouselRect =
            carousel.getBoundingClientRect();

        const cardRect =
            activeCard.getBoundingClientRect();


        const currentTrackTransform =
            getCurrentTransform();


        const cardCenter =
            cardRect.left +
            cardRect.width / 2;


        const carouselCenter =
            carouselRect.left +
            carouselRect.width / 2;


        const correction =
            carouselCenter - cardCenter;


        const newTransform =
            currentTrackTransform + correction;


        if (!animate) {

            track.style.transition = "none";

        } else {

            track.style.transition =
                "transform 0.75s cubic-bezier(0.22, 0.61, 0.36, 1)";

        }


        track.style.transform =
            `translate3d(${newTransform}px, 0, 0)`;


        if (!animate) {

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    track.style.transition =
                        "transform 0.75s cubic-bezier(0.22, 0.61, 0.36, 1)";

                });

            });

        }
    }


    /* =====================================================
       GET CURRENT TRANSFORM
       ===================================================== */

    function getCurrentTransform() {

        const style =
            window.getComputedStyle(track);

        const matrix =
            new DOMMatrixReadOnly(style.transform);

        return matrix.m41 || 0;
    }


    /* =====================================================
       INITIAL POSITION
       ===================================================== */

    function initialize() {

        /*
         * Remove any initial active class.
         */

        cards.forEach(card => {
            card.classList.remove("is-active");
        });


        /*
         * Center the first original review.
         */

        setActiveCard(currentIndex);


        requestAnimationFrame(() => {

            moveTo(currentIndex, false);

        });

    }


    /* =====================================================
       NEXT SLIDE
       ===================================================== */

    function nextSlide() {

        if (isAnimating || isPaused) return;


        isAnimating = true;


        moveTo(currentIndex + 1, true);


        /*
         * When we reach the cloned ending,
         * silently jump back to the original set.
         */

        setTimeout(() => {

            isAnimating = false;


            if (currentIndex >= total * 2) {

                const originalIndex =
                    currentIndex - total;


                moveTo(originalIndex, false);

            }

        }, 780);

    }


    /* =====================================================
       AUTO PLAY
       ===================================================== */

    function startAutoSlide() {

        stopAutoSlide();


        autoSlideTimer = setInterval(() => {

            nextSlide();

        }, 4500);

    }


    function stopAutoSlide() {

        if (autoSlideTimer) {

            clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    /* =====================================================
       PAUSE WHEN USER HOVERS
       ===================================================== */

    carousel.addEventListener(
        "mouseenter",
        () => {

            isPaused = true;

            stopAutoSlide();

        }
    );


    carousel.addEventListener(
        "mouseleave",
        () => {

            isPaused = false;

            startAutoSlide();

        }
    );


    /* =====================================================
       TOUCH / SWIPE SUPPORT
       ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    carousel.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.touches[0].clientX;

            isPaused = true;

            stopAutoSlide();

        },
        { passive: true }
    );


    carousel.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].clientX;


            const difference =
                touchStartX - touchEndX;


            /*
             * Swipe left
             */

            if (difference > 50) {

                nextSlide();

            }


            /*
             * Swipe right
             */

            if (difference < -50) {

                if (!isAnimating) {

                    isAnimating = true;

                    moveTo(
                        currentIndex - 1,
                        true
                    );

                    setTimeout(() => {

                        isAnimating = false;

                        if (currentIndex < total) {

                            moveTo(
                                currentIndex + total,
                                false
                            );

                        }

                    }, 780);

                }

            }


            isPaused = false;

            startAutoSlide();

        },
        { passive: true }
    );


    /* =====================================================
       PAUSE WHEN TAB IS NOT ACTIVE
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopAutoSlide();

            } else {

                startAutoSlide();

            }

        }
    );


    /* =====================================================
       RESPONSIVE RECALCULATION
       ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer = setTimeout(() => {

                moveTo(
                    currentIndex,
                    false
                );

            }, 150);

        }
    );


    /* =====================================================
       START
       ===================================================== */

    initialize();

    startAutoSlide();

});