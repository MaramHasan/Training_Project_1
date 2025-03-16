let cart = [
    { img: 'https://akamai-scene7.garnethill.com/is/image/garnethill/49187_SADD?&defaultImage=49187_main', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 },
    { img: 'https://akamai-scene7.garnethill.com/is/image/garnethill/49187_SADD?&defaultImage=49187_main', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 },
    { img: 'https://akamai-scene7.garnethill.com/is/image/garnethill/49187_SADD?&defaultImage=49187_main', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 },
    { img: 'https://akamai-scene7.garnethill.com/is/image/garnethill/49187_SADD?&defaultImage=49187_main', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 },
    { img: 'https://akamai-scene7.garnethill.com/is/image/garnethill/49187_SADD?&defaultImage=49187_main', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 },
    { img: 'img2.jpg', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 },
    { img: 'img3.jpg', name: 'Hugo Boss Suit', swatch: 'SADD', quantity: 2, price: 2500 }
];
let itemToRemove = null;

function renderCart() {
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
        cart.splice(itemToRemove, 1);
        renderCart();

        closeDialog();
    }
}


renderCart();