
// 1. Dynamic Copyright Year

const yearElement = document.getElementById("year");

const currentYear = new Date().getFullYear();

yearElement.textContent = currentYear;


// 2. Custom Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            const startPosition = window.scrollY;

            const targetPosition =
                targetSection.getBoundingClientRect().top + window.scrollY;

            const distance = targetPosition - startPosition;

            const duration = 1000;

            let startTime = null;

            function animateScroll(currentTime) {

                if (startTime === null) {
                    startTime = currentTime;
                }

                const elapsed = currentTime - startTime;

                const progress = Math.min(elapsed / duration, 1);

                const ease = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(
                    0,
                    startPosition + distance * ease
                );

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }

            requestAnimationFrame(animateScroll);
        }
    });
});


// 3. Back to Top Button

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }

});

backToTopButton.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// 4. Mobile Navigation Menu

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

// Open and close menu

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

// Close menu after clicking a link

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

});
