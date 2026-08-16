document.addEventListener("DOMContentLoaded", () => {
    // Privacy Consent Handler
    const privacyBanner = document.getElementById("privacy-banner");
    const acceptBtn = document.getElementById("accept-privacy");

    if (privacyBanner && acceptBtn) {
        if (!localStorage.getItem("cookieConsent")) {
            privacyBanner.classList.remove("hidden");
            privacyBanner.classList.add("flex");
        }

        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "true");
            privacyBanner.classList.remove("flex");
            privacyBanner.classList.add("hidden");
        });
    }

    // Region Tracker
    const cityLinks = document.querySelectorAll(".city-link");
    cityLinks.forEach(link => {
        link.addEventListener("click", function() {
            if (localStorage.getItem("cookieConsent")) {
                const region = this.getAttribute("data-region");
                if (region) {
                    localStorage.setItem("preferredRegion", region);
                }
            }
        });
    });

    // Accessible Slide Rotator
    const slides = document.querySelectorAll("#rotator-container .rotator-slide");
    if (slides.length > 0) {
        let currentIndex = 0;

        const rotateSlides = () => {
            slides[currentIndex].classList.add("opacity-0", "hidden");
            slides[currentIndex].classList.remove("opacity-100", "block", "absolute", "inset-0");

            currentIndex = (currentIndex + 1) % slides.length;

            slides[currentIndex].classList.remove("opacity-0", "hidden");
            slides[currentIndex].classList.add("opacity-100", "block");
        };

        setInterval(rotateSlides, 6000);
    }
});
