window.portfolioAnimations = {
        writeScrambleText(element, value) {
            if (element.matches("#title, #overview .lead, [data-reveal-type='heading']") && element.childNodes.length === 1 && element.firstChild.nodeType === 3) {
                element.firstChild.nodeValue = value;
            } else {
                element.textContent = value;
            }
        },
        clearAnimationForElement(el, finish = false) {
            const anim = this.currentAnimations.get(el);
            if (anim) {
                cancelAnimationFrame(anim);
                this.currentAnimations.delete(el);
            }

            // Очищаем таймеры scrambleTextSimple
            const timeouts = this.activeTimeouts.get(el) || [];
            timeouts.forEach((t) => clearTimeout(t));
            this.activeTimeouts.delete(el);

            if (finish) {
                const finalText = this.animationFinalTexts.get(el);
                if (typeof finalText === "string") this.writeScrambleText(el, finalText);
            }

            this.animationFinalTexts.delete(el);
            this.activeAnimationElements.delete(el);
            el.classList.remove("scramble-active");
            el.style.minHeight = "";
        },
        clearAllTextAnimations(finish = false) {
            Array.from(this.activeAnimationElements).forEach((element) => {
                this.clearAnimationForElement(element, finish);
            });
        },
        prefersReducedMotion() {
            return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        },
        finishScrambleText(element, newText, callback) {
            if (element.matches("#title, #overview .lead, [data-reveal-type='heading']")) {
                this.writeScrambleText(element, newText);
            } else {
                const finalText = document.createElement("span");
                finalText.className = "scramble-final";
                finalText.textContent = newText;
                element.replaceChildren(finalText);
            }
            element.classList.remove("scramble-active");
            element.style.minHeight = "";

            this.currentAnimations.delete(element);
            this.animationFinalTexts.delete(element);
            this.activeAnimationElements.delete(element);
            if (callback) callback();
        },

        getRandomColorClass() {
            const colorClasses = ["scramble-cyan", "scramble-aqua", "scramble-magenta", "scramble-pink", "scramble-green", "scramble-hot-pink", "scramble-aqua"];
            return colorClasses[Math.floor(Math.random() * colorClasses.length)];
        },
        lockTextHeight(element, newText) {
            const currentHeight = element.getBoundingClientRect().height;
            const clone = element.cloneNode(false);

            clone.style.position = "absolute";
            clone.style.left = "-9999px";
            clone.style.top = "0";
            clone.style.visibility = "hidden";
            clone.style.pointerEvents = "none";
            clone.style.width = `${element.getBoundingClientRect().width}px`;
            clone.textContent = newText;

            element.parentNode.appendChild(clone);
            const nextHeight = clone.getBoundingClientRect().height;
            clone.remove();

            element.style.minHeight = `${Math.ceil(Math.max(currentHeight, nextHeight))}px`;
        },
        lockListHeight(ulElement, items) {
            const currentHeight = ulElement.getBoundingClientRect().height;
            const clone = ulElement.cloneNode(false);

            clone.style.position = "absolute";
            clone.style.left = "-9999px";
            clone.style.top = "0";
            clone.style.visibility = "hidden";
            clone.style.pointerEvents = "none";
            clone.style.width = `${ulElement.getBoundingClientRect().width}px`;
            items.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item;
                clone.appendChild(li);
            });

            ulElement.parentNode.appendChild(clone);
            const nextHeight = clone.getBoundingClientRect().height;
            clone.remove();

            ulElement.style.minHeight = `${Math.ceil(Math.max(currentHeight, nextHeight))}px`;
        },
        scrambleText(oldText, newText, element, callback, durationMs = null) {
            const chars = "!<>-_\\/[]{}—=+*^?#________";
            const characters = Array.from(newText);
            const length = characters.length;
            const frameInterval = 1000 / 30;
            const revealRate = durationMs ? length / (durationMs / 1000) : Math.max(180, length / 0.85);
            let startTime = null;
            let lastPaintTime = -Infinity;

            this.clearAnimationForElement(element);

            if (this.prefersReducedMotion()) {
                this.writeScrambleText(element, newText);
                if (callback) callback();
                return;
            }

            this.lockTextHeight(element, newText);
            this.animationFinalTexts.set(element, newText);
            this.activeAnimationElements.add(element);
            element.classList.add("scramble-active");

            const animate = (timestamp) => {
                if (!element.isConnected) {
                    this.clearAnimationForElement(element);
                    return;
                }
                if (startTime === null) startTime = timestamp;

                if (timestamp - lastPaintTime < frameInterval) {
                    const anim = requestAnimationFrame(animate);
                    this.currentAnimations.set(element, anim);
                    return;
                }

                lastPaintTime = timestamp;
                const revealedCharacters = Math.min(length, Math.floor(((timestamp - startTime) / 1000) * revealRate));
                let output = "";
                for (let i = 0; i < length; i++) {
                    if (/\s/.test(characters[i])) {
                        output += characters[i];
                    } else if (i < revealedCharacters) {
                        output += characters[i];
                    } else {
                        output += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                this.writeScrambleText(element, output);

                if (revealedCharacters < length) {
                    const anim = requestAnimationFrame(animate);
                    this.currentAnimations.set(element, anim);
                } else {
                    this.finishScrambleText(element, newText, callback);
                }
            };
            const anim = requestAnimationFrame(animate);
            this.currentAnimations.set(element, anim);
        },

        scrambleTextSimple(element, newText) {
            this.clearAnimationForElement(element);

            if (this.prefersReducedMotion()) {
                element.textContent = newText;
                return;
            }

            this.animationFinalTexts.set(element, newText);
            this.activeAnimationElements.add(element);

            element.classList.remove("flash-effect");
            void element.offsetWidth;
            element.classList.add("flash-effect");

            const t1 = setTimeout(() => {
                element.textContent = newText;
            }, 200);
            const t2 = setTimeout(() => {
                element.classList.remove("flash-effect");
                this.animationFinalTexts.delete(element);
                this.activeAnimationElements.delete(element);
            }, 400);

            this.activeTimeouts.set(element, [t1, t2]);
        },

        animateList(ulElement, items) {
            // Отменяем текущую анимацию списка
            const prev = this.listAnimations.get(ulElement);
            if (prev) prev.stop = true;
            this.listAnimations.set(ulElement, { stop: false });

            this.lockListHeight(ulElement, items);
            const state = this.listAnimations.get(ulElement);
            ulElement.innerHTML = "";
            const listItems = items.map(() => {
                const li = document.createElement("li");
                ulElement.appendChild(li);
                return li;
            });

            listItems.forEach((li, index) => {
                if (state.stop) return;
                this.scrambleText("", items[index], li);
            });
        },

        teardownScrollAnimations() {
            if (this._revealObserver) this._revealObserver.disconnect();
            this._revealObserver = null;
            if (this._revealListeners) {
                this._revealListeners.forEach((listener, element) => element.removeEventListener("animationend", listener));
                this._revealListeners.clear();
            }
            this.$el.querySelectorAll("[data-reveal-id]").forEach((element) => {
                element.classList.remove("reveal-pending", "reveal-active", "reveal-skill-active", "reveal-project-active", "reveal-certificate-active", "reveal-resume-active", "reveal-contact-active", "reveal-education-active", "section-activation");
                if (this._revealedIds && this._revealedIds.has(element.dataset.revealId)) element.classList.add("reveal-complete");
                element.style.removeProperty("--reveal-delay");
            });
        },
        disableScrollAnimationsForReducedMotion() {
            if (!this._revealedIds) this._revealedIds = new Set();
            this.clearAllTextAnimations(true);
            this.teardownScrollAnimations();
            this.$el.querySelectorAll("[data-reveal-id]").forEach((element) => {
                this._revealedIds.add(element.dataset.revealId);
                element.classList.remove("section-activation");
                element.classList.add("reveal-complete");
            });
        },
        pulseSectionAccent(element) {
            if (!element || this.prefersReducedMotion()) return;
            element.classList.remove("section-activation");
            void element.offsetWidth;
            element.classList.add("section-activation");
            const onEnd = (event) => {
                if (event.target !== element || event.animationName !== "sectionAccentSweep") return;
                element.classList.remove("section-activation");
                element.removeEventListener("animationend", onEnd);
                this._revealListeners.delete(element);
            };
            this._revealListeners.set(element, onEnd);
            element.addEventListener("animationend", onEnd);
        },
        activateReveal(element) {
            const type = element.dataset.revealType;
            if (type === "heading") {
                const headingText = element.textContent;
                if (headingText) this.scrambleText("", headingText, element, null, 300);
                if (["skills", "projects", "degrees"].includes(element.closest("section, .contact-info")?.id)) this.pulseSectionAccent(element);
                return;
            }

            const activeClasses = {
                skills: ["reveal-skill-active", "skillCardPulse"],
                projects: ["reveal-project-active", "projectFrameHold"],
                certificate: ["reveal-certificate-active", "certificateFrameHold"],
                resume: ["reveal-resume-active", "resumeDocumentReveal"],
                contact: ["reveal-contact-active", "contactQuietReveal"],
            };
            if (type === "education") {
                element.classList.add("reveal-education-active", "reveal-complete");
                return;
            }

            const config = activeClasses[type];
            if (!config) {
                element.classList.add("reveal-complete");
                return;
            }
            const [activeClass, animationName] = config;
            element.classList.add(activeClass);
            const onEnd = (event) => {
                if (event.target !== element || event.animationName !== animationName) return;
                element.removeEventListener("animationend", onEnd);
                this._revealListeners.delete(element);
                element.classList.remove(activeClass, "reveal-pending");
                element.classList.add("reveal-complete");
                element.style.removeProperty("--reveal-delay");
            };
            this._revealListeners.set(element, onEnd);
            element.addEventListener("animationend", onEnd);
        },
        scrambleVisibleSectionHeadings() {
            if (this.prefersReducedMotion()) return;
            this.$el.querySelectorAll('[data-reveal-type="heading"]').forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (!this._revealedIds.has(element.dataset.revealId) || rect.bottom <= 0 || rect.top >= window.innerHeight) return;
                const text = element.textContent;
                if (text) this.scrambleText("", text, element, null, 300);
            });
        },
        initScrollAnimations() {
            this.teardownScrollAnimations();
            if (!this._revealedIds) this._revealedIds = new Set();
            if (!this._revealListeners) this._revealListeners = new Map();
            const targets = Array.from(this.$el.querySelectorAll("[data-reveal-id]"));

            if (this.prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
                targets.forEach((element) => {
                    this._revealedIds.add(element.dataset.revealId);
                    element.classList.add("reveal-complete");
                });
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                let cardIndex = 0;
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const element = entry.target;
                    observer.unobserve(element);
                    this._revealedIds.add(element.dataset.revealId);
                    const staggeredTypes = ["skills", "projects", "certificate", "contact"];
                    const delay = staggeredTypes.includes(element.dataset.revealType) ? (cardIndex++ % 2) * 65 : 0;
                    element.style.setProperty("--reveal-delay", `${delay}ms`);
                    if (element.dataset.revealType === "education") {
                        const progressFill = element.querySelector(".university-progress-fill");
                        if (progressFill) void progressFill.offsetWidth;
                    }
                    element.classList.remove("reveal-pending");
                    this.activateReveal(element);
                });
            }, { threshold: 0.01, rootMargin: "0px 0px 120px 0px" });
            this._revealObserver = observer;

            targets.forEach((element) => {
                const id = element.dataset.revealId;
                const rect = element.getBoundingClientRect();
                if (this._revealedIds.has(id) || rect.bottom < 0) {
                    this._revealedIds.add(id);
                    element.classList.add("reveal-complete");
                    return;
                }
                if (rect.top > window.innerHeight + 120) element.classList.add("reveal-pending");
                observer.observe(element);
            });
        }
};
