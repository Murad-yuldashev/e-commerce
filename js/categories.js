class CategoriesCarousel {
    constructor() {
        // DOM elements
        this.loadingElement = document.getElementById('categoriesLoading');
        this.carouselElement = document.getElementById('categoriesCarousel');
        this.wrapperElement = document.getElementById('categoriesWrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        // Swiper instance
        this.swiper = null;

        // Initialize the carousel
        this.init();
    }

    /**
     * Mock API call to simulate backend data fetching
     * @returns {Promise<Array>} Promise resolving to categories data
     */
    async fetchCategoriesFromAPI() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data representing different product categories
        return [
            {
                id: 1,
                name: 'Ноутбуки',
                icon: '💻',
                backgroundColor: '#e3f2fd',
                slug: 'notebooks'
            },
            {
                id: 2,
                name: 'Мониторы',
                icon: '🖥️',
                backgroundColor: '#f3e5f5',
                slug: 'monitors'
            },
            {
                id: 3,
                name: 'Клавиатуры',
                icon: '⌨️',
                backgroundColor: '#e8f5e8',
                slug: 'keyboards'
            },
            {
                id: 4,
                name: 'Комплектующие',
                icon: '🔧',
                backgroundColor: '#fff3e0',
                slug: 'components'
            },
            {
                id: 5,
                name: 'Аксессуары',
                icon: '🎧',
                backgroundColor: '#fce4ec',
                slug: 'accessories'
            },
            {
                id: 6,
                name: 'Клавиатуры',
                icon: '⌨️',
                backgroundColor: '#e1f5fe',
                slug: 'keyboards-gaming'
            },
            {
                id: 7,
                name: 'Серверы',
                icon: '🖲️',
                backgroundColor: '#ffebee',
                slug: 'servers'
            },
            {
                id: 8,
                name: 'Наушники',
                icon: '🎧',
                backgroundColor: '#f1f8e9',
                slug: 'headphones'
            },
            {
                id: 9,
                name: 'Планшеты',
                icon: '📱',
                backgroundColor: '#e8eaf6',
                slug: 'tablets'
            },
            {
                id: 10,
                name: 'Телефоны',
                icon: '📞',
                backgroundColor: '#e0f2f1',
                slug: 'phones'
            }
        ];
    }

    /**
     * Create HTML for a single category card
     * @param {Object} category - Category data object
     * @returns {string} HTML string for the category card
     */
    createCategoryCard(category) {
        return `
                    <div class="swiper-slide categories__slide">
                        <article 
                            class="category-card" 
                            data-category-id="${category.id}"
                            data-category-slug="${category.slug}"
                            tabindex="0"
                            role="button"
                            aria-label="Категория ${category.name}"
                        >
                            <div 
                                class="category-card__icon" 
                                style="background-color: ${category.backgroundColor}"
                                aria-hidden="true"
                            >
                                ${category.icon}
                            </div>
                            <h2 class="category-card__title">${category.name}</h2>
                        </article>
                    </div>
                `;
    }

    /**
     * Initialize Swiper carousel with configuration
     */
    initSwiper() {
        this.swiper = new Swiper('.categories__swiper', {
            // Responsive breakpoints
            slidesPerView: 1,
            spaceBetween: 16,
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 16
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 24
                }
            },

            // Navigation
            navigation: {
                nextEl: '.categories__nav-btn--next',
                prevEl: '.categories__nav-btn--prev',
            },

            // Accessibility
            a11y: {
                prevSlideMessage: 'Предыдущий слайд',
                nextSlideMessage: 'Следующий слайд',
            },

            // Enable keyboard navigation
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },

            // Loop if there are enough slides
            loop: false,

            // Smooth transitions
            speed: 400,

            // Handle slide change events
            on: {
                slideChange: () => {
                    this.updateNavigationButtons();
                }
            }
        });
    }

    /**
     * Update navigation button states
     */
    updateNavigationButtons() {
        if (this.swiper) {
            this.prevBtn.disabled = this.swiper.isBeginning;
            this.nextBtn.disabled = this.swiper.isEnd;
        }
    }

    /**
     * Handle category card click events
     * @param {Event} event - Click event
     */
    handleCategoryClick(event) {
        const categoryCard = event.target.closest('.category-card');
        if (!categoryCard) return;

        const categoryId = categoryCard.dataset.categoryId;
        const categorySlug = categoryCard.dataset.categorySlug;
        const categoryName = categoryCard.querySelector('.category-card__title').textContent;

        // Log the interaction (in real app, this would navigate or filter products)
        console.log('Category selected:', {
            id: categoryId,
            slug: categorySlug,
            name: categoryName
        });

        // Visual feedback
        categoryCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            categoryCard.style.transform = '';
        }, 150);

        // In a real application, you would navigate to the category page
        // window.location.href = `/category/${categorySlug}`;
        // alert(`Переход в категорию: ${categoryName}`);
    }

    /**
     * Handle keyboard navigation for accessibility
     * @param {Event} event - Keyboard event
     */
    handleKeyDown(event) {
        const categoryCard = event.target.closest('.category-card');
        if (!categoryCard) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleCategoryClick(event);
        }
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Category card clicks
        this.wrapperElement.addEventListener('click', (event) => {
            this.handleCategoryClick(event);
        });

        // Keyboard navigation
        this.wrapperElement.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.loadingElement.classList.remove('categories__loading--hidden');
        this.carouselElement.style.display = 'none';
    }

    /**
     * Hide loading state and show carousel
     */
    hideLoading() {
        this.loadingElement.classList.add('categories__loading--hidden');
        this.carouselElement.style.display = 'block';
    }

    /**
     * Initialize the carousel application
     */
    async init() {
        try {
            // Show loading state
            this.showLoading();

            // Fetch categories from mock API
            const categories = await this.fetchCategoriesFromAPI();

            // Generate HTML for all categories
            const categoriesHTML = categories.map(category =>
                this.createCategoryCard(category)
            ).join('');

            // Insert categories into DOM
            this.wrapperElement.innerHTML = categoriesHTML;

            // Initialize Swiper
            this.initSwiper();

            // Attach event listeners
            this.attachEventListeners();

            // Hide loading and show carousel
            this.hideLoading();

            // Update navigation buttons initial state
            this.updateNavigationButtons();

            console.log('Categories carousel initialized successfully');

        } catch (error) {
            console.error('Error initializing categories carousel:', error);
            this.loadingElement.textContent = 'Ошибка загрузки категорий';
        }
    }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new CategoriesCarousel();
});