/**
 * ==============================================================
 * TECHNOVA - LANDING PAGE INTERACTIVE SCRIPT
 * Vanilla JavaScript (ES6+)
 * 
 * Features:
 * 1. Mobile Menu Toggle & Backdrop Overlay
 * 2. Sticky Navbar & Active Section Link Highlighting
 * 3. Smooth Scroll Navigation with Offset
 * 4. Dark / Light Theme Mode Toggle with LocalStorage
 * 5. Animated Counter Stats on Scroll
 * 6. Contact Form Validation with Inline Errors
 * 7. Form Submission Loading & Success Feedback
 * 8. Interactive Modals (Demo & Service Details)
 * 9. Back to Top Floating Button
 * 10. Footer Newsletter Form Validation
 * ==============================================================
 */

// Wait for DOM to load before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ------------------------------------------------------------
     1. THEME TOGGLE (LIGHT / DARK MODE)
     ------------------------------------------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  // Retrieve saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem("technova-theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("technova-theme", newTheme);
    });
  }

  /* ------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER & BACKDROP
     ------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const menuBackdrop = document.getElementById("menuBackdrop");
  const navLinks = document.querySelectorAll(".nav-link");

  function openMobileMenu() {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    navMenu.classList.add("open");
    if (menuBackdrop) menuBackdrop.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("open");
    if (menuBackdrop) menuBackdrop.classList.remove("open");
    document.body.style.overflow = ""; // Restore scrolling
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener("click", closeMobileMenu);
  }

  // Close mobile drawer when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  /* ------------------------------------------------------------
     3. STICKY NAVBAR & SCROLL SHADOW
     ------------------------------------------------------------ */
  const header = document.getElementById("header");
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Back to top button visibility (> 350px)
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ------------------------------------------------------------
     4. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
     ------------------------------------------------------------ */
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 80;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight - 60;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  /* ------------------------------------------------------------
     5. SMOOTH SCROLLING FOR ALL ON-PAGE ANCHORS
     ------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* ------------------------------------------------------------
     6. ANIMATED COUNTER STATS
     ------------------------------------------------------------ */
  const counterNumbers = document.querySelectorAll(".counter-number");
  let animatedStarted = false;

  function runCounters() {
    counterNumbers.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 1800; // 1.8 seconds animation
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let currentVal = 0;

      const timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(currentVal);
        }
      }, stepTime);
    });
  }

  const counterSection = document.getElementById("counterSection");
  if (counterSection) {
    const observerOptions = {
      root: null,
      threshold: 0.35,
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedStarted) {
          animatedStarted = true;
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counterObserver.observe(counterSection);
  }

  /* ------------------------------------------------------------
     7. CONTACT FORM VALIDATION & SUCCESS FEEDBACK
     ------------------------------------------------------------ */
  const contactForm = document.getElementById("contactForm");
  const successBanner = document.getElementById("successBanner");
  const senderNameDisplay = document.getElementById("senderNameDisplay");
  const resetBannerBtn = document.getElementById("resetBannerBtn");
  const submitBtn = document.getElementById("submitBtn");

  // Form Fields
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const serviceSelect = document.getElementById("serviceInterest");
  const messageInput = document.getElementById("message");
  const consentCheck = document.getElementById("consentCheck");
  const charCount = document.getElementById("charCount");

  // Character counter for message textarea
  if (messageInput && charCount) {
    messageInput.addEventListener("input", () => {
      const length = messageInput.value.length;
      charCount.textContent = `${length} / 500`;
      if (length > 500) {
        charCount.style.color = "var(--accent-rose)";
      } else {
        charCount.style.color = "var(--text-dim)";
      }
    });
  }

  // Regex pattern for realistic email verification
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Helper validation functions
  function validateName() {
    const parent = fullNameInput.closest(".form-group");
    const val = fullNameInput.value.trim();
    if (val.length < 2) {
      parent.classList.add("has-error");
      parent.classList.remove("is-valid");
      return false;
    } else {
      parent.classList.remove("has-error");
      parent.classList.add("is-valid");
      return true;
    }
  }

  function validateEmail() {
    const parent = emailInput.closest(".form-group");
    const val = emailInput.value.trim();
    if (!emailRegex.test(val)) {
      parent.classList.add("has-error");
      parent.classList.remove("is-valid");
      return false;
    } else {
      parent.classList.remove("has-error");
      parent.classList.add("is-valid");
      return true;
    }
  }

  function validateService() {
    const parent = serviceSelect.closest(".form-group");
    if (!serviceSelect.value) {
      parent.classList.add("has-error");
      parent.classList.remove("is-valid");
      return false;
    } else {
      parent.classList.remove("has-error");
      parent.classList.add("is-valid");
      return true;
    }
  }

  function validateMessage() {
    const parent = messageInput.closest(".form-group");
    const val = messageInput.value.trim();
    if (val.length < 15 || val.length > 500) {
      parent.classList.add("has-error");
      parent.classList.remove("is-valid");
      return false;
    } else {
      parent.classList.remove("has-error");
      parent.classList.add("is-valid");
      return true;
    }
  }

  function validateConsent() {
    const parent = consentCheck.closest(".form-checkbox-group");
    if (!consentCheck.checked) {
      parent.classList.add("has-error");
      return false;
    } else {
      parent.classList.remove("has-error");
      return true;
    }
  }

  // Attach real-time input event listeners
  if (fullNameInput) {
    fullNameInput.addEventListener("input", validateName);
    fullNameInput.addEventListener("blur", validateName);
  }
  if (emailInput) {
    emailInput.addEventListener("input", validateEmail);
    emailInput.addEventListener("blur", validateEmail);
  }
  if (serviceSelect) {
    serviceSelect.addEventListener("change", validateService);
  }
  if (messageInput) {
    messageInput.addEventListener("input", validateMessage);
    messageInput.addEventListener("blur", validateMessage);
  }
  if (consentCheck) {
    consentCheck.addEventListener("change", validateConsent);
  }

  // Handle Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isServiceValid = validateService();
      const isMessageValid = validateMessage();
      const isConsentValid = validateConsent();

      // Check if all fields are valid
      if (isNameValid && isEmailValid && isServiceValid && isMessageValid && isConsentValid) {
        // Trigger simulated asynchronous submission
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;

          // Display success state with user's name
          if (senderNameDisplay) {
            senderNameDisplay.textContent = fullNameInput.value.trim();
          }

          contactForm.classList.add("hidden");
          if (successBanner) {
            successBanner.classList.add("visible");
            successBanner.scrollIntoView({ behavior: "smooth", block: "center" });
          }

          // Reset form fields
          contactForm.reset();
          document.querySelectorAll(".form-group").forEach((group) => {
            group.classList.remove("is-valid");
          });
          if (charCount) charCount.textContent = "0 / 500";
        }, 1200); // 1.2s realistic network delay simulation
      } else {
        // Find first invalid input and focus it
        const firstError = contactForm.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) {
          firstError.focus();
        }
      }
    });
  }

  // "Send another message" reset button
  if (resetBannerBtn) {
    resetBannerBtn.addEventListener("click", () => {
      if (successBanner) successBanner.classList.remove("visible");
      if (contactForm) {
        contactForm.classList.remove("hidden");
        fullNameInput.focus();
      }
    });
  }

  /* ------------------------------------------------------------
     8. INTERACTIVE MODALS (DEMO & SERVICE SPECIFICATIONS)
     ------------------------------------------------------------ */
  const demoModal = document.getElementById("demoModal");
  const openDemoBtn = document.getElementById("openDemoBtn");
  const closeDemoModal = document.getElementById("closeDemoModal");
  const closeDemoModalSecondary = document.getElementById("closeDemoModalSecondary");
  const demoBookCallBtn = document.getElementById("demoBookCallBtn");

  const serviceModal = document.getElementById("serviceModal");
  const serviceModalTitle = document.getElementById("serviceModalTitle");
  const serviceModalBody = document.getElementById("serviceModalBody");
  const closeServiceModal = document.getElementById("closeServiceModal");
  const closeServiceModalSecondary = document.getElementById("closeServiceModalSecondary");
  const serviceModalCta = document.getElementById("serviceModalCta");
  const serviceButtons = document.querySelectorAll(".service-btn");

  // In-depth service details dictionary
  const serviceDetails = {
    cloud: {
      title: "Cloud Architecture & DevOps Services",
      description: "Our certified cloud engineers build enterprise multi-cloud platforms prioritizing automated recovery, cost-efficiency, and maximum security.",
      specs: [
        "Infrastructure as Code using Terraform & Pulumi",
        "Kubernetes orchestration, Service Mesh (Istio) & Auto-Scaling",
        "Zero-downtime Blue/Green and Canary deployment pipelines",
        "Cloud cost audits with guaranteed 25%+ average spend reduction"
      ]
    },
    ai: {
      title: "AI & Machine Learning Engineering",
      description: "Empower your business workflows with tailored machine learning models, retrieval-augmented generation (RAG), and real-time inference.",
      specs: [
        "Private on-premise & VPC Large Language Model fine-tuning",
        "Vector databases & semantic vector search indexing",
        "Real-time fraud detection & predictive time-series models",
        "Ethical AI guardrails & model drift monitoring"
      ]
    },
    security: {
      title: "Cybersecurity & Zero Trust Implementation",
      description: "Protect intellectual property and client data with an ironclad Zero Trust posture across distributed hybrid workloads.",
      specs: [
        "Identity-driven access controls & Micro-segmentation",
        "Continuous automated vulnerability scanning & penetration testing",
        "24/7 Security Operations Center (SOC) telemetry & incident response",
        "Full SOC2 Type II, ISO 27001, and HIPAA compliance mapping"
      ]
    },
    software: {
      title: "Custom Enterprise Software Engineering",
      description: "From intuitive web applications to distributed microservices, we build software designed for clean maintainability and rapid iteration.",
      specs: [
        "Decoupled event-driven microservice backends (Go, Node.js, Python)",
        "Responsive, accessible, and reactive frontend experiences",
        "Scalable GraphQL & REST APIs with OpenAPI documentation",
        "Comprehensive unit, integration, and end-to-end automated testing"
      ]
    },
    data: {
      title: "Big Data & Real-Time Analytics",
      description: "Harness raw company telemetry into decisive business intelligence through distributed streaming pipelines.",
      specs: [
        "Apache Kafka & Apache Flink high-throughput stream processing",
        "Modern Lakehouse architecture on Snowflake & Databricks",
        "Self-serve executive dashboards with sub-second query performance",
        "Data governance, cataloging, and automated data quality checks"
      ]
    },
    consulting: {
      title: "Digital Transformation & Architecture Consulting",
      description: "Guiding executive technology leadership with actionable roadmaps, architecture reviews, and engineering team mentorship.",
      specs: [
        "Comprehensive legacy system modernization & monolith-to-microservice audits",
        "Target-state architectural diagrams and cost feasibility projections",
        "Engineering leadership workshops and agile delivery transformation",
        "Vendor evaluations and technology stack selection blueprints"
      ]
    }
  };

  // Helper to open modal
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Helper to close modal
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Demo modal events
  if (openDemoBtn && demoModal) {
    openDemoBtn.addEventListener("click", () => openModal(demoModal));
  }
  if (closeDemoModal && demoModal) {
    closeDemoModal.addEventListener("click", () => closeModal(demoModal));
  }
  if (closeDemoModalSecondary && demoModal) {
    closeDemoModalSecondary.addEventListener("click", () => closeModal(demoModal));
  }
  if (demoBookCallBtn && demoModal) {
    demoBookCallBtn.addEventListener("click", () => closeModal(demoModal));
  }

  // Service details modal events
  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".service-card");
      const serviceKey = card ? card.getAttribute("data-service") : "cloud";
      const data = serviceDetails[serviceKey] || serviceDetails.cloud;

      if (serviceModalTitle && serviceModalBody) {
        serviceModalTitle.textContent = data.title;
        
        let specsHtml = data.specs.map(spec => `
          <div class="modal-spec-item">
            <span class="modal-spec-bullet">&check;</span>
            <span>${spec}</span>
          </div>
        `).join("");

        serviceModalBody.innerHTML = `
          <p class="modal-service-desc">${data.description}</p>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">Technical Deliverables:</h4>
          <div class="modal-spec-list">${specsHtml}</div>
        `;

        // Pre-select service in contact form when user clicks CTA in modal
        if (serviceModalCta) {
          serviceModalCta.onclick = () => {
            closeModal(serviceModal);
            if (serviceSelect) {
              serviceSelect.value = serviceKey;
              validateService();
            }
          };
        }

        openModal(serviceModal);
      }
    });
  });

  if (closeServiceModal && serviceModal) {
    closeServiceModal.addEventListener("click", () => closeModal(serviceModal));
  }
  if (closeServiceModalSecondary && serviceModal) {
    closeServiceModalSecondary.addEventListener("click", () => closeModal(serviceModal));
  }

  // Close modals when clicking outside dialog backdrop
  window.addEventListener("click", (e) => {
    if (demoModal && e.target === demoModal) {
      closeModal(demoModal);
    }
    if (serviceModal && e.target === serviceModal) {
      closeModal(serviceModal);
    }
  });

  // Close modals or mobile menu on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (demoModal && demoModal.classList.contains("active")) {
        closeModal(demoModal);
      }
      if (serviceModal && serviceModal.classList.contains("active")) {
        closeModal(serviceModal);
      }
      if (navMenu && navMenu.classList.contains("open")) {
        closeMobileMenu();
      }
    }
  });

  /* ------------------------------------------------------------
     9. FOOTER NEWSLETTER VALIDATION
     ------------------------------------------------------------ */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterMsg = document.getElementById("newsletterMsg");

  if (newsletterForm && newsletterEmail && newsletterMsg) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = newsletterEmail.value.trim();

      if (!emailRegex.test(val)) {
        newsletterMsg.className = "newsletter-msg error";
        newsletterMsg.textContent = "Please enter a valid email address.";
      } else {
        newsletterMsg.className = "newsletter-msg success";
        newsletterMsg.textContent = "Subscribed successfully! Welcome aboard.";
        newsletterEmail.value = "";
        setTimeout(() => {
          newsletterMsg.textContent = "";
        }, 5000);
      }
    });
  }

  /* ------------------------------------------------------------
     10. DYNAMIC COPYRIGHT YEAR
     ------------------------------------------------------------ */
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
