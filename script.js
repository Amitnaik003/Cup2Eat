const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const progressBar = document.querySelector(".scroll-progress span");
const toast = document.querySelector("[data-toast]");

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  body.classList.remove("menu-open");
};

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
    body.classList.toggle("menu-open", willOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const updateScrollProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const labContent = {
  coffee: {
    kicker: "Signature serve",
    title: "Turn the daily coffee into a destination.",
    text: "A familiar ritual gets an unexpected finish—and a built-in conversation starter.",
  },
  dessert: {
    kicker: "Texture on texture",
    title: "Give dessert one more layer to discover.",
    text: "Creamy, cold, or spoonable meets a crisp edible cup for contrast guests can see and taste.",
  },
  event: {
    kicker: "Made for the moment",
    title: "Serve something guests have to photograph.",
    text: "Compact, playful portions help tastings and event concepts feel considered from start to finish.",
  },
};

const labTabs = document.querySelectorAll("[data-lab-tab]");
const labPanel = document.querySelector("[data-lab-panel]");

labTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.labTab;
    const content = labContent[selected];
    if (!content || !labPanel) return;

    labTabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    labPanel.className = `lab-panel lab-panel--${selected} reveal is-visible`;
    labPanel.querySelector("[data-lab-kicker]").textContent = content.kicker;
    labPanel.querySelector("[data-lab-title]").textContent = content.title;
    labPanel.querySelector("[data-lab-text]").textContent = content.text;
  });
});

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
};

const enquiryForm = document.querySelector("[data-enquiry-form]");
const enquiryResult = document.querySelector("[data-enquiry-result]");
const enquiryMessage = document.querySelector("[data-enquiry-message]");
const copyEnquiryButton = document.querySelector("[data-copy-enquiry]");

if (enquiryForm && enquiryResult && enquiryMessage) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(enquiryForm);
    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const type = String(data.get("type") || "").trim();
    const location = String(data.get("location") || "").trim();
    const message = String(data.get("message") || "").trim();
    const quantity = String(data.get("quantity") || "").trim();

    const lines = [
      `Hi Cup2Eat, I'm ${name}${business ? ` from ${business}` : ""}.`,
      "",
      `Business type: ${type}`,
      `Location: ${location}`,
      quantity ? `Estimated quantity: ${quantity}` : null,
      "",
      "What I'd like to create:",
      message,
      "",
      "Could you share the current product details, sample availability, and next steps?",
    ].filter(Boolean);

    enquiryMessage.textContent = lines.join("\n");
    enquiryResult.hidden = false;
    enquiryResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    showToast("Your enquiry is ready to copy.");
  });
}

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
};

if (copyEnquiryButton && enquiryMessage) {
  copyEnquiryButton.addEventListener("click", async () => {
    try {
      await copyText(enquiryMessage.textContent);
      copyEnquiryButton.textContent = "Copied!";
      showToast("Copied. You can paste it into Instagram.");
      window.setTimeout(() => {
        copyEnquiryButton.textContent = "Copy enquiry";
      }, 2200);
    } catch {
      showToast("Select the message and copy it manually.");
    }
  });
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details[open]").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

const yearTarget = document.querySelector("[data-year]");
if (yearTarget) yearTarget.textContent = new Date().getFullYear();
