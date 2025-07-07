class SortDropdown {
    constructor(element) {
        // Основной элемент компонента
        this.element = element;

        // BEM элементы
        this.trigger = element.querySelector('.sort-dropdown__trigger');
        this.menu = element.querySelector('.sort-dropdown__menu');
        this.valueElement = element.querySelector('.sort-dropdown__value');
        this.options = element.querySelectorAll('.sort-dropdown__option');

        // Состояние компонента
        this.isOpen = false;
        this.selectedValue = this.getSelectedOption()?.dataset.value || 'cheap';

        // Инициализация
        this.init();
    }

    /**
     * Инициализация компонента
     */
    init() {
        this.bindEvents();
        this.updateAriaAttributes();
    }

    /**
     * Привязка событий
     */
    bindEvents() {
        // Клик по триггеру
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });

        // Клик по опциям
        this.options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectOption(option);
            });
        });

        // Клик вне компонента для закрытия
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.close();
            }
        });

        // Обработка клавиш для доступности
        this.trigger.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        // Обработка клавиш для опций
        this.options.forEach(option => {
            option.addEventListener('keydown', (e) => {
                this.handleOptionKeyDown(e, option);
            });
        });
    }

    /**
     * Переключение состояния dropdown
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Открытие dropdown
     */
    open() {
        this.isOpen = true;
        // Добавляем BEM модификатор для открытого состояния
        this.element.classList.add('sort-dropdown--open');
        this.trigger.setAttribute('aria-expanded', 'true');

        // Фокус на первой опции для навигации с клавиатуры
        const firstOption = this.options[0];
        if (firstOption) {
            firstOption.focus();
        }
    }

    /**
     * Закрытие dropdown
     */
    close() {
        this.isOpen = false;
        // Убираем BEM модификатор
        this.element.classList.remove('sort-dropdown--open');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.focus();
    }

    /**
     * Выбор опции
     */
    selectOption(selectedOption) {
        const value = selectedOption.dataset.value;
        const text = selectedOption.textContent.trim();

        // Обновляем выбранное значение
        this.selectedValue = value;
        this.valueElement.textContent = text;

        // Обновляем активную опцию (BEM модификатор)
        this.options.forEach(option => {
            option.classList.remove('sort-dropdown__option--active');
            option.setAttribute('aria-selected', 'false');
        });

        selectedOption.classList.add('sort-dropdown__option--active');
        selectedOption.setAttribute('aria-selected', 'true');

        // Закрываем dropdown
        this.close();

        // Генерируем кастомное событие для внешнего использования
        this.element.dispatchEvent(new CustomEvent('sortchange', {
            detail: { value, text }
        }));

        console.log('Выбрана сортировка:', { value, text });
    }

    /**
     * Получение текущей выбранной опции
     */
    getSelectedOption() {
        return this.element.querySelector('.sort-dropdown__option--active');
    }

    /**
     * Обработка нажатий клавиш для trigger
     */
    handleKeyDown(e) {
        switch (e.key) {
            case 'Enter':
            case ' ':
            case 'ArrowDown':
                e.preventDefault();
                this.open();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.open();
                break;
            case 'Escape':
                this.close();
                break;
        }
    }

    /**
     * Обработка нажатий клавиш для опций
     */
    handleOptionKeyDown(e, currentOption) {
        const currentIndex = Array.from(this.options).indexOf(currentOption);

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.selectOption(currentOption);
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % this.options.length;
                this.options[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? this.options.length - 1 : currentIndex - 1;
                this.options[prevIndex].focus();
                break;
            case 'Escape':
                this.close();
                break;
            case 'Home':
                e.preventDefault();
                this.options[0].focus();
                break;
            case 'End':
                e.preventDefault();
                this.options[this.options.length - 1].focus();
                break;
        }
    }

    /**
     * Обновление ARIA атрибутов для доступности
     */
    updateAriaAttributes() {
        this.trigger.setAttribute('aria-expanded', this.isOpen.toString());

        // Устанавливаем уникальные id для связи trigger с menu
        const menuId = 'sort-menu-' + Math.random().toString(36).substr(2, 9);
        this.menu.setAttribute('id', menuId);
        this.trigger.setAttribute('aria-controls', menuId);
    }
}

/**
 * Инициализация компонента при загрузке DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    // Находим все элементы с классом sort-dropdown
    const dropdowns = document.querySelectorAll('.sort-dropdown');

    // Инициализируем каждый dropdown
    dropdowns.forEach(dropdown => {
        new SortDropdown(dropdown);
    });

    // Пример обработки события изменения сортировки
    const sortDropdown = document.getElementById('sortDropdown');
    if (sortDropdown) {
        sortDropdown.addEventListener('sortchange', (e) => {
            console.log('Сортировка изменена:', e.detail);
            // Здесь можно добавить логику обновления контента
        });
    }
});