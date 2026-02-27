// ====== CONFIG ======
const CONFIG = {
  CONTRACT_ADDRESS: "TBA", // <-- metterai qui il CA (stringa completa)
  BUY_URL: "#",           // <-- metterai qui la URL di acquisto
  HERO_TITLE: "Solana will never die" // <-- titolo modificabile
};

// ====== Helpers ======
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 1400);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el) el.href = value;
}

// ====== Init ======
(function init(){
  // year
  document.getElementById("year").textContent = String(new Date().getFullYear());

  // title + links + CA preview
  setText("heroTitle", CONFIG.HERO_TITLE);
  setHref("buyBtn", CONFIG.BUY_URL);
  setText("caPreview", CONFIG.CONTRACT_ADDRESS === "TBA" ? "TBA" : shrink(CONFIG.CONTRACT_ADDRESS));

  // copy buttons
  const copyBtns = [document.getElementById("copyCaBtn"), document.getElementById("copyCaBtnMobile")].filter(Boolean);
  copyBtns.forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!CONFIG.CONTRACT_ADDRESS || CONFIG.CONTRACT_ADDRESS === "TBA") {
        toast("Contract Address: TBA");
        return;
      }
      const ok = await copyToClipboard(CONFIG.CONTRACT_ADDRESS);
      toast(ok ? "Contract Address copiato ✅" : "Copia non riuscita ❌");
    });
  });

  // mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    mobileMenu.setAttribute("aria-hidden", mobileMenu.classList.contains("open") ? "false" : "true");
  });

  // close menu on click
  mobileMenu.querySelectorAll("a,button").forEach(el => {
    el.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
})();

function shrink(addr) {
  const a = String(addr);
  if (a.length <= 12) return a;
  return `${a.slice(0,4)}...${a.slice(-4)}`;
}