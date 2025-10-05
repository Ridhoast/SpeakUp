// Main JavaScript file for SpeakUp.id
document.addEventListener("DOMContentLoaded", function () {
  console.log("SpeakUp.id loaded successfully!");

  // Initialize all components
  initNavigation();
  initMoodTracker();
  initServiceSelection();
  initSchedule();
  initFAQ();
  initTeacherDashboard();
  initAdminDashboard();
  initAnimations();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    });
  });
}

// Mood Tracker functionality
function initMoodTracker() {
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodStatus = document.getElementById("moodStatus");

  const moodTexts = {
    sad: "Kamu sedih hari ini. Ayo cerita dengan kami! 💙",
    neutral: "Perasaan biasa saja? Tidak apa-apa, kami tetap di sini.",
    okay: "Lumayan baik! Semoga harimu semakin membaik.",
    happy: "Senang sekali! Bagikan kebahagiaan ini ya! 😊",
    excited: "Wow! Kamu sangat bersemangat hari ini! 🎉",
  };

  moodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      moodButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update mood status
      const mood = this.dataset.mood;
      if (moodStatus && moodTexts[mood]) {
        moodStatus.textContent = moodTexts[mood];
        moodStatus.style.color = "var(--primary-blue)";
      }

      // Add animation
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "scale(1.1)";
      }, 150);
    });
  });
}

// Service Selection functionality
function initServiceSelection() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove selected class from all cards
      serviceCards.forEach((c) => c.classList.remove("selected"));

      // Add selected class to clicked card
      this.classList.add("selected");

      // Update button text
      const button = this.querySelector(".btn");
      if (button) {
        button.textContent = "✓ Dipilih";
        button.classList.remove("btn-outline");
        button.classList.add("btn-primary");
      }

      // Reset other buttons
      serviceCards.forEach((c) => {
        if (c !== this) {
          const btn = c.querySelector(".btn");
          if (btn) {
            btn.textContent = "Pilih Layanan";
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline");
          }
        }
      });
    });
  });
}

// Schedule functionality
function initSchedule() {
  const timeSlots = document.querySelectorAll(".time-slot.available");
  const prevDay = document.getElementById("prevDay");
  const nextDay = document.getElementById("nextDay");
  const currentDate = document.getElementById("currentDate");

  // Time slot selection
  timeSlots.forEach((slot) => {
    slot.addEventListener("click", function () {
      // Remove selected class from all slots
      timeSlots.forEach((s) => s.classList.remove("selected"));

      // Add selected class to clicked slot
      this.classList.add("selected");

      // Update status
      const status = this.querySelector(".status");
      if (status) {
        status.textContent = "Dipilih";
      }
    });
  });

  // Date navigation
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let currentDateObj = new Date();

  function updateDateDisplay() {
    if (currentDate) {
      const dayName = days[currentDateObj.getDay()];
      const date = currentDateObj.getDate();
      const month = months[currentDateObj.getMonth()];
      const year = currentDateObj.getFullYear();
      currentDate.textContent = `${dayName}, ${date} ${month} ${year}`;
    }
  }

  if (prevDay) {
    prevDay.addEventListener("click", function () {
      currentDateObj.setDate(currentDateObj.getDate() - 1);
      updateDateDisplay();
    });
  }

  if (nextDay) {
    nextDay.addEventListener("click", function () {
      currentDateObj.setDate(currentDateObj.getDate() + 1);
      updateDateDisplay();
    });
  }

  updateDateDisplay();
}

// FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  const categoryTabs = document.querySelectorAll(".category-tab");
  const faqCategories = document.querySelectorAll(".faq-category");
  const searchInput = document.getElementById("faqSearch");

  // FAQ accordion
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove("active");
        } else {
          item.classList.add("active");
        }
      });
    }
  });

  // Category tabs
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.dataset.category;

      // Update active tab
      categoryTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding category
      faqCategories.forEach((cat) => {
        if (cat.dataset.category === category) {
          cat.style.display = "block";
        } else {
          cat.style.display = "none";
        }
      });
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question h3");
        const answer = item.querySelector(".faq-answer");

        if (question && answer) {
          const questionText = question.textContent.toLowerCase();
          const answerText = answer.textContent.toLowerCase();

          if (
            questionText.includes(searchTerm) ||
            answerText.includes(searchTerm)
          ) {
            item.style.display = "block";
          } else {
            item.style.display = searchTerm ? "none" : "block";
          }
        }
      });
    });
  }
}

// Teacher Dashboard functionality
function initTeacherDashboard() {
  const filterTabs = document.querySelectorAll(".filter-tab");

  // Filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Here you would filter the requests based on the selected tab
      // For demo purposes, we'll just show a message
      console.log(`Filtering by: ${this.dataset.filter}`);
    });
  });

  // Request actions
  window.acceptRequest = function (requestId) {
    const requestCard = document.querySelector(`[data-request="${requestId}"]`);
    if (requestCard) {
      requestCard.style.background = "rgba(16, 185, 129, 0.1)";
      requestCard.style.borderLeftColor = "var(--primary-green)";
    }

    showNotification(`Permintaan ${requestId} telah diterima!`, "success");
  };

  window.declineRequest = function (requestId) {
    const requestCard = document.querySelector(`[data-request="${requestId}"]`);
    if (requestCard) {
      requestCard.style.opacity = "0.5";
      requestCard.style.background = "rgba(249, 115, 22, 0.1)";
    }

    showNotification(`Permintaan ${requestId} telah ditolak.`, "warning");
  };
}

// Admin Dashboard functionality
function initAdminDashboard() {
  const periodFilter = document.getElementById("periodFilter");

  if (periodFilter) {
    periodFilter.addEventListener("change", function () {
      const period = this.value;
      console.log(`Filtering data by: ${period}`);

      // Animate metrics update
      const metricNumbers = document.querySelectorAll(
        ".metric-content h3, .stat-content h3"
      );
      metricNumbers.forEach((number) => {
        number.style.transform = "scale(1.1)";
        setTimeout(() => {
          number.style.transform = "scale(1)";
        }, 200);
      });

      showNotification(`Data diperbarui untuk periode: ${period}`, "info");
    });
  }

  // Chart interactions
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.addEventListener("mouseenter", function () {
      this.style.opacity = "0.8";
    });

    bar.addEventListener("mouseleave", function () {
      this.style.opacity = "1";
    });
  });
}

// Form handling
function initFormHandling() {
  const consultationForm = document.getElementById("consultationForm");

  if (consultationForm) {
    consultationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const category = formData.get("category");
      const description = formData.get("description");
      const anonymous = formData.get("anonymous");
      const urgent = formData.get("urgent");

      // Simulate form submission
      showNotification("Permintaan konsultasi berhasil dikirim!", "success");

      // Reset form
      this.reset();

      // Redirect to confirmation or dashboard
      setTimeout(() => {
        window.location.href = "#confirmation";
      }, 2000);
    });
  }
}

// Animations and interactions
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements with fade-in animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .service-card, .teacher-card, .stat-card, .metric-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll(
    ".feature-card, .service-card, .teacher-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === "success" ? "✅" : type === "warning" ? "⚠️" : "ℹ️"}
            </span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 1rem;
        z-index: 1000;
        max-width: 400px;
        border-left: 4px solid ${
          type === "success"
            ? "#10B981"
            : type === "warning"
            ? "#F97316"
            : "#3B82F6"
        };
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });

  // Auto close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Utility functions
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

function animateCounter(element, target, duration = 2000) {
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Initialize form handling when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initFormHandling();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading states for better UX
function showLoading(element) {
  const originalText = element.textContent;
  element.textContent = "Loading...";
  element.disabled = true;

  return () => {
    element.textContent = originalText;
    element.disabled = false;
  };
}

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
  showNotification("Terjadi kesalahan. Silakan refresh halaman.", "warning");
});

// Performance monitoring
window.addEventListener("load", function () {
  const loadTime = performance.now();
  console.log(`Page loaded in ${Math.round(loadTime)}ms`);

  if (loadTime > 3000) {
    console.warn("Page load time is slow");
  }
});

console.log("SpeakUp.id JavaScript initialized successfully! 🚀");
