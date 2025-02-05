window.onload = function () {
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function documentActions(e) {
        if (!e.target.closest(".header__main .header__menu")) {
            menuEl.querySelector(".header__menu-item_hover")?.classList.remove("header__menu-item_hover")
        }
    }

    function lockBody() {
        // let paddingValue = window.innerWidth - document.documentElement.clientWidth;
        // if (lockPaddingElements && paddingValue) {
        //     lockPaddingElements.style.paddingRight = paddingValue + "px"
        // }
        document.body.classList.add("_lock")
    }

    function unlockBody() {
        // if (lockPaddingElements) {
        //     lockPaddingElements.style.paddingRight = ""
        // }
        document.body.classList.remove("_lock")
    }

    function openPopup(popup = undefined) {
        lockBody()
        if (popup) {
            popup.classList.add("popup_open")
        } else {
            console.log("Give me a popup")
        }
    }

    function closePopup() {
        let popup = document.querySelector(".popup_open")

        popup.classList.remove("popup_open");
        popup.addEventListener("transitionend", () => {
            if (!document.querySelector(".header__burger_open") && !headerEl.classList.contains("header_menu-open")) {
                unlockBody()
            }

            if (popup.querySelector(".form-block_sent")) {
                popup.classList.remove("popup_white")
                popup.querySelector(".form-block_sent").classList.remove("form-block_sent")
            }

            if (popup.querySelector("form")) {
                popup.querySelector("form").reset()
            }
        }, {once: true})
    }

    async function validateForm(form) {
        const reqFiedls = form.querySelectorAll("[class$='input_required']")

        function changeContentPage(form) {
            const formBlockEl = form.closest(".form-block__body");

            formBlockEl.style.opacity = "0"
            if (formBlockEl.closest(".popup")) {
                formBlockEl.closest(".popup").classList.add("popup_white")
            }
            formBlockEl.addEventListener("transitionend", () => {
                form.closest(".form-block").classList.add("form-block_sent")
                formBlockEl.style.opacity = "1"
            }, {once: true})
        }

        let errors = 0;
        for (let i = 0; i < reqFiedls.length; i++) {
            if (reqFiedls[i].getAttribute("name") === "name") {
                if (reqFiedls[i].value === "") {
                    reqFiedls[i].closest(".form__control").classList.add("form__control_error");
                    errors++;
                }
            }
            if (reqFiedls[i].getAttribute("name") === "phone") {
                if (reqFiedls[i].value.trim() === "" || reqFiedls[i].value.length < 15) {
                    reqFiedls[i].closest(".form__control").classList.add("form__control_error");
                    errors++;
                }
            }

            if (reqFiedls[i].getAttribute("name") === "checkbox") {
                if (!reqFiedls[i].checked) {
                    reqFiedls[i].classList.add("form__check-input_error")
                    errors++
                }
            }
        }

        if (errors) {
            console.log("Fill req fields");
        } else {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
            })

            if (!res.ok) {
                const text = await res.text()
                try {
                    console.error('Ошибка при отправке запроса, тело ответа:\n', JSON.parse(text))
                } catch {
                    console.error('Ошибка при отправке запроса, тело ответа:\n', text)
                }
                return
            }

            form.classList.add("form_sending")
            form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = true)
            setTimeout(() => {
                changeContentPage(form)
                resetForm(form)
            }, 200)
        }
    }

    function resetForm(form) {
        form.reset();
        form.classList.remove("form_sending")
        form.querySelectorAll(".form__control").forEach(controlEl => controlEl.className = "form__control")
        form.querySelectorAll("input, textarea").forEach(inputEl => inputEl.disabled = false)
    }

    function changeCity(value, label) {
        headerCityEl.dataset.city = value
        headerCityEl.lastElementChild.innerHTML = label
    }

    document.addEventListener("click", documentActions)
    // Header
    const headerEl = document.querySelector(".header");
    const headerCityEl = headerEl.querySelector(".header__city");
    const burgerMenuEl = headerEl.querySelector(".header__burger");
    const menuEl = document.querySelector(".header__menu")

    menuEl.addEventListener("click", e => {
        const targetEl = e.target;
        // (!targetEl.closest(".header__menu-item") && !targetEl.closest(".header__submenu")) || targetEl.closest(".submenu__item")
        if (!targetEl.closest(".header__menu-item") || targetEl.closest(".submenu__item")) {
            return
        }

        let hasSubmenu = targetEl.closest(".header__menu-item").childElementCount === 3

        if (!hasSubmenu || !isMobile.any()) {
            return
        }

        if (targetEl.closest(".header__submenu-back-button")) {
            menuEl.classList.remove("header__menu_submenu-open")
            return
        }

        e.preventDefault();

        if (window.innerWidth >= 1080 && isMobile.any()) {
            let activeMenuItem = document.querySelector(".header__menu-item_hover");
            let menuItemEl = targetEl.closest(".header__menu-item");

            if (menuItemEl === activeMenuItem) {
                menuItemEl.classList.remove("header__menu-item_hover")
            } else {
                activeMenuItem?.classList.remove("header__menu-item_hover")
                menuItemEl.classList.add("header__menu-item_hover")
            }
        }

        if (window.innerWidth < 1080) {
            menuEl.classList.add("header__menu_submenu-open")
        }
    })

    const tabletMediaQuery = window.matchMedia("(max-width: 1080px)")
    const gapMediaQuery = window.matchMedia("(max-width: 768px)")
    const phoneMediaQuery = window.matchMedia("(max-width: 576px)")

    const footerMenuItemEls = headerEl.querySelectorAll(".header__footer .header__menu-item");

    function replaceFooterMenu(e) {
        if (e.matches) {
            menuEl.querySelector(".header__menu-list").append(...footerMenuItemEls)
        } else {
            headerEl.querySelector(".header__footer .header__menu-list").append(...footerMenuItemEls)
        }
    }

    function replaceButton(e) {
        const buttonEl = headerEl.querySelector(".header__button");
        if (e.matches) {
            menuEl.append(buttonEl)
        } else {
            headerEl.querySelector(".header__actions").append(buttonEl)
        }
    }

    function redrawMenu(e) {
        const headerTopEl = headerEl.querySelector(".header__top");
        const callEl = headerEl.querySelector(".header__call")
        if (e.matches) {
            headerTopEl.firstElementChild.after(callEl)
            menuEl.append(headerTopEl)
            if (burgerMenuEl.classList.contains("header__burger_open")) {
                headerEl.classList.add("header_menu-open")
            }
        } else {
            headerEl.querySelector(".header__actions").prepend(callEl)
            headerEl.querySelector(".container").prepend(headerTopEl)
            if (headerEl.classList.contains("header_menu-open")) {
                burgerMenuEl.classList.add("header__burger_open")
            }
        }
    }

    tabletMediaQuery.addEventListener("change", e => {
        if (!e.matches) {
            if (burgerMenuEl.classList.contains("header__burger_open")) {
                burgerMenuEl.classList.remove("header__burger_open");
                menuEl.classList.remove("header__menu_open");
                menuEl.classList.remove("header__menu_submenu-open")
                document.querySelectorAll(".header__menu-item_open").forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
                document.body.classList.remove("_lock")
            }
        }
    })

    tabletMediaQuery.addEventListener("change", replaceFooterMenu)
    gapMediaQuery.addEventListener("change", replaceButton)
    phoneMediaQuery.addEventListener("change", redrawMenu)

    replaceButton(gapMediaQuery)
    redrawMenu(phoneMediaQuery)
    replaceFooterMenu(tabletMediaQuery)

    burgerMenuEl.addEventListener("click", () => {
        if (burgerMenuEl.classList.contains("header__burger_open")) {
            document.querySelectorAll(".header__menu-item_open")
                .forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
            headerEl.classList.remove("header_menu-open")
            menuEl.classList.remove("header__menu_submenu-open")
            unlockBody()
        } else {
            lockBody()
            window.scrollTo(0, 0)
        }

        if (window.innerWidth <= 576) {
            headerEl.classList.add("header_menu-open")
        } else {
            burgerMenuEl.classList.toggle("header__burger_open");
        }
        menuEl.classList.toggle("header__menu_open")
    })

    document.querySelector(".header__menu-close").addEventListener("click", () => {
        headerEl.classList.remove("header_menu-open")
        menuEl.classList.remove("header__menu_open")
        menuEl.classList.remove("header__menu_submenu-open")
        burgerMenuEl.classList.remove("header__burger_open");
        document.querySelectorAll(".header__menu-item_open")
            .forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
        unlockBody()
    })

    // Popups
    const citiesItemEls = document.querySelectorAll(".popup .city")
    const citiesPopupEl = document.querySelector(".popup_cities");
    const callBackPopupEl = document.querySelector(".popup_callback")

    headerCityEl.addEventListener("click", () => {
        openPopup(citiesPopupEl)
    })

    citiesItemEls.forEach(cityItemEl => cityItemEl.addEventListener("click", (e) => {
        e.preventDefault()
        changeCity(
            cityItemEl.dataset.city,
            cityItemEl.lastElementChild.innerHTML
        )
        closePopup()
        document.querySelector(".city_active").classList.remove("city_active")
        cityItemEl.classList.add("city_active")
    }))

    document
        .querySelectorAll(".header__call-desc, .header__button, .header__actions .header__call-icon, .hero-section__button, .step__button, .footer__button, .footer__call-desc")
        .forEach(button => button.addEventListener("click", () => openPopup(callBackPopupEl)))

    document.querySelectorAll(".popup__close").forEach(
        closeEl => closeEl.addEventListener("click", closePopup)
    )

    document.querySelectorAll(".popup").forEach(
        popupEl => popupEl.addEventListener("click", e => {
            if (!e.target.closest(".popup__content")) {
                closePopup()
            }
        })
    )

    document.addEventListener("keydown", (e) => {
        if (e.which === 27) {
            closePopup()
        }
    })


    // Form 
    const inputEls = document.querySelectorAll(".form__input, .form__check-input")
    const inputControlClass = "form__control"

    inputEls.forEach(inputEl => {
        let inputControlEl = inputEl.closest("." + inputControlClass)

        // ввод
        if (!inputControlEl) {
            inputEl.addEventListener("change", () => {
                if (inputEl.className.includes("error")) {
                    inputEl.classList.remove("form__check-input_error")
                }
            })
            return
        }

        inputEl.addEventListener("input", () => {
            if (inputControlEl.classList.contains(inputControlClass + "_error")) {
                inputControlEl.classList.remove(inputControlClass + "_error")
            }
        })

        inputEl.addEventListener("change", () => {
            if (inputEl.value.trim() !== "") {
                inputControlEl.classList.add("form__control_filled")
            } else {
                inputControlEl.classList.remove("form__control_filled")
            }
        })
    })

    document.querySelector(".form__file-input").addEventListener("change", e => {
        if (e.target.files[0].size > 100 * 1024 * 1024) {
            alert("Размер файла не должен превышать 30 MB")
            return
        }
        const parentEl = e.target.closest(".form__file");
        parentEl.querySelector(".form__file-doc .text").innerHTML = e.target.files[0].name
        parentEl.classList.add("form__file_attached")
        parentEl.querySelector(".form__file-doc button").addEventListener("click", () => {
            e.target.value = "";
            parentEl.classList.remove("form__file_attached")
        }, {once: true})
    })

    for (let i = 0; i < document.forms.length; i++) {
        document.forms[i].addEventListener("submit", e => {
            e.preventDefault();
            validateForm(e.target)
        })
    }

    document.querySelectorAll("input[name='phone']").forEach(inputElement => {
        inputElement.addEventListener("keypress", (e) => {
            const length = e.target.value.length;
            if (e.charCode < 48 || e.charCode > 57 || length > 15) {
                e.preventDefault();
                return;
            }

            switch (length) {
                case 0:
                    e.target.value = "+7 ";
                    break;
                case 6:
                    e.target.value += " ";
                    break;
                case 10:
                case 13:
                    e.target.value += "-";
                    break;
                default:
                    break;
            }
        })
        inputElement.addEventListener("input", e => {
            e.target.value.length === 3 && (e.target.value = "")
        })
    })

    if (window.Swiper) {
        new Swiper(".specialists-section .swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
            breakpoints: {
                577: {
                    spaceBetween: 20,
                    slidesPerView: "auto",
                },
                820: {
                    slidesPerView: 3
                },
                1080: {
                    slidesPerView: 4
                }
            },
            navigation: {
                prevEl: ".specialists-section .swiper-button-prev",
                nextEl: ".specialists-section .swiper-button-next",
            }
        })

        new Swiper(".press-center-section .swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
            wathchOverlow: true,
            breakpoints: {
                577: {
                    spaceBetween: 20,
                },
            },
            navigation: {
                prevEl: ".press-center-section .swiper-button-prev",
                nextEl: ".press-center-section .swiper-button-next",
            }
        })

        new Swiper(".reviews-section .swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
            breakpoints: {
                577: {
                    spaceBetween: 20
                }
            },
            navigation: {
                prevEl: ".reviews-section .swiper-button-prev",
                nextEl: ".reviews-section .swiper-button-next",
            }
        })

        new Swiper(".certificates-section__swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
            breakpoints: {
                577: {
                    spaceBetween: 20
                }
            },
            navigation: {
                prevEl: ".certificates-section .swiper-button-prev",
                nextEl: ".certificates-section .swiper-button-next",
            }
        })

        new Swiper(".projects-section__swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
            breakpoints: {
                577: {
                    spaceBetween: 20
                }
            },
            navigation: {
                prevEl: ".projects-section .swiper-button-prev",
                nextEl: ".projects-section .swiper-button-next",
            }
        })
    }


    // reviews & seo text
    const reviewItemEls = document.querySelectorAll(".review");
    const seoContentEl = document.querySelector(".seo-content")
    const maxHeights = {};

    const target = document.querySelector('.reviews-section__grid');
    const callback = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.target !== target || !mutation.addedNodes.length) return

            mutation.addedNodes.forEach(node => {
                const review = node.querySelector('.review');
                checkElemHeight(review, maxHeights.review);
                review.querySelector(".review__more").addEventListener("click", () => changeElemHeight(review));
            })
        }
    };

    const observer = new MutationObserver(callback);
    if (target) {
        observer.observe(target, { childList: true });
    }


    if (reviewItemEls.length) {
        maxHeights.review = parseFloat(getComputedStyle(document.querySelector(".review__text")).maxHeight)
    }

    if (seoContentEl) {
        maxHeights.seo = parseFloat(getComputedStyle(document.querySelector(".seo-content__text")).maxHeight)
    }

    function changeElemHeight(elem) {
        const buttonTextEl = elem.querySelector("span")
        const className = elem.classList[0];
        if (elem.classList.contains(className + "_open")) {
            elem.classList.remove(className + "_open")
            buttonTextEl.innerHTML = "Читать далее"
        } else {
            elem.classList.add(className + "_open")
            buttonTextEl.innerHTML = "Свернуть текст"
        }
    }

    function checkElemHeight(elem, maxHeight) {
        const className = elem.classList[0];
        const textEl = elem.querySelector("." + className + "__text");
        const readMoreEl = elem.querySelector("." + className + "__more")

        if (textEl.offsetHeight < textEl.scrollHeight) {
            !elem.classList.contains(className + "_hide") && elem.classList.add(className + "_hide")
        } else {
            if (!elem.classList.contains(className + "_open")) {
                elem.className = className
            } else if (textEl.offsetHeight <= maxHeight) {
                elem.className = className
                readMoreEl.querySelector("span").innerHTML = "Читать далее"
            }
        }
    }

    reviewItemEls.forEach(reviewItemEl => {
        checkElemHeight(reviewItemEl, maxHeights.review);
        reviewItemEl.querySelector(".review__more").addEventListener("click", () => changeElemHeight(reviewItemEl));
    })


    if (reviewItemEls.length) {
        window.addEventListener("resize", () => {
            reviewItemEls.forEach(reviewItemEl => checkElemHeight(reviewItemEl, maxHeights.review));
        })
    }

    if (seoContentEl) {
        checkElemHeight(seoContentEl, maxHeights.seo);
        seoContentEl.querySelector(".seo-content__more").addEventListener("click", () => changeElemHeight(seoContentEl))
        window.addEventListener("resize", () => checkElemHeight(seoContentEl, maxHeights.seo))
    }

    /**
     * Для мобильных устройств выводит сообщения на карте о том,
     * что карту нужно перемещать двумя пальцами.
     * */
    function turnOffDragByOneFinger(map) {
        if (!isMobile.any()) return

        const eventsPaneEl = map.panes.get('events')?.getElement()
        if (!eventsPaneEl) return

        const mobilePanelStyles = {
            alignItems: 'center',
            boxSizing: 'border-box',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '22px',
            fontFamily: 'Arial,sans-serif',
            opacity: '0.0',
            padding: '25px',
            textAlign: 'center',
            transition: 'opacity .3s',
            touchAction: 'auto',
        }

        Object.keys(mobilePanelStyles).forEach(function (name) {
            const cssProp = name

            eventsPaneEl.style[cssProp] = mobilePanelStyles[cssProp]
        })

        map.behaviors.disable('drag')

        // @ts-ignore
        ymaps.domEvent.manager.add(eventsPaneEl, 'touchmove', function (event) {
            if (event.get('touches').length === 1) {
                eventsPaneEl.style.transition = 'opacity .3s'
                eventsPaneEl.style.background = 'rgba(0, 0, 0, .45)'
                eventsPaneEl.textContent = 'Чтобы переместить карту проведите по ней двумя пальцами'
                eventsPaneEl.style.opacity = '1'
            }
        })

        // @ts-ignore
        ymaps.domEvent.manager.add(eventsPaneEl, 'touchend', function () {
            eventsPaneEl.style.transition = 'opacity .8s'
            eventsPaneEl.style.opacity = '0'
        })
    }

    // yandex map

    function init(mapContainerSelector) {
        function setMapPin() {
            let myCollection = new ymaps.GeoObjectCollection();
            let coords = mapEl?.dataset.mark?.split(',').map(Number) || [55.7954692462696, 49.10686513125719];
            // создание и установка пинов
            myCollection.add(new ymaps.Placemark(coords, {
                iconLayout: "default#image",
                iconImageHref: imagesSrc.pinImage,
                iconImageSize: [60, 60],
            }));
            // добавление пинов на карту
            map.geoObjects.add(myCollection);
        }

        async function getCoords() {
            setTimeout(() => {
                setMapPin()
            }, 2000)
        }

        let mapEl = document.getElementById(mapContainerSelector);
        let center = mapEl?.dataset.center?.split(',').map(Number) || [55.79551291555022, 49.10679244528347];

        // создание карты
        let map = new ymaps.Map(mapContainerSelector, {
            center,
            controls: [],
            zoom: 14,
        }, {autoFitToViewport: 'always'})

        map.behaviors.disable('scrollZoom')
        turnOffDragByOneFinger(map)

        let imagesSrc = mapEl.dataset

        getCoords()
    }

    ymaps.ready(() => init("map"));
    if (document.getElementById("contact-map")) {
        ymaps.ready(() => init("contact-map"));
    }


    // faq

    const faqItemHeaderEls = document.querySelectorAll(".accordion__header");

    faqItemHeaderEls.forEach(faqItemHeaderEl => {
        let timeoutId;
        faqItemHeaderEl.addEventListener("click", e => {
            const faqItemEl = faqItemHeaderEl.parentElement;
            const faqItemBodyEl = faqItemHeaderEl.nextElementSibling;
            const faqItemTextEl = faqItemBodyEl.firstElementChild;

            if (faqItemEl.classList.contains("accordion_open")) {
                let faqItemBodyHeight = faqItemBodyEl.scrollHeight;
                faqItemBodyEl.style.height = faqItemBodyHeight + "px";
                faqItemEl.classList.remove("accordion_open")
                timeoutId = setTimeout(() => faqItemBodyEl.style.height = "")
            } else {
                clearTimeout(timeoutId)
                timeoutId = null
                faqItemEl.classList.add("accordion_open");
                faqItemBodyEl.style.height = faqItemTextEl.offsetHeight + "px";
                faqItemBodyEl.addEventListener("transitionend", () => {
                    if (timeoutId) {
                        return
                    }
                    faqItemBodyEl.style.height = "auto"
                }, {once: true})
            }
        })
    })

    // filter panel

    const filterPanelEl = document.querySelector(".filter-panel");
    const filterItemElAll = document.querySelector(".filter-panel__item[data-value='all']");

    filterPanelEl?.addEventListener("click", e => {
        const filterItemEl = e.target.closest(".filter-panel__item");
        if (!filterItemEl) {
            return
        }

        if (filterItemEl === filterItemElAll && filterItemElAll.classList.contains("filter-panel__item_active")) {
            return;
        }

        if (filterItemEl === filterItemElAll) {
            filterPanelEl.querySelectorAll('.filter-panel__item_active')
                .forEach(item => item.classList.remove('filter-panel__item_active'));
            filterItemElAll.classList.add('filter-panel__item_active')
            return;
        }

        if (filterItemEl.classList.contains("filter-panel__item_active")) {
            filterItemEl.classList.remove("filter-panel__item_active");
            const noActiveFilter = !filterPanelEl.querySelector('.filter-panel__item_active')

            if (noActiveFilter) {
                filterItemElAll.classList.add('filter-panel__item_active');
            }
            return;
        }

        filterItemElAll.classList.remove('filter-panel__item_active');
        filterItemEl.classList.add("filter-panel__item_active");
    })

    if (document.querySelector("[data-fancybox]")) {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
            on: {
                init: () => console.log("!!!!!!"),
                ready: () => console.log("ready")
            }
        });
    }

    // prices page
    if (document.querySelector(".prices-section")) {
        const pricesNavEl = document.querySelector(".prices-section__nav")
        const servicesCategoriesEl = pricesNavEl.nextElementSibling;
        const activeCategoryClassName = "prices-section__category_active"
        pricesNavEl.addEventListener("click", e => {
            const categoryButton = e.target.closest(".prices-section__category-button");

            pricesNavEl.querySelector(".prices-section__category-button_active").classList.remove("prices-section__category-button_active")
            categoryButton.classList.add("prices-section__category-button_active")

            servicesCategoriesEl.style.opacity = 0;
            servicesCategoriesEl.addEventListener("transitionend", () => {
                servicesCategoriesEl.querySelector("." + activeCategoryClassName).classList.remove(activeCategoryClassName)
                servicesCategoriesEl.style.opacity = ""
                servicesCategoriesEl
                    .querySelector("[data-category='" + categoryButton.dataset.category + "']")
                    .classList.add(activeCategoryClassName)
            }, {once: true})
        })

        let scroll = new LocomotiveScroll()
        let formBlockEl = document.querySelector(".form-block")

        document.querySelectorAll(".prices-section__category").forEach(categoryBlock => {
            categoryBlock.addEventListener("click", e => {
                const buttonEl = e.target.closest(".service__button")
                if (!buttonEl) {
                    return
                }

                const textareaEl = formBlockEl.querySelector("textarea")
                const formControlEl = textareaEl.closest(".form__control")
                const serviceName = buttonEl.closest(".service").querySelector(".service__name").innerHTML

                textareaEl.value = serviceName
                formControlEl.classList.add("form__control_filled")
                formBlockEl.querySelector("input[type='hidden']").value = buttonEl.dataset["serviceName"]
                scroll.scrollTo(formBlockEl)
            })
        })
    }

    // single project page
    function redrawTable(e, init) {
        if (e.matches) {
            let tableCells = document.querySelectorAll("table td:last-child")
            tableCells.forEach(tableCell => {
                let tableRow = document.createElement("tr");
                tableCell.closest("tr").after(tableRow)
                tableRow.append(tableCell)
            })
        } else if (!init) {
            let tableRows = document.querySelectorAll("table tr:nth-child(2n)")
            tableRows.forEach(tableRow => {
                tableRow.previousElementSibling.append(tableRow.firstElementChild);
                tableRow.remove()
            })
        }
    }

    gapMediaQuery.addEventListener("change", redrawTable)
    redrawTable(gapMediaQuery, true)
}
