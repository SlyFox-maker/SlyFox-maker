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
            let frame = 0;
            const length = newText.length;
            const charsPerFrame = 3;

            this.clearAnimationForElement(element);
            this.lockTextHeight(element, newText);

            const animate = () => {
                let output = "";
                for (let i = 0; i < length; i++) {
                    if (/\s/.test(newText[i])) {
                        output += newText[i];
                    } else if (i < frame) {
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
