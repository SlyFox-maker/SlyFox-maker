new Vue({
    el: "#app",
    data: {
        lang: window.portfolioContent.defaultLang,
        supportedLangs: window.portfolioContent.supportedLangs,
        translations: window.portfolioContent.translations,
        contacts: window.portfolioContent.contacts,

        modalVisible: false,
        modalImage: "",
        animationClass: "",
        projectModalVisible: false,
        projectModalImages: [],
        projectModalDesc: "",
        projectModalSections: [],
        projectModalIndex: 0,
        lightbox: null,
        currentAnimations: new WeakMap(),
        activeTimeouts: new WeakMap(),
        listAnimations: new WeakMap(),
        degreeCelebrationVisible: false,
        activeEducationId: "",
        degreeFireworks: [],
        degreeCelebrationTimer: null,
        degreeBurstTimer: null,
        currentServerDate: new Date(),
    },
    computed: {
        t() {
            return (key) => this.translations[this.lang][key];
        },
        currentTranslations() {
            return this.translations[this.lang];
        },
        educationPrograms() {
            const programs = this.currentTranslations.education_programs || [];
            return programs.map((program) => {
                const progress = this.calculateProgramProgress(program.start, program.end);
                return Object.assign({}, program, {
                    progress,
                    progressText: `${progress}%`,
                });
            });
        },
        modalVisibleClass() {
            return this.modalVisible ? "modal-visible" : "";
        },
        projectModalVisibleClass() {
            return this.projectModalVisible ? "modal-visible" : "";
        },
    },
    methods: Object.assign({}, window.portfolioAnimations, {
        setLang(language, forceAnimation = false) {
            if (!this.translations[language] || (!forceAnimation && this.lang === language)) return;

            const scrollPosition = {
                left: window.pageXOffset,
                top: window.pageYOffset,
            };
            const textKeys = ["title", "intro", "skills", "degree", "degree_text"];

            textKeys.forEach((key) => {
                const el = this.$refs[key];
                if (!el) return;
                const newText = this.translations[language][key];
                if (Array.isArray(newText)) return;
                this.scrambleText(this.translations[this.lang][key], newText, el);
            });

            if (this.$refs.skillsList) {
                this.animateList(this.$refs.skillsList, this.translations[language].skills_list);
            }

            this.lang = language;
            this.$nextTick(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(scrollPosition.left, scrollPosition.top);
                });
            });
        },

        openImage(cert) {
            this.modalImage = cert.file;
            this.modalVisible = true;
            this.animationClass = "cyberpunk-in";

            this.$nextTick(() => {
                const el = this.$refs.descText;
                if (el) {
                    this.scrambleText("", cert.desc || "", el);
                }
            });
        },
        calculateProgramProgress(start, end) {
            const startDate = this.parseEducationMonth(start);
            const endDate = this.parseEducationMonth(end, true);
            const currentDate = this.currentServerDate || new Date();

            if (!startDate || !endDate || endDate <= startDate) return 0;
            if (currentDate <= startDate) return 0;
            if (currentDate >= endDate) return 100;

            const total = endDate.getTime() - startDate.getTime();
            const elapsed = currentDate.getTime() - startDate.getTime();
            return Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)));
        },
        parseEducationMonth(value, endOfMonth = false) {
            if (!value) return null;
            const parts = value.split("-").map((part) => Number(part));
            if (parts.length < 2 || parts.some(Number.isNaN)) return null;
            return new Date(parts[0], parts[1] - 1 + (endOfMonth ? 1 : 0), 1);
        },
        async syncServerDate() {
            try {
                const response = await fetch("https://worldtimeapi.org/api/ip", { cache: "no-store" });
                if (!response.ok) throw new Error("Time API unavailable");
                const data = await response.json();
                const serverDate = new Date(data.datetime || data.utc_datetime);
                if (!Number.isNaN(serverDate.getTime())) {
                    this.currentServerDate = serverDate;
                }
            } catch (error) {
                this.currentServerDate = new Date();
            }
        },
        triggerEducationCelebration(program, event) {
            if (this.degreeCelebrationTimer) clearTimeout(this.degreeCelebrationTimer);
            if (this.degreeBurstTimer) clearTimeout(this.degreeBurstTimer);

            const sparkColors = ["#00f0ff", "#ff4fd8", "#66ff99", "#eef7f8"];
            this.degreeFireworks = Array.from({ length: 28 }, (_, index) => {
                const angle = (Math.PI * 2 * index) / 28;
                const distance = 70 + Math.random() * 86;
                return {
                    id: `${Date.now()}-${index}`,
                    style: {
                        "--spark-x": `${Math.cos(angle) * distance}px`,
                        "--spark-y": `${Math.sin(angle) * distance}px`,
                        "--spark-color": sparkColors[index % sparkColors.length],
                        "--spark-delay": `${Math.random() * 0.14}s`,
                    },
                };
            });

            this.degreeCelebrationVisible = true;
            this.activeEducationId = program.id;

            this.$nextTick(() => {
                const panel = event.currentTarget.closest(".university-panel");
                const el = panel ? panel.querySelector(".degree-celebration-text") : null;
                if (el) this.scrambleText("", program.celebration, el);
            });

            this.degreeBurstTimer = setTimeout(() => {
                this.degreeFireworks = [];
            }, 1200);

            this.degreeCelebrationTimer = setTimeout(() => {
                this.degreeCelebrationVisible = false;
                this.activeEducationId = "";
                const panel = event.currentTarget.closest(".university-panel");
                const el = panel ? panel.querySelector(".degree-celebration-text") : null;
                if (el) el.innerHTML = "";
            }, 3600);
        },
        openImageProject(project) {
            this.projectModalVisible = false;

            this.$nextTick(() => {
                this.projectModalImages = project.file;
                this.projectModalDesc = project.desc || "";
                this.projectModalSections = project.sections || [];
                this.projectModalIndex = 0;

                this.projectModalVisible = true;
                this.animationClass = "cyberpunk-in";

                const el = this.$refs.projectDescText;
                if (el && !this.projectModalSections.length) this.scrambleText("", this.projectModalDesc, el);

                // Переинициализация GLightbox
                setTimeout(() => {
                    if (this.lightbox) {
                        this.lightbox.destroy();
                    }
                    this.lightbox = GLightbox({
                        selector: "#project-modal .gallery-main-img",
                        loop: true,
                    });
                }, 100);
            });
        },

        goToImage(idx) {
            this.projectModalIndex = idx;
        },
        nextImage() {
            this.projectModalIndex = (this.projectModalIndex + 1) % this.projectModalImages.length;
        },
        prevImage() {
            this.projectModalIndex = (this.projectModalIndex - 1 + this.projectModalImages.length) % this.projectModalImages.length;
        },
        closeProjectModal() {
            this.animationClass = "cyberpunk-out";
        },

        startClose() {
            this.animationClass = "cyberpunk-out";
        },
        onAnimationEnd(event) {
            if (this.animationClass === "cyberpunk-out") {
                if (this.modalVisible) {
                    this.modalVisible = false;
                    if (this.$refs.descText) this.$refs.descText.innerHTML = "";
                }
                if (this.projectModalVisible) {
                    this.projectModalVisible = false;
                    this.projectModalSections = [];
                    if (this.$refs.projectDescText) this.$refs.projectDescText.innerHTML = "";
                }

                this.animationClass = "";
            }
        },
        handleKeydown(e) {
            if (this.projectModalVisible) {
                if (e.key === "ArrowLeft") this.prevImage();
                if (e.key === "ArrowRight") this.nextImage();
                if (e.key === "Escape") this.closeProjectModal();
            }
            if (this.modalVisible && e.key === "Escape") {
                this.startClose();
            }
        },

        initModalListeners() {
            window.addEventListener("keydown", this.handleKeydown);
        },

        destroyModalListeners() {
            window.removeEventListener("keydown", this.handleKeydown);
        },
    }),
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                const userLang = navigator.language || navigator.userLanguage;
                const supportedLangs = window.portfolioContent.supportedLangs;
                let targetLang = window.portfolioContent.defaultLang;

                if (userLang) {
                    const baseLang = userLang.split("-")[0].toLowerCase();
                    if (supportedLangs.includes(baseLang)) {
                        targetLang = baseLang;
                    }
                }

                this.setLang(targetLang, true);
            }, 300);
        });
        this.lightbox = GLightbox({
            selector: ".glightbox",
        });
        if (this.$refs.skillsList) {
            this.$refs.skillsList.innerHTML = this.translations[this.lang].skills_list.map((item) => `<li>${item}</li>`).join("");
        }
        this.initScrollAnimations();
        this.initModalListeners();
        this.syncServerDate();
    },
});
