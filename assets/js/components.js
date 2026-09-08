/* =========================================================
   Common Header + Footer + WhatsApp
   These components are loaded on every page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");


    /*
     * Pages inside /pages/ need "../"
     * Homepage needs no prefix.
     */
    const isInnerPage = window.location.pathname.includes("/pages/");
    const base = isInnerPage ? "../" : "";


    /* =====================================================
       HEADER
       ===================================================== */

    if (header) {

        header.innerHTML = `

            <header class="site-header">

                <div class="header-inner">

                    <a href="${base}index.html"
                       class="brand"
                       aria-label="HimachalRide Home">

                        <img
                            class="brand-logo"
                            src="${base}assets/images/destinations/logo.png"
                            alt="HimachalRide"
                        >

                    </a>


                    <nav class="main-nav" aria-label="Main navigation">

                        <a href="${base}index.html">
                            Home
                        </a>

                        <a href="${base}pages/vehicles.html">
                            Vehicles
                        </a>

                        <a href="${base}pages/tours.html">
                            Tours
                        </a>

                        <a href="${base}pages/destinations.html">
                            Destinations
                        </a>

                        <a href="${base}pages/contact.html">
                            Contact
                        </a>

                    </nav>


                    <a href="${base}pages/contact.html#booking"
                       class="header-book-btn">

                        Book Now

                    </a>


                    <button
                        class="menu-toggle"
                        aria-label="Open menu"
                        aria-expanded="false">

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </header>

        `;
    }


    /* =====================================================
       FOOTER
       ===================================================== */

    if (footer) {

        footer.innerHTML = `

            <footer class="site-footer">

                <div class="footer-inner">


                    <!-- FOOTER BRAND -->

                    <div class="footer-brand">

                        <a href="${base}index.html"
                           class="brand">

                            <img
                                class="brand-logo"
                                src="${base}assets/images/destinations/logo.png"
                                alt="HimachalRide"
                            >

                        </a>

                        <p>
                            Taxi & tour services across
                            Himachal Pradesh and beyond.
                        </p>

                    </div>


                    <!-- EXPLORE -->

                    <div class="footer-column">

                        <h3>Explore</h3>

                        <a href="${base}pages/vehicles.html">
                            Our Vehicles
                        </a>

                        <a href="${base}pages/tours.html">
                            Tour Packages
                        </a>

                        <a href="${base}pages/destinations.html">
                            Destinations
                        </a>

                    </div>


                    <!-- COMPANY -->

                    <div class="footer-column">

                        <h3>Company</h3>

                        <a href="${base}pages/contact.html">
                            Contact
                        </a>

                        <a href="${base}pages/contact.html#booking">
                            Book a Ride
                        </a>

                    </div>


                    <!-- CONTACT -->

                    <div class="footer-column">

                        <h3>Contact</h3>

                        <a href="tel:+919805664108">
                            98056 64108
                        </a>

                        <a href="tel:+917973735835">
                            79737 35835
                        </a>

                        <a
                            href="https://wa.me/919805664108"
                            target="_blank"
                            rel="noopener"
                        >
                            WhatsApp
                        </a>

                        <span>
                            Fatehpur Bus Stand,<br>
                            Near NH27 Talwara–Chamba Highway
                        </span>

                    </div>


                </div>


                <!-- FOOTER BOTTOM -->

                <div class="footer-bottom">

                    <span>
                        ©
                        <span id="current-year"></span>
                        HimachalRide.
                        All rights reserved.
                    </span>

                    <span class="footer-developer">
                        Website Designed &amp; Developed by
                        <strong>NN Solutions</strong>
                    </span>

                    <span>
                        Est. 2016 · Available 24/7
                    </span>

                </div>


            </footer>

        `;
    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        /* Close menu after clicking a navigation link */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       FLOATING WHATSAPP BUTTON
       ===================================================== */

    const whatsappNumber = "919805664108";

    const whatsappMessage =
        "Hello HimachalRide, I would like to enquire about a taxi or tour. Please share the details.";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


    /*
     * Create WhatsApp button only once
     */

    if (!document.querySelector(".floating-whatsapp")) {

        const whatsappButton =
            document.createElement("a");

        whatsappButton.className =
            "floating-whatsapp";

        whatsappButton.href =
            whatsappURL;

        whatsappButton.target =
            "_blank";

        whatsappButton.rel =
            "noopener";

        whatsappButton.setAttribute(
            "aria-label",
            "Chat with HimachalRide on WhatsApp"
        );


        whatsappButton.innerHTML = `

            <span class="whatsapp-icon">

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true">

                    <path
                        d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0
                        C5.5 0 .17 5.33.17 11.88
                        c0 2.09.55 4.13 1.6 5.92L.06 24
                        l6.35-1.67a11.84 11.84 0 0 0
                        5.64 1.43h.01
                        c6.55 0 11.88-5.33 11.88-11.88
                        0-3.18-1.24-6.17-3.42-8.4ZM12.06 21.8
                        c-1.77 0-3.5-.47-5.01-1.36l-.36-.21-3.77.99
                        1.01-3.68-.23-.38a9.86 9.86 0 0 1-1.52-5.28
                        c0-5.46 4.44-9.9 9.9-9.9
                        2.65 0 5.14 1.03 7.01 2.9
                        a9.84 9.84 0 0 1 2.9 7
                        c0 5.47-4.44 9.92-9.93 9.92Zm5.44-7.43
                        c-.3-.15-1.76-.87-2.03-.97
                        -.27-.1-.47-.15-.67.15
                        -.2.3-.77.97-.94 1.17
                        -.17.2-.35.22-.65.07
                        -.3-.15-1.27-.47-2.42-1.49
                        -.9-.8-1.5-1.79-1.67-2.09
                        -.17-.3-.02-.46.13-.61
                        .13-.13.3-.35.45-.52
                        .15-.17.2-.3.3-.5
                        .1-.2.05-.37-.02-.52
                        -.07-.15-.67-1.61-.92-2.2
                        -.24-.58-.49-.5-.67-.51
                        -.17-.01-.37-.01-.57-.01
                        -.2 0-.52.07-.79.37
                        -.27.3-1.04 1.02-1.04 2.48
                        0 1.46 1.07 2.87 1.22 3.07
                        .15.2 2.1 3.21 5.08 4.5
                        .71.31 1.26.49 1.69.63
                        .71.23 1.35.2 1.86.12
                        .57-.08 1.76-.72 2.01-1.41
                        .25-.69.25-1.28.17-1.41
                        -.07-.12-.27-.2-.57-.35Z"
                    />

                </svg>

            </span>


            <span class="whatsapp-text">

                <strong>WhatsApp</strong>

                <small>Chat with us</small>

            </span>

        `;


        document.body.appendChild(
            whatsappButton
        );

    }

});