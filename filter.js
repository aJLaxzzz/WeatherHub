// filter.js

document.getElementById('filter-button').addEventListener('click', function () {
    let minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    let maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

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
});
