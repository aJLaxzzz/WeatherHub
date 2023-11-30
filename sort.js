document.addEventListener("DOMContentLoaded", function () {
    // Слушаем изменения в выпадающем списке сортировки в заголовке
    const sortingSelectHeader = document.getElementById('sorting-header');

    // Слушаем изменения в выпадающем списке сортировки в боковой панели
    const sortingSelectAside = document.getElementById('sorting-aside');

    // Сохраняем исходный порядок товаров при загрузке страницы
    const initialOrder = {};
    const productContainers = document.querySelectorAll('.product-container');

    productContainers.forEach(productContainer => {
        const productItems = Array.from(productContainer.children);
        productItems.forEach((item, index) => {
            initialOrder[item.id] = index;
        });
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

    // Слушаем изменения в выпадающем списке сортировки в заголовке
    sortingSelectHeader.addEventListener('change', () => {
        // Вызываем функцию для сортировки товаров
        sortProducts(sortingSelectHeader.value, productContainers);
    });

    // Слушаем изменения в выпадающем списке сортировки в боковой панели
    sortingSelectAside.addEventListener('change', () => {
        // Вызываем функцию для сортировки товаров
        sortProducts(sortingSelectAside.value, productContainers);
    });

    // Вызываем функцию при загрузке страницы для инициализации сортировки
    sortProducts('standard', productContainers);
});
