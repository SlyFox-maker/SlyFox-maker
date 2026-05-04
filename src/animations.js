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

        getRandomColor() {
            const colors = ["#0ff", "#00ffff", "#ff00ff", "#ff69b4", "#39ff14", "#ff1493", "#00ffff"];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        scrambleText(oldText, newText, element, callback) {
            const chars = "!<>-_\\/[]{}—=+*^?#________";
            let frame = 0;
            const length = newText.length;

            this.clearAnimationForElement(element);

            const animate = () => {
                let output = "";
                for (let i = 0; i < length; i++) {
                    if (i < frame) {
                        const color = this.getRandomColor();
                        output += `<span style="color:${color}; text-shadow: 0 0 5px ${color}, 0 0 10px ${color}">${newText[i]}</span>`;
                    } else {
                        output += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                element.innerHTML = output;
                frame++;
                if (frame <= length) {
                    const anim = requestAnimationFrame(animate);
                    this.currentAnimations.set(element, anim);
                } else {
                    const finalColor = "#00ffff";
                    element.innerHTML = newText
                        .split("")
                        .map((ch) => `<span style="color:${finalColor}; text-shadow: 0 0 5px ${finalColor}, 0 0 10px ${finalColor}">${ch}</span>`)
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
