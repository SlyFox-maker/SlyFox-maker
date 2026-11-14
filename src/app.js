new Vue({
    el: "#app",
    data: {
        lang: window.portfolioContent.defaultLang,
        supportedLangs: window.portfolioContent.supportedLangs,
        translations: window.portfolioContent.translations,
        contacts: window.portfolioContent.contacts,

        modalVisible: false,
        modalImage: "",
        modalDocumentName: "",
        imageLoading: false,
        animationClass: "",
        projectModalVisible: false,
        projectModalName: "",
        projectModalImages: [],
        projectModalCaptions: [],
        projectModalDesc: "",
        projectModalSections: [],
        projectModalIndex: 0,
        imageViewerVisible: false,
        imageViewerClosing: false,
        viewerImageSizeClass: "",
        resumeViewerVisible: false,
        resumeViewerClosing: false,
        resumeViewerAnimationClass: "",
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
                { type: "commercial", labelKey: "projects_commercial", projects: projects.filter((project) => project.type === "commercial").sort((a, b) => (typeof a.order === "number" ? a.order : 100) - (typeof b.order === "number" ? b.order : 100)) },
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
        lockPageScroll() {
            if (this._scrollLock) return;
            const body = document.body;
            const gap = window.innerWidth - document.documentElement.clientWidth;
            const mobile = window.matchMedia("(max-width: 768px)").matches;
            this._scrollLock = { overflow: body.style.overflow, paddingRight: body.style.paddingRight, position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, x: window.scrollX, y: window.scrollY, mobile };
            if (gap > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gap}px`;
            body.style.overflow = "hidden";
            if (mobile) {
                body.style.position = "fixed";
                body.style.top = `-${this._scrollLock.y}px`;
                body.style.left = `-${this._scrollLock.x}px`;
                body.style.width = "100%";
            }
        },
        unlockPageScroll() {
            if (!this._scrollLock || this.modalVisible || this.projectModalVisible || this.imageViewerVisible || this.resumeViewerVisible) return;
            const lock = this._scrollLock;
            document.body.style.overflow = lock.overflow;
            document.body.style.paddingRight = lock.paddingRight;
            if (lock.mobile) {
                document.body.style.position = lock.position;
                document.body.style.top = lock.top;
                document.body.style.left = lock.left;
                document.body.style.width = lock.width;
                window.scrollTo(lock.x, lock.y);
            }
            this._scrollLock = null;
        },
        focusInTopModal(event) {
            const container = this.resumeViewerVisible ? this.$el.querySelector("#resume-viewer") : this.imageViewerVisible ? this.$el.querySelector("#image-viewer") : this.projectModalVisible ? this.$el.querySelector("#project-modal") : this.modalVisible ? this.$el.querySelector("#modal") : null;
            if (!container) return;
            const focusable = Array.from(container.querySelectorAll('button, a[href], iframe, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.disabled && element.getClientRects().length);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!container.contains(document.activeElement) || (event.shiftKey && document.activeElement === first)) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        },
        updatePageMetadata() {
            document.documentElement.lang = this.lang;
            document.title = this.currentTranslations.page_title;
            const description = document.querySelector('meta[name="description"]');
            if (description) description.content = this.currentTranslations.page_description;
        },
        scrollToSection(id) {
            const section = document.getElementById(id);
            if (!section) return;
            section.scrollIntoView({ behavior: this.prefersReducedMotion() ? "auto" : "smooth", block: "start" });
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
            this.clearAllTextAnimations(true);
            this.teardownScrollAnimations();

            const scrollPosition = {
                left: window.pageXOffset,
                top: window.pageYOffset,
            };
            this.lang = language;
            this.updatePageMetadata();
            this.$nextTick(() => {
                this.initScrollAnimations();
                const title = this.$refs.title;
                if (title && this.translations[language].title) this.scrambleText("", this.translations[language].title, title);
                const intro = this.$refs.intro;
                if (intro && this.translations[language].intro) this.scrambleText("", this.translations[language].intro, intro);
                requestAnimationFrame(() => {
                    window.scrollTo(scrollPosition.left, scrollPosition.top);
                    requestAnimationFrame(() => this.scrambleVisibleSectionHeadings());
                });
            });
        },

        openImage(cert, event) {
            this._documentOpener = event?.currentTarget || document.activeElement;
            this.lockPageScroll();
            this.imageLoading = true;
            this.modalImage = cert.file;
            this.modalDocumentName = cert.name;
            this.modalVisible = true;
            this.animationClass = "cyberpunk-in";

            this.$nextTick(() => {
                this.$refs.documentClose.focus();
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
        openResumeViewer(event) {
            if (window.matchMedia("(max-width: 767px)").matches || event?.metaKey || event?.ctrlKey) return;
            event?.preventDefault();
            if (this.modalVisible || this.projectModalVisible || this.imageViewerVisible) return;
            this.clearAllTextAnimations(true);
            this._resumeViewerOpener = event?.currentTarget || document.activeElement;
            this.lockPageScroll();
            this.resumeViewerClosing = false;
            this.resumeViewerVisible = true;
            this.resumeViewerAnimationClass = "cyberpunk-in";
            this.$nextTick(() => {
                if (this.resumeViewerVisible) this.$refs.resumeViewerClose?.focus();
            });
        },
        closeResumeViewer() {
            if (!this.resumeViewerVisible || this.resumeViewerClosing) return;
            this.resumeViewerClosing = true;
            this.resumeViewerAnimationClass = "cyberpunk-out";
        },
        onResumeViewerAnimationEnd(event) {
            if (event.target === event.currentTarget && event.animationName === "cyberpunkOut" && this.resumeViewerClosing) {
                this.finishCloseResumeViewer();
            }
        },
        finishCloseResumeViewer() {
            if (!this.resumeViewerClosing) return;
            this.resumeViewerVisible = false;
            this.resumeViewerClosing = false;
            this.resumeViewerAnimationClass = "";
            this.$nextTick(() => {
                if (this._resumeViewerOpener?.isConnected) this._resumeViewerOpener.focus();
                this.unlockPageScroll();
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

            const reducedMotion = this.prefersReducedMotion();
            const sparkColors = ["#00f0ff", "#ff4fd8", "#66ff99", "#eef7f8"];
            this.degreeFireworks = reducedMotion ? [] : Array.from({ length: 28 }, (_, index) => {
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
        openImageProject(project, event) {
            this.clearAllTextAnimations(true);
            this._projectOpener = event?.currentTarget || document.activeElement;
            this.lockPageScroll();
            this.projectModalVisible = false;

            this.$nextTick(() => {
                this.projectModalImages = project.file;
                this.projectModalName = project.name;
                this.projectModalCaptions = project.galleryCaptions || [];
                this.projectModalDesc = project.desc || "";
                this.projectModalSections = project.sections || [];
                this.projectModalIndex = 0;
                this.viewerImageSizeClass = "";

                this.projectModalVisible = true;
                this.animationClass = "cyberpunk-in";

                this.$nextTick(() => {
                    (window.matchMedia("(max-width: 768px)").matches ? this.$refs.projectMobileClose : this.$refs.projectClose).focus();
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

            });
        },

        openViewer(event) {
            if (!this.projectModalVisible || !this.projectModalImages.length) return;
            this._viewerOpener = event?.currentTarget || document.activeElement;
            if (this._viewerCloseTimer) clearTimeout(this._viewerCloseTimer);
            this.imageViewerClosing = false;
            this.imageViewerVisible = true;
            this.$nextTick(() => this.$refs.viewerClose.focus());
        },
        onViewerTouchStart(event) {
            const touch = event.changedTouches[0];
            this._viewerTouchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
        },
        onViewerTouchEnd(event) {
            const start = this._viewerTouchStart;
            this._viewerTouchStart = null;
            const touch = event.changedTouches[0];
            if (!start || !touch || this.projectModalImages.length < 2) return;
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
            if (dx < 0) this.nextImage();
            else this.prevImage();
        },
        onViewerImageLoad(event) {
            const image = event.currentTarget;
            const source = this.projectModalImages[this.projectModalIndex] || "";
            if (/\.svg(?:[?#]|$)/i.test(source)) {
                this.viewerImageSizeClass = "vector";
            } else if (image.naturalWidth >= image.naturalHeight && image.naturalWidth < 500 && image.naturalHeight < 800) {
                this.viewerImageSizeClass = "tiny";
            } else if (image.naturalWidth >= image.naturalHeight && image.naturalWidth < 1000 && image.naturalHeight < 800) {
                this.viewerImageSizeClass = "small";
            } else {
                this.viewerImageSizeClass = "";
            }
        },
        closeViewer() {
            if (!this.imageViewerVisible || this.imageViewerClosing) return;
            this.imageViewerClosing = true;
            this._viewerCloseTimer = setTimeout(this.finishCloseViewer, this.prefersReducedMotion() ? 30 : 340);
        },
        onViewerAnimationEnd(event) {
            if (event.target === event.currentTarget && event.animationName === "cyberpunkOut" && this.imageViewerClosing) this.finishCloseViewer();
        },
        finishCloseViewer() {
            if (this._viewerCloseTimer) clearTimeout(this._viewerCloseTimer);
            this._viewerCloseTimer = null;
            this.imageViewerVisible = false;
            this.imageViewerClosing = false;
            this.$nextTick(() => { if (this._viewerOpener?.isConnected) this._viewerOpener.focus(); });
        },

        goToImage(idx) {
            this.viewerImageSizeClass = "";
            this.projectModalIndex = idx;
        },
        nextImage() {
            this.viewerImageSizeClass = "";
            this.projectModalIndex = (this.projectModalIndex + 1) % this.projectModalImages.length;
        },
        prevImage() {
            this.viewerImageSizeClass = "";
            this.projectModalIndex = (this.projectModalIndex - 1 + this.projectModalImages.length) % this.projectModalImages.length;
        },
        closeProjectModal() {
            if (this.imageViewerVisible) { this.closeViewer(); return; }
            this.clearAllTextAnimations(true);
            this.animationClass = "cyberpunk-out";
        },

        startClose() {
            this.clearAllTextAnimations(true);
            this.animationClass = "cyberpunk-out";
        },
        onAnimationEnd(event) {
            if (event.target !== event.currentTarget || event.animationName !== "cyberpunkOut" || this.animationClass !== "cyberpunk-out") return;

            if (this.modalVisible) {
                this.modalVisible = false;
                if (this.$refs.descText) this.$refs.descText.innerHTML = "";
                this.$nextTick(() => { if (this._documentOpener?.isConnected) this._documentOpener.focus(); });
            }
            if (this.projectModalVisible) {
                this.projectModalVisible = false;
                this.projectModalSections = [];
                this.projectModalCaptions = [];
                if (this.$refs.projectDescText) this.$refs.projectDescText.innerHTML = "";
                this.$nextTick(() => { if (this._projectOpener?.isConnected) this._projectOpener.focus(); });
            }

            this.animationClass = "";
            this.$nextTick(this.unlockPageScroll);
        },
        handleKeydown(e) {
            if (e.key === "Tab") { this.focusInTopModal(e); return; }
            if (this.resumeViewerVisible) {
                if (e.key === "Escape") this.closeResumeViewer();
                return;
            }
            if (this.imageViewerVisible) {
                if (e.key === "Escape") this.closeViewer();
                if (e.key === "ArrowLeft") this.prevImage();
                if (e.key === "ArrowRight") this.nextImage();
                return;
            }
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
        this.updatePageMetadata();
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
        this.initScrollAnimations();
        this._motionPreferenceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        this._motionPreferenceHandler = (event) => {
            if (event.matches) this.disableScrollAnimationsForReducedMotion();
        };
        if (typeof this._motionPreferenceQuery.addEventListener === "function") {
            this._motionPreferenceQuery.addEventListener("change", this._motionPreferenceHandler);
        } else if (typeof this._motionPreferenceQuery.addListener === "function") {
            this._motionPreferenceQuery.addListener(this._motionPreferenceHandler);
        }
        this.initModalListeners();
        this.syncServerDate();
        window.addEventListener("scroll", this.updateNavigationState, { passive: true });
        window.addEventListener("resize", this.updateNavigationState);
        this.updateNavigationState();
    },
    beforeDestroy() {
        this.teardownScrollAnimations();
        if (this._viewerCloseTimer) clearTimeout(this._viewerCloseTimer);
        this.modalVisible = false;
        this.projectModalVisible = false;
        this.imageViewerVisible = false;
        this.resumeViewerVisible = false;
        this.unlockPageScroll();
        this.clearAllTextAnimations(false);
        this.destroyModalListeners();
        if (this._motionPreferenceQuery && this._motionPreferenceHandler) {
            if (typeof this._motionPreferenceQuery.removeEventListener === "function") {
                this._motionPreferenceQuery.removeEventListener("change", this._motionPreferenceHandler);
            } else if (typeof this._motionPreferenceQuery.removeListener === "function") {
                this._motionPreferenceQuery.removeListener(this._motionPreferenceHandler);
            }
        }
        window.removeEventListener("scroll", this.updateNavigationState);
        window.removeEventListener("resize", this.updateNavigationState);
    },
});
