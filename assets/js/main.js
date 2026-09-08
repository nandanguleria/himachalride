/* Global page JavaScript */
document.addEventListener("DOMContentLoaded", () => {
    // Homepage interactions will be added section by section.
});

/* =========================================================
   HIMACHALRIDE — NAVBAR SCROLL EFFECT
   ========================================================= */

(function () {

    const header = document.querySelector(".site-header");

    if (!header) return;

    function handleHeaderScroll() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll);

})();