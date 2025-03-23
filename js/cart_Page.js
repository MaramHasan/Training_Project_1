document.addEventListener("DOMContentLoaded", function () {
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

    function updateCartDisplay() {
        let cartContainer = document.getElementById("cartItems");
        let totalAmount = document.getElementById("totalAmount");
        let cartCount = document.getElementById("cartCount");
        cartContainer.innerHTML = "";
        let total = 0;

        let cart = getCompressedCookie('cart');

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
         <div class="m">
             <div style="display:flex">
                <img src="${item.img}" alt="${item.name}">
             <div class="data">
                <div>${item.name}</div>
                <div>${item.swatch}</div>
                <div>$${item.price}</div>
                <div>Quantity: ${item.quantity}</div>
             </div>
             </div>
                <button onclick="deleteItemFromCart(${item.id})">X</button>
         </div>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartCount.textContent = cart.length;
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    window.deleteItemFromCart = function (id) {
        let cart = getCompressedCookie('cart');
        cart = cart.filter(item => item.id !== id);
        cart.forEach((item, index) => item.id = index); 
        setCompressedCookie('cart', cart, 7);
        updateCartDisplay();
    };

    updateCartDisplay(); 
});


