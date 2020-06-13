if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}

function ready(){
    const btnDanger = document.getElementsByClassName('btn-danger');

    for (let i = 0; i < btnDanger.length; i++){
        var button = btnDanger[i];
        button.addEventListener('click', removeCartItem)
    }

    const quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener('change', quantityChange);
    }

    const addButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addButtons.length; i++){
        var button = addButtons[i];
        button.addEventListener('click', addToCart);
    }

    const purchaseButton = document.getElementsByClassName('btn-purchase')[0]
                                    .addEventListener('click',purchaseItems);
}

function removeCartItem(event){
    const target = event.target;
    target.parentNode.parentNode.remove();
    updateCardTotal();
}

function quantityChange(event){
    var input = event.target; 
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1; 
    }
    
    updateCardTotal();
}

function addToCart(event){
    const button = event.target; 
    const shopItem = button.parentNode.parentNode; 
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerHTML;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerHTML;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    addItemtoCart(title, price, imageSrc);
    updateCardTotal();
}

function purchaseItems(event){
    alert('Thanks for purchase!'); 
    const cartItems = document.getElementsByClassName('cart-items')[0]; 
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCardTotal();
}

function addItemtoCart(title, price, imageSrc){
    const cartItems = document.querySelectorAll('.cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerHTML === title){
            alert('This is item already in the cart');
            return;
        }
    }
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" alt="" width="100">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove</button>
    </div>
    `
    cartRow.innerHTML = cartRowContent;
    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange);
}

function updateCardTotal() {
    const cartItems = document.querySelectorAll('.cart-items')[0];
    const cartRows = cartItems.querySelectorAll('.cart-row');
    let total = 0; 

    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.querySelectorAll('.cart-price')[0];
        let quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0];
        
        let price = parseFloat(priceElement.innerHTML.replace('$', ''));
        let quantity = quantityElement.value;

        total += price * quantity;
    }
    total = Math.round(total * 100) / 100; 

    let totalElement = document.getElementsByClassName('cart-total-price')[0];
    totalElement.innerHTML = `$${total}`;
}