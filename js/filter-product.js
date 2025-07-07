class FilterComponent {
    constructor() {
        this.filter = document.querySelector('.filter');
        this.init();
    }

    /**
     * Initialize the filter component
     */
    init() {
        this.bindEvents();
        this.setupKeyboardNavigation();
        console.log('Filter component initialized');
    }

    /**
     * Bind event listeners for filter interactions
     */
    bindEvents() {
        // Handle accordion toggle
        this.filter.addEventListener('click', (e) => {
            const header = e.target.closest('.filter__header');
            if (header) {
                this.toggleAccordion(header);
            }
        });

        // Handle category selection
        this.filter.addEventListener('click', (e) => {
            const categoryItem = e.target.closest('.filter__simple-item');
            if (categoryItem) {
                this.selectCategory(categoryItem);
            }
        });

        // Handle checkbox changes
        this.filter.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.handleCheckboxChange(e.target);
            }
        });
    }

    /**
     * Setup keyboard navigation for accessibility
     */
    setupKeyboardNavigation() {
        // Handle Enter/Space key for category items
        this.filter.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const categoryItem = e.target.closest('.filter__simple-item');
                if (categoryItem) {
                    e.preventDefault();
                    this.selectCategory(categoryItem);
                }
            }
        });
    }

    /**
     * Toggle accordion section
     * @param {HTMLElement} header - The header element that was clicked
     */
    toggleAccordion(header) {
        const content = header.nextElementSibling;
        const toggle = header.querySelector('.filter__toggle');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Toggle aria-expanded attribute
        header.setAttribute('aria-expanded', !isExpanded);

        // Toggle content visibility
        content.classList.toggle('filter__content--expanded');

        // Toggle arrow icon
        toggle.classList.toggle('filter__toggle--expanded');

        // Log action for debugging
        console.log(`Toggled ${header.dataset.filter} section:`, !isExpanded ? 'expanded' : 'collapsed');
    }

    /**
     * Handle category selection
     * @param {HTMLElement} categoryItem - The category item that was clicked
     */
    selectCategory(categoryItem) {
        // Remove active class from all category items
        const allCategories = this.filter.querySelectorAll('.filter__simple-item');
        allCategories.forEach(item => {
            item.classList.remove('filter__simple-item--active');
        });

        // Add active class to selected category
        categoryItem.classList.add('filter__simple-item--active');

        // Log the selected category
        const categoryName = categoryItem.textContent.trim();
        const categoryValue = categoryItem.dataset.category;
        console.log(`Selected category: ${categoryName} (${categoryValue})`);

        // Trigger custom event for external listeners
        this.dispatchFilterEvent('categoryChanged', {
            category: categoryValue,
            name: categoryName
        });
    }

    /**
     * Handle checkbox state changes
     * @param {HTMLInputElement} checkbox - The checkbox that was changed
     */
    handleCheckboxChange(checkbox) {
        const brandName = checkbox.nextElementSibling.textContent.trim();
        const brandValue = checkbox.value;
        const isChecked = checkbox.checked;

        console.log(`Brand ${brandName} (${brandValue}):`, isChecked ? 'selected' : 'deselected');

        // Get all selected brands
        const selectedBrands = this.getSelectedBrands();
        console.log('Currently selected brands:', selectedBrands);

        // Trigger custom event for external listeners
        this.dispatchFilterEvent('brandChanged', {
            brand: brandValue,
            name: brandName,
            checked: isChecked,
            selectedBrands: selectedBrands
        });
    }

    /**
     * Get all currently selected brands
     * @returns {Array} Array of selected brand objects
     */
    getSelectedBrands() {
        const checkedBoxes = this.filter.querySelectorAll('input[name="brand"]:checked');
        return Array.from(checkedBoxes).map(checkbox => ({
            value: checkbox.value,
            name: checkbox.nextElementSibling.textContent.trim()
        }));
    }

    /**
     * Get currently selected category
     * @returns {Object|null} Selected category object or null
     */
    getSelectedCategory() {
        const activeCategory = this.filter.querySelector('.filter__simple-item--active');
        if (activeCategory) {
            return {
                value: activeCategory.dataset.category,
                name: activeCategory.textContent.trim()
            };
        }
        return null;
    }

    /**
     * Dispatch custom filter events
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event detail data
     */
    dispatchFilterEvent(eventName, detail) {
        const event = new CustomEvent(eventName, {
            detail: detail,
            bubbles: true
        });
        this.filter.dispatchEvent(event);
    }

    /**
     * Get current filter state
     * @returns {Object} Current filter state
     */
    getFilterState() {
        return {
            category: this.getSelectedCategory(),
            brands: this.getSelectedBrands()
        };
    }
}

// Initialize the filter component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const filterComponent = new FilterComponent();

    // Example of listening to filter events
    document.addEventListener('categoryChanged', (e) => {
        console.log('Category changed event:', e.detail);
    });

    document.addEventListener('brandChanged', (e) => {
        console.log('Brand changed event:', e.detail);
    });

    // Make filter component available globally for testing
    window.filterComponent = filterComponent;
});