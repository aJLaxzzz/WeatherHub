document.getElementById('filter-button').addEventListener('click', function () {
    let minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    let maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    let sortingSelectHeader = document.getElementById('sorting-header');
    let sortingSelectAside = document.getElementById('sorting-aside');

    let sortBy = sortingSelectHeader ? sortingSelectHeader.value : sortingSelectAside.value;

    let products = document.querySelectorAll('.product-item');
    products.forEach(function (product) {
        let priceElement = product.querySelector('.product-price');
        let priceText = priceElement.textContent || priceElement.innerText;
        let price = parseFloat(priceText.replace(/[^\d.]/g, ''));

        if (price >= minPrice && price <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    let productContainers = document.querySelectorAll('.product-container');
    sortProducts(sortBy, productContainers);
});

document.getElementById('filter-button-aside').addEventListener('click', function () {
    let minPriceAside = parseFloat(document.getElementById('min-price-aside').value) || 0;
    let maxPriceAside = parseFloat(document.getElementById('max-price-aside').value) || Infinity;

    let sortingSelectHeader = document.getElementById('sorting-header');
    let sortingSelectAside = document.getElementById('sorting-aside');

    let sortBy = sortingSelectHeader ? sortingSelectHeader.value : sortingSelectAside.value;

    let products = document.querySelectorAll('.product-item');
    products.forEach(function (product) {
        let priceElement = product.querySelector('.product-price');
        let priceText = priceElement.textContent || priceElement.innerText;
        let price = parseFloat(priceText.replace(/[^\d.]/g, ''));

        if (price >= minPriceAside && price <= maxPriceAside) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    let productContainers = document.querySelectorAll('.product-container');
    sortProducts(sortBy, productContainers);
});
