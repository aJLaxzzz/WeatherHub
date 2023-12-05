document.addEventListener("DOMContentLoaded", function () {
    const sortingSelectHeader = document.getElementById('sorting-header');

    const sortingSelectAside = document.getElementById('sorting-aside');

    const initialOrder = {};
    const productContainers = document.querySelectorAll('.product-container');

    productContainers.forEach(productContainer => {
        const productItems = Array.from(productContainer.children);
        productItems.forEach((item, index) => {
            initialOrder[item.id] = index;
        });
    });

    function sortProducts(sortBy, containers) {
        containers.forEach(productContainer => {
            const productItems = Array.from(productContainer.children);

            const sortedItems = productItems.slice();  

            if (sortBy === 'ascending') {
                sortedItems.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').innerText);
                    const priceB = parseFloat(b.querySelector('.product-price').innerText);
                    return priceA - priceB;
                });
            } else if (sortBy === 'descending') {
                sortedItems.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').innerText);
                    const priceB = parseFloat(b.querySelector('.product-price').innerText);
                    return priceB - priceA;
                });
            } else if (sortBy === 'standard') {
                sortedItems.sort((a, b) => {
                    const orderA = initialOrder[a.id];
                    const orderB = initialOrder[b.id];
                    return orderA - orderB;
                });
            }

            productItems.forEach((item, index) => {
                item.style.order = sortedItems.indexOf(item);
            });
        });
    }

    sortingSelectHeader.addEventListener('change', () => {
        sortProducts(sortingSelectHeader.value, productContainers);
    });

    sortingSelectAside.addEventListener('change', () => {
        sortProducts(sortingSelectAside.value, productContainers);
    });

    sortProducts('standard', productContainers);
});
