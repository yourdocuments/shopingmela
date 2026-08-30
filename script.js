javascript
/* =========================================================
   SHOPPING MELA — 1.25
   MASTER SCRIPT
   Cart + Wishlist + Search + Slider + Category Filter
========================================================= */


/* =========================================================
   GLOBAL CART
========================================================= */

let cart = [];



/* =========================================================
   LOAD CART FROM LOCAL STORAGE
========================================================= */

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(
                "shoppingMelaCart"
            );

        if (savedCart) {

            cart =
                JSON.parse(savedCart);

        } else {

            cart = [];

        }

    } catch (error) {

        console.error(
            "Cart loading error:",
            error
        );

        cart = [];

    }

}



/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "shoppingMelaCart",
        JSON.stringify(cart)
    );

}



/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(amount) {

    return "৳" +
        Number(amount || 0)
            .toLocaleString("en-BD");

}



/* =========================================================
   SHOW TOAST
========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "toast"
        );


    /*
       Cart page uses cartToast
    */

    if (!toast) {

        toast =
            document.getElementById(
                "cartToast"
            );

    }


    /*
       If no toast exists,
       create one automatically.
    */

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id = "toast";

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.shoppingMelaToast
    );


    window.shoppingMelaToast =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}



/* =========================================================
   CART ITEM COUNT
========================================================= */

function getCartItemCount() {

    return cart.reduce(
        (total, item) => {

            return total +
                Number(item.quantity || 0);

        },
        0
    );

}



/* =========================================================
   UPDATE CART BADGES
========================================================= */

function updateCartCount() {

    const count =
        getCartItemCount();


    /*
       Possible cart count elements
    */

    const selectors = [

        "#cartCountBadge",

        "#cartBadge",

        ".cart-count-badge",

        ".cart-badge",

        "[data-cart-count]"

    ];


    selectors.forEach(
        selector => {

            document
                .querySelectorAll(
                    selector
                )
                .forEach(element => {

                    element.textContent =
                        count;

                    if (count > 0) {

                        element.classList
                            .add("has-items");

                    } else {

                        element.classList
                            .remove("has-items");

                    }

                });

        }
    );

}



/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product) {

    if (!product) {

        showToast(
            "Product information পাওয়া যায়নি"
        );

        return;

    }


    const productId =
        String(
            product.id ||
            product.productId ||
            Date.now()
        );


    const productName =
        product.name ||
        product.title ||
        "Product";


    const price =
        Number(
            product.price ||
            product.currentPrice ||
            0
        );


    const image =
        product.image ||
        product.img ||
        "";


    const brand =
        product.brand ||
        "Local Brand";


    const existing =
        cart.find(
            item =>
                String(item.id) ===
                productId
        );


    if (existing) {

        existing.quantity += 1;

        showToast(
            productName +
            " quantity বাড়ানো হয়েছে 🛒"
        );

    } else {

        cart.push({

            id: productId,

            name: productName,

            price: price,

            oldPrice:
                Number(
                    product.oldPrice ||
                    0
                ),

            image: image,

            brand: brand,

            quantity: 1

        });


        showToast(
            productName +
            " Cart-এ যোগ করা হয়েছে 🛒"
        );

    }


    saveCart();

    updateCartCount();

}



/* =========================================================
   EASY ADD TO CART
   Example:
   addProductToCart(
      "product-1",
      "Ladies Three Piece",
      1250,
      "...image...",
      "Anjona Ladies Tailors"
   )
========================================================= */

function addProductToCart(
    id,
    name,
    price,
    image,
    brand,
    oldPrice = 0
) {

    addToCart({

        id: id,

        name: name,

        price: Number(price),

        image: image,

        brand: brand,

        oldPrice:
            Number(oldPrice)

    });

}



/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(id) {

    const before =
        cart.length;


    cart =
        cart.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    if (cart.length === before) {

        showToast(
            "Product Cart-এ পাওয়া যায়নি"
        );

        return;

    }


    saveCart();

    updateCartCount();

    renderCart();


    showToast(
        "Product Cart থেকে remove করা হয়েছে"
    );

}



/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(
    id,
    change
) {

    const item =
        cart.find(
            product =>
                String(product.id) ===
                String(id)
        );


    if (!item) {

        return;

    }


    item.quantity =
        Number(item.quantity) +
        Number(change);


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCartCount();

    renderCart();

}



/* =========================================================
   CLEAR CART
========================================================= */

function clearShoppingCart() {

    if (cart.length === 0) {

        showToast(
            "Cart ইতোমধ্যে empty"
        );

        return;

    }


    const confirmed =
        confirm(
            "আপনি কি পুরো Cart clear করতে চান?"
        );


    if (!confirmed) {

        return;

    }


    cart = [];


    saveCart();

    updateCartCount();

    renderCart();


    showToast(
        "আপনার Cart clear করা হয়েছে"
    );

}



/* =========================================================
   GET CART SUBTOTAL
========================================================= */

function getCartSubtotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                );

        },
        0
    );

}



/* =========================================================
   GET CART OLD TOTAL
========================================================= */

function getCartOldTotal() {

    return cart.reduce(
        (total, item) => {

            const oldPrice =
                Number(
                    item.oldPrice ||
                    item.price
                );


            return total +
                (
                    oldPrice *
                    Number(item.quantity)
                );

        },
        0
    );

}



/* =========================================================
   GET CART DISCOUNT
========================================================= */

function getCartDiscount() {

    return Math.max(
        0,
        getCartOldTotal() -
        getCartSubtotal()
    );

}



/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartContainer =
        document.getElementById(
            "cartItems"
        );


    /*
       If current page doesn't have
       cartItems, do nothing.
    */

    if (!cartContainer) {

        updateCartSummary();

        return;

    }


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    এখনো কোনো product
                    আপনার Cart-এ নেই।
                </p>

                <a
                    href="index.html#products"
                    class="continue-btn"
                >
                    Shopping শুরু করুন →
                </a>

            </div>

        `;


        updateCartSummary();

        return;

    }


    cart.forEach(
        item => {

            const oldPrice =
                Number(
                    item.oldPrice ||
                    item.price
                );


            const saving =
                Math.max(
                    0,
                    oldPrice -
                    Number(item.price)
                );


            const total =
                Number(item.price) *
                Number(item.quantity);


            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "cart-item";


            article.dataset.id =
                item.id;


            article.innerHTML = `

                <div
                    class="cart-item-image"
                    style="
                        background-image:
                        url('${escapeHTML(item.image)}');
                    "
                >
                </div>


                <div
                    class="cart-item-info"
                >

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <div
                        class="cart-item-brand"
                    >
                        ${escapeHTML(item.brand)}
                    </div>

                    <div
                        class="verified-mini"
                    >

                        <span
                            class="verified-mini-badge"
                        >
                            ✓
                        </span>

                        Verified Seller

                    </div>


                    <div
                        class="quantity-area"
                    >

                        <span
                            class="quantity-label"
                        >
                            Quantity
                        </span>


                        <div
                            class="quantity-control"
                        >

                            <button
                                class="quantity-btn"
                                onclick="
                                    changeCartQuantity(
                                        '${escapeHTML(item.id)}',
                                        -1
                                    )
                                "
                            >
                                −
                            </button>


                            <span
                                class="quantity-number"
                            >
                                ${item.quantity}
                            </span>


                            <button
                                class="quantity-btn"
                                onclick="
                                    changeCartQuantity(
                                        '${escapeHTML(item.id)}',
                                        1
                                    )
                                "
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div
                        class="item-actions"
                    >

                        <button
                            class="item-action-btn"
                            onclick="
                                moveToWishlist(
                                    '${escapeHTML(item.name)}'
                                )
                            "
                        >
                            ♡ Wishlist
                        </button>


                        <button
                            class="
                                item-action-btn
                                remove-btn
                            "
                            onclick="
                                removeFromCart(
                                    '${escapeHTML(item.id)}'
                                )
                            "
                        >
                            🗑 Remove
                        </button>

                    </div>

                </div>


                <div
                    class="cart-item-price"
                >

                    <span
                        class="cart-current-price"
                    >
                        ${formatMoney(total)}
                    </span>


                    ${
                        saving > 0
                        ? `
                            <span
                                class="cart-old-price"
                            >
                                ${formatMoney(
                                    oldPrice *
                                    Number(item.quantity)
                                )}
                            </span>

                            <span
                                class="item-savings"
                            >
                                Save
                                ${formatMoney(
                                    saving *
                                    Number(item.quantity)
                                )}
                            </span>
                        `
                        : ""
                    }

                </div>

            `;


            cartContainer.appendChild(
                article
            );

        }
    );


    updateCartSummary();

}



/* =========================================================
   CART SUMMARY
========================================================= */

function updateCartSummary() {

    const subtotal =
        getCartSubtotal();


    const discount =
        getCartDiscount();


    /*
       Demo delivery charge
    */

    const delivery =
        cart.length > 0
        ? 80
        : 0;


    const total =
        subtotal +
        delivery;


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const discountElement =
        document.getElementById(
            "discount"
        );


    const deliveryElement =
        document.getElementById(
            "delivery"
        );


    const grandTotalElement =
        document.getElementById(
            "grandTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    if (discountElement) {

        discountElement.textContent =
            "-" +
            formatMoney(discount);

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            formatMoney(delivery);

    }


    if (grandTotalElement) {

        grandTotalElement.textContent =
            formatMoney(total);

    }


    const countElement =
        document.getElementById(
            "cartCount"
        );


    if (countElement) {

        const count =
            getCartItemCount();


        countElement.textContent =
            count +
            (
                count === 1
                ? " Item"
                : " Items"
            );

    }

}



/* =========================================================
   CART PAGE AUTO DETECTION
========================================================= */

function initializeCartPage() {

    if (
        document.getElementById(
            "cartItems"
        )
        ||
        document.querySelector(
            ".cart-page"
        )
    ) {

        renderCart();

    }

}



/* =========================================================
   CHECKOUT
========================================================= */

function goCheckout() {

    if (cart.length === 0) {

        showToast(
            "Checkout করার আগে Cart-এ product যোগ করুন"
        );

        return;

    }


    saveCart();


    window.location.href =
        "checkout.html";

}



/* =========================================================
   WISHLIST
========================================================= */

function loadWishlist() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "shoppingMelaWishlist"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}



function saveWishlist(
    wishlist
) {

    localStorage.setItem(
        "shoppingMelaWishlist",
        JSON.stringify(
            wishlist
        )
    );

}



function moveToWishlist(
    productName
) {

    const wishlist =
        loadWishlist();


    if (
        !wishlist.includes(
            productName
        )
    ) {

        wishlist.push(
            productName
        );

        saveWishlist(
            wishlist
        );

    }


    showToast(
        productName +
        " Wishlist-এ যোগ করা হয়েছে ❤️"
    );

}



/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (!query) {

        showToast(
            "কিছু search করুন 🔍"
        );

        return;

    }


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    let found = false;


    products.forEach(
        product => {

            const name =
                (
                    product.dataset.product ||
                    product.querySelector("h3")?.textContent ||
                    ""
                )
                .toLowerCase();


            const category =
                (
                    product.dataset.category ||
                    ""
                )
                .toLowerCase();


            const brand =
                (
                    product.querySelector(
                        ".product-brand"
                    )?.textContent ||
                    ""
                )
                .toLowerCase();


            if (
                name.includes(query)
                ||
                category.includes(query)
                ||
                brand.includes(query)
            ) {

                product.style.display =
                    "";

                found = true;

            } else {

                product.style.display =
                    "none";

            }

        }
    );


    const productsSection =
        document.getElementById(
            "products"
        );


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    if (found) {

        showToast(
            "Search result পাওয়া গেছে 🔎"
        );

    } else {

        showToast(
            "কোনো product পাওয়া যায়নি"
        );

    }

}



/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(
    category
) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    let found = false;


    products.forEach(
        product => {

            const productCategory =
                (
                    product.dataset.category ||
                    ""
                );


            if (
                productCategory
                    .toLowerCase() ===
                category.toLowerCase()
                ||
                category === "All"
            ) {

                product.style.display =
                    "";

                found = true;

            } else {

                product.style.display =
                    "none";

            }

        }
    );


    const productsSection =
        document.getElementById(
            "products"
        );


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    if (found) {

        showToast(
            category +
            " category selected"
        );

    } else {

        showToast(
            "এই category-তে এখনো product নেই"
        );

    }

}



/* =========================================================
   HERO SLIDER
========================================================= */

let currentSlide = 0;

let sliderInterval = null;


function initializeSlider() {

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    const dotsContainer =
        document.getElementById(
            "sliderDots"
        );


    if (
        slides.length === 0
        ||
        !dotsContainer
    ) {

        return;

    }


    dotsContainer.innerHTML = "";


    slides.forEach(
        (slide, index) => {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "slider-dot";


            if (index === 0) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                () => {

                    goToSlide(index);

                }
            );


            dotsContainer.appendChild(
                dot
            );

        }
    );


    const nextButton =
        document.getElementById(
            "nextSlide"
        );


    const prevButton =
        document.getElementById(
            "prevSlide"
        );


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            previousSlide
        );

    }


    startSlider();

}



function goToSlide(index) {

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    const dots =
        document.querySelectorAll(
            ".slider-dot"
        );


    if (!slides.length) {

        return;

    }


    slides.forEach(
        slide =>
            slide.classList.remove(
                "active"
            )
    );


    dots.forEach(
        dot =>
            dot.classList.remove(
                "active"
            )
    );


    currentSlide =
        index;


    slides[currentSlide]
        .classList.add(
            "active"
        );


    if (dots[currentSlide]) {

        dots[currentSlide]
            .classList.add(
                "active"
            );

    }

}



function nextSlide() {

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    if (!slides.length) {

        return;

    }


    currentSlide =
        (
            currentSlide + 1
        )
        %
        slides.length;


    goToSlide(
        currentSlide
    );

}



function previousSlide() {

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    if (!slides.length) {

        return;

    }


    currentSlide =
        currentSlide - 1;


    if (currentSlide < 0) {

        currentSlide =
            slides.length - 1;

    }


    goToSlide(
        currentSlide
    );

}



function startSlider() {

    clearInterval(
        sliderInterval
    );


    sliderInterval =
        setInterval(
            nextSlide,
            5000
        );

}



/* =========================================================
   SCROLL TO SECTION
========================================================= */

function scrollToSection(
    id
) {

    const section =
        document.getElementById(
            id
        );


    if (!section) {

        return;

    }


    section.scrollIntoView({
        behavior: "smooth"
    });

}



/* =========================================================
   HOME
========================================================= */

function goHome() {

    window.location.href =
        "index.html";

}



/* =========================================================
   SAFE HTML
========================================================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================================
   PRODUCT CARD AUTO ADD TO CART
========================================================= */

function initializeProductButtons() {

    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            (card, index) => {

                /*
                   Do not overwrite an
                   existing Add to Cart button.
                */

                const existingButton =
                    card.querySelector(
                        ".add-to-cart-btn"
                    );


                if (existingButton) {

                    return;

                }


                const name =
                    card.dataset.product ||
                    card.querySelector(
                        "h3"
                    )?.textContent.trim() ||
                    "Product";


                const category =
                    card.dataset.category ||
                    "Local Brand";


                const priceText =
                    card.querySelector(
                        ".current-price"
                    )?.textContent ||
                    "0";


                const price =
                    Number(
                        priceText
                            .replace(
                                /[^\d]/g,
                                ""
                            )
                    );


                const oldPriceText =
                    card.querySelector(
                        ".old-price"
                    )?.textContent ||
                    "0";


                const oldPrice =
                    Number(
                        oldPriceText
                            .replace(
                                /[^\d]/g,
                                ""
                            )
                    );


                const imageElement =
                    card.querySelector(
                        ".product-image"
                    );


                let image = "";


                if (
                    imageElement
                    &&
                    imageElement.style
                        .backgroundImage
                ) {

                    image =
                        imageElement.style
                            .backgroundImage
                            .replace(
                                /^url\(["']?/,
                                ""
                            )
                            .replace(
                                /["']?\)$/,
                                ""
                            );

                }


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "add-to-cart-btn";


                button.textContent =
                    "🛒 Add to Cart";


                button.style.cssText = `

                    width:100%;
                    border:none;
                    background:#1877f2;
                    color:white;
                    padding:11px;
                    border-radius:8px;
                    margin-top:10px;
                    cursor:pointer;
                    font-size:13px;
                    font-weight:800;

                `;


                button.addEventListener(
                    "click",
                    () => {

                        addProductToCart(

                            "product-" +
                            (index + 1),

                            name,

                            price,

                            image,

                            category,

                            oldPrice

                        );

                    }
                );


                const info =
                    card.querySelector(
                        ".product-info"
                    );


                if (info) {

                    info.appendChild(
                        button
                    );

                }

            }
        );

}



/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCart();

        updateCartCount();

        initializeSlider();

        initializeCartPage();

        initializeProductButtons();


        /*
           SEARCH
        */

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const searchBtn =
            document.getElementById(
                "searchBtn"
            );


        if (searchBtn) {

            searchBtn.addEventListener(
                "click",
                performSearch
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        performSearch();

                    }

                }
            );

        }

    }
);
```
