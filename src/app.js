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
        projectModalIndex: 0,
        lightbox: null,
        currentAnimations: new WeakMap(),
        activeTimeouts: new WeakMap(),
        listAnimations: new WeakMap(),
    },
    computed: {
        t() {
            return (key) => this.translations[this.lang][key];
        },
        currentTranslations() {
            return this.translations[this.lang];
        },
        modalVisibleClass() {
            return this.modalVisible ? "modal-visible" : "";
        },
        projectModalVisibleClass() {
            return this.projectModalVisible ? "modal-visible" : "";
        },
    },
    methods: Object.assign({}, window.portfolioAnimations, {
        setLang(language) {
            if (!this.translations[language] || this.lang === language) return;

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
        openImageProject(project) {
            this.projectModalVisible = false;

            this.$nextTick(() => {
                this.projectModalImages = project.file;
                this.projectModalDesc = project.desc || "";
                this.projectModalIndex = 0;

                this.projectModalVisible = true;
                this.animationClass = "cyberpunk-in";

                const el = this.$refs.projectDescText;
                if (el) this.scrambleText("", this.projectModalDesc, el);

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

                this.setLang(targetLang);
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
    },
});
