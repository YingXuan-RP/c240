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

  // Sample student database
  const studentsDatabase = [
    {
      id: "STU001",
      username: "Alex Chen",
      school: "infocomm",
      schoolName: "School of Infocomm",
      diploma: "Information Technology",
      interests: ["Programming", "Web Development", "Machine Learning"]
    },
    {
      id: "STU002",
      username: "Jordan Smith",
      school: "business",
      schoolName: "School of Business",
      diploma: "Business",
      interests: ["Group Projects", "Business Strategy", "Data Analysis"]
    },
    {
      id: "STU003",
      username: "Maya Patel",
      school: "infocomm",
      schoolName: "School of Infocomm",
      diploma: "Financial Technology",
      interests: ["Programming", "Data Analysis", "Exam Prep"]
    },
    {
      id: "STU004",
      username: "Chris Lee",
      school: "engineering",
      schoolName: "School of Engineering",
      diploma: "Mechanical Engineering",
      interests: ["Group Projects", "Machine Learning", "Research"]
    },
    {
      id: "STU005",
      username: "Sam Wilson",
      school: "appliedscience",
      schoolName: "School of Applied Science",
      diploma: "Biomedical Science",
      interests: ["Research", "Exam Prep", "Group Projects"]
    },
    {
      id: "STU006",
      username: "Taylor Brown",
      school: "infocomm",
      schoolName: "School of Infocomm",
      diploma: "Digital Design & Development",
      interests: ["Web Development", "Programming", "Group Projects"]
    },
    {
      id: "STU007",
      username: "Morgan Davis",
      school: "tech-arts",
      schoolName: "School of Technology for the Arts",
      diploma: "Design for User Experience",
      interests: ["Web Development", "Group Projects", "Research"]
    },
    {
      id: "STU008",
      username: "Casey Martinez",
      school: "business",
      schoolName: "School of Business",
      diploma: "Supply Chain Management",
      interests: ["Business Strategy", "Data Analysis", "Exam Prep"]
    }
  ];

  // Helper: find study partners with prioritization
  const findStudyPartners = ({ schoolFilter = "", interestFilter = "", user, limit } = {}) => {
    let filtered = studentsDatabase.filter((student) => {
      let matches = true;
      if (schoolFilter && student.school !== schoolFilter) matches = false;
      if (interestFilter && !student.interests.includes(interestFilter)) matches = false;
      return matches;
    });

    filtered.sort((a, b) => {
      const aScore = (user && a.diploma === user.diploma ? 3 : 0) + (user && a.school === user.school ? 2 : 0);
      const bScore = (user && b.diploma === user.diploma ? 3 : 0) + (user && b.school === user.school ? 2 : 0);
      return bScore - aScore;
    });

    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
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

  // Populate diploma dropdown based on school selection
  window.populateDiplomaDropdown = function(school) {
    const diplomaSelect = document.getElementById("diploma");
    if (!diplomaSelect) {
      console.error("Diploma dropdown not found!");
      return;
    }

    diplomaSelect.innerHTML = '<option value="">Select your course</option>';

    const diplomas = diplomaMap[school] || [];
    console.log("Selected school:", school, "Diplomas:", diplomas);
    
    diplomas.forEach((diploma) => {
      const option = document.createElement("option");
      option.value = diploma;
      option.textContent = diploma;
      diplomaSelect.appendChild(option);
    });
  };

  // Profile setup form handling
  window.handleProfileSetup = function() {
    const name = document.getElementById("studentName").value.trim();
    const school = document.getElementById("school").value;
    const diploma = document.getElementById("diploma").value;
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestCheckboxes).map(cb => cb.value);

    // Clear all errors
    clearError("nameError");
    clearError("schoolError");
    clearError("diplomaError");
    clearError("interestsError");

    let isValid = true;

    if (!name) {
      showError("nameError", "Please enter your name");
      isValid = false;
    }

    if (!school) {
      showError("schoolError", "Please select a school");
      isValid = false;
    }

    if (!diploma) {
      showError("diplomaError", "Please select a course");
      isValid = false;
    }

    if (interests.length === 0) {
      showError("interestsError", "Please select at least one study interest");
      isValid = false;
    }

    if (!isValid) return;

    // Get school name for display
    const schoolNames = {
      infocomm: "School of Infocomm",
      business: "School of Business",
      appliedscience: "School of Applied Science",
      engineering: "School of Engineering",
      "tech-arts": "School of Technology for the Arts"
    };

    const profile = {
      name,
      school,
      schoolName: schoolNames[school],
      diploma,
      interests
    };

    localStorage.setItem("studyfinder_profile", JSON.stringify(profile));
    showToast("Profile created successfully! Redirecting...");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  };

  // Dashboard initialization
  window.initDashboard = function() {
    const profile = localStorage.getItem("studyfinder_profile");
    if (!profile) {
      // If no profile, redirect to profile setup
      window.location.href = "profile.html";
      return;
    }

    const user = JSON.parse(profile);
    const userNameEl = document.getElementById("userNameDisplay");
    if (userNameEl) userNameEl.textContent = user.name;

    const schoolEl = document.getElementById("userSchoolDisplay");
    const diplomaEl = document.getElementById("userDiplomaDisplay");
    if (schoolEl) schoolEl.textContent = user.schoolName || user.school;
    if (diplomaEl) diplomaEl.textContent = user.diploma;

    if (document.getElementById("studentsGrid")) {
      window.initStudentConnections();
      runAgentRecommendations(user);
    }

    // Initialize chatbot if widget exists
    if (document.getElementById("chatToggle")) {
      initChatbotUI();
    }
  };

  // Initialize student connection section
  window.initStudentConnections = function() {
    const filterSchool = document.getElementById("filterSchool");
    const filterInterest = document.getElementById("filterInterest");
    const resetBtn = document.getElementById("resetFiltersBtn");
    const studentsGrid = document.getElementById("studentsGrid");
    const session = localStorage.getItem("campusconnect_session");

    if (!filterSchool || !studentsGrid || !session) return;

    const user = JSON.parse(session);

    const renderStudents = () => {
      const schoolFilter = filterSchool.value;
      const interestFilter = filterInterest.value;

      const filtered = findStudyPartners({ schoolFilter, interestFilter, user });

      if (filtered.length === 0) {
        studentsGrid.innerHTML = '<div class="no-students"><p>No students match your filters. Try adjusting your search.</p></div>';
        return;
      }

      const connections = JSON.parse(localStorage.getItem("studyfinder_connections") || "[]");

      studentsGrid.innerHTML = filtered
        .map((student) => {
          const isRequested = connections.includes(student.id);
          return `
            <div class="student-card" data-student-id="${student.id}">
              <div class="student-header">
                <div class="student-id">${student.username}</div>
                <div class="student-badge">${student.id}</div>
              </div>
              <div class="student-info">
                <div class="student-info-item"><span class="student-info-label">School:</span> ${student.schoolName}</div>
                <div class="student-info-item"><span class="student-info-label">Course:</span> ${student.diploma}</div>
              </div>
              <div class="student-interests">
                ${student.interests.map((interest) => `<span class="interest-tag">${interest}</span>`).join("")}
              </div>
              <div class="student-action">
                <button class="connect-btn ${isRequested ? "requested" : ""}" data-student-id="${student.id}" ${isRequested ? "disabled" : ""}>
                  ${isRequested ? "✓ Requested" : "Connect"}
                </button>
              </div>
            </div>
          `;
        })
        .join("");

      document.querySelectorAll(".connect-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const studentId = btn.dataset.studentId;
          const connectionsLatest = JSON.parse(localStorage.getItem("studyfinder_connections") || "[]");
          if (!connectionsLatest.includes(studentId)) {
            connectionsLatest.push(studentId);
            localStorage.setItem("studyfinder_connections", JSON.stringify(connectionsLatest));
            btn.classList.add("requested");
            btn.disabled = true;
            btn.textContent = "✓ Requested";
            showToast("Connection request sent!");
            renderStudents();
          }
        });
      });

      runAgentRecommendations(user);
    };

    renderStudents();

    filterSchool.addEventListener("change", renderStudents);
    filterInterest.addEventListener("change", renderStudents);
    resetBtn.addEventListener("click", () => {
      filterSchool.value = "";
      filterInterest.value = "";
      renderStudents();
    });
  };

  // Chatbot intents and responses
  const chatbotIntents = [
    {
      keywords: ["find", "study partner", "match", "partner"],
      response: "To find a study partner, use the 'Find a Study Partner' section, filter by school/interest, and click Connect."
    },
    {
      keywords: ["events", "course", "relevant"],
      response: "Check the Events section—agent highlights are tailored to your school. RSVP to save them."
    },
    {
      keywords: ["what", "campusconnect", "do"],
      response: "CampusConnect centralises events, communities, and study partner matching with a proactive agent to guide you."
    },
    {
      keywords: ["help", "navigation", "where"],
      response: "Use the top navigation to jump to Events, Communities, Resources, or Connect for study partners."
    }
  ];

  window.chatbotResponse = function(message) {
    const msg = message.toLowerCase();
    const match = chatbotIntents.find((intent) => intent.keywords.some((k) => msg.includes(k)));
    return match
      ? match.response
      : "I'm here to help! Ask about study partners, events, or how to navigate CampusConnect.";
  };

  const appendChatMessage = (container, role, text) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  };

  const initChatbotUI = () => {
    const toggle = document.getElementById("chatToggle");
    const widget = document.getElementById("chatWidget");
    const closeBtn = document.getElementById("chatClose");
    const messages = document.getElementById("chatMessages");
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSend");

    if (!toggle || !widget || !messages || !input || !sendBtn) return;

    const sendMessage = () => {
      const text = input.value.trim();
      if (!text) return;
      appendChatMessage(messages, "user", text);
      input.value = "";
      const reply = window.chatbotResponse(text);
      setTimeout(() => appendChatMessage(messages, "bot", reply), 200);
    };

    toggle.addEventListener("click", () => {
      widget.classList.toggle("open");
      toggle.classList.toggle("open");
      if (widget.classList.contains("open")) {
        input.focus();
        if (!messages.dataset.welcome) {
          appendChatMessage(messages, "bot", "Hi! I can help you find study partners, events, or features.");
          messages.dataset.welcome = "true";
        }
      }
    });

    closeBtn?.addEventListener("click", () => widget.classList.remove("open"));

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  };

  // Agent recommendations (proactive)
  const runAgentRecommendations = (user) => {
    if (!user) return;

    // Recommend study partners
    const recommended = findStudyPartners({ user, limit: 3 });
    const recommendedIds = recommended.map((s) => s.id);

    document.querySelectorAll(".student-card").forEach((card) => {
      const id = card.getAttribute("data-student-id");
      card.classList.toggle("recommended", recommendedIds.includes(id));
    });

    // Lightly highlight first event and community tiles as suggested
    const eventCards = document.querySelectorAll(".event-card");
    if (eventCards.length) eventCards[0].classList.add("recommended");
    const tiles = document.querySelectorAll(".tile");
    if (tiles.length) tiles[0].classList.add("recommended");
  };

  // Smooth scroll to connect section
  document.addEventListener("DOMContentLoaded", () => {
    const connectLinks = document.querySelectorAll('a[href="#connect-section"]');
    connectLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = document.getElementById("connect-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });

  // Initialize on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    animate();
    wireRsvpButtons();
    initChatbotUI();
  });
})();
