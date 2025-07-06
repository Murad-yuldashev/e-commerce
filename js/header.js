// Translation data
const translations = {
    ru: {
        'for-buyer': 'Для покупателя',
        'for-seller': 'Для продавца',
        'add-company': 'Добавить компанию',
        'become-buyer': 'Стать покупателем',
        'catalog': 'Каталог',
        'search_on_glotr': 'Искать на Glotr',
        "become_seller": "Стать продавцом на",
        "register": "Зарегистрироваться",
        "phones_and_tablets": "Телефоны и планшеты",
        "loading_categories": "Загрузка категорий",

        'Andijan': 'Андижанская',
        'Bukhara': 'Бухарская',
        'Fergana': 'Ферганская',
        'Jizzakh': 'Джизакская',
        'Khorezm': 'Хорезмская',
        'Namangan': 'Наманганская',
        'Navoi': 'Навоийская',
        'Kashkadarya': 'Кашкадарьинская',
        'Karakalpakstan': 'Каракалпакстан',
        'Samarkand': 'Самаркандская',
        'Syrdarya': 'Сырдарьинская',
        'Surkhandarya': 'Сурхандарьинская',
        'Tashkent': 'Ташкентская об',
        'Tashkent-City': 'Город Ташкент',
    },
    en: {
        'for-buyer': 'For Buyer',
        'for-seller': 'For Seller',
        'add-company': 'Add Company',
        'become-buyer': 'Become Buyer',
        'catalog': 'Catalog',
        'search_on_glotr': 'Search on Glotr',
        "become_seller": "Become a seller",
        "register": "Register",
        "phones_and_tablets": "Phones and Tablets",
        "loading_categories": "Loading categories",

        'Andijan': 'Andijan',
        'Bukhara': 'Bukhara',
        'Fergana': 'Fergana',
        'Jizzakh': 'Jizzakh',
        'Khorezm': 'Khorezm',
        'Namangan': 'Namangan',
        'Navoi': 'Navoi',
        'Kashkadarya': 'Kashkadarya',
        'Karakalpakstan': 'Karakalpakstan',
        'Samarkand': 'Samarkand',
        'Syrdarya': 'Syrdarya',
        'Surkhandarya': 'Surkhandarya',
        'Tashkent': 'Tashkent',
        'Tashkent-City': 'Tashkent City',
    },
    uz: {
        'for-buyer': 'Xaridor uchun',
        'for-seller': 'Sotuvchi uchun',
        'add-company': 'Kompaniya qo\'shish',
        'become-buyer': 'Xaridor bo\'lish',
        'catalog': 'Katalog',
        'search_on_glotr': 'Glotr’da qidirish',
        "become_seller": "Sotuvchi bo'lish",
        "register": "Ro‘yxatdan o‘tish",
        "phones_and_tablets": "Telefonlar va planshetlar",
        "loading_categories": "Kategoriyalar yuklanmoqda",

        'Andijan': 'Andijon',
        'Bukhara': 'Buxoro',
        'Fergana': 'Fargʻona',
        'Jizzakh': 'Jizzax',
        'Khorezm': 'Xorazm',
        'Namangan': 'Namangan',
        'Navoi': 'Navoiy',
        'Kashkadarya': 'Qashqadaryo',
        'Karakalpakstan': 'Qoraqalpogʻiston',
        'Samarkand': 'Samarqand',
        'Syrdarya': 'Sirdaryo',
        'Surkhandarya': 'Surxondaryo',
        'Tashkent': 'Toshkent',
        'Tashkent-City': 'Toshkent shahri',
    }
};

const languageNames = {
    ru: 'Русский',
    en: 'English',
    uz: 'O\'zbek',
};

// Language Dropdown Component
class LanguageDropdown {
    constructor() {
        this.dropdown = document.getElementById('languageDropdown');
        this.trigger = document.getElementById('languageTrigger');
        this.menu = document.getElementById('languageMenu');
        this.arrow = this.trigger.querySelector('.language-dropdown__arrow');
        this.text = this.trigger.querySelector('.language-dropdown__text');
        this.items = this.menu.querySelectorAll('.language-dropdown__item');
        this.currentLang = 'ru';
        this.isOpen = false;

        this.init();
    }

    init() {
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.selectLanguage(lang);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target)) {
                this.close();
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.menu.classList.add('language-dropdown__menu--open');
        this.arrow.classList.add('language-dropdown__arrow--open');
        this.isOpen = true;
    }

    close() {
        this.menu.classList.remove('language-dropdown__menu--open');
        this.arrow.classList.remove('language-dropdown__arrow--open');
        this.isOpen = false;
    }

    selectLanguage(lang) {
        if (lang === this.currentLang) {
            this.close();
            return;
        }

        // Update active state
        this.items.forEach(item => {
            item.classList.remove('language-dropdown__item--active');
            if (item.dataset.lang === lang) {
                item.classList.add('language-dropdown__item--active');
            }
        });

        // Update trigger text
        this.text.textContent = languageNames[lang];
        this.currentLang = lang;

        // Translate page content
        this.translatePage(lang);

        this.close();
    }

    translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update document language
        document.documentElement.lang = lang;
    }

    translatePlaceholders() {
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                el.placeholder = translations[this.currentLang][key];
            }
        });
    }
}

// Initialize language dropdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageDropdown();
});