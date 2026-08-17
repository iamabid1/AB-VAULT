/* =====================================================
   AB VAULT
   YOUR PERSONAL FILE DATABASE
===================================================== */


/* =====================================================
   ADD YOUR FILES HERE
=====================================================

   Put your actual files inside:

   /files/

   Then add them here.

   Example:

   {
       name: "Birth Certificate",
       file: "files/birth-certificate.pdf",
       type: "document"
   }

===================================================== */

// const files = [

//     {
//         name: "Birth Certificate",
//         file: "files/birth-certificate.pdf",
//         type: "document"
//     },

//     {
//         name: "Passport Photo",
//         file: "files/passport-photo.jpg",
//         type: "image"
//     },

//     {
//         name: "School Document",
//         file: "files/school-document.pdf",
//         type: "document"
//     }
    

// ];
const files = [

    {
        name: "OG School ID",
        file: "files/school-document.jpg",
        type: "image"
    },

    {
        name: "English Debate script",
        file: "files/Script-English.pdf",
        type: "pdf"
    },

    {
        name: "BanglaDebate script",
        file: "files/Script-Bangla.pdf",
        type: "pdf"
    },
    
];


/* =====================================================
   DOM
===================================================== */

const fileGrid = document.getElementById("fileGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const categories = document.getElementById("categories");

const emptyState = document.getElementById("emptyState");

const totalFiles = document.getElementById("totalFiles");
const visibleCount = document.getElementById("visibleCount");

const resultText = document.getElementById("resultText");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");


let activeCategory = "all";
let currentSearch = "";


/* =====================================================
   FILE ICONS
===================================================== */

function getFileIcon(fileName) {

    const extension =
        fileName
            .split(".")
            .pop()
            .toLowerCase();

    const icons = {

        pdf: "📕",

        jpg: "🖼️",
        jpeg: "🖼️",
        png: "🖼️",
        webp: "🖼️",

        mp4: "🎬",
        mov: "🎬",

        mp3: "🎵",
        wav: "🎵",

        zip: "📦",
        rar: "📦",

        doc: "📘",
        docx: "📘",

        xls: "📊",
        xlsx: "📊",

        ppt: "📊",
        pptx: "📊",

        txt: "📄"

    };

    return icons[extension] || "📄";
}


/* =====================================================
   FILE TYPE
===================================================== */

function getFileType(fileName) {

    const extension =
        fileName
            .split(".")
            .pop()
            .toUpperCase();

    return extension;
}


/* =====================================================
   RENDER FILES
===================================================== */

function renderFiles() {

    const filteredFiles = files.filter(item => {

        const matchesCategory =
            activeCategory === "all" ||
            item.type === activeCategory;

        const matchesSearch =
            item.name
                .toLowerCase()
                .includes(currentSearch.toLowerCase());

        return matchesCategory && matchesSearch;

    });


    fileGrid.innerHTML = "";


    filteredFiles.forEach((item, index) => {

        const card = document.createElement("article");

        card.className = "file-card";

        card.style.animationDelay =
            `${index * 40}ms`;


        const icon =
            getFileIcon(item.file);

        const type =
            getFileType(item.file);


        card.innerHTML = `

            <div class="file-top">

                <div class="file-icon">
                    ${icon}
                </div>

                <div class="file-menu">
                    •••
                </div>

            </div>


            <div class="file-name"
                 title="${escapeHTML(item.name)}">

                ${escapeHTML(item.name)}

            </div>


            <div class="file-info">

                <span>${type}</span>

                <span>•</span>

                <span>AB VAULT</span>

            </div>


            <div class="file-actions">

                <a
                    class="download-btn"
                    href="${encodeURI(item.file)}"
                    download
                >
                    Download
                </a>

                <button
                    class="copy-btn"
                    onclick="copyFileLink('${encodeURIComponent(item.file)}')"
                    title="Copy file link"
                >
                    ↗
                </button>

            </div>

        `;


        fileGrid.appendChild(card);

    });


    visibleCount.textContent =
        filteredFiles.length;

    totalFiles.textContent =
        `${files.length} FILE${files.length === 1 ? "" : "S"}`;


    if (filteredFiles.length === 0) {

        emptyState.classList.remove("hidden");

    } else {

        emptyState.classList.add("hidden");

    }


    if (currentSearch) {

        resultText.textContent =
            `${filteredFiles.length} result${filteredFiles.length === 1 ? "" : "s"} for "${currentSearch}"`;

    } else if (activeCategory !== "all") {

        resultText.textContent =
            `Showing ${activeCategory} files`;

    } else {

        resultText.textContent =
            "All files in your vault";

    }

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener("input", () => {

    currentSearch =
        searchInput.value.trim();

    if (currentSearch) {

        clearSearch.classList.add("show");

    } else {

        clearSearch.classList.remove("show");

    }

    renderFiles();

});


clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    currentSearch = "";

    clearSearch.classList.remove("show");

    searchInput.focus();

    renderFiles();

});


/* =====================================================
   CATEGORY FILTER
===================================================== */

categories.addEventListener("click", event => {

    const button =
        event.target.closest(".category");

    if (!button) return;


    document
        .querySelectorAll(".category")
        .forEach(item => {

            item.classList.remove("active");

        });


    button.classList.add("active");


    activeCategory =
        button.dataset.category;


    renderFiles();

});


/* =====================================================
   COPY FILE LINK
===================================================== */

async function copyFileLink(encodedFile) {

    const file =
        decodeURIComponent(encodedFile);

    const fullURL =
        new URL(file, window.location.href).href;


    try {

        await navigator.clipboard.writeText(fullURL);

        showToast(
            "✓",
            "File link copied"
        );

    } catch {

        showToast(
            "!",
            "Could not copy link"
        );

    }

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(icon, message) {

    toastIcon.textContent = icon;
    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

}


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(text) {

    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   START
===================================================== */

renderFiles();