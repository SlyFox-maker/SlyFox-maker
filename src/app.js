new Vue({
    el: "#app",
    data: {
        lang: window.portfolioContent.defaultLang,
        supportedLangs: window.portfolioContent.supportedLangs,
        translations: window.portfolioContent.translations,
        contacts: window.portfolioContent.contacts,

        modalVisible: false,
        modalImage: "",
        imageLoading: false,
        animationClass: "",
        projectModalVisible: false,
        projectModalImages: [],
        projectModalDesc: "",
        projectModalSections: [],
        projectModalIndex: 0,
        lightbox: null,
        currentAnimations: new WeakMap(),
        animationFinalTexts: new WeakMap(),
        activeAnimationElements: new Set(),
        activeTimeouts: new WeakMap(),
        listAnimations: new WeakMap(),
        degreeCelebrationVisible: false,
        activeEducationId: "",
        degreeFireworks: [],
        degreeCelebrationTimer: null,
        degreeBurstTimer: null,
        currentServerDate: new Date(),
        activeSection: "overview",
        pageProgress: 0,
        showEducationDetails: false,
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
        navigationItems() {
            return [
                { id: "overview", labelKey: "nav_overview" },
                { id: "skills", labelKey: "nav_skills" },
                { id: "projects", labelKey: "nav_projects" },
                { id: "degrees", labelKey: "nav_education" },
                { id: "certificates", labelKey: "nav_certificates" },
                { id: "contact", labelKey: "nav_contact" },
            ];
        },
        orderedCertificates() {
            const certificates = this.currentTranslations.certs_list || [];
            return certificates.slice().sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        },
        projectGroups() {
            const projects = this.currentTranslations.project_list || [];
            return [
                { type: "commercial", labelKey: "projects_commercial", projects: projects.filter((project) => project.type === "commercial") },
                { type: "pet", labelKey: "projects_pet", projects: projects.filter((project) => project.type === "pet") },
            ].filter((group) => group.projects.length);
        },
        modalVisibleClass() {
            return this.modalVisible ? "modal-visible" : "";
        },
        projectModalVisibleClass() {
            return this.projectModalVisible ? "modal-visible" : "";
        },
    },
    methods: Object.assign({}, window.portfolioAnimations, {
        scrollToSection(id) {
            const section = document.getElementById(id);
            if (!section) return;
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        updateNavigationState() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            this.pageProgress = scrollableHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100)) : 0;

            const viewportHeight = window.innerHeight;
            let current = "overview";
            let bestVisibilityScore = -1;

            this.navigationItems.forEach((item) => {
                const section = document.getElementById(item.id);
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
                const targetHeight = Math.max(1, Math.min(rect.height, viewportHeight * 0.5));
                const visibilityScore = Math.min(1, visibleHeight / targetHeight);

                if (visibilityScore > bestVisibilityScore) {
                    bestVisibilityScore = visibilityScore;
                    current = item.id;
                }
            });

            if (scrollTop < 80) current = "overview";
            if (scrollableHeight > 0 && scrollTop >= scrollableHeight - 4) current = "contact";

            this.activeSection = current;
        },
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

            this.lang = language;
            this.$nextTick(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(scrollPosition.left, scrollPosition.top);
                });
            });
        },

        openImage(cert) {
            this.imageLoading = true;
            this.modalImage = cert.file;
            this.modalVisible = true;
            this.animationClass = "cyberpunk-in";

            this.$nextTick(() => {
                const image = this.$refs.modalImg;
                if (image && image.complete && image.naturalWidth > 0) {
                    this.onImageLoaded();
                }
                const el = this.$refs.descText;
                if (el) {
                    this.scrambleText("", cert.desc || "", el);
                }
            });
        },
        onImageLoaded() {
            this.imageLoading = false;
        },
        onImageLoadError() {
            this.imageLoading = false;
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

                this.$nextTick(() => {
                    if (this.projectModalSections.length) {
                        const titleElements = this.$refs.projectSectionTitles || [];
                        const textElements = this.$refs.projectSectionTexts || [];

                        this.projectModalSections.forEach((section, index) => {
                            const titleElement = titleElements[index];
                            const textElement = textElements[index];
                            if (titleElement) this.scrambleText("", section.title, titleElement);
                            if (textElement) this.scrambleText("", section.text, textElement);
                        });
                    } else {
                        const el = this.$refs.projectDescText;
                        if (el) this.scrambleText("", this.projectModalDesc, el);
                    }
                });

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
            this.clearAllTextAnimations(true);
            this.animationClass = "cyberpunk-out";
        },

        startClose() {
            this.clearAllTextAnimations(true);
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
        this.initScrollAnimations();
        this.initModalListeners();
        this.syncServerDate();
        window.addEventListener("scroll", this.updateNavigationState, { passive: true });
        window.addEventListener("resize", this.updateNavigationState);
        this.updateNavigationState();
    },
    beforeDestroy() {
        this.clearAllTextAnimations(false);
        this.destroyModalListeners();
        window.removeEventListener("scroll", this.updateNavigationState);
        window.removeEventListener("resize", this.updateNavigationState);
    },
});
