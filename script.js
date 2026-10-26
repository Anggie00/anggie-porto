/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});


// Close mobile menu when a navigation link is clicked

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});


// Close mobile menu when clicking outside

document.addEventListener("click", (event) => {
    const clickedInsideNavbar = navbar.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNavbar && !clickedToggle) {
        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});


/* =========================================
   TYPING ANIMATION
========================================= */

const typingElement = document.querySelector(".typing-text");

const words = [
    "Web Development",
    "UI/UX Design",
    "Mobile Development",
    "Creative Problem Solving"
];

let wordIndex = 0;
let charIndex = 0;

let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentWord.substring(0, charIndex);

    let typingSpeed = isDeleting ? 40 : 85;

    // Pause after finishing a word

    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1500;
        isDeleting = true;
    }

    // Move to the next word

    else if (isDeleting && charIndex === 0) {
        isDeleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        typingSpeed = 350;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   SKILL PROGRESS ANIMATION
========================================= */

const skillBars = document.querySelectorAll(".skill-progress");

const skillsSection = document.getElementById("skills");

let skillsAnimated = false;

const skillsObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && !skillsAnimated) {

                skillsAnimated = true;

                skillBars.forEach((bar) => {

                    const targetWidth = bar.dataset.width;

                    bar.style.width = targetWidth;

                });

                skillsObserver.disconnect();
            }

        });

    },
    {
        threshold: 0.2
    }
);

skillsObserver.observe(skillsSection);


/* =========================================
   PORTFOLIO FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Update active button

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Get selected category

        const selectedFilter = button.dataset.filter;

        // Filter portfolio cards

        portfolioCards.forEach((card) => {

            const cardCategory = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                cardCategory === selectedFilter;

            card.classList.toggle("is-hidden", !shouldShow);

        });

    });

});


/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        const correspondingLink = document.querySelector(
            `.navbar a[href="#${sectionId}"]`
        );

        if (!correspondingLink) {
            return;
        }

        const isActive =
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight;

        if (isActive) {

            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            correspondingLink.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    // Read form values

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();


    // Basic validation

    if (!name || !email || !subject || !message) {

        alert("Please complete all fields before sending your message.");

        return;
    }


    // Replace this with your actual email address

    const recipient = "emailkamu@example.com";


    // Prepare email content

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        `Hello Anggie,\n\n` +
        `${message}\n\n` +
        `Best regards,\n${name}\n` +
        `Sender email: ${email}`
    );


    // Open the visitor's email application

    const mailtoLink =
        `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoLink;

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(5, 5, 5, 0.97)";

    } else {

        header.style.background = "rgba(8, 8, 8, 0.85)";

    }

});