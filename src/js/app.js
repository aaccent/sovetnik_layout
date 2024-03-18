window.onload = function() {
    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }; 

    // device detection
    // if (
    //     /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    //     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))
    //    ) { 
    //     isMobile = true;
    // }

    // function validateEmail(email) {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    function lockBody() {
        // let paddingValue = window.innerWidth - document.documentElement.clientWidth;
        // if (lockPaddingElements && paddingValue) {
        //     lockPaddingElements.style.paddingRight = paddingValue + "px"
        // }
        document.body.classList.add("_lock")
    }

    function unlockBody () {
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
        popup.addEventListener("transitionend", () =>  {
            if (!document.querySelector(".header__burger_open")) {
                unlockBody() 
            }

            if (popup.querySelector(".form-block_sent")) {
                popup.querySelector(".form-block_sent").classList.remove("form-block_white")
                popup.querySelector(".form-block_sent").classList.remove("form-block_sent")
            }

            if (popup.querySelector("form")) {
                popup.querySelector("form").reset()
            }
            // if (popup.querySelector(".form-block").classList.contains("form-block_sent")) {
            //     popup.querySelector(".form-block").classList.remove("form-block_sent")
            // } else {
            //     resetForm(popup.querySelector(".form"))
            // }
        }, {once: true})
    }
    
    function changeCity(value, label) {
        headerCityEl.dataset.city = value
        headerCityEl.lastElementChild.innerHTML = label
    }

    function validateForm(form) {    
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
            }, { once: true })
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
            form.classList.add("form_sending")
            form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = true)
            setTimeout(() => {
                changeContentPage(form)
                resetForm(form)
            }, 1000)
        }
    }
    
    function resetForm(form) {
        form.reset();
        form.classList.remove("form_sending")
        form.querySelectorAll(".form__control").forEach(controlEl => controlEl.className = "form__control")
    }

    // Header
    const headerEl = document.querySelector(".header");
    const headerCityEl = headerEl.querySelector(".header__city");
    const burgerMenuEl = headerEl.querySelector(".header__burger");

    const citiesItemEls = document.querySelectorAll(".popup .city")

    // Popups
    const citiesPopupEl = document.querySelector(".popup_cities");
    const callBackPopupEl = document.querySelector(".popup_callback")

    headerCityEl.addEventListener("click", () => {
        openPopup(citiesPopupEl)
    })

    citiesItemEls.forEach(cityItemEl => cityItemEl.addEventListener("click", () => {
        changeCity(
            cityItemEl.dataset.city,
            cityItemEl.lastElementChild.innerHTML
        )
        closePopup()
        document.querySelector(".city_active").classList.remove("city_active")
        cityItemEl.classList.add("city_active")
    }))

    document
        .querySelectorAll(".header__call-desc, .header__button, .header__actions .header__call-icon, .footer__call-desc")
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

    const menuEl = document.querySelector(".header__menu")
    const menuItemEls = menuEl.querySelectorAll(".header__menu-item");

    menuEl.addEventListener("click", e => {
        const targetEl = e.target;
        if (!targetEl.closest(".header__menu-item") && !targetEl.closest(".header__submenu")) {
            return
        }

        let menuItemEl = targetEl.closest(".header__menu-item")
        if (!menuItemEl.childElementCount === 3) {
            return
        }

        e.preventDefault();
        menuItemEl.classList.toggle("header__menu-item_open")

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
                document.querySelectorAll(".header__menu-item_open").forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
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
            unlockBody()
        } else {
            lockBody()
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
        document.querySelectorAll(".header__menu-item_open")
            .forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
        unlockBody()
    })

    // form 
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

    document.querySelectorAll("input[name='phone']").forEach(inputElement => {
        inputElement.addEventListener("keypress", (e) => {
            const length = e.target.value.length;
            if (e.charCode < 48 || e.charCode > 57 || length > 15) {
                e.preventDefault();
                return;
            }
    
            switch (length) {
                case 0: 
                    e.target.value = "+7 " ;
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
        inputElement.addEventListener("input", e => {e.target.value.length === 3 && (e.target.value = "")})
    })

    for (let i = 0; i < document.forms.length; i++) {
        document.forms[i].addEventListener("submit", e => {
            e.preventDefault();
            validateForm(e.target)
        })
    }
    document.querySelector(".form__file-input").addEventListener("change", e => {
        if (e.target.files[0].size > 30 * 1024 * 1024) {
            alert("Размер файла не должен превышать 30 MB")
            return
        }
        const parentEl = e.target.closest(".form__file");
        parentEl.querySelector(".form__file-doc .text").innerHTML = e.target.files[0].name
        parentEl.classList.add("form__file_attached")
        parentEl.querySelector(".form__file-doc button").addEventListener("click", () => {
            e.target.value = "";
            parentEl.classList.remove("form__file_attached")
        }, { once: true })
    })
}

// Валидация российского номер
function validateRuPhone(str) {
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        str
    );
}
// Валидация российского номер END

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
    spaceBetween: 20,
    slidesPerView: "auto",
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

// reviews & seo text
const reviewItemEls = document.querySelectorAll(".review");
const seoContentEl = document.querySelector(".seo-content")

const maxHeights = {
    review: parseFloat(getComputedStyle(document.querySelector(".review__text")).maxHeight),
    seo: parseFloat(getComputedStyle(document.querySelector(".seo-content__text")).maxHeight),
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
    reviewItemEl.querySelector(".review__more").addEventListener("click", () => changeElemHeight(reviewItemEl))
})

checkElemHeight(seoContentEl, maxHeights.seo);
seoContentEl.querySelector(".seo-content__more").addEventListener("click", () => changeElemHeight(seoContentEl))

if (reviewItemEls.length) {
    window.addEventListener("resize", () => {
        reviewItemEls.forEach(reviewItemEl => checkElemHeight(reviewItemEl, maxHeights.review))
        checkElemHeight(seoContentEl, maxHeights.seo)
    })
}

// yandex map

function init() {
    function setMapPin() {
        let myCollection = new ymaps.GeoObjectCollection();
        let coords = mapEl?.dataset.mark?.split(',').map(Number) || [55.7954692462696,49.10686513125719];
        // создание и установка пинов
        myCollection.add(new ymaps.Placemark(coords, {
            iconLayout: "default#image",
            iconImageHref: imagesSrc.pinImage,
            iconImageSize: [60, 60],
        }));
        // добавление пинов на карту
        map.geoObjects.add(myCollection);
    }

    async function getCoords () {
        setTimeout(() => {
            setMapPin()
        }, 2000)
    }
    
    let mapEl = document.getElementById('#map');
    let center = mapEl?.dataset.center?.split(',').map(Number) || [55.79551291555022,49.10679244528347];

    // создание карты
    let map = new ymaps.Map("map", {
        center,
        controls: [],
        zoom: 14,
    })
    
    let imagesSrc = document.getElementById("map").dataset
    
    getCoords()
    
    // zoom ctrl + mouse wheel
    let ctrlKey = false
    let body = document.getElementsByTagName('body')[0];
    map.behaviors.disable(['scrollZoom']);
    body.onkeydown = callbackDown;
    body.onkeyup = callbackUp;
    function callbackDown(e){
        if(e.keyCode === 17 && !ctrlKey){
            ctrlKey = true
            map.behaviors.enable(['scrollZoom']);
        }
    }
    function callbackUp(e){
        if(e.keyCode === 17){
            ctrlKey = false
            map.behaviors.disable(['scrollZoom']);
        }
    }
}

// ymaps.ready(init);