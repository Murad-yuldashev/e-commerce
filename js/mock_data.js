// Mock data
const mockProducts = [
    {
        id: 1,
        name: "Knife Sharpener Tool Professional",
        price: 0,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-1.png",
        inStock: false,
        store: "Media Park",
        rating: 3.99,
        discount: null,
        onSale: false
    },
    {
        id: 2,
        name: "Knife Sharpener Tool Professional Smart watch Advanced",
        price: 3000000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-2.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: 15,
        onSale: false
    },
    {
        id: 3,
        name: "Knife Sharpener Tool Professional",
        price: 2600000,
        priceType: null,
        oldPrice: 3000000,
        image: "/assets/img/product-3.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: 15,
        onSale: false
    },
    {
        id: 4,
        name: "Knife Sharpener Tool Professional",
        price: 3000000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-4.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: null,
        onSale: false
    },
    {
        id: 5,
        name: "Knife Sharpener Tool Professional",
        price: 326000,
        priceType: "мес",
        oldPrice: null,
        image: "/assets/img/product-1.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: null,
        onSale: true
    },
    {
        id: 6,
        name: "MacBook Pro 16 inch Professional Laptop",
        price: 25000000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-2.png",
        inStock: false,
        store: "Tech Store",
        rating: 4.5,
        discount: null,
        onSale: false
    },
    {
        id: 7,
        name: "iPhone 15 Pro Max 256GB",
        price: 15000000,
        priceType: null,
        oldPrice: 17000000,
        image: "/assets/img/product-3.png",
        inStock: true,
        store: "Mobile Shop",
        rating: 4.8,
        discount: 12,
        onSale: true
    },
    {
        id: 8,
        name: "Samsung Galaxy Watch 6 Classic",
        price: 4500000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-4.png",
        inStock: true,
        store: "Smart Tech",
        rating: 4.2,
        discount: null,
        onSale: false
    },
    {
        id: 9,
        name: "Knife Sharpener Tool Professional",
        price: 0,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-1.png",
        inStock: false,
        store: "Media Park",
        rating: 3.99,
        discount: null,
        onSale: false
    },
    {
        id: 10,
        name: "Knife Sharpener Tool Professional Smart watch Advanced",
        price: 3000000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-2.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: 15,
        onSale: false
    },
    {
        id: 11,
        name: "Knife Sharpener Tool Professional",
        price: 2600000,
        priceType: null,
        oldPrice: 3000000,
        image: "/assets/img/product-3.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: 15,
        onSale: false
    },
    {
        id: 12,
        name: "Knife Sharpener Tool Professional",
        price: 3000000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-4.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: null,
        onSale: false
    },
    {
        id: 13,
        name: "Knife Sharpener Tool Professional",
        price: 326000,
        priceType: "мес",
        oldPrice: null,
        image: "/assets/img/product-1.png",
        inStock: true,
        store: "Media Park",
        rating: 3.99,
        discount: null,
        onSale: true
    },
    {
        id: 14,
        name: "MacBook Pro 16 inch Professional Laptop",
        price: 25000000,
        priceType: null,
        oldPrice: null,
        image: "/assets/img/product-2.png",
        inStock: false,
        store: "Tech Store",
        rating: 4.5,
        discount: null,
        onSale: false
    },
    {
        id: 15,
        name: "iPhone 15 Pro Max 256GB",
        price: 15000000,
        priceType: null,
        oldPrice: 17000000,
        image: "/assets/img/product-3.png",
        inStock: true,
        store: "Mobile Shop",
        rating: 4.8,
        discount: 12,
        onSale: true
    },
];

// Function to create product card HTML
function createProductCard(product) {
    const priceHtml = product.price === 0
        ? '<div class="no-price">По запросу</div>'
        : `
            ${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString()} сум</span>` : ''}
            <div class="current-price">
                ${product.price.toLocaleString()} сум${product.priceType ? `<span class="price-type">/${product.priceType}</span>` : ''}
            </div>
        `;

    return `
        <div class="product-card">
            <div class="card-header">
                <svg class="icon-heart" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                
                
                <svg class="icon-scale" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"  clip-rule="evenodd" d="M18.2419 15.2627C17.0929 15.2627 16.1235 14.4842 15.8414 13.4309H20.6423C20.3602 14.4842 19.3909 15.2627 18.2419 15.2627ZM5.75857 15.2627C4.60961 15.2627 3.64023 14.4842 3.35769 13.4309H8.15903C7.87696 14.4842 6.90754 15.2627 5.75857 15.2627ZM5.75857 6.41631L7.95583 12.1657H3.56107L5.75857 6.41631ZM20.4392 12.1657H16.0446L18.2419 6.41631L20.4392 12.1657ZM21.9582 12.5741L21.9586 12.5738L18.838 4.40836C18.7438 4.16241 18.5068 4 18.2419 4H5.75857C5.49362 4 5.25617 4.16237 5.16271 4.40836L2.04142 12.5738L2.04234 12.5741C2.01552 12.6437 2 12.7192 2 12.7982C2 14.8549 3.68608 16.5282 5.75857 16.5282C7.83065 16.5282 9.51673 14.8548 9.51673 12.7982C9.51673 12.7192 9.50167 12.6436 9.47485 12.5741L9.47531 12.5738L6.68215 5.26523H11.3625V18.7348H9.54267C9.19045 18.7348 8.90534 19.0179 8.90534 19.3673C8.90534 19.7168 9.19045 20 9.54267 20H14.4579C14.8101 20 15.0954 19.7168 15.0954 19.3673C15.0954 19.018 14.8101 18.7348 14.4579 18.7348H12.6376V5.26523H17.3184L14.5252 12.5738L14.5254 12.574C14.4988 12.6436 14.4837 12.7192 14.4837 12.7982C14.4837 14.8548 16.1693 16.5281 18.2418 16.5281C20.3139 16.5281 22 14.8548 22 12.7982C22 12.7192 21.9848 12.6437 21.9582 12.5741Z"/>
                </svg>

                ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
                ${product.onSale ? `<div class="sale-badge">Расрочка</div>` : ''}
            </div>
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="product-name-container">
                <h3 class="product-name">${product.name}</h3>
                
                <span class="stock-text">В наличии</span>
                
                <div class="price-section">
                    ${priceHtml}
                </div>
            
                <div class="card-footer">
                    <div class="store-info">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4172 5.60981C13.1264 5.32853 12.8348 5.04516 12.5422 4.75969C12.5343 4.36466 12.5241 3.96945 12.5116 3.57406C12.4949 3.04496 12.2655 2.5402 11.8739 2.14809C11.4823 1.75598 10.9768 1.52875 10.4471 1.51207C10.0512 1.49986 9.65524 1.48965 9.2593 1.48145C8.97383 1.19106 8.69027 0.900938 8.40863 0.611094C8.03047 0.221992 7.53856 0.00460963 7.01547 0.00488307C6.49238 0.00515651 6.00047 0.223633 5.62285 0.610821C5.34103 0.901211 5.05711 1.19206 4.77109 1.48336C4.37534 1.49138 3.97958 1.50159 3.58383 1.51398C2.49336 1.55117 1.5552 2.48824 1.51801 3.5757C1.50543 3.97109 1.49513 4.3663 1.48711 4.76133C1.19544 5.04662 0.904232 5.3299 0.613477 5.61117C0.225742 5.98824 0.00753932 6.48043 0.00781276 6.99996C0.00808619 7.51949 0.224375 8.01168 0.61375 8.39012C0.904323 8.67121 1.19544 8.95422 1.48711 9.23914C1.49531 9.63453 1.50561 10.03 1.51801 10.4256C1.53441 10.9555 1.7641 11.4589 2.15512 11.8516C2.54613 12.2442 3.05336 12.4709 3.58383 12.4873C3.97977 12.4999 4.3757 12.5102 4.77164 12.5182C5.05711 12.8086 5.34057 13.0986 5.62203 13.3883C6.0002 13.7771 6.49266 13.9945 7.01656 13.9942C7.54047 13.9939 8.03156 13.7774 8.41109 13.3886C8.69274 13.0983 8.97638 12.8078 9.26203 12.5168C9.65779 12.5086 10.0535 12.4983 10.4493 12.4859C11.5395 12.449 12.4779 11.512 12.5154 10.4242C12.5278 10.0292 12.538 9.63417 12.546 9.23914C12.8377 8.95385 13.1289 8.67048 13.4196 8.38902C13.8077 8.01223 14.0256 7.52059 14.0256 6.99914C14.0256 6.4777 13.8057 5.98824 13.4172 5.60981ZM10.4966 6.1132C9.3159 7.34012 8.11633 8.59438 6.93672 9.83852C6.84082 9.94011 6.72521 10.0211 6.59695 10.0765C6.46869 10.1318 6.33049 10.1605 6.19078 10.1606H6.18613C6.04677 10.1595 5.90902 10.1306 5.78098 10.0756C5.65293 10.0206 5.53716 9.94053 5.44047 9.84016C4.80992 9.18901 4.17728 8.54005 3.54254 7.89328C3.44652 7.79678 3.37077 7.68206 3.31973 7.55586C3.26869 7.42966 3.2434 7.29453 3.24533 7.15842C3.24727 7.0223 3.2764 6.88795 3.331 6.76325C3.38561 6.63856 3.4646 6.52604 3.56332 6.4323C3.76219 6.24013 4.0289 6.13426 4.30543 6.13774C4.58196 6.14122 4.84592 6.25377 5.03988 6.4509C5.41686 6.83736 5.79448 7.225 6.17273 7.61383C7.10926 6.63246 8.05043 5.64508 8.97684 4.67328C9.37004 4.25957 10.026 4.25273 10.4477 4.65195C10.8693 5.05117 10.8928 5.70168 10.4966 6.1132Z" fill="#0080DE"/>
</svg>

                        <span>${product.store}</span>
                    </div>
                    <div class="rating-info">
                        <svg class="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>${product.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = mockProducts.map(product => createProductCard(product)).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', renderProducts);

// Heart icon click handler
document.addEventListener('click', function(e) {
    if (e.target.closest('.icon-heart')) {
        const heartIcon = e.target.closest('.icon-heart');
        heartIcon.classList.toggle('liked');
        console.log('Heart clicked!');
    }
});

// Scale icon click handler
document.addEventListener('click', function(e) {
    if (e.target.closest('.icon-scale')) {
        const scaleIcon = e.target.closest('.icon-scale');
        scaleIcon.classList.toggle('active');
        console.log('Scale clicked!');
    }
});

// Product card click handler
document.addEventListener('click', function(e) {
    if (e.target.closest('.product-card')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        console.log('Product clicked:', productName);
    }
});