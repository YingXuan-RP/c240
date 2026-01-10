(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("[data-collapsible]");
  const toast = document.getElementById("toast");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let toastTimer;

  // School to diploma mapping
  const diplomaMap = {
    infocomm: [
      "Information Technology",
      "Financial Technology",
      "Digital Design & Development",
      "Business Information Systems",
      "Cybersecurity & Digital Forensics"
    ],
    business: [
      "Business",
      "Supply Chain Management",
      "Consumer Behaviour & Research",
      "Human Resource Management with Psychology",
      "Entrepreneurship"
    ],
    appliedscience: [
      "Biomedical Science",
      "Biotechnology",
      "Pharmaceutical Science",
      "Environmental & Marine Science",
      "Materials Science"
    ],
    engineering: [
      "Aerospace Engineering",
      "Electrical & Electronic Engineering",
      "Mechanical Engineering",
      "Industrial & Operations Management"
    ],
    "tech-arts": [
      "Design for User Experience",
      "Sonic Arts",
      "Media Production & Design",
      "Arts & Theatre Management"
    ]
  };

  // Mobile navigation
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  // Section animation on scroll
  const animate = () => {
    const targets = document.querySelectorAll("[data-animate]");
    if (!targets.length) return;

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((el) => observer.observe(el));
  };

  // Toast notifications
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

  // Wire RSVP buttons on landing page
  const wireRsvpButtons = () => {
    const buttons = document.querySelectorAll(".rsvp-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const eventName = btn.dataset.event || "this event";
        showToast(`RSVP saved for ${eventName}.`);
      });
    });
  };

  // Form validation utilities
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  };

  const clearError = (fieldId) => {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }
  };

  const showError = (fieldId, message) => {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("show");
    }
  };

  // Signup form handling
  window.handleSignup = function() {
    const email = document.getElementById("schoolEmail").value.trim();
    const school = document.getElementById("school").value;
    const diploma = document.getElementById("diploma").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Clear all errors
    clearError("emailError");
    clearError("schoolError");
    clearError("diplomaError");
    clearError("passwordError");
    clearError("confirmError");
    clearError("signupError");

    let isValid = true;

    // Validate email
    if (!email) {
      showError("emailError", "Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("emailError", "Please enter a valid email");
      isValid = false;
    }

    // Validate school
    if (!school) {
      showError("schoolError", "Please select a school");
      isValid = false;
    }

    // Validate diploma
    if (!diploma) {
      showError("diplomaError", "Please select a course");
      isValid = false;
    }

    // Validate password
    if (!password) {
      showError("passwordError", "Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      showError("passwordError", "Min 8 chars, mix of letters and numbers");
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      showError("confirmError", "Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      showError("confirmError", "Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    // Save to localStorage
    const user = {
      email,
      school,
      diploma,
      password: btoa(password) // Simple encoding (not secure for real apps)
    };
    localStorage.setItem("campusconnect_user", JSON.stringify(user));
    showToast("Account created successfully! Redirecting...");
    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  };

  // Populate diploma dropdown based on school selection
  window.populateDiplomaDropdown = function(school) {
    const diplomaSelect = document.getElementById("diploma");
    if (!diplomaSelect) return;

    diplomaSelect.innerHTML = '<option value="">Select your course</option>';

    const diplomas = diplomaMap[school] || [];
    diplomas.forEach((diploma) => {
      const option = document.createElement("option");
      option.value = diploma;
      option.textContent = diploma;
      diplomaSelect.appendChild(option);
    });
  };

  // Login form handling
  window.handleLogin = function() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    clearError("emailError");
    clearError("passwordError");
    clearError("loginError");

    let isValid = true;

    if (!email) {
      showError("emailError", "Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("emailError", "Please enter a valid email");
      isValid = false;
    }

    if (!password) {
      showError("passwordError", "Password is required");
      isValid = false;
    }

    if (!isValid) return;

    // Check against stored user
    const storedUser = localStorage.getItem("campusconnect_user");
    if (!storedUser) {
      showError("loginError", "No account found. Please sign up first.");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email !== email || btoa(password) !== user.password) {
      showError("loginError", "Invalid email or password");
      return;
    }

    // Successful login
    localStorage.setItem("campusconnect_session", JSON.stringify(user));
    showToast("Logged in successfully! Redirecting...");
    
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  };

  // Dashboard initialization
  window.initDashboard = function() {
    const session = localStorage.getItem("campusconnect_session");
    if (!session) {
      window.location.href = "login.html";
      return;
    }

    const user = JSON.parse(session);
    document.getElementById("userNameDisplay").textContent = user.email.split("@")[0];
    
    const schoolNames = {
      infocomm: "School of Infocomm",
      business: "School of Business",
      appliedscience: "School of Applied Science",
      engineering: "School of Engineering",
      "tech-arts": "School of Technology for the Arts"
    };
    
    document.getElementById("userSchoolDisplay").textContent = schoolNames[user.school] || user.school;
    document.getElementById("userDiplomaDisplay").textContent = user.diploma;
  };

  // Logout handler
  window.handleLogout = function() {
    localStorage.removeItem("campusconnect_session");
    showToast("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  };

  // Initialize on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    animate();
    wireRsvpButtons();
  });
})();
