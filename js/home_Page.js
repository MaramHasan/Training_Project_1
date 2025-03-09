function loadProducts() {
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
        filterDiv.innerHTML = "<hr> Sort <span style='color:gray'>Relevance</span><hr>";


        containerDiv.appendChild(filterDiv);
        containerDiv.appendChild(productImage);
        productImage.classList.add("productimg");

        let productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        let swatchesHTML = "";
        if (product.swatches && product.swatches.length > 0) {
            swatchesHTML = `<div class="swatches">`;
            swatchesHTML += `<img class="swatch" src="${productImageSrc}" data-src="${productImageSrc}" ">`;
            product.swatches.slice(0, 2).forEach(swatch => {
                let swatchImgSrc = swatch.img.src ? swatch.img.src : "https://via.placeholder.com/40";
                swatchesHTML += `<img class="swatch" src="${swatchImgSrc}" data-src="${swatchImgSrc}" alt="${swatch.swatchName}" title="${swatch.swatchName}">`;
            });

            swatchesHTML += `</div>`;
        }

        productInfo.innerHTML = `
                <div class="forfilter"><hr> Filter <span style="Color:gray">104Times</span><hr></div>
            <p class="quickshop">Quick shop</p>
            <h3 class="product-title">${product.productName}</h3>
            <p class="product-price">${product.productPriceFormatted}</p>
            ${swatchesHTML}
        `;

        productCard.appendChild(containerDiv);
        productCard.appendChild(productInfo);
        container.appendChild(productCard);

        let swatches = productCard.querySelectorAll(".swatch");
        swatches.forEach(swatch => {
            swatch.addEventListener("click", function () {
                productImage.src = this.getAttribute("data-src");
            });
        });
    });
}

window.onload = loadProducts;


  document.getElementById("home-search").addEventListener("input", function () {
            let searchValue = this.value.toLowerCase();
            let container = document.getElementById("products-container");
            container.innerHTML = "";

            let filteredProducts = obj.results.filter(product =>
                product.productName.toLowerCase().includes(searchValue)
            );

            filteredProducts.forEach(product => {
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
                productImage.classList.add("productimg");

                let productInfo = document.createElement("div");
                productInfo.classList.add("product-info");

                let swatchesHTML = "";
                if (product.swatches && product.swatches.length > 0) {
                    swatchesHTML = `<div class="swatches">`;
                    swatchesHTML += `<img class="swatch" src="${productImageSrc}" data-src="${productImageSrc}" ">`;
                    product.swatches.slice(0, 2).forEach(swatch => {
                        let swatchImgSrc = swatch.img.src ? swatch.img.src : "https://via.placeholder.com/40";
                        swatchesHTML += `<img class="swatch" src="${swatchImgSrc}" data-src="${swatchImgSrc}" alt="${swatch.swatchName}" title="${swatch.swatchName}">`;
                    });
                    swatchesHTML += `</div>`;
                }

                productInfo.innerHTML = `
            <div class="forfilter"><hr> Filter <span style="Color:gray">104Times</span><hr></div>
            <p class="quickshop">Quick shop</p>
            <h3 class="product-title">${product.productName}</h3>
            <p class="product-price">${product.productPriceFormatted}</p>
            ${swatchesHTML}
        `;

                productCard.appendChild(containerDiv);
                productCard.appendChild(productInfo);
                container.appendChild(productCard);

                let swatches = productCard.querySelectorAll(".swatch");
                swatches.forEach(swatch => {
                    swatch.addEventListener("click", function () {
                        productImage.src = this.getAttribute("data-src");
                    });
                });
            });
        });
