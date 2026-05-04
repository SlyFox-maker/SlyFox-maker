new Vue({
    el: "#app",
    data: {
        lang: window.portfolioContent.defaultLang,
        supportedLangs: window.portfolioContent.supportedLangs,
        translations: window.portfolioContent.translations,
        contacts: window.portfolioContent.contacts,

        modalVisible: false,
        modalContent: "",
        modalImage: "",
        modalDesc: "",
        animationClass: "",
        projectModalVisible: false,
        projectModalAnimation: "",
        projectModalImages: [],
        projectModalDesc: "",
        projectModalIndex: 0,
        projectModalImage: "",
        lightbox: null,
        dragging: false,
        currentAnimation: null,
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
            const textKeys = ["degree", "degree_text", "title", "intro", "skills", "skills_list", "projects", "project_list", "tools", "certs", "certs_list", "degree", "degree_text"];

            textKeys.forEach((key) => {
                const el = this.$refs[key];
                if (!el) return;
                const newText = this.translations[language][key];
                if (Array.isArray(newText)) return;
                this.scrambleText(this.translations[this.lang][key], newText, el);
            });
            const listMappings = [
                ["skillsList", "skills_list"],
                ["languagesList", "languages_list"],
                ["frameworksList", "frameworks_list"],
                ["toolsList", "tools_list"],
                ["certsList", "certs_list", "project_list"],
            ];
            listMappings.forEach(([refName, transKey]) => {
                if (this.$refs[refName]) {
                    this.animateList(this.$refs[refName], this.translations[language][transKey]);
                }
            });
            this.updateCertsTexts(this.translations[language]);
            this.updateProjectsTexts(this.translations[language]);
            const degreeText = this.translations[language].certs_list;
            if (this.$refs.degreeText) {
                this.scrambleTextSimple(this.translations[this.lang].degree_text, degreeText, this.$refs.degreeText);
            }
            this.lang = language;
        },
        updateCertsTexts(texts) {
            const elements = this.$refs.certs;
            if (!elements) return;
            const elems = Array.isArray(elements) ? elements : [elements];
            const certsArray = texts.certs_list || [];

            elems.forEach((el, i) => {
                if (certsArray[i]) this.scrambleTextSimple(el, certsArray[i].name);
            });
        },
        updateProjectsTexts(texts) {
            const elements = this.$refs.projects;
            if (!elements) return;
            const elems = Array.isArray(elements) ? elements : [elements];
            const certsArray = texts.project_list || [];

            elems.forEach((el, i) => {
                if (certsArray[i]) this.scrambleTextSimple(el, certsArray[i].name);
            });
        },

        openImage(cert) {
            console.log("Opening image:", cert); // Добавьте эту строку для отладки
            this.modalImage = cert.file;
            this.modalVisible = true;
            // Запускаем анимацию открытия
            this.animationClass = "cyberpunk-in";

            this.$nextTick(() => {
                const el = this.$refs.descText;
                if (el) {
                    this.scrambleText("", cert.desc || "", el);
                }
            });
        },
        openImageProject(project) {
            // Сначала скрываем модалку чтобы установить размеры контента
            this.projectModalVisible = false;

            this.$nextTick(() => {
                // Устанавливаем контент
                this.projectModalImages = project.file;
                this.projectModalDesc = project.desc || "";
                this.projectModalIndex = 0;

                // Показываем модалку и запускаем анимацию
                this.projectModalVisible = true;
                this.animationClass = "cyberpunk-in";

                const el = this.$refs.projectDescText;
                if (el) this.scrambleText("", this.projectModalDesc, el);

                // Переинициализация GLightbox
                setTimeout(() => {
                    if (this.lightbox) {
                        this.lightbox.destroy();
                    }
                    // Обновляем селектор для новой структуры
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
            this.animationClass = "cyberpunk-out"; // анимация выхода
        },

        startClose() {
            // Запускаем анимацию закрытия
            this.animationClass = "cyberpunk-out";
        },
        onAnimationEnd(event) {
            if (this.animationClass === "cyberpunk-out") {
                // Скрываем обе модалки, если они открыты
                if (this.modalVisible) {
                    this.modalVisible = false;
                    if (this.$refs.descText) this.$refs.descText.innerHTML = "";
                }
                if (this.projectModalVisible) {
                    this.projectModalVisible = false;
                    if (this.$refs.projectDescText) this.$refs.projectDescText.innerHTML = "";
                }

                // Сбрасываем класс анимации
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
        const updateList = (refName, listKey) => {
            if (this.$refs[refName]) {
                const items = this.translations[this.lang][listKey];
                this.$refs[refName].innerHTML = items.map((item) => `<li>${item}</li>`).join("");
            }
        };
        [
            ["skillsList", "skills_list"],
            ["languagesList", "languages_list"],
            ["frameworksList", "frameworks_list"],
            ["toolsList", "tools_list"],
            ["certsList", "certs_list"],
        ].forEach(([ref, key]) => updateList(ref, key));
        if (this.$refs.degreeText) {
            this.$refs.degreeText.innerText = this.translations[this.lang].degree_text;
        }
        this.initScrollAnimations();
        this.initModalListeners(); // Добавь эту строку
    },
});
