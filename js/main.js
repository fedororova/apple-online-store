// Функция для установки активной кнопки фильтрации
function setActiveFilterButton(button, filterButtons) {
    filterButtons.forEach(btn => btn.classList.remove('shop-content__filter-btn--active'));
    button.classList.add('shop-content__filter-btn--active');
}

// Функция для установки режима отображения (список или сетка)
function setViewMode(productItems, isListView) {
    productItems.forEach(item => {
        if (isListView) {
            item.classList.add('product-item--list');
        } else {
            item.classList.remove('product-item--list');
        }
    });
}

// Функция для добавления обработчиков событий
function addEventListeners() {
    const filterButtons = document.querySelectorAll('.shop-content__filter-btn');
    const buttonList = document.querySelector('.button-list');
    const buttonGrid = document.querySelector('.button-grid');
    const productItems = document.querySelectorAll('.product-item');

    if (buttonList) {
        buttonList.addEventListener('click', () => {
            setViewMode(productItems, true);
        });
    }

    if (buttonGrid) {
        buttonGrid.addEventListener('click', () => {
            setViewMode(productItems, false);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveFilterButton(button, filterButtons);
        });
    });
}

// Главная функция, выполняющая код после загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    addEventListeners();
});


// Функция для скрытия всех больших изображений
function hideAllBigImages(bigImages) {
    bigImages.forEach(bigImage => bigImage.style.display = 'none');
}

// Функция для отображения выбранного большого изображения
function showSelectedBigImage(index, bigImages) {
    if (index >= 0 && index < bigImages.length) {
        bigImages[index].style.display = 'block';
    }
}

// Функция для создания элементов рейтинга звезд
function createStarRatingElements(starElement) {
    const rating = parseFloat(starElement.getAttribute('data-rating'));
    const starCount = Math.floor(rating);
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    starElement.appendChild(starContainer);

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star-icon');
        star.innerHTML = i < starCount ? '★' : '☆';
        starContainer.appendChild(star);
    }
}

// Функция для обработки нажатия кнопок уменьшения/увеличения количества
function handleQuantityButtonClick(button, increment) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const quantityElement = increment ? button.previousElementSibling : button.nextElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        quantity += increment ? 1 : -1;
        quantity = Math.max(1, quantity); // Минимальное значение - 1
        quantityElement.textContent = quantity.toString(); // Convert quantity to string
    });
}

// Функция для создания экземпляра Swiper для указанного селектора и опций
function createSwiperInstance(selector, options) {
    const element = document.querySelector(selector);
    return element ? new Swiper(element, options) : null;
}

// Обработчик события DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const smallImages = document.querySelectorAll('.product-slide__small-img');
    const bigImages = document.querySelectorAll('.product-slide__big-item');

    smallImages.forEach((smallImage, index) => {
        smallImage.addEventListener('click', () => {
            hideAllBigImages(bigImages);
            showSelectedBigImage(index, bigImages);
        });
    });

    const starElements = document.querySelectorAll('.star');
    starElements.forEach(createStarRatingElements);

    const quantityButtons = document.querySelectorAll('.decrement, .increment');
    quantityButtons.forEach(button => {
        const increment = button.classList.contains('increment');
        handleQuantityButtonClick(button, increment);
    });

    var swiper = new Swiper(".swiperBanner", {
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    const sliders = [
        ['.blogSwiper', {navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}}],
    ];

    sliders.forEach(([selector, options]) => createSwiperInstance(selector, options));
});


// Получаем все элементы с классом product-tabs__top-item
const tabItems = document.querySelectorAll('.product-tabs__top-item');

// Получаем все элементы с классом product-tabs__content-item
const tabContentItems = document.querySelectorAll('.product-tabs__content-item');

// Добавляем обработчик события на каждый элемент с классом product-tabs__top-item
tabItems.forEach((item) => {
    item.addEventListener('click', () => {
        // Удаляем класс product-tabs__top-item--active у всех элементов
        tabItems.forEach((tab) => {
            tab.classList.remove('product-tabs__top-item--active');
        });

        // Добавляем класс product-tabs__top-item--active только текущему элементу
        item.classList.add('product-tabs__top-item--active');

        // Получаем значение атрибута data-tab текущего элемента
        const selectedTab = item.getAttribute('data-tab');

        // Перебираем все элементы с классом product-tabs__content-item
        tabContentItems.forEach((contentItem) => {
            // Скрываем все элементы, кроме того, у которого совпадает значение атрибута data-tab
            if (contentItem.id === selectedTab) {
                contentItem.style.display = 'block';
            } else {
                contentItem.style.display = 'none';
            }
        });
    });
});

