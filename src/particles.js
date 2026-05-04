// Инициализация частиц как фона
// Конфигурация частиц
const particlesJSConfig = {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#00ffff" },
        shape: { type: "circle" },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1 },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00ffff",
            opacity: 0.2,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
        },
    },
    retina_detect: true,
};

// Инициализация частиц
particlesJS("particles-js", particlesJSConfig);

// Ресайз с проверкой существования конфига
window.addEventListener("resize", function () {
    if (typeof particlesJSConfig !== "undefined") {
        particlesJS("particles-js", particlesJSConfig);
    }
});
