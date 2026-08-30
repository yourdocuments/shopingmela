/* =========================================================
SHOPPING MELA
1.5 — blog.js
Blog Post Management System
========================================================= */

/* =========================================================
GLOBAL SETTINGS
========================================================= */

const BLOG_STORAGE_KEY = "shoppingMelaBlogPosts";

let currentBlogFilter = "All";
let currentBlogSearch = "";

/* =========================================================
DEFAULT BLOG POSTS
========================================================= */

const defaultBlogPosts = [

```
{
    id: "default-1",

    author: "Shopping Mela Team",

    title:
        "Local Brand কীভাবে নিজের Business বড় করতে পারে?",

    category:
        "Local Business",

    content:
        "Local customers-এর কাছে আপনার business পৌঁছে দেওয়ার কিছু সহজ এবং practical উপায়।",

    image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85",

    date:
        "2026-08-30",

    readTime:
        "5 min read",

    defaultPost:
        true

},


{
    id: "default-2",

    author: "Shopping Mela Team",

    title:
        "Online Shopping করার সময় কী কী বিষয় দেখবেন?",

    category:
        "Shopping Tips",

    content:
        "ভালো seller, product information, price এবং delivery সম্পর্কে কীভাবে সচেতন থাকবেন।",

    image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=85",

    date:
        "2026-08-30",

    readTime:
        "4 min read",

    defaultPost:
        true

},


{
    id: "default-3",

    author: "Community",

    title:
        "Local Business কেন আমাদের জন্য গুরুত্বপূর্ণ?",

    category:
        "Community",

    content:
        "নিজের এলাকার উদ্যোক্তা, ছোট business এবং local brand support করার গুরুত্ব।",

    image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",

    date:
        "2026-08-30",

    readTime:
        "3 min read",

    defaultPost:
        true

},


{
    id: "default-4",

    author: "Shopping Mela Team",

    title:
        "Local Products কেনার কিছু গুরুত্বপূর্ণ সুবিধা",

    category:
        "Lifestyle",

    content:
        "Local products ব্যবহার করলে customer এবং local entrepreneur দুজনেরই কীভাবে উপকার হতে পারে।",

    image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=85",

    date:
        "2026-08-30",

    readTime:
        "4 min read",

    defaultPost:
        true

}
```

];

/* =========================================================
GET SAVED POSTS
========================================================= */

function getSavedPosts() {

```
try {

    const saved =
        localStorage.getItem(
            BLOG_STORAGE_KEY
        );


    if (!saved) {

        return [];

    }


    const parsed =
        JSON.parse(saved);


    if (!Array.isArray(parsed)) {

        return [];

    }


    return parsed;

}

catch (error) {

    console.error(
        "Blog storage error:",
        error
    );

    return [];

}
```

}

/* =========================================================
SAVE POSTS
========================================================= */

function savePosts(posts) {

```
try {

    localStorage.setItem(
        BLOG_STORAGE_KEY,
        JSON.stringify(posts)
    );

    return true;

}

catch (error) {

    console.error(
        "Unable to save blog posts:",
        error
    );

    showBlogToast(
        "Post save করা যায়নি ⚠️"
    );

    return false;

}
```

}

/* =========================================================
GET ALL POSTS
========================================================= */

function getAllBlogPosts() {

```
const userPosts =
    getSavedPosts();


return [
    ...userPosts,
    ...defaultBlogPosts
];
```

}

/* =========================================================
FORMAT DATE
========================================================= */

function formatBlogDate(dateString) {

```
if (!dateString) {

    return "";

}


const date =
    new Date(dateString);


if (isNaN(date.getTime())) {

    return dateString;

}


return date.toLocaleDateString(
    "bn-BD",
    {
        year: "numeric",
        month: "short",
        day: "numeric"
    }
);
```

}

/* =========================================================
ESCAPE HTML
Security helper
========================================================= */

function escapeHTML(value) {

```
if (value === null || value === undefined) {

    return "";

}


return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
```

}

/* =========================================================
CREATE POST CARD
========================================================= */

function createBlogPostCard(post) {

```
const article =
    document.createElement("article");


article.className =
    "blog-post-card";


article.dataset.category =
    post.category;


article.dataset.title =
    post.title;


article.dataset.postId =
    post.id;


const safeAuthor =
    escapeHTML(post.author);


const safeTitle =
    escapeHTML(post.title);


const safeCategory =
    escapeHTML(post.category);


const safeContent =
    escapeHTML(post.content);


const safeImage =
    escapeHTML(
        post.image ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85"
    );


const safeDate =
    escapeHTML(
        formatBlogDate(post.date)
    );


const readTime =
    escapeHTML(
        post.readTime ||
        "3 min read"
    );


article.innerHTML = `

    <div
        class="blog-post-image"
        style="
            background-image:
            url('${safeImage}');
        "
    >

        <span class="blog-post-category">
            ${safeCategory}
        </span>

    </div>


    <div class="blog-post-content">

        <div class="blog-post-meta">

            <span class="blog-author">
                ${safeAuthor}
            </span>

            <span>
                ${readTime}
            </span>

        </div>


        <h2>
            ${safeTitle}
        </h2>


        <p>
            ${safeContent}
        </p>


        <div
            style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:10px;
                flex-wrap:wrap;
            "
        >

            <button
                class="read-more"
                type="button"
                data-action="read"
            >
                পুরো Post পড়ুন →
            </button>


            <span
                style="
                    font-size:10px;
                    color:#98a2b3;
                "
            >
                ${safeDate}
            </span>

        </div>

        ${
            post.defaultPost
            ? ""
            : `
                <button
                    type="button"
                    data-action="delete"
                    style="
                        margin-top:12px;
                        border:0;
                        background:#fff1f0;
                        color:#d92d20;
                        padding:7px 10px;
                        border-radius:7px;
                        font-size:10px;
                        font-weight:800;
                        cursor:pointer;
                    "
                >
                    🗑️ Delete Post
                </button>
            `
        }

    </div>

`;


const readButton =
    article.querySelector(
        '[data-action="read"]'
    );


if (readButton) {

    readButton.addEventListener(
        "click",
        function() {

            openFullBlogPost(post);

        }
    );

}


const deleteButton =
    article.querySelector(
        '[data-action="delete"]'
    );


if (deleteButton) {

    deleteButton.addEventListener(
        "click",
        function() {

            deleteBlogPost(post.id);

        }
    );

}


return article;
```

}

/* =========================================================
RENDER BLOG POSTS
========================================================= */

function renderBlogPosts() {

```
const grid =
    document.getElementById(
        "blogPostGrid"
    );


const emptyBlog =
    document.getElementById(
        "emptyBlog"
    );


if (!grid) {

    return;

}


grid.innerHTML = "";


const allPosts =
    getAllBlogPosts();


const query =
    currentBlogSearch
        .trim()
        .toLowerCase();


const filteredPosts =
    allPosts.filter(
        post => {

            const categoryMatch =
                currentBlogFilter === "All"
                ||
                post.category.toLowerCase()
                    ===
                currentBlogFilter.toLowerCase();


            const searchMatch =
                !query
                ||
                post.title
                    .toLowerCase()
                    .includes(query)
                ||
                post.content
                    .toLowerCase()
                    .includes(query)
                ||
                post.author
                    .toLowerCase()
                    .includes(query)
                ||
                post.category
                    .toLowerCase()
                    .includes(query);


            return (
                categoryMatch
                &&
                searchMatch
            );

        }
    );


filteredPosts.forEach(
    post => {

        grid.appendChild(
            createBlogPostCard(post)
        );

    }
);


if (emptyBlog) {

    if (filteredPosts.length === 0) {

        emptyBlog.classList.add(
            "show"
        );

    }

    else {

        emptyBlog.classList.remove(
            "show"
        );

    }

}
```

}

/* =========================================================
SEARCH BLOG
========================================================= */

function performBlogSearch() {

```
const input =
    document.getElementById(
        "blogSearch"
    );


if (!input) {

    return;

}


currentBlogSearch =
    input.value.trim();


renderBlogPosts();
```

}

/* =========================================================
FILTER BLOG
========================================================= */

function setBlogFilter(category) {

```
currentBlogFilter =
    category;


const buttons =
    document.querySelectorAll(
        ".blog-filter button"
    );


buttons.forEach(
    button => {

        if (
            button.dataset.filter
            ===
            category
        ) {

            button.classList.add(
                "active"
            );

        }

        else {

            button.classList.remove(
                "active"
            );

        }

    }
);


renderBlogPosts();
```

}

/* =========================================================
DELETE BLOG POST
========================================================= */

function deleteBlogPost(postId) {

```
const confirmed =
    confirm(
        "আপনি কি এই Post টি delete করতে চান?"
    );


if (!confirmed) {

    return;

}


const posts =
    getSavedPosts();


const updatedPosts =
    posts.filter(
        post =>
            post.id !== postId
    );


savePosts(
    updatedPosts
);


renderBlogPosts();


showBlogToast(
    "Post delete করা হয়েছে 🗑️"
);
```

}

/* =========================================================
OPEN FULL BLOG POST
========================================================= */

function openFullBlogPost(post) {

```
const modal =
    document.getElementById(
        "postModal"
    );


if (!modal) {

    return;

}


const modalBox =
    modal.querySelector(
        ".post-modal-box"
    );


if (!modalBox) {

    return;

}


modalBox.innerHTML = `

    <div class="modal-header">

        <h2>
            ${escapeHTML(post.title)}
        </h2>

        <button
            class="close-modal"
            type="button"
            onclick="closePostModal()"
        >
            ×
        </button>

    </div>


    <div
        style="
            margin-bottom:16px;
            border-radius:12px;
            overflow:hidden;
        "
    >

        <img
            src="${escapeHTML(post.image)}"
            alt="${escapeHTML(post.title)}"
            style="
                width:100%;
                height:260px;
                object-fit:cover;
                display:block;
            "
            onerror="
                this.style.display='none';
            "
        >

    </div>


    <div
        style="
            display:flex;
            gap:8px;
            flex-wrap:wrap;
            margin-bottom:14px;
        "
    >

        <span
            style="
                background:#fff1e8;
                color:#ff6b00;
                padding:6px 9px;
                border-radius:6px;
                font-size:10px;
                font-weight:900;
            "
        >
            ${escapeHTML(post.category)}
        </span>


        <span
            style="
                background:#f2f4f7;
                color:#667085;
                padding:6px 9px;
                border-radius:6px;
                font-size:10px;
            "
        >
            ${escapeHTML(post.author)}
        </span>


        <span
            style="
                background:#f2f4f7;
                color:#667085;
                padding:6px 9px;
                border-radius:6px;
                font-size:10px;
            "
        >
            ${escapeHTML(
                formatBlogDate(post.date)
            )}
        </span>

    </div>


    <div
        style="
            color:#475467;
            line-height:1.8;
            font-size:14px;
            white-space:pre-wrap;
        "
    >
        ${escapeHTML(post.content)}
    </div>


    <div
        style="
            margin-top:25px;
            text-align:right;
        "
    >

        <button
            type="button"
            class="cancel-btn"
            onclick="closePostModal()"
        >
            Close
        </button>

    </div>

`;


modal.classList.add(
    "show"
);


document.body.style.overflow =
    "hidden";
```

}

/* =========================================================
RESET POST FORM MODAL
========================================================= */

function resetPostModal() {

```
const modal =
    document.getElementById(
        "postModal"
    );


if (!modal) {

    return;

}


const box =
    modal.querySelector(
        ".post-modal-box"
    );


if (!box) {

    return;

}


box.innerHTML = `

    <div class="modal-header">

        <h2>
            ✍️ Write a Post
        </h2>

        <button
            class="close-modal"
            id="closePostModal"
            type="button"
        >
            ×
        </button>

    </div>


    <form id="postForm">


        <div class="post-form-group">

            <label for="postAuthor">
                আপনার নাম
            </label>

            <input
                type="text"
                id="postAuthor"
                placeholder="আপনার নাম লিখুন"
                required
            >

        </div>


        <div class="post-form-group">

            <label for="postTitle">
                Post Title
            </label>

            <input
                type="text"
                id="postTitle"
                placeholder="আপনার Post-এর title লিখুন"
                required
            >

        </div>


        <div class="post-form-group">

            <label for="postCategory">
                Category
            </label>

            <select
                id="postCategory"
                required
            >

                <option value="">
                    Category নির্বাচন করুন
                </option>

                <option value="Local Business">
                    Local Business
                </option>

                <option value="Shopping Tips">
                    Shopping Tips
                </option>

                <option value="Community">
                    Community
                </option>

                <option value="Lifestyle">
                    Lifestyle
                </option>

                <option value="Others">
                    Others
                </option>

            </select>

        </div>


        <div class="post-form-group">

            <label for="postImage">
                Post Image
            </label>

            <input
                type="file"
                id="postImage"
                accept="image/*"
            >

            <div
                class="image-preview"
                id="imagePreview"
            >

                <img
                    id="previewImage"
                    src=""
                    alt="Image Preview"
                >

            </div>

        </div>


        <div class="post-form-group">

            <label for="postContent">
                আপনার Post
            </label>

            <textarea
                id="postContent"
                placeholder="আপনার গল্প, তথ্য বা experience লিখুন..."
                required
            ></textarea>

        </div>


        <div class="form-actions">

            <button
                type="button"
                class="cancel-btn"
                id="cancelPost"
            >
                Cancel
            </button>


            <button
                type="submit"
                class="publish-btn"
            >
                Publish Post
            </button>

        </div>

    </form>

`;


const closeButton =
    document.getElementById(
        "closePostModal"
    );


const cancelButton =
    document.getElementById(
        "cancelPost"
    );


const form =
    document.getElementById(
        "postForm"
    );


if (closeButton) {

    closeButton.addEventListener(
        "click",
        closePostModal
    );

}


if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        closePostModal
    );

}


if (form) {

    form.addEventListener(
        "submit",
        handlePostSubmit
    );

}


setupImagePreview();
```

}

/* =========================================================
OPEN POST FORM
========================================================= */

function openPostForm() {

```
resetPostModal();


const modal =
    document.getElementById(
        "postModal"
    );


if (!modal) {

    return;

}


modal.classList.add(
    "show"
);


document.body.style.overflow =
    "hidden";
```

}

/* =========================================================
CLOSE POST MODAL
========================================================= */

function closePostModal() {

```
const modal =
    document.getElementById(
        "postModal"
    );


if (!modal) {

    return;

}


modal.classList.remove(
    "show"
);


document.body.style.overflow =
    "";


setTimeout(
    resetPostModal,
    150
);
```

}

/* =========================================================
IMAGE PREVIEW
========================================================= */

function setupImagePreview() {

```
const input =
    document.getElementById(
        "postImage"
    );


const previewBox =
    document.getElementById(
        "imagePreview"
    );


const previewImage =
    document.getElementById(
        "previewImage"
    );


if (
    !input
    ||
    !previewBox
    ||
    !previewImage
) {

    return;

}


input.addEventListener(
    "change",
    function() {

        const file =
            this.files[0];


        if (!file) {

            previewBox.classList.remove(
                "show"
            );

            previewImage.src =
                "";

            return;

        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            showBlogToast(
                "শুধু image file দিন ⚠️"
            );

            this.value =
                "";

            return;

        }


        const maxSize =
            5 * 1024 * 1024;


        if (
            file.size > maxSize
        ) {

            showBlogToast(
                "Image 5MB-এর মধ্যে রাখুন ⚠️"
            );

            this.value =
                "";

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                previewImage.src =
                    event.target.result;

                previewBox.classList.add(
                    "show"
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);
```

}

/* =========================================================
READ IMAGE AS DATA URL
========================================================= */

function readImageFile(file) {

```
return new Promise(
    function(resolve, reject) {

        if (!file) {

            resolve("");

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                resolve(
                    event.target.result
                );

            };


        reader.onerror =
            function() {

                reject(
                    new Error(
                        "Image reading failed"
                    )
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);
```

}

/* =========================================================
HANDLE POST SUBMIT
========================================================= */

async function handlePostSubmit(event) {

```
event.preventDefault();


const authorInput =
    document.getElementById(
        "postAuthor"
    );


const titleInput =
    document.getElementById(
        "postTitle"
    );


const categoryInput =
    document.getElementById(
        "postCategory"
    );


const contentInput =
    document.getElementById(
        "postContent"
    );


const imageInput =
    document.getElementById(
        "postImage"
    );


const author =
    authorInput.value.trim();


const title =
    titleInput.value.trim();


const category =
    categoryInput.value;


const content =
    contentInput.value.trim();


if (
    !author
    ||
    !title
    ||
    !category
    ||
    !content
) {

    showBlogToast(
        "সব তথ্য পূরণ করুন ⚠️"
    );

    return;

}


if (
    title.length < 5
) {

    showBlogToast(
        "Title একটু বিস্তারিত লিখুন"
    );

    return;

}


if (
    content.length < 20
) {

    showBlogToast(
        "Post অন্তত 20 character লিখুন"
    );

    return;

}


let image = "";


try {

    if (
        imageInput
        &&
        imageInput.files
        &&
        imageInput.files[0]
    ) {

        image =
            await readImageFile(
                imageInput.files[0]
            );

    }

}

catch (error) {

    showBlogToast(
        "Image process করা যায়নি ⚠️"
    );

    return;

}


const newPost = {

    id:
        "post-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8),

    author:
        author,

    title:
        title,

    category:
        category,

    content:
        content,

    image:
        image ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85",

    date:
        new Date().toISOString(),

    readTime:
        calculateReadTime(
            content
        ),

    defaultPost:
        false

};


const currentPosts =
    getSavedPosts();


currentPosts.unshift(
    newPost
);


const saved =
    savePosts(
        currentPosts
    );


if (!saved) {

    return;

}


currentBlogFilter =
    "All";


currentBlogSearch =
    "";


const searchInput =
    document.getElementById(
        "blogSearch"
    );


if (searchInput) {

    searchInput.value =
        "";

}


setBlogFilter(
    "All"
);


closePostModal();


renderBlogPosts();


showBlogToast(
    "আপনার Post Publish হয়েছে! 🎉"
);


setTimeout(
    function() {

        const grid =
            document.getElementById(
                "blogPostGrid"
            );


        if (grid) {

            grid.scrollIntoView({
                behavior:
                    "smooth",
                block:
                    "start"
            });

        }

    },
    300
);
```

}

/* =========================================================
CALCULATE READ TIME
========================================================= */

function calculateReadTime(text) {

```
const words =
    text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;


const minutes =
    Math.max(
        1,
        Math.ceil(
            words / 180
        )
    );


return (
    minutes +
    " min read"
);
```

}

/* =========================================================
HEADER SEARCH
========================================================= */

function setupHeaderSearch() {

```
const input =
    document.getElementById(
        "headerSearch"
    );


const button =
    document.getElementById(
        "headerSearchBtn"
    );


if (!input || !button) {

    return;

}


function search() {

    currentBlogSearch =
        input.value.trim();


    const blogSearch =
        document.getElementById(
            "blogSearch"
        );


    if (blogSearch) {

        blogSearch.value =
            currentBlogSearch;

    }


    renderBlogPosts();


    const grid =
        document.getElementById(
            "blogPostGrid"
        );


    if (grid) {

        grid.scrollIntoView({
            behavior:
                "smooth"
        });

    }

}


button.addEventListener(
    "click",
    search
);


input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            search();

        }

    }
);
```

}

/* =========================================================
BLOG SEARCH SETUP
========================================================= */

function setupBlogSearch() {

```
const input =
    document.getElementById(
        "blogSearch"
    );


const button =
    document.getElementById(
        "blogSearchBtn"
    );


if (!input || !button) {

    return;

}


function search() {

    currentBlogSearch =
        input.value.trim();


    renderBlogPosts();

}


button.addEventListener(
    "click",
    search
);


input.addEventListener(
    "input",
    function() {

        currentBlogSearch =
            this.value.trim();

        renderBlogPosts();

    }
);


input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            search();

        }

    }
);
```

}

/* =========================================================
FILTER BUTTON SETUP
========================================================= */

function setupBlogFilters() {

```
const buttons =
    document.querySelectorAll(
        ".blog-filter button"
    );


buttons.forEach(
    button => {

        button.addEventListener(
            "click",
            function() {

                setBlogFilter(
                    this.dataset.filter
                );

            }
        );

    }
);
```

}

/* =========================================================
WRITE POST BUTTON
========================================================= */

function setupWritePostButton() {

```
const button =
    document.getElementById(
        "openPostModal"
    );


if (!button) {

    return;

}


button.addEventListener(
    "click",
    openPostForm
);
```

}

/* =========================================================
MODAL BACKDROP
========================================================= */

function setupModalBackdrop() {

```
const modal =
    document.getElementById(
        "postModal"
    );


if (!modal) {

    return;

}


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closePostModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
            &&
            modal.classList.contains(
                "show"
            )
        ) {

            closePostModal();

        }

    }
);
```

}

/* =========================================================
TOAST FALLBACK
========================================================= */

function showBlogToast(message) {

```
let toast =
    document.getElementById(
        "blogToast"
    );


if (!toast) {

    toast =
        document.createElement(
            "div"
        );

    toast.id =
        "blogToast";

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
    window.blogToastTimer
);


window.blogToastTimer =
    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
```

}

/* =========================================================
INITIALIZE BLOG
========================================================= */

function initializeBlog() {

```
setupWritePostButton();

setupBlogSearch();

setupHeaderSearch();

setupBlogFilters();

setupModalBackdrop();

setupImagePreview();

renderBlogPosts();
```

}

/* =========================================================
START
========================================================= */

if (
document.readyState ===
"loading"
) {

```
document.addEventListener(
    "DOMContentLoaded",
    initializeBlog
);
```

}

else {

```
initializeBlog();
```

}

/* =========================================================
GLOBAL FUNCTIONS
Useful for HTML onclick compatibility
========================================================= */

window.openPostModal =
openPostForm;

window.closePostModal =
closePostModal;

window.showBlogToast =
showBlogToast;

window.filterBlogs =
function(
category,
searchText
) {

```
    currentBlogFilter =
        category || "All";

    currentBlogSearch =
        searchText || "";

    renderBlogPosts();

};
```

window.performBlogSearch =
performBlogSearch;
