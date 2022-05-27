if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    updateCartTotal();

    /*Remove items in the cart*/
    var removeBtns = document.getElementsByClassName('btn-remove');
    for (var i = 0; i < removeBtns.length; i++) {
        var button = removeBtns[i];
        button.addEventListener('click', removeItem);
    }

    /*Change quantity */
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', changeQuantity);
    }

    /*Add to cart */
    var addToCartBtns=document.getElementsByClassName('add-to-cart-button');
    for(var i=0; i<addToCartBtns.length;i++){
        var button=addToCartBtns[i];
        button.addEventListener('click',addToCart);
    }

    /*Check out*/
    var checkOutBtns=document.getElementsByClassName('btn-checkout')
    for(var i=0; i<checkOutBtns.length;i++){
        var button=checkOutBtns[i];
        button.addEventListener('click',checkOut);
    }
}

function checkOut(){
    var cartCheckTable=document.getElementById('cart-check-table')
    var cartItemRows=cartCheckTable.rows;
    if(cartItemRows.length<2){
        window.alert("Cart is empty! Nothing to buy.")
        return
    }
    window.alert("Thanky you for your purchase!")
    var cartItems = document.getElementById('cart-check-table')
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}

function addToCart(event){
    var button=event.target;
    var shopItem=button.parentElement.parentElement;
    var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}

function changeQuantity(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function removeItem(event){
    var btnClicked = event.target;
    btnClicked.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}


function addItemToCart(title,price,imageSrc){
    var cartRow=document.createElement('tr')
    cartRow.className='cart-row'
    var cartCheckTable=document.getElementById('cart-check-table')
    var cartItemRows=cartCheckTable.rows;
    
    for (var index = 0; index < cartItemRows.length; index++) {
        var cartItemName=cartItemRows[index].getElementsByClassName('cart-item-title')[0].innerText;
        if(cartItemName==title){
            alert('This item is already added to the cart!')
            return
        }
    }

    var cartNewRow=
    `
    <tr class="cart-row">
                <td class="cart-item">
                    <img class="cart-item-image" src="${imageSrc}">
                    <div class="cart-info">
                        <p class="cart-item-title">${title}</p>
                        <small class="cart-price">${price}</small>
                        <br>
                        <button class="btn btn-1 btn-remove" type="button">Remove</button>
                    </div>
                </td>
                <td><input class="cart-quantity-input" type="number" value="1"></td>
                <td class="cart-price">${price}</td>
            </tr>
    `
    cartRow.innerHTML=cartNewRow
    cartCheckTable.appendChild(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click',removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',changeQuantity)
}

function updateCartTotal() {
    var cartCheckTable = document.getElementById('cart-check-table');
    var cartRows = cartCheckTable.rows;
    var total = 0;
    if (cartRows.length > 1) {
        for (var i = 1; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var quantity = cartRow.cells[1].getElementsByClassName('cart-quantity-input')[0].value;    
            var priceElement=cartRow.cells[2].innerText;
            var price = parseFloat(priceElement.replace('$', ''));
            total = total + (price * quantity);
        }
        total = Math.round(total * 100) / 100;
    }

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}