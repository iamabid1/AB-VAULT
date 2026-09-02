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

// GIT PUSH INFOS -

// git add .
// git commit -m ""
// git push

const files = [
  //   {
  //     name: "OG School ID",
  //     file: "files/school-document.jpg",
  //     type: "image",
  //   },

  // {
  //   name: "English Debate script",
  //   file: "files/Script-English.pdf",
  //   type: "pdf",
  // },

  {
    name: "traffic light project ardiuno",
    file: "files/traffic-light-project-arduino.jpg",
    type: "jpg",
  },
  {
    name: "Debate Possible Questions",
    file: "files/p_question.pdf",
    type: "pdf",
  },
  {
    name: "Logos for araf",
    file: "files/araflogos.pdf",
    type: "pdf",
  },
  {
    name: "Logos for araf",
    file: "files/araflogos.pdf",
    type: "pdf",
  },
  {
    name: "মেধা বিকাশে বইয়ের গুরুত্ব",
    file: "files/teambookjukti.pdf",
    type: "pdf",
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
   BASIC PASSWORD LOCK
===================================================== */

const validPasswords = ["930047", "2930047"];

const passwordScreen = document.getElementById("passwordScreen");

const passwordInput = document.getElementById("passwordInput");

const unlockButton = document.getElementById("unlockButton");

const passwordError = document.getElementById("passwordError");

const passwordToggle = document.getElementById("passwordToggle");

function unlockVault() {
  const password = passwordInput.value.trim();

  if (validPasswords.includes(password)) {
    passwordError.classList.remove("show");

    passwordScreen.classList.add("unlocked");

    sessionStorage.setItem("abVaultUnlocked", "true");
  } else {
    passwordError.classList.add("show");

    passwordInput.value = "";

    passwordInput.focus();
  }
}

/* Unlock button */

unlockButton.addEventListener("click", unlockVault);

/* Press Enter */

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockVault();
  }
});

/* Show / hide password */

passwordToggle.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    passwordToggle.textContent = "Hide";
  } else {
    passwordInput.type = "password";

    passwordToggle.textContent = "Show";
  }
});

/* Already unlocked during this browser session */

if (sessionStorage.getItem("abVaultUnlocked") === "true") {
  passwordScreen.classList.add("unlocked");
}

/* =====================================================
   FILE ICONS
===================================================== */

function getFileIcon(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();

  const icons = {
    /* PDF */

    pdf: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M8 13h8"/>
                <path d="M8 17h5"/>

            </svg>
        `,

    /* IMAGES */

    jpg: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>

            </svg>
        `,

    jpeg: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>

            </svg>
        `,

    png: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>

            </svg>
        `,

    webp: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>

            </svg>
        `,

    /* VIDEO */

    mp4: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="3" y="5" width="18" height="14" rx="3"/>
                <path d="m10 9 5 3-5 3V9z"/>

            </svg>
        `,

    mov: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="3" y="5" width="18" height="14" rx="3"/>
                <path d="m10 9 5 3-5 3V9z"/>

            </svg>
        `,

    /* AUDIO */

    mp3: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M9 18V5l10-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="16" cy="16" r="3"/>

            </svg>
        `,

    wav: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M3 12h2l2-6 4 12 3-9 2 6h5"/>

            </svg>
        `,

    /* ARCHIVES */

    zip: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M7 3h10v18H7z"/>
                <path d="M10 3v3h4V3"/>
                <path d="M10 9h4"/>
                <path d="M10 12h4"/>
                <path d="M10 15h4"/>

            </svg>
        `,

    rar: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M7 3h10v18H7z"/>
                <path d="M10 3v3h4V3"/>
                <path d="M10 9h4"/>
                <path d="M10 12h4"/>
                <path d="M10 15h4"/>

            </svg>
        `,

    /* WORD */

    doc: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M8 13h8"/>
                <path d="M8 17h6"/>

            </svg>
        `,

    docx: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M8 13h8"/>
                <path d="M8 17h6"/>

            </svg>
        `,

    /* EXCEL */

    xls: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="4" y="3" width="16" height="18" rx="2"/>
                <path d="M8 8h8"/>
                <path d="M8 12h8"/>
                <path d="M8 16h8"/>
                <path d="M12 8v8"/>

            </svg>
        `,

    xlsx: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="4" y="3" width="16" height="18" rx="2"/>
                <path d="M8 8h8"/>
                <path d="M8 12h8"/>
                <path d="M8 16h8"/>
                <path d="M12 8v8"/>

            </svg>
        `,

    /* POWERPOINT */

    ppt: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="4" y="3" width="16" height="18" rx="2"/>
                <path d="M8 16V9h4a2 2 0 0 1 0 4H8"/>

            </svg>
        `,

    pptx: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <rect x="4" y="3" width="16" height="18" rx="2"/>
                <path d="M8 16V9h4a2 2 0 0 1 0 4H8"/>

            </svg>
        `,

    /* TEXT */

    txt: `
            <svg viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M5 4h14"/>
                <path d="M5 8h14"/>
                <path d="M5 12h14"/>
                <path d="M5 16h9"/>
                <path d="M5 20h7"/>

            </svg>
        `,
  };

  return (
    icons[extension] ||
    `
        <svg viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round">

            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
            <path d="M8 13h8"/>
            <path d="M8 17h6"/>

        </svg>
    `
  );
}

/* =====================================================
   FILE TYPE
===================================================== */

function getFileType(fileName) {
  const extension = fileName.split(".").pop().toUpperCase();

  return extension;
}

/* =====================================================
   RENDER FILES
===================================================== */

function renderFiles() {
  const filteredFiles = files.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.type === activeCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(currentSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  fileGrid.innerHTML = "";

  filteredFiles.forEach((item, index) => {
    const card = document.createElement("article");

    card.className = "file-card";

    card.style.animationDelay = `${index * 40}ms`;

    const icon = getFileIcon(item.file);

    const type = getFileType(item.file);

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

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >

                        <path d="M12 3v12"></path>
                        <path d="m7 10 5 5 5-5"></path>
                        <path d="M5 21h14"></path>

                    </svg>

                    <span>Download</span>

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

  visibleCount.textContent = filteredFiles.length;

  totalFiles.textContent = `${files.length} FILE${files.length === 1 ? "" : "S"}`;

  if (filteredFiles.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  if (currentSearch) {
    resultText.textContent = `${filteredFiles.length} result${filteredFiles.length === 1 ? "" : "s"} for "${currentSearch}"`;
  } else if (activeCategory !== "all") {
    resultText.textContent = `Showing ${activeCategory} files`;
  } else {
    resultText.textContent = "All files in your vault";
  }
}

/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.trim();

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

categories.addEventListener("click", (event) => {
  const button = event.target.closest(".category");

  if (!button) return;

  document.querySelectorAll(".category").forEach((item) => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  activeCategory = button.dataset.category;

  renderFiles();
});

/* =====================================================
   COPY FILE LINK
===================================================== */

async function copyFileLink(encodedFile) {
  const file = decodeURIComponent(encodedFile);

  const fullURL = new URL(file, window.location.href).href;

  try {
    await navigator.clipboard.writeText(fullURL);

    showToast("✓", "File link copied");
  } catch {
    showToast("!", "Could not copy link");
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

  toastTimer = setTimeout(() => {
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
