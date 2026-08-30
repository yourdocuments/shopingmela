/* =========================================================
SHOPPING MELA
1.3 — script.js
Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================================
   TOAST MESSAGE
====================================================== */

window.showToast = function (message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.shoppingMelaToastTimer);

    window.shoppingMelaToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
};


/* =====================================================
   SMOOTH SCROLL
====================================================== */

window.scrollToSection = function (id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};


/* =====================================================
   HERO SLIDER
====================================================== */

const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.getElementById("sliderDots");
const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");
const heroSlider = document.getElementById("heroSlider");

let currentSlide = 0;
let sliderTimer = null;


if (slides.length > 0) {

    /* CREATE DOTS */

    if (dotsContainer) {

        dotsContainer.innerHTML = "";

        slides.forEach((slide, index) => {

            const dot = document.createElement("span");

            dot.className = "slider-dot";

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.setAttribute(
                "aria-label",
                `Slide ${index + 1}`
            );

            dot.addEventListener("click", () => {

                goToSlide(index);
                restartSlider();

            });

            dotsContainer.appendChild(dot);
        });
    }


    const dots =
        document.querySelectorAll(".slider-dot");


    /* GO TO SLIDE */

    function goToSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        slides.forEach(slide => {
            slide.classList.remove("active");
        });


        dots.forEach(dot => {
            dot.classList.remove("active");
        });


        currentSlide = index;


        slides[currentSlide]
            .classList.add("active");


        if (dots[currentSlide]) {
            dots[currentSlide]
                .classList.add("active");
        }
    }


    /* NEXT SLIDE */

    function nextSlide() {

        goToSlide(currentSlide + 1);

    }


    /* PREVIOUS SLIDE */

    function previousSlide() {

        goToSlide(currentSlide - 1);

    }


    /* BUTTONS */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();
                restartSlider();

            }
        );
    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                previousSlide();
                restartSlider();

            }
        );
    }


    /* AUTO SLIDER */

    function startSlider() {

        clearInterval(sliderTimer);

        sliderTimer = setInterval(() => {

            nextSlide();

        }, 5000);
    }


    function restartSlider() {

        clearInterval(sliderTimer);

        startSlider();
    }


    startSlider();


    /* PAUSE ON MOUSE */

    if (heroSlider) {

        heroSlider.addEventListener(
            "mouseenter",
            () => {

                clearInterval(sliderTimer);

            }
        );


        heroSlider.addEventListener(
            "mouseleave",
            () => {

                startSlider();

            }
        );
    }


    /* MOBILE SWIPE */

    let touchStartX = 0;
    let touchEndX = 0;


    if (heroSlider) {

        heroSlider.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        heroSlider.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchStartX - touchEndX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }


                restartSlider();

            },
            { passive: true }
        );
    }
}


/* =====================================================
   PRODUCT FILTER
====================================================== */

window.filterCategory = function (category) {

    const products =
        document.querySelectorAll(".product-card");


    if (!products.length) {

        showToast(
            "এখনো কোনো product যোগ করা হয়নি"
        );

        return;
    }


    let found = false;


    products.forEach(product => {

        const productCategory =
            (
                product.dataset.category || ""
            ).toLowerCase();


        const selectedCategory =
            category.toLowerCase();


        if (
            selectedCategory === "all" ||
            productCategory === selectedCategory
        ) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";

        }
    });


    scrollToSection("products");


    if (found) {

        showToast(
            `${category} category selected`
        );

    } else {

        showToast(
            "এই category-তে এখনো product নেই"
        );
    }
};


/* =====================================================
   SHOW ALL PRODUCTS
====================================================== */

window.showAllProducts = function () {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        product.style.display = "";

    });


    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {
        searchInput.value = "";
    }


    showToast(
        "সব Products দেখানো হচ্ছে"
    );
};


/* =====================================================
   SEARCH
====================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


function performSearch() {

    if (!searchInput) return;


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    if (!query) {

        products.forEach(product => {
            product.style.display = "";
        });


        showToast(
            "কিছু search করুন 🔍"
        );

        return;
    }


    let found = false;


    products.forEach(product => {

        const name =
            (
                product.dataset.product || ""
            ).toLowerCase();


        const category =
            (
                product.dataset.category || ""
            ).toLowerCase();


        const text =
            product.textContent.toLowerCase();


        if (
            name.includes(query) ||
            category.includes(query) ||
            text.includes(query)
        ) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";

        }
    });


    scrollToSection("products");


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

            if (event.key === "Enter") {

                performSearch();

            }
        }
    );
}


/* =====================================================
   CLEAR SEARCH WITH ESC
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (searchInput) {
                searchInput.value = "";
            }

            const products =
                document.querySelectorAll(
                    ".product-card"
                );


            products.forEach(product => {

                product.style.display = "";

            });
        }
    }
);


/* =====================================================
   WISHLIST
====================================================== */

const wishlistButtons =
    document.querySelectorAll(
        ".product-heart"
    );


wishlistButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            /*
             * Prevent the inline onclick
             * from causing duplicate messages.
             */

            event.stopPropagation();


            const current =
                button.textContent.trim();


            if (current === "♡") {

                button.textContent = "♥";

                button.classList.add(
                    "wishlist-active"
                );


                showToast(
                    "Wishlist-এ যোগ করা হয়েছে ❤️"
                );

            } else {

                button.textContent = "♡";

                button.classList.remove(
                    "wishlist-active"
                );


                showToast(
                    "Wishlist থেকে সরানো হয়েছে"
                );
            }
        }
    );
});


/* =====================================================
   HEADER WISHLIST / CART
====================================================== */

const headerActions =
    document.querySelectorAll(
        ".header-action"
    );


headerActions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const text =
                button.textContent
                    .toLowerCase();


            if (text.includes("wishlist")) {

                showToast(
                    "আপনার Wishlist শীঘ্রই আসছে ❤️"
                );

            }


            if (text.includes("cart")) {

                showToast(
                    "Shopping Cart শীঘ্রই আসছে 🛒"
                );

            }
        }
    );
});


/* =====================================================
   NAVIGATION ACTIVE STATE
====================================================== */

const navLinks =
    document.querySelectorAll(
        ".navigation a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            link.classList.add(
                "active"
            );
        }
    );
});


/* =====================================================
   CATEGORY CARD EFFECT
====================================================== */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            categoryCards.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            card.classList.add(
                "selected"
            );
        }
    );
});


/* =====================================================
   ADVERTISEMENT BUTTONS
====================================================== */

const advertiseButtons =
    document.querySelectorAll(
        ".advertise-button"
    );


advertiseButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showToast(
                "Advertising form শীঘ্রই আসছে! 📢"
            );
        }
    );
});


/* =====================================================
   IMAGE FALLBACK
====================================================== */

document
    .querySelectorAll(
        ".product-image, .brand-cover, .blog-image"
    )
    .forEach(element => {

        const background =
            element.style.backgroundImage;


        if (!background) return;


        const match =
            background.match(
                /url\(["']?(.*?)["']?\)/
            );


        if (!match) return;


        const image =
            new Image();


        image.onerror = () => {

            element.style.backgroundImage =
                "none";

            element.classList.add(
                "image-fallback"
            );
        };


        image.src = match[1];

    });


/* =====================================================
   PAGE LOAD
====================================================== */

document.body.classList.add(
    "shopping-mela-loaded"
);


console.log(
    "Shopping Mela — 1.3 script.js loaded successfully."
);
```

});
