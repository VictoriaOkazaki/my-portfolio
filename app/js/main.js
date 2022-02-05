const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header__menu');

if ($(window).width() < 541) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        headerMenu.classList.toggle('header__menu--active');
        if (burger.classList.contains('burger--active')) {
            $("#burger__img").attr("src","../images/burger-close.png");
        } else if (!burger.classList.contains('burger--active')){
            $("#burger__img").attr("src","../images/burger-btn.png");
        }
    })
}

const menuList = document.querySelectorAll('.header__menu-item');

menuList.forEach(item => {
    item.addEventListener('click', () => {
        menuList.forEach(openItem => {
            if (openItem.classList.contains('header__menu-item--active') && openItem !== item) {
                openItem.classList.remove('header__menu-item--active');
            }
        })
        item.classList.toggle('header__menu-item--active');
    })
});

const headerLinks = document.querySelectorAll('.header__menu-item a');

    headerLinks.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();

            const id = element.getAttribute('href').substring(1);
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            }
        });
    });

const backToTop = document.querySelector('.footer__to-top-link');
const homeSection = document.getElementById('home');

backToTop.addEventListener('click', (event) => {
    event.preventDefault();

    homeSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

const ruButton = document.querySelector('.ru-btn');
const engButton = document.querySelector('.eng-btn');

let lang = 'en';
const worksBtn = document.querySelector('.works__btn');

ruButton.addEventListener('click', () => {
    ruButton.classList.add('home-btn--active');
    engButton.classList.remove('home-btn--active');
    worksBtn.style.display = 'block' 
    lang = 'ru';

    $('.header-home')[0].innerHTML = "Главная";
    $('.header-about')[0].innerHTML = "Обо мне";
    $('.header-works')[0].innerHTML = "Работы";
    $('.header-skills')[0].innerHTML = "Навыки";
    $('.header-contacts')[0].innerHTML = "Контакты";
    $('.home__info-title')[0].innerHTML = "Казакова Виктория";
    $('.home__info-description')[0].innerHTML = "Фронтенд разработчик";

    $('.about__title')[0].innerHTML = "Обо мне";
    $('.about-job__title')[0].innerHTML = "Моя работа состоит в:";
    $('.about-me__title')[0].innerHTML = "Обо мне";
    $('.about-me__text')[0].innerHTML = "Меня зовут Виктория, и я живу в Баку. Окончила в 2020 году Московский Государственный Университет. Изучение веб-разработки я начала с конструкторов Tilda и Webflow. Я продолжила работу над созданием сайтов после освоения языков верстки и программирования.";
    $('.about-job__item-1')[0].innerHTML = "создании сайтов с помощью HTML, CSS (или SASS) и Javascript в соответствии с макетом Figma";
    $('.about-job__item-2')[0].innerHTML = "Постоении макетов на Tilda с использованием зеро-блоков";
    $('.about-job__item-3')[0].innerHTML = "адаптации сайтов под различные устройства (мобильные в первую очередь)";
    $('.about-job__item-4')[0].innerHTML = "организации CMS систем на Wordpress и баз данных";

    $('.works__title')[0].innerHTML = "Работы";

    $('.works__btn')[0].innerHTML = "Показать еще";
    $('.skills__title')[0].innerHTML = "Навыки";
    $('.skills__subtitle-1')[0].innerHTML = "В работе я использую:";
    $('.skills__subtitle-2')[0].innerHTML = "Другие навыки:";

    $('.footer__to-top-text')[0].innerHTML = "Наверх";
    $('.footer__title')[0].innerHTML = "Контакты";

    getData();
});

engButton.addEventListener('click', () => {
    window.location.reload();
});

const getData = () => {
    const list = document.querySelector('.works__list');
    const btn = document.querySelector('.works__btn');

    const stack = 6;
    let count = 1;

    const render = (data) =>{
        list.innerHTML = '';

        data.forEach(item => {
            const description = lang === 'ru' ? item.ru_description : item.description
            const linkInner = lang === 'ru' ? "Показать сайт" : "View the site"
            list.insertAdjacentHTML('beforeend', `
                <li class="works__item">
                    <img class="works__item-img" src="./${item.photo}" alt="website cover">
                    <h4 class="works__item-title">${item.name}</h4>
                    <p class="works__item-text">${description}</p>
                    <a class="works__item-link" href="${item.link}" target="_blank">${linkInner}</a>
                </li>
            `)
        })
    }

    const sliceArray = (data, index) => {
        return data.slice(0, index);
    }

    const changeData = (data) => {
        const newStack = stack * count;
        render(sliceArray(data, newStack));

        if (data.length > newStack) {
            count++
        } else {
            btn.style.display = 'none';
        }
    }

    const getSites = () => {
        fetch("https://my-portfolio-db68b-default-rtdb.firebaseio.com/db.json")
          .then((responce) => {
            if (responce.ok) {
              return responce.json();
            } else {
              throw new Error("");
            }
          })
          .then((data) => {
            changeData(data);
          })
          .catch((error) => {
            console.error(error.message);
          });
    }
    btn.addEventListener('click', getSites);
    getSites();
};

getData();