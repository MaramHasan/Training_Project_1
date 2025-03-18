
const productsLink = document.getElementById("productsLink");
const menuList = document.getElementById("menu-list");

function changeMenuContent(category) {
    let newMenuContent = "";

    if (category === "products") {
        newMenuContent = `
                    <li><a href="#" onclick="changeMenuContent('menu')">&lt; 2 Products</a></li>
                    <hr style="width:100%">
                    <li><a href="#" onclick="changeMenuContent('2.1')">2.1 PAGE LINK HEADER</a></li>
                    <li><a href="#" onclick="changeMenuContent('2.2')">2.2 PAGE LINK HEADER</a></li>
                    <li><a href="#" onclick="changeMenuContent('2.3')">2.3 PAGE LINK HEADER</a></li>
                `;
    } else if (category === "2.1") {
        newMenuContent = `
                    <li><a href="#" onclick="changeMenuContent('products')">&lt; 2.1 PAGE LINK HEADER</a></li>
                    <hr style="width:100%">
                    <li><a href="#">2.1.1 Page link</a></li>
                    <li><a href="#">2.1.2 Page link</a></li>
                    <li><a href="#">2.1.3 Page link</a></li>
                `;
    } else if (category === "2.2") {
        newMenuContent = `
                    <li><a href="#" onclick="changeMenuContent('products')">&lt; 2.2 PAGE LINK HEADER</a></li>
                    <hr style="width:100%">
                    <li><a href="#">2.2.1 Page link</a></li>
                    <li><a href="#">2.2.2 Page link</a></li>
                    <li><a href="#">2.2.3 Page link</a></li>
                `;
    } else if (category === "2.3") {
        newMenuContent = `
                    <li><a href="#" onclick="changeMenuContent('products')">&lt; 2.3 PAGE LINK HEADER</a></li>
                    <hr style="width:100%">
                    <li><a href="#">2.3.1 Page link</a></li>
                    <li><a href="#">2.3.2 Page link</a></li>
                    
                `;
    } else if (category == "menu") {
        newMenuContent = `
                   <li><a href="home_page.html">Home</a></li>
 <li class="dropdown-trigger"><a href="#" onclick="changeMenuContent('products')">Products <span style="color: white;">></span></a></li>
                   <li><a href="#">Goods</a></li>
                   <li><a href="#">About</a></li>
                   <li><a href="#">Contact</a></li>
                    <li><a href="#">Categories <span class="arrow2">⌄</span></a></li>
                `;
    }

    menuList.innerHTML = newMenuContent;
}


document.addEventListener("DOMContentLoaded", function () {
    const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");

    const overlay = document.createElement("div");
    overlay.classList.add("dropdown-overlay");
    document.body.appendChild(overlay);

    dropdownTriggers.forEach(trigger => {
        const dropdown = document.getElementById(trigger.dataset.dropdown);

        trigger.addEventListener("mouseenter", () => {
            document.documentElement.style.overflow = "hidden";
            dropdown.classList.add("active");
            overlay.classList.add("active");
        });

        trigger.addEventListener("mouseleave", () => {
            setTimeout(() => {
                document.documentElement.style.overflow = "auto";
                if (!dropdown.matches(":hover") && !trigger.matches(":hover")) {
                    dropdown.classList.remove("active");
                    overlay.classList.remove("active");
                }
            }, 10);
        });

        overlay.addEventListener("click", () => {
            dropdown.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

    const style = document.createElement("style");

    document.head.appendChild(style);


    const menuIcon = document.querySelector(".menu-icon");
    const navbarBottom = document.querySelector(".navbar-bottom");

    menuIcon.addEventListener("click", () => {
        navbarBottom.classList.toggle("active");
    });

    productsLink.addEventListener("click", function () {
        changeMenuContent("products");
    });
});
function loadProduct(productIndex) {
    let container = document.getElementById("products-container");
    container.innerHTML = "";

    let product = obj.results[productIndex]; // Get the specific product

    let productCard = document.createElement("div");
    productCard.classList.add("product-card");

    let productImageSrc = product.productImg ? product.productImg : "https://via.placeholder.com/200";
    let productImage = document.createElement("img");
    productImage.src = productImageSrc;
    productImage.alt = product.productName;
    productImage.classList.add("productimg");

    let containerDiv = document.createElement("div");

    let filterDiv = document.createElement("div");
    filterDiv.classList.add("forfilter");
    filterDiv.innerHTML = "<hr> Sort <span style='color:gray'>Relevance</span><hr>";

    containerDiv.appendChild(filterDiv);
    containerDiv.appendChild(productImage);

    let productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    let swatchesHTML = "";
    if (product.swatches && product.swatches.length > 0) {
        swatchesHTML = `<div class="swatches">`;

        product.swatches.slice(0, 3).forEach((swatch, index) => {
            let color = (swatch.swatchName.toLowerCase() === "white") ? "black" : swatch.swatchName;
            let swatchImgSrc = swatch.img.src ? swatch.img.src : "https://via.placeholder.com/40";

            swatchesHTML += `<img class="swatch ${index === 0 ? 'selected' : ''}" 
                src="${swatchImgSrc}" data-src="${swatchImgSrc}" 
                alt="${swatch.swatchName}" title="${swatch.swatchName}" 
                style="border-color:${color}">`;
        });

        swatchesHTML += `</div>`;
    }

    productInfo.innerHTML = `
        <div class="forfilter"><hr> Filter <span style="Color:gray">104 Times</span><hr></div>
        <p class="quickshop">Quick shop</p>
        <a href="./products_Page.html?id=${productIndex}" class="forhref">
            <h3 class="product-title">${product.productName}</h3>
        </a>
        <p class="product-price" id="select-${productIndex}">${product.productName} 1 selected</p>
        ${swatchesHTML}
    `;

    productCard.appendChild(containerDiv);
    productCard.appendChild(productInfo);
    container.appendChild(productCard);

    let swatches = productCard.querySelectorAll(".swatch");
    let productPrice = productCard.querySelector(`#select-${productIndex}`);

    swatches.forEach((swatch, index) => {
        swatch.addEventListener("click", function () {
            swatches.forEach(s => s.classList.remove("selected"));
            this.classList.add("selected");
            productImage.src = this.getAttribute("data-src");
            productPrice.textContent = `${product.productName} ${index + 1} selected`;
        });
    });
}

function loadProducts() {
    let i = 0;

    let container = document.getElementById("products-container");
    container.innerHTML = "";

    obj.results.forEach(product => {

        let productCard = document.createElement("div");
        productCard.classList.add("product-card");

        let productImageSrc = product.productImg ? product.productImg : "https://via.placeholder.com/200";
        let productImage = document.createElement("img");
        productImage.src = productImageSrc;
        productImage.alt = product.productName;
        productImage.classList.add("productimg");

        let containerDiv = document.createElement("div");

        let filterDiv = document.createElement("div");
        filterDiv.classList.add("forfilter");
        filterDiv.innerHTML = "<hr class='hrline'> Sort <span style='color:gray'>Relevance</span><hr>";

        containerDiv.appendChild(filterDiv);
        containerDiv.appendChild(productImage);
        productImage.classList.add("productimg");

        let productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        let swatchesHTML = "";
        if (product.swatches && product.swatches.length > 0) {

            swatchesHTML = `<div class="swatches">`;

            product.swatches.slice(0, 3).forEach((swatch, index) => {
                let color = (swatch.swatchName == "White" || swatch.swatchName == "white") ? "black" : swatch.swatchName 
                if(index ==0){

                    let swatchImgSrc = swatch.img.src ? swatch.img.src : "https://via.placeholder.com/40";
                    swatchesHTML += `<img class="swatch selected" src="${swatchImgSrc}" data-src="${swatchImgSrc}" alt="${swatch.swatchName}" title="${swatch.swatchName}" style="border-color:${color}">`;

                }else{

                let swatchImgSrc = swatch.img.src ? swatch.img.src : "https://via.placeholder.com/40";
                    swatchesHTML += `<img class="swatch" src="${swatchImgSrc}" data-src="${swatchImgSrc}" alt="${swatch.swatchName}" title="${swatch.swatchName}" style="border-color:${color}">`;
          }  });


            swatchesHTML += `</div>`;
        }

        productInfo.innerHTML = `
            <div class="forfilter"><hr class="hrline"> Filter <span style="Color:gray">104Times</span><hr></div>
            <p class="quickshop">Quick shop</p>
         
            <a href="./products_Page.html?id=${i}" class="forhref">
  <h3 class="product-title">${product.productName}</h3></a>
      <p class="product-price">${product.productPriceFormatted}</p>
            <p class="product-price" id="select-${i}">${product.productName} 1 selected</p>
            ${swatchesHTML}
        `;

        productCard.appendChild(containerDiv);
        productCard.appendChild(productInfo);
        container.appendChild(productCard);

        let swatches = productCard.querySelectorAll(".swatch");
        let productPrice = productCard.querySelector(`#select-${i}`);

        swatches.forEach((swatch, index) => {
            swatch.addEventListener("click", function () {
            
                swatches.forEach(s => s.classList.remove("selected"));
        
                this.classList.add("selected");
                productImage.src = this.getAttribute("data-src");

                productPrice.textContent = `${product.productName} ${index + 1} selected`;
            });
        });

        i = i + 1;
    });
}



window.onload = loadProducts;



function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

document.getElementById("search").addEventListener('blur', function (event) {
    setTimeout(() => {
        document.getElementById("suggestion-container").style.display = "none";
    }, 200);
});


document.getElementById("search").addEventListener('focus', function () {
    var suggestionContainer = document.getElementById("suggestion-container");
    if (suggestionContainer.children.length > 0) {
        suggestionContainer.style.display = "block";
    }
});



document.getElementById("search").addEventListener("input", debounce(function () {
    var searchValue = this.value.toLowerCase();
    var suggestionContainer = document.getElementById("suggestion-container");
    suggestionContainer.innerHTML = '';

    var filteredProducts = obj.results
        .map((product, index) => ({ ...product, originalIndex: index }))
        .filter(product => product.productName.toLowerCase().includes(searchValue));

    if (filteredProducts.length > 0) {
        suggestionContainer.style.display = "block";

        filteredProducts.forEach((product) => {
            var suggestionElement = document.createElement("div");
            suggestionElement.className = "suggestion";
            suggestionElement.textContent = product.productName;

            suggestionElement.addEventListener("mousedown", function (event) {
                event.preventDefault();
                loadProduct(product.originalIndex);
      

            });

            suggestionContainer.appendChild(suggestionElement);
        });
    } else {
        suggestionContainer.style.display = "none";
    }
}, 300));




document.getElementById("s-search").addEventListener("input", debounce(function () {
    var searchValue = this.value.toLowerCase();
    var suggestionContainer = document.getElementById("suggestioncontainer");
    suggestionContainer.innerHTML = '';

    var filteredProducts = obj.results
        .map((product, index) => ({ ...product, originalIndex: index }))
        .filter(product => product.productName.toLowerCase().includes(searchValue));

    if (filteredProducts.length > 0) {
        suggestionContainer.style.display = "block";

        filteredProducts.forEach((product) => {
            var suggestionElement = document.createElement("div");
            suggestionElement.className = "suggestion";
            suggestionElement.textContent = product.productName;

            suggestionElement.addEventListener("mousedown", function (event) {
                event.preventDefault();

                loadProduct(product.originalIndex);

            });

            suggestionContainer.appendChild(suggestionElement);
        });
    } else {
        suggestionContainer.style.display = "none";
    }
}, 300));







document.getElementById("s-search").addEventListener('blur', function (event) {
    setTimeout(() => {
        document.getElementById("suggestioncontainer").style.display = "none";
    }, 200);
});
document.getElementById("s-search").addEventListener('focus', function () {
    var suggestionContainer = document.getElementById("suggestioncontainer");
    if (suggestionContainer.children.length > 0) {
        suggestionContainer.style.display = "block";
    }
});


function addHoverEffect2() {
 

    const forcat = document.getElementById("forcat");
    const cat = document.getElementById("cat");

    forcat.addEventListener("mouseenter", function () {

        cat.style.transform = "rotate(180deg)";
        cat.style.top = "25px";
    });

    forcat.addEventListener("mouseleave", function () {
        cat.style.transform = "";
        cat.style.top = "13px";
    });
    const forprod1 = document.getElementById("forprod1");
    const prod1 = document.getElementById("prod1");

    forprod1.addEventListener("mouseenter", function () {

        prod1.style.transform = "rotate(180deg)";
        prod1.style.top = "25px";
    });

    forprod1.addEventListener("mouseleave", function () {
        prod1.style.transform = "";
        prod1.style.top = "13px";
    });




}
document.addEventListener("DOMContentLoaded", addHoverEffect2);



document.getElementById("s-search").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        var searchValue = this.value.toLowerCase();
        var matchedIndex = obj.results.findIndex(product => product.productName.toLowerCase() == searchValue);

        if (matchedIndex != -1) {
            window.location.href = "./products_Page.html?id=" + matchedIndex;
        }
    }
});
document.getElementById("search").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        var searchValue = this.value.toLowerCase();
        var matchedIndex = obj.results.findIndex(product => product.productName.toLowerCase() == searchValue);

        if (matchedIndex != -1) {
            window.location.href = "./products_Page.html?id=" + matchedIndex;
        }
    }
});
