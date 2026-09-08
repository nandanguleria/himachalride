/* =========================================================
   HIMACHALRIDE BOOKING FORM → WHATSAPP
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PREVENT PAST TRAVEL DATES
       ===================================================== */

    const travelDateInput =
        document.getElementById("travel-date");

    if (travelDateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        travelDateInput.min = today;
    }


    /* =====================================================
       BOOKING FORM
       ===================================================== */

    const bookingForm =
        document.getElementById("booking-form");

    // Stop if this page doesn't have the booking form
    if (!bookingForm) return;


    /* =====================================================
       FORM SUBMISSION
       ===================================================== */

    bookingForm.addEventListener("submit", (event) => {

        // Prevent normal form submission
        event.preventDefault();


        /* =================================================
           HTML REQUIRED-FIELD VALIDATION
           ================================================= */

        if (!bookingForm.checkValidity()) {

            bookingForm.reportValidity();

            return;
        }


        /* =================================================
           GET FORM VALUES
           ================================================= */

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const travellers =
            document.getElementById("travellers").value.trim();

        const pickup =
            document.getElementById("pickup").value.trim();

        const destination =
            document.getElementById("destination").value.trim();

        const travelDate =
            document.getElementById("travel-date").value;

        const serviceSelect =
            document.getElementById("service");

        const service =
            serviceSelect.value
                ? serviceSelect.options[
                    serviceSelect.selectedIndex
                ].text
                : "Not selected";

        const message =
            document.getElementById("message").value.trim();


        /* =================================================
           PHONE NUMBER VALIDATION
           Indian 10-digit mobile number.
           Allows +91, 91 or 0 prefix.
           ================================================= */

        const cleanPhone =
            phone.replace(/[\s()-]/g, "");

        const indianPhonePattern =
            /^(?:\+91|91|0)?[6-9]\d{9}$/;

        if (!indianPhonePattern.test(cleanPhone)) {

            alert(
                "Please enter a valid 10-digit Indian phone number."
            );

            document.getElementById("phone").focus();

            return;
        }


        /* =================================================
           TRAVELLER VALIDATION
           ================================================= */

        const travellerCount =
            Number(travellers);

        if (
            !Number.isInteger(travellerCount) ||
            travellerCount < 1 ||
            travellerCount > 100
        ) {

            alert(
                "Please enter a valid number of travellers."
            );

            document.getElementById("travellers").focus();

            return;
        }


        /* =================================================
           TRAVEL DATE VALIDATION
           ================================================= */

        if (travelDate) {

            const selectedDate =
                new Date(travelDate + "T00:00:00");

            const today =
                new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {

                alert(
                    "Please select today or a future travel date."
                );

                document
                    .getElementById("travel-date")
                    .focus();

                return;
            }
        }


        /* =================================================
           FORMAT TRAVEL DATE
           YYYY-MM-DD → DD/MM/YYYY
           ================================================= */

        let formattedDate =
            "Not specified";

        if (travelDate) {

            const dateParts =
                travelDate.split("-");

            if (dateParts.length === 3) {

                formattedDate =
                    `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            }
        }


        /* =================================================
           CREATE WHATSAPP MESSAGE
           ================================================= */

        const whatsappMessage = `
*NEW BOOKING ENQUIRY — HIMACHALRIDE*

━━━━━━━━━━━━━━━━━━━━

*CUSTOMER DETAILS*

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

*TRAVEL DETAILS*

Travellers: ${travellers}
Pickup: ${pickup}
Destination: ${destination}
Travel Date: ${formattedDate}
Service: ${service}

*MESSAGE*

${message || "No additional message."}

━━━━━━━━━━━━━━━━━━━━

Please share the availability and quotation.
`.trim();


        /* =================================================
           WHATSAPP NUMBER
           ================================================= */

        const whatsappNumber =
            "919805664108";


        /* =================================================
           CREATE WHATSAPP URL
           ================================================= */

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        /* =================================================
           BUTTON FEEDBACK
           ================================================= */

        const submitButton =
            bookingForm.querySelector(".booking-submit");

        const submitText =
            submitButton?.querySelector("span");


        if (submitText) {

            submitText.textContent =
                "Opening WhatsApp...";
        }


        if (submitButton) {

            submitButton.disabled = true;
        }


        /* =================================================
           OPEN WHATSAPP
           ================================================= */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        /* =================================================
           RESTORE BUTTON
           ================================================= */

        setTimeout(() => {

            if (submitText) {

                submitText.textContent =
                    "Send Booking Enquiry";
            }


            if (submitButton) {

                submitButton.disabled = false;
            }

        }, 2500);

    });

});