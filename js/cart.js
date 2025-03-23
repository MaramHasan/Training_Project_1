
function setCompressedCookie(name, value, days) {
    let compressedValue = LZString.compressToEncodedURIComponent(JSON.stringify(value));
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + compressedValue + expires + "; path=/";
}

function getCompressedCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            try {
                let decompressedValue = LZString.decompressFromEncodedURIComponent(cookie[1]);
                return JSON.parse(decompressedValue || "[]");
            } catch (e) {
                return [];
            }
        }
    }
    return [];
}

function addNewItem(img, name, swatch, quantity, price) {
    let cart = getCompressedCookie('cart');
    if (cart.some(item => item.img === img && item.name === name && item.swatch === swatch)) {
        alert('Item already exists');
        return;
    }
    cart.push({ id: cart.length, img, name, swatch, quantity, price });
    setCompressedCookie('cart', cart, 7);
    getItemsOfCart();
    renderCart();
}

function deleteItemFromCart(id) {
    let cart = getCompressedCookie('cart');
    cart = cart.filter(item => item.id !== id);
    cart.forEach((item, index) => item.id = index);
    setCompressedCookie('cart', cart, 7);
    getItemsOfCart();
    renderCart();
}

function getItemsOfCart() {
    cart = getCompressedCookie('cart');
}

let itemToRemove = null;

function renderCart() {
  if(cart.length > 0) {
      let cartItems = document.getElementById("cartItems");
      let totalAmount = 0;
      cartItems.innerHTML = "";
      cart.forEach((item, index) => {
          totalAmount += item.price;
          cartItems.innerHTML += `
                    <div class="cart-item">
                        <div style="
    height: 90px;"><img src="${item.img}" alt="${item.name}"></div>
                        <div style="flex:7">
                            <strong>${item.name}</strong><br>
                            Swatch: ${item.swatch}<br>
                            Quantity: ${item.quantity}<br>
                            Total: $${item.price}
                        </div>
                       <div> <button onclick="openConfirmDialog(${index})">X</button>
                        <br><br>
                        <br>
                        <br>
                       

                        </div>
                    </div>
                `;
      });
      document.getElementById("cartCount").textContent = cart.length;
      document.getElementById("totalAmount").textContent = `$${totalAmount}`;
  }else{
      document.getElementById("cartItems").innerHTML = "<p>No items in cart</p>";
      document.getElementById("cartCount").textContent = "0";
      document.getElementById("totalAmount").textContent = "$0";
  }
}

document.getElementById("cart-icon").addEventListener("mouseenter", () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.getElementById("cart-popup").style.display = "flex";
    document.getElementById("cart-overlay").style.display = "block";
});

document.getElementById("cart-overlay").addEventListener("click", () => {

    closeDialog();
});

document.getElementById("cart-popup").addEventListener("mouseleave", () => {
    document.body.style.overflow = "auto"; 
    document.documentElement.style.overflow = "auto"; 
    document.getElementById("cart-overlay").style.display = "none";
    document.getElementById("cart-popup").style.display = "none";
});
function hideall(){
    document.body.style.overflow = "auto"; 
    document.documentElement.style.overflow = "auto"; 
    document.getElementById("cart-overlay").style.display = "none";
    document.getElementById("dialog-overlay").style.display = "none";
    document.getElementById("cart-popup").style.display = "none";
    document.getElementById("confirmDialog").style.display = "none";
  
}
function openConfirmDialog(index) {
   
    itemToRemove = index;
    document.getElementById("dialog-overlay").style.display = "block";
    document.getElementById("confirmDialog").style.display = "block";
    document.getElementById("cart-popup").style.display = "none";
  setTimeout(function(){
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
  },50)

}

function closeDialog() {
    document.body.style.overflow = "auto"; 
    document.documentElement.style.overflow = "auto";
    document.getElementById("dialog-overlay").style.display = "none";
    document.getElementById("confirmDialog").style.display = "none";
    document.getElementById("cart-overlay").style.display = "none";

}

function confirmRemove() {
    document.body.style.overflow = "auto"; 
    if (itemToRemove !== null) {
        deleteItemFromCart(itemToRemove);
        location.reload();

        
    }
}




function migrateCartDataToCartPage() {
    let cart = getCompressedCookie('cart');
    let cartpage = getCompressedCookie('cartpage');

    cart.forEach(item => {
        if (!cartpage.some(existingItem => existingItem.name === item.name && existingItem.img === item.img)) {
            cartpage.push(item);
        }
    });

    setCompressedCookie('cartpage', cartpage, 7);
    document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}



document.getElementById("checkout").addEventListener("click", function () { 
    migrateCartDataToCartPage();
    location.reload();
})
