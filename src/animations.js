window.portfolioAnimations = {
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
                if (typeof finalText === "string") el.textContent = finalText;
            }

            this.animationFinalTexts.delete(el);
            this.activeAnimationElements.delete(el);
            el.classList.remove("scramble-active");
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
            const finalText = document.createElement("span");
            finalText.className = "scramble-final";
            finalText.textContent = newText;
            element.replaceChildren(finalText);
            element.classList.remove("scramble-active");

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
        scrambleText(oldText, newText, element, callback) {
            const chars = "!<>-_\\/[]{}—=+*^?#________";
            const length = newText.length;
            const frameInterval = 1000 / 30;
            const revealRate = 180;
            let startTime = null;
            let lastPaintTime = -Infinity;

            this.clearAnimationForElement(element);

            if (this.prefersReducedMotion()) {
                element.textContent = newText;
                if (callback) callback();
                return;
            }

            this.lockTextHeight(element, newText);
            this.animationFinalTexts.set(element, newText);
            this.activeAnimationElements.add(element);
            element.classList.add("scramble-active");

            const animate = (timestamp) => {
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
                    if (/\s/.test(newText[i])) {
                        output += newText[i];
                    } else if (i < revealedCharacters) {
                        output += newText[i];
                    } else {
                        output += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                element.textContent = output;

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

        initScrollAnimations() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate__animated", "animate__fadeInUp");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 },
            );
            this.$el.querySelectorAll(".scroll-animate").forEach((el) => {
                observer.observe(el);
            });
        }
};
