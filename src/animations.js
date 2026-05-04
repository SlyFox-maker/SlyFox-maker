window.portfolioAnimations = {
        clearAnimationForElement(el) {
            const anim = this.currentAnimations.get(el);
            if (anim) {
                cancelAnimationFrame(anim);
                this.currentAnimations.delete(el);
            }

            // Очищаем таймеры scrambleTextSimple
            const timeouts = this.activeTimeouts.get(el) || [];
            timeouts.forEach((t) => clearTimeout(t));
            this.activeTimeouts.delete(el);
        },

        getRandomColorClass() {
            const colorClasses = ["scramble-cyan", "scramble-aqua", "scramble-magenta", "scramble-pink", "scramble-green", "scramble-hot-pink", "scramble-aqua"];
            return colorClasses[Math.floor(Math.random() * colorClasses.length)];
        },
        scrambleText(oldText, newText, element, callback) {
            const chars = "!<>-_\\/[]{}—=+*^?#________";
            let frame = 0;
            const length = newText.length;
            const charsPerFrame = 3;

            this.clearAnimationForElement(element);

            const animate = () => {
                let output = "";
                for (let i = 0; i < length; i++) {
                    if (i < frame) {
                        output += `<span class="${this.getRandomColorClass()}">${newText[i]}</span>`;
                    } else {
                        output += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                element.innerHTML = output;
                frame += charsPerFrame;
                if (frame <= length) {
                    const anim = requestAnimationFrame(animate);
                    this.currentAnimations.set(element, anim);
                } else {
                    element.innerHTML = newText
                        .split("")
                        .map((ch) => `<span class="scramble-final">${ch}</span>`)
                        .join("");
                    if (callback) callback();
                    this.currentAnimations.delete(element);
                }
            };
            animate();
        },

        scrambleTextSimple(element, newText) {
            this.clearAnimationForElement(element);

            element.classList.remove("flash-effect");
            void element.offsetWidth;
            element.classList.add("flash-effect");

            const t1 = setTimeout(() => {
                element.textContent = newText;
            }, 200);
            const t2 = setTimeout(() => {
                element.classList.remove("flash-effect");
            }, 400);

            this.activeTimeouts.set(element, [t1, t2]);
        },

        animateList(ulElement, items) {
            // Отменяем текущую анимацию списка
            const prev = this.listAnimations.get(ulElement);
            if (prev) prev.stop = true;
            this.listAnimations.set(ulElement, { stop: false });

            const state = this.listAnimations.get(ulElement);
            ulElement.innerHTML = "";
            let index = 0;

            const addNext = () => {
                if (state.stop) return; // остановка цепочки
                if (index >= items.length) return;

                const li = document.createElement("li");
                ulElement.appendChild(li);
                this.scrambleText("", items[index], li, () => {
                    index++;
                    addNext();
                });
            };
            addNext();
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
