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
                    <li><a href="#">Categories <span class="arrow">⌄</span></a></li>
                `;
    }

    menuList.innerHTML = newMenuContent;
}

function addHoverEffect() {
    const forcat1 = document.getElementById("forcat1");
    const cat1 = document.getElementById("cat1");

    forcat1.addEventListener("mouseenter", function () {

        cat1.style.transform = "rotate(180deg)";
        cat1.style.top = "17px";
    });

    forcat1.addEventListener("mouseleave", function () {
        cat1.style.transform = "";
        cat1.style.top = "3px";
    });

    const forprod = document.getElementById("forprod");
    const prod = document.getElementById("prod");

    forprod.addEventListener("mouseenter", function () {

        prod.style.transform = "rotate(180deg)";
        prod.style.top = "17px";
    });

    forprod.addEventListener("mouseleave", function () {
        prod.style.transform = "";
        prod.style.top = "3px";
    });



}
document.addEventListener("DOMContentLoaded", addHoverEffect);


let images = [];
let imgindex = 0;
let formove = [];

async function loadProductDetails(productIndex) {
    imgindex = 0;
    let i = 1;
    images = [];
    var product = obj.results[productIndex];

    let mainImg = document.getElementById("main-img");
    mainImg.src = product.productImg || "default-image.jpg";
    document.getElementById("product-name").textContent = product.productName;
    document.getElementById("price").textContent = product.productPriceFormatted;
    document.getElementById("price").textContent = product.productPriceFormatted;

    var swatchesContainer = document.getElementById("swatches-container");
    swatchesContainer.innerHTML = '';
    var maxVisible = 4;
    var allSwatches = [];



    product.swatches.forEach(function (swatch, index) {
        var swatchElement = createSwatch(swatch.img.src, `img-${i}`, swatch.swatchName);
        i++;
        if (index == 0) {
            swatchElement.classList.add('selected');
            document.getElementById("product-price").innerText = product.productName + " " + swatch.swatchName + " selected";
        }
        swatchElement.onclick = function () {
            imgindex = index;
            document.getElementById("product-price").innerText = product.productName + " " + swatch.swatchName + " selected";
            updateArrows();
            updateBorders();
            selectSwatch(this, allSwatches);
            mainImg.src = swatch.img.src;
            updateThumbnails(productIndex, swatch.img.src);
        };
        allSwatches.push(swatchElement);

        if (index < maxVisible) {
            swatchesContainer.appendChild(swatchElement);
        }
    });
    document.getElementById("righta").style.visibility = "hidden";
    handleMoreButton(allSwatches, maxVisible, swatchesContainer);
    formove = allSwatches;
    updateThumbnails(productIndex);
    updateArrows();


}

function createSwatch(src, id, borderColor) {
    var swatch = document.createElement("img");
    swatch.className = "swatch";
    swatch.src = src || "default-swatch.jpg";
    swatch.style.borderColor = borderColor === "White" ? "black" : borderColor;
    swatch.id = id;
    return swatch;
}
function handleMoreButton(allSwatches, maxVisible, container) {
    if (allSwatches.length > maxVisible) {
        var moreButtonContainer = document.createElement("div");
        moreButtonContainer.className = "toggle-container";

        var topLine = document.createElement("div");
        topLine.className = "separator-line";

        var bottomLine = document.createElement("div");
        bottomLine.className = "separator-line";

        var moreButton = document.createElement("button");
        moreButton.innerText = "More";
        moreButton.className = "toggle-button";

        moreButton.onclick = function () {
            if (moreButton.innerText === "More") {
                allSwatches.slice(maxVisible).forEach(swatch => container.appendChild(swatch));
                moreButton.innerText = "Hide";
            } else {
                allSwatches.slice(maxVisible).forEach(swatch => container.removeChild(swatch));
                moreButton.innerText = "More";
            }
            container.appendChild(moreButtonContainer);
        };

        moreButtonContainer.appendChild(topLine);
        moreButtonContainer.appendChild(moreButton);
        moreButtonContainer.appendChild(bottomLine);
        container.appendChild(moreButtonContainer);
    }
}

function updateThumbnails(productIndex, selectedSwatchImg) {
    imgindex = 0;
    images = [];

    var thumbnailContainer = document.getElementById("thumbnails");
    thumbnailContainer.innerHTML = '';

    var product = obj.results[productIndex];

    var swatchThumbnail = document.createElement("img");
    swatchThumbnail.className = "thumbnail";
    swatchThumbnail.src = selectedSwatchImg || product.productImg;
    images.push(swatchThumbnail.src);

    swatchThumbnail.onclick = function () {
        imgindex = 0;
        updateMainImage(swatchThumbnail.src);
        updateArrows();
    };
    thumbnailContainer.appendChild(swatchThumbnail);

    Object.values(product.images).forEach((imgSrc, index) => {
        images.push(imgSrc);
        var imgThumbnail = document.createElement("img");
        imgThumbnail.className = "thumbnail";
        imgThumbnail.src = imgSrc;

        imgThumbnail.onclick = function () {
            imgindex = index + 1;
            updateMainImage(imgSrc);
            updateArrows();
        };

        thumbnailContainer.appendChild(imgThumbnail);
    });
    // let y ='<button class="forleftarrow2" id="righta" onclick="movtoleft()" ><</button>'+
    //     thumbnailContainer.innerHTML +'<button class="forleftarrow2 tomakeitgo" id="lefta" onclick="movtoright()" >></button>'

    // thumbnailContainer.innerHTML=y;
    updateArrows();
}



function updateMainImage(src) {
    document.getElementById("main-img").src = src;
}

function selectSwatch(selectedSwatch, allSwatches) {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('id');

    document.getElementById("product-price").innerText = obj.results[product].productName + " " + obj.results[product].swatches[imgindex].swatchName + " selected";
    allSwatches.forEach(swatch => swatch.classList.remove("selected"));
    selectedSwatch.classList.add("selected");
}



function movtoright() {
    if (imgindex < images.length - 1) {
        imgindex++;
        updateMainImage(images[imgindex]);
    }
    updateArrows();
}

function movtoleft() {
    if (imgindex > 0) {
        imgindex--;
        updateMainImage(images[imgindex]);
    }
    updateArrows();
}


function updateArrows() {
    if (images.length > 2) {


        document.getElementById('righta').style.visibility = imgindex === 0 ? 'hidden' : 'visible';
        document.getElementById('lefta').style.visibility = imgindex === images.length - 1 ? 'hidden' : 'visible';
    } else {
        document.getElementsByClassName("tomakeitgo")[0].style.visibility = 'hidden';
        document.getElementById('righta').style.visibility = 'hidden';
        document.getElementById('lefta').style.visibility = 'hidden';

    }
}


function updateBorders() {
    document.querySelectorAll(".swatch").forEach(swatch => {
        if (swatch.src === images[imgindex]) {
            selectSwatch(swatch, formove);
        }
    });
}
function increment() {
    let quantity = document.getElementById('quantity');
    quantity.textContent = parseInt(quantity.textContent) + 1;
}

function decrement() {
    let quantity = document.getElementById('quantity');
    if (parseInt(quantity.textContent) > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
    }
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('id');

    if (!product) {

        document.getElementById("cont").style.display = "none";
    
    }

else{
    const productIndex = product ? parseInt(product) : 0;
        await loadProductDetails(productIndex);
    }
   
};


document.addEventListener("DOMContentLoaded", function () {
    const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");

    const overlay = document.createElement("div");
    overlay.classList.add("dropdown-overlay");
    document.body.appendChild(overlay);

    dropdownTriggers.forEach(trigger => {
        const dropdown = document.getElementById(trigger.dataset.dropdown);

        trigger.addEventListener("mouseenter", () => {
            dropdown.classList.add("active");
            overlay.classList.add("active");
        });

        trigger.addEventListener("mouseleave", () => {
            setTimeout(() => {
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

                window.location.href = "./products_Page.html?id=" + product.originalIndex;

            });

            suggestionContainer.appendChild(suggestionElement);
        });
    } else {
        suggestionContainer.style.display = "none";
    }
}, 300));



document.getElementById("search-s").addEventListener("input", debounce(function () {
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

                window.location.href = "./products_Page.html?id=" + product.originalIndex;

            });

            suggestionContainer.appendChild(suggestionElement);
        });
    } else {
        suggestionContainer.style.display = "none";
    }
}, 300));






document.getElementById("search-s").addEventListener("keydown", function (event) {

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

document.getElementById("search-s").addEventListener('blur', function (event) {
    setTimeout(() => {
        document.getElementById("suggestioncontainer").style.display = "none";
    }, 200);
});
document.getElementById("search-s").addEventListener('focus', function () {
    var suggestionContainer = document.getElementById("suggestioncontainer");
    if (suggestionContainer.children.length > 0) {
        suggestionContainer.style.display = "block";
    }
});





let index = 0;
let isDragging = false;
let startX;
let scrollLeft;
const thumbnails = document.getElementById("thumbnails");

function movetoleft2() {
    let thumbnails = document.getElementById("thumbnails");
    let items = document.querySelectorAll(".thumbnail");
    if (index > 0) {
        index--;
        let moveAmount = items[0].offsetWidth + 10;
        thumbnails.style.transform = `translateX(-${index * moveAmount}px)`;
    }
}

function movetoright2() {
    let thumbnails = document.getElementById("thumbnails");
    let items = document.querySelectorAll(".thumbnail");
    if (index < items.length - 1) {
        index++;
        let moveAmount = items[0].offsetWidth + 10;
        thumbnails.style.transform = `translateX(-${index * moveAmount}px)`;
    }
}

thumbnails.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - thumbnails.offsetLeft;
    scrollLeft = thumbnails.style.transform ? parseFloat(thumbnails.style.transform.replace("translateX(", "").replace("px)", "")) : 0;
});

thumbnails.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let x = e.pageX - thumbnails.offsetLeft;
    let walk = x - startX;
    thumbnails.style.transform = `translateX(${scrollLeft + walk}px)`;
});

thumbnails.addEventListener("mouseup", () => {
    isDragging = false;
});

thumbnails.addEventListener("mouseleave", () => {
    isDragging = false;
});

thumbnails.addEventListener("wheel", (e) => {
    e.preventDefault();
    let moveAmount = document.querySelector(".thumbnail").offsetWidth + 10;
    if (e.deltaY > 0) {
        movetoright2();
    } else {
        movetoleft2();
    }
});