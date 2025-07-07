class SimpleBrandCarousel {
    constructor() {
        // DOM elements
        this.brandWrapper = document.getElementById('brandWrapper');
        this.nextBtn = document.getElementById('nextBtnTwo');

        // State management
        this.activeBrands = new Set(['artel', 'apple']); // Pre-selected brands
        this.swiper = null;

        // Initialize
        this.init();
    }

    /**
     * Mock data for brands
     */
    getBrandsData() {
        return [
            { id: 'artel', name: 'Artel' },
            { id: 'apple', name: 'Apple' },
            { id: 'samsung', name: 'Samsung' },
            { id: 'xiaomi', name: 'Xiaomi' },
            { id: 'belkin', name: 'Belkin' },
            { id: 'bq', name: 'BQ' },
            { id: 'huawei', name: 'Huawei' },
            { id: 'honor', name: 'Honor' },
            { id: 'nokia', name: 'Nokia' },
            { id: 'google', name: 'Google' },
            { id: 'nokia2', name: 'Nokia' },
            { id: 'huawei', name: 'Huawei' },
            { id: 'honor', name: 'Honor' },
            { id: 'nokia', name: 'Nokia' },
            { id: 'google', name: 'Google' },
        ];
    }

    /**
     * Create HTML for brand item
     */
    createBrandItem(brand) {
        const isActive = this.activeBrands.has(brand.id);
        return `
                    <div class="swiper-slide brand-carousel__slide">
                        <button 
                            class="brand-item ${isActive ? 'brand-item--active' : ''}" 
                            data-brand-id="${brand.id}"
                            data-brand-name="${brand.name}"
                            type="button"
                            aria-pressed="${isActive}"
                        >
                            ${brand.name}
                        </button>
                    </div>
                `;
    }

    /**
     * Initialize Swiper carousel
     */
    initSwiper() {
        this.swiper = new Swiper('.brand-carousel__swiper', {
            // Display multiple slides
            slidesPerView: 'auto',
            spaceBetween: 12,
            freeMode: false,

            // Navigation with only next button
            navigation: {
                nextEl: '.brand-carousel__next',
            },

            // Responsive breakpoints
            breakpoints: {
                320: {
                    spaceBetween: 8,
                    slidesPerGroup: 2,
                },
                480: {
                    spaceBetween: 10,
                    slidesPerGroup: 3,
                },
                768: {
                    spaceBetween: 12,
                    slidesPerGroup: 4,
                },
                1024: {
                    spaceBetween: 16,
                    slidesPerGroup: 5,
                }
            },

            // Accessibility
            a11y: {
                nextSlideMessage: 'Следующие бренды',
            },

            // Keyboard navigation
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },

            // Events
            on: {
                slideChange: () => {
                    this.updateNextButton();
                },
                reachEnd: () => {
                    this.updateNextButton();
                },
                fromEdge: () => {
                    this.updateNextButton();
                }
            }
        });

        // Initial button state
        this.updateNextButton();
    }

    /**
     * Update next button state
     */
    updateNextButton() {
        if (this.swiper) {
            this.nextBtn.disabled = this.swiper.isEnd;
        }
    }

    /**
     * Handle brand selection
     */
    handleBrandClick(event) {
        const brandButton = event.target.closest('.brand-item');
        if (!brandButton) return;

        const brandId = brandButton.dataset.brandId;
        const brandName = brandButton.dataset.brandName;

        // Toggle active state
        if (this.activeBrands.has(brandId)) {
            this.activeBrands.delete(brandId);
            brandButton.classList.remove('brand-item--active');
            brandButton.setAttribute('aria-pressed', 'false');
        } else {
            this.activeBrands.add(brandId);
            brandButton.classList.add('brand-item--active');
            brandButton.setAttribute('aria-pressed', 'true');
        }

        // Log for debugging
        console.log('Active brands:', Array.from(this.activeBrands));
        console.log('Selected brand:', brandName);
    }

    /**
     * Handle keyboard events for brand items
     */
    handleKeyDown(event) {
        const brandButton = event.target.closest('.brand-item');
        if (!brandButton) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleBrandClick(event);
        }
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Brand selection
        this.brandWrapper.addEventListener('click', (event) => {
            this.handleBrandClick(event);
        });

        // Keyboard events
        this.brandWrapper.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });
    }

    /**
     * Initialize the application
     */
    init() {
        try {
            // Get brands data
            const brands = this.getBrandsData();

            // Generate HTML
            const brandsHTML = brands.map(brand => this.createBrandItem(brand)).join('');
            this.brandWrapper.innerHTML = brandsHTML;

            // Initialize Swiper
            this.initSwiper();

            // Attach event listeners
            this.attachEventListeners();

            console.log('Simple brand carousel initialized successfully');

        } catch (error) {
            console.error('Error initializing brand carousel:', error);
        }
    }
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new SimpleBrandCarousel();
});