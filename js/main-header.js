// JavaScript для интерактивности
document.addEventListener('DOMContentLoaded', function() {
    // Обработка поиска
    const searchInput = document.querySelector('.search__input');
    const searchButton = document.querySelector('.search__button');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            if (query.length > 2) {
                console.log('Поиск:', query);
                // Здесь можно добавить логику поиска
            }
        });

        // Обработка нажатия Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    console.log('Выполнить поиск:', query);
                    // Здесь можно добавить логику отправки формы поиска
                }
            }
        });
    }

    // Обработка кнопки поиска
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('Выполнить поиск через кнопку:', query);
                // Здесь можно добавить логику отправки формы поиска
            }
        });
    }

    // Обработка кнопок действий
    const actionButtons = document.querySelectorAll('.actions__icon-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const label = this.getAttribute('aria-label');
            console.log('Нажата кнопка:', label);

            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Обработка выпадающего списка регионов
    const locationSelector = document.querySelector('.actions__location');
    const locationDropdown = document.querySelector('.location-dropdown');
    const locationText = document.querySelector('.actions__location-text');
    const locationItems = document.querySelectorAll('.location-dropdown__item');

    if (locationSelector && locationDropdown) {
        // Открытие/закрытие dropdown
        locationSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = locationDropdown.classList.contains('location-dropdown--active');

            if (isActive) {
                closeLocationDropdown();
            } else {
                openLocationDropdown();
            }
        });

        // Обработка клавиатуры для accessibility
        locationSelector.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                locationSelector.click();
            }
        });

        // Выбор региона
        locationItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();

                // Обновляем выбранный элемент
                locationItems.forEach(i => {
                    i.classList.remove('location-dropdown__item--selected');
                    i.setAttribute('aria-selected', 'false');
                });

                this.classList.add('location-dropdown__item--selected');
                this.setAttribute('aria-selected', 'true');

                // Обновляем текст
                const regionName = this.textContent.trim();
                const shortName = regionName.length > 20 ? regionName.substring(0, 20) + '...' : regionName;
                locationText.textContent = shortName;

                // Закрываем dropdown
                closeLocationDropdown();

                console.log('Выбран регион:', regionName);
            });
        });

        // Закрытие dropdown при клике вне его
        document.addEventListener('click', function(e) {
            if (!locationSelector.contains(e.target)) {
                closeLocationDropdown();
            }
        });

        // Закрытие dropdown при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLocationDropdown();
            }
        });

        function openLocationDropdown() {
            locationDropdown.classList.add('location-dropdown--active');
            locationSelector.classList.add('actions__location--active');
            locationSelector.setAttribute('aria-expanded', 'true');
        }

        function closeLocationDropdown() {
            locationDropdown.classList.remove('location-dropdown--active');
            locationSelector.classList.remove('actions__location--active');
            locationSelector.setAttribute('aria-expanded', 'false');
        }
    }

    // Обработка кнопки каталога
    const catalogButton = document.querySelector('.nav__cta-button');
    if (catalogButton) {
        catalogButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Переход в каталог');
            // Здесь можно добавить логику навигации
        });
    }
});