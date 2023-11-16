function openPopup(){
    document.getElementById("popup").classList.toggle("active");
    displayCart();
}

let cartItems = [];

function addItem(itemId){
    var item = {id: itemId, name: getItemName(itemId), price: getItemPrice(itemId), quantity: 1};
    let isInCart = cartItems.find(items => items.id == itemId);
    if (isInCart){
        isInCart.quantity++;
    }
    else{
        cartItems.push(item);
    }
    displayCart();
}

function displayCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - Количество: ${item.quantity} - Цена: ${item.price * item.quantity}₽
            <button onclick="increaseQuantity(${item.id})"><img src="images/plus.png" alt="plus"></button>
            <button onclick="removeItem(${item.id})"><img src="images/bin.png" alt="bin"></button>`;
        cartElement.appendChild(itemDiv);
    });

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const summaryDiv = document.createElement('div');
    summaryDiv.textContent = `Всего товаров: ${totalItems} - Цена всего: $${totalPrice}`;
    cartElement.appendChild(summaryDiv);
}

function removeItem(itemId){
    cartItems = cartItems.filter(item => item.id !== itemId);
    displayCart();
}

function increaseQuantity(itemId){
    let isInCart = cartItems.find(items => items.id == itemId);
    if (isInCart){
        isInCart.quantity++;
    }
    displayCart();
}