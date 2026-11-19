const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".nav-links");

function closeNavigation() {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
        closeNavigation();
        menuToggle.focus();
    }
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

const cursorGlow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
}

document.getElementById("year").textContent = new Date().getFullYear();
