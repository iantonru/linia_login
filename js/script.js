const cover = document.querySelector(".cover");
const loginPage = document.querySelector('.loginPage');
const registerPage = document.querySelector('.registerPage');
const changePage = document.querySelector('#changePage');
const groupRegister = document.querySelector('.group__register');
const closeRegister = document.querySelector('.register__close');

let xxl = window.matchMedia('(min-width: 1400px)');
let xl = window.matchMedia('(min-width: 1200px)');
let lg = window.matchMedia('(min-width: 992px)');
let md = window.matchMedia('(min-width: 768px)');
let counter = 1

function clickResize(translateXValue, leftValue) {
    if (counter % 2 === 1) {
        anime({
            targets: cover,
            translateX: [
                { value: translateXValue },
            ],
            scaleX: [
                { value: 3 },
                { value: 1 },
            ],
            easing: 'linear',
        });
        anime({
            targets: ".loginPage",
            opacity: 0,
            left: leftValue,
        })
        anime({
            targets: ".registerPage",
            opacity: 1,
            left: leftValue,
        })
        anime({
            targets: ".registerPage",
            opacity: 1,
            delay: 600,
        })
        anime({
            targets: ".card__text-right",
            opacity: 0,
            translateX: [{ value: 300 }],
            duration: 500,
            easing: 'linear'
        })
        anime({
            targets: ".card__text-left",
            translateX: [{ value: 0 }],
            marginLeft: "0px",
            opacity: 1,
            easing: 'linear'
        })

        counter += 1;
    } else {
        anime({
            targets: cover,
            translateX: [
                { value: 0 },
            ],
            scaleX: [
                { value: 3 },
                { value: 1 },
            ],
            easing: 'linear',
        });
        anime({
            targets: ".loginPage",
            opacity: 1,
            left: 0,
        })
        anime({
            targets: ".loginPage",
            opacity: 1,
            delay: 600,
        })
        anime({
            targets: ".registerPage",
            opacity: 0,
            left: 0,
        })
        anime({
            targets: ".card__text-left",
            translateX: [{ value: -300 }],
            marginLeft: "-300px",
            opacity: 0,
            duration: 500,
            easing: 'linear'
        })
        anime({
            targets: ".card__text-right",
            opacity: 1,
            translateX: [{ value: 0 }],
            easing: 'linear'
        })

        counter += 1;
    };

    $('#changePage').css('pointer-events', 'none');
    setTimeout(function () {
        $('#changePage').css('pointer-events', 'all');
    }, 1200);

    if ($('.changePage-span').eq(0).hasClass('changePage-span_active')) {
        $('.changePage-span').eq(0).toggleClass('changePage-span_active');
        setTimeout(function () {
            $('.changePage-span').eq(1).toggleClass('changePage-span_active');
        }, 1200);
    } else {
        $('.changePage-span').eq(1).toggleClass('changePage-span_active');
        setTimeout(function () {
            $('.changePage-span').eq(0).toggleClass('changePage-span_active');
        }, 1200);
    }
}

function resize(translateXValue, leftValue) {
    if (counter % 2 === 0) {
        anime({
            targets: cover,
            translateX: [
                { value: translateXValue },
            ],
        });
        anime({
            targets: ".loginPage",
            left: leftValue,
        })
        anime({
            targets: ".registerPage",
            left: leftValue,
        })
    }
}

$("#changePage").on('click', function () {
    if (xxl.matches === true) {
        clickResize(-844, 450);
    } else if (xl.matches === true) {
        clickResize(-714, 400);
    } else if (lg.matches === true) {
        clickResize(-584, 350);
    } else if (md.matches === true) {
        clickResize(-444, 250);
    }
})

window.addEventListener('resize', function () {
    if (xxl.matches === true) {
        resize(-844, 450);
        registerPage.style.maxHeight = '100%';
    } else if (xl.matches === true) {
        resize(-714, 400);
        registerPage.style.maxHeight = '100%';
    } else if (lg.matches === true) {
        resize(-584, 350);
        registerPage.style.maxHeight = '100%';
    } else if (md.matches === true) {
        resize(-444, 250);
        registerPage.style.maxHeight = '100%';
    }
});

groupRegister.addEventListener('click', function () {
    registerPage.style.maxHeight = '100%';
    registerPage.style.pointerEvents = 'auto';
    loginPage.style.pointerEvents = 'none';
});

closeRegister.addEventListener('click', function () {
    registerPage.style.maxHeight = '0px';
    registerPage.style.pointerEvents = 'none';
    loginPage.style.pointerEvents = 'auto';
});

changePage.addEventListener('click', function () {
    if (registerPage.style.opacity == '1') {
        registerPage.style.pointerEvents = 'none';
        loginPage.style.pointerEvents = 'all';
    } else {
        registerPage.style.pointerEvents = 'all';
        loginPage.style.pointerEvents = 'none';
    }
});

function resizeScreen() {
    if (window.innerWidth > window.innerHeight) {
        registerPage.style.maxHeight = '100%';
    } else if (window.innerWidth < window.innerHeight) {
        if (counter % 2 == 0) {
            loginPage.style.opacity = '1';
            registerPage.style.maxHeight = '100%';
            registerPage.style.pointerEvents = 'auto';
        } else if (counter % 2 == 1) {
            registerPage.style.maxHeight = '0px';
        }
    }
}

window.addEventListener('resize', resizeScreen);

// Pop-up
let popupBg = document.querySelector('.popup-bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
});

closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if (e.target === popupBg) { // Если цель клика - фот, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
    }
});