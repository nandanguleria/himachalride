/* =========================================================
   HIMALACHALRIDE
   HERO / BOOKING INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------
       Set minimum travel date to today
       --------------------------------------------- */

    const dateInput = document.getElementById("travelDate");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, "0");

        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

});


/* =========================================================
   WHATSAPP BOOKING
   ========================================================= */

function sendBookingRequest() {

    const from =
        document.querySelector(
            '.booking-field:nth-of-type(1) select'
        )?.value || "";

    const selects =
        document.querySelectorAll(".booking-field select");

    const fromLocation = selects[0]?.value || "";

    const toLocation = selects[1]?.value || "";

    const travelDate =
        document.getElementById("travelDate")?.value || "";


    if (!fromLocation || !toLocation) {

        alert("Please select your pickup and destination.");

        return;
    }


    let message =
        "Hello HimachalRide!%0A%0A" +
        "I want to enquire about a taxi.%0A%0A" +
        "From: " + encodeURIComponent(fromLocation) + "%0A" +
        "To: " + encodeURIComponent(toLocation);


    if (travelDate) {

        message +=
            "%0ATravel Date: " +
            encodeURIComponent(travelDate);
    }


    message +=
        "%0A%0APlease share the best available fare.";


    const whatsappURL =
        "https://wa.me/919805664108?text=" + message;


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}