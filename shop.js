let cartItems = [];

function openPopup() {
    const popup = document.getElementById("popup");

    popup.classList.add("active");
    displayCart();
}

function closePopup() {
    const popup = document.getElementById("popup");

    const cartInfo = document.getElementById('cart-info');
    const orderButton = document.getElementById('order-button');

    cartInfo.style.display = 'block';
    orderButton.style.display = 'block';

    const orderMessage = document.getElementById('order-message');
    orderMessage.style.display = 'none';

    popup.classList.remove("active");
}


function placeOrder() {
    cartItems = [];
    displayCart();

    const cartInfo = document.getElementById('cart-info');
    const orderButton = document.getElementById('order-button');

    cartInfo.style.display = 'none';
    orderButton.style.display = 'none';

    const orderMessage = document.getElementById('order-message');
    orderMessage.style.display = 'block';
}



function displayCart() {
    const cartElement = document.getElementById('cart-content');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    cartElement.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const imgElement = document.createElement('img');
        imgElement.src = item.image;
        imgElement.alt = item.name;
        imgElement.className = 'item-thumbnail';
        itemDiv.appendChild(imgElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = item.name;
        nameElement.className = 'item-name';
        itemDiv.appendChild(nameElement);

        const quantityElement = document.createElement('div');
        quantityElement.className = 'item-quantity';
        quantityElement.innerHTML = `
            <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
            <span class="item-quantity-number">${item.quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
        `;
        itemDiv.appendChild(quantityElement);

        const decreaseButton = quantityElement.querySelector('.quantity-btn:first-child');
        const increaseButton = quantityElement.querySelector('.quantity-btn:last-child');

        decreaseButton.addEventListener('click', function () {
            decreaseQuantity(item.name);
        });

        increaseButton.addEventListener('click', function () {
            increaseQuantity(item.name);
        });

        const totalPriceElementItem = document.createElement('p');
        totalPriceElementItem.textContent = `Общая цена: ${item.price * item.quantity}₽`;
        totalPriceElementItem.className = 'item-total-price';
        itemDiv.appendChild(totalPriceElementItem);

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        cartElement.appendChild(itemDiv);
    });

    totalItemsElement.textContent = `Общее количество товаров: ${totalItems}`;
    totalPriceElement.textContent = `Общая стоимость: ${totalPrice}₽`;
}





function addItem(itemName, itemPrice, itemImage) {
    var item = { name: itemName, price: itemPrice, quantity: 1, image: itemImage };
    let isInCart = cartItems.find(items => items.name === itemName);

    if (isInCart) {
        isInCart.quantity++;
    } else {
        cartItems.push(item);
    }

    displayCart(); 
}


function removeItem(itemName){
    cartItems = cartItems.filter(item => item.name !== itemName);
    displayCart();
}

function increaseQuantity(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        displayCart();
    }
}

function decreaseQuantity(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity--;
        } else {
            cartItems.splice(itemIndex, 1);
        }
        displayCart();
    }
}


