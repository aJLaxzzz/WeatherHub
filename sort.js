document.addEventListener("DOMContentLoaded", function () {
    // Слушаем изменения в выпадающем списке сортировки
    const sortingSelect = document.getElementById('sorting');

    // Сохраняем исходный порядок товаров при загрузке страницы
    const initialOrder = {};
    const productContainers = document.querySelectorAll('.product-container');

    productContainers.forEach(productContainer => {
        const productItems = Array.from(productContainer.children);
        productItems.forEach((item, index) => {
            initialOrder[item.id] = index;
        });
    });

    // Слушаем изменения в выпадающем списке сортировки
    sortingSelect.addEventListener('change', () => {
        // Вызываем функцию для сортировки товаров
        sortProducts(sortingSelect.value, productContainers);
    });

    // Функция для сортировки товаров
    function sortProducts(sortBy, containers) {
        containers.forEach(productContainer => {
            const productItems = Array.from(productContainer.children);

            const sortedItems = productItems.slice(); // Создаем копию массива товаров

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
                // Восстанавливаем исходный порядок
                sortedItems.sort((a, b) => {
                    const orderA = initialOrder[a.id];
                    const orderB = initialOrder[b.id];
                    return orderA - orderB;
                });
            }

            // Очищаем контейнер и добавляем отсортированные товары
            productItems.forEach((item, index) => {
                item.style.order = sortedItems.indexOf(item);
            });
        });
    }

    // Вызываем функцию при загрузке страницы для инициализации сортировки
    sortProducts('standard', productContainers);
});
