const CONFIG = {
  CONTRACT_ADDRESS: "2EkuZAXc3v8PXBESWFfAoEfBczcyye2w8uQwuPpQpump",
  BUY_URL: "https://pump.fun/coin/2EkuZAXc3v8PXBESWFfAoEfBczcyye2w8uQwuPpQpump"
};

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;

  el.textContent = msg;
  el.classList.remove("show");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add("show");
    });
  });

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 1800);
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
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

function initHeroParallax() {
  const heroInner = document.getElementById("heroInner");
  const heroMedia = document.getElementById("heroMedia");

  if (!heroInner || !heroMedia) return;
  if (window.matchMedia("(max-width: 980px)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let rafId = null;

  heroInner.addEventListener("mousemove", (e) => {
    const rect = heroInner.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const moveX = (x - 0.5) * 10;
    const moveY = (y - 0.5) * 8;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      heroMedia.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  heroInner.addEventListener("mouseleave", () => {
    if (rafId) cancelAnimationFrame(rafId);
    heroMedia.style.transform = "";
  });
}

(function init() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  setHref("buyBtn", CONFIG.BUY_URL);

  const copyBtns = [
    document.getElementById("copyCaBtn"),
    document.getElementById("copyCaBtnMobile")
  ].filter(Boolean);

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!CONFIG.CONTRACT_ADDRESS || CONFIG.CONTRACT_ADDRESS === "TBA") {
        toast("Contract Address: TBA");
        return;
      }

      const ok = await copyToClipboard(CONFIG.CONTRACT_ADDRESS);
      toast(ok ? "Contract Address copied ✅" : "Copy failed ❌");
    });
  });

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute(
        "aria-hidden",
        mobileMenu.classList.contains("open") ? "false" : "true"
      );
    });

    mobileMenu.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  initHeroParallax();
})();