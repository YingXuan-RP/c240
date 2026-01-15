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

  // School to study interests mapping
  const interestsMap = {
    infocomm: [
      { value: "Programming", label: "💻 Programming", desc: "Software development and coding" },
      { value: "Web Development", label: "🌐 Web Development", desc: "Frontend and backend web technologies" },
      { value: "Data Analysis", label: "📊 Data Analysis", desc: "Data analysis and visualization" },
      { value: "Machine Learning", label: "🤖 Machine Learning", desc: "AI and machine learning projects" },
      { value: "Cybersecurity", label: "🔐 Cybersecurity", desc: "Security and digital forensics" },
      { value: "Exam Prep", label: "📝 Exam Prep", desc: "Studying or revising for tests and finals" },
      { value: "Group Projects", label: "👥 Group Projects", desc: "Working on module or course projects" },
      { value: "FYP / Capstone", label: "🎯 FYP / Capstone", desc: "Final Year Project or capstone work" },
      { value: "General Study", label: "📚 General Study", desc: "Regular studying and revision sessions" }
    ],
    business: [
      { value: "Finance", label: "💰 Finance", desc: "Financial analysis and accounting" },
      { value: "Marketing", label: "📢 Marketing", desc: "Marketing strategy and campaigns" },
      { value: "Business Strategy", label: "📈 Business Strategy", desc: "Strategic planning and case studies" },
      { value: "Entrepreneurship", label: "🚀 Entrepreneurship", desc: "Business planning and startup ideas" },
      { value: "Supply Chain", label: "📦 Supply Chain", desc: "Supply chain and operations" },
      { value: "Exam Prep", label: "📝 Exam Prep", desc: "Studying or revising for tests and finals" },
      { value: "Group Projects", label: "👥 Group Projects", desc: "Working on module or course projects" },
      { value: "FYP / Capstone", label: "🎯 FYP / Capstone", desc: "Final Year Project or capstone work" },
      { value: "General Study", label: "📚 General Study", desc: "Regular studying and revision sessions" }
    ],
    appliedscience: [
      { value: "Biology", label: "🧬 Biology", desc: "Biological sciences and research" },
      { value: "Chemistry", label: "⚗️ Chemistry", desc: "Chemistry concepts and experiments" },
      { value: "Research", label: "🔬 Research", desc: "Academic and scientific research" },
      { value: "Lab Work", label: "🧪 Lab Work", desc: "Laboratory experiments and analysis" },
      { value: "Exam Prep", label: "📝 Exam Prep", desc: "Studying or revising for tests and finals" },
      { value: "Group Projects", label: "👥 Group Projects", desc: "Working on module or course projects" },
      { value: "FYP / Capstone", label: "🎯 FYP / Capstone", desc: "Final Year Project or capstone work" },
      { value: "General Study", label: "📚 General Study", desc: "Regular studying and revision sessions" }
    ],
    engineering: [
      { value: "Programming", label: "💻 Programming", desc: "Software and embedded systems" },
      { value: "CAD Design", label: "🖥️ CAD Design", desc: "Computer-aided design and modeling" },
      { value: "Problem Solving", label: "⚙️ Problem Solving", desc: "Engineering problem-solving" },
      { value: "Research", label: "🔬 Research", desc: "Engineering research and development" },
      { value: "Exam Prep", label: "📝 Exam Prep", desc: "Studying or revising for tests and finals" },
      { value: "Group Projects", label: "👥 Group Projects", desc: "Working on module or course projects" },
      { value: "FYP / Capstone", label: "🎯 FYP / Capstone", desc: "Final Year Project or capstone work" },
      { value: "General Study", label: "📚 General Study", desc: "Regular studying and revision sessions" }
    ],
    "tech-arts": [
      { value: "Design", label: "🎨 Design", desc: "User experience and visual design" },
      { value: "Media Production", label: "🎬 Media Production", desc: "Video, audio, and multimedia projects" },
      { value: "Creative Projects", label: "✨ Creative Projects", desc: "Collaborative creative work" },
      { value: "Art & Culture", label: "🎭 Art & Culture", desc: "Arts, theatre, and cultural studies" },
      { value: "Exam Prep", label: "📝 Exam Prep", desc: "Studying or revising for tests and finals" },
      { value: "Group Projects", label: "👥 Group Projects", desc: "Working on module or course projects" },
      { value: "FYP / Capstone", label: "🎯 FYP / Capstone", desc: "Final Year Project or capstone work" },
      { value: "General Study", label: "📚 General Study", desc: "Regular studying and revision sessions" }
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

  const validateSchoolEmail = (email) => {
    // Accept common academic domains like .edu, .edu.xx, .ac.xx
    const emailRegex = /^[^\s@]+@[^\s@]+\.(edu|edu\.[a-z]{2}|ac\.[a-z]{2})$/i;
    return emailRegex.test(email);
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

    // Also populate study interests when school changes
    window.populateStudyInterests(school);
  };

  // Populate study interests based on school selection
  window.populateStudyInterests = function(school) {
    const interestsContainer = document.getElementById("interestsContainer");
    if (!interestsContainer) {
      console.log("Interests container not found (not on profile page)");
      return;
    }

    interestsContainer.innerHTML = '';

    const interests = interestsMap[school] || [];
    console.log("Selected school:", school, "Study interests:", interests);
    
    interests.forEach((interest) => {
      const label = document.createElement("label");
      label.className = "checkbox-label";
      label.title = interest.desc; // Tooltip on hover
      label.innerHTML = `
        <input type="checkbox" name="interests" value="${interest.value}">
        <span>${interest.label}</span>
      `;
      interestsContainer.appendChild(label);
    });
  };

  // Profile setup form handling
  window.handleProfileSetup = function() {
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("schoolEmail").value.trim();
    const school = document.getElementById("school").value;
    const diploma = document.getElementById("diploma").value;
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestCheckboxes).map(cb => cb.value);

    // Clear all errors
    clearError("nameError");
    clearError("emailError");
    clearError("schoolError");
    clearError("diplomaError");
    clearError("interestsError");

    let isValid = true;

    if (!name) {
      showError("nameError", "Please enter your name");
      isValid = false;
    }

    if (!email) {
      showError("emailError", "Please enter your school email");
      isValid = false;
    } else if (!validateSchoolEmail(email)) {
      showError("emailError", "Use a valid school email (e.g., name@school.edu)");
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
      email,
      school,
      schoolName: schoolNames[school],
      diploma,
      interests
    };

    localStorage.setItem("studyconnect_profile", JSON.stringify(profile));
    showToast("Profile created successfully! Redirecting...");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  };

  // Dashboard initialization
  window.initDashboard = function() {
    const profile = localStorage.getItem("studyconnect_profile");
    if (!profile) {
      // If no profile, redirect to profile setup
      window.location.href = "profile.html";
      return;
    }

    const user = JSON.parse(profile);
    const userNameEl = document.getElementById("userNameDisplay");
    if (userNameEl) userNameEl.textContent = user.name;

    const emailEl = document.getElementById("userEmailDisplay");
    if (emailEl) emailEl.textContent = user.email || "—";

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

      const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");

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
          const connectionsLatest = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
          if (!connectionsLatest.includes(studentId)) {
            connectionsLatest.push(studentId);
            localStorage.setItem("studyconnect_connections", JSON.stringify(connectionsLatest));
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

  // Flowise API integration
 async function query(data) {
    const response = await fetch(
        "https://cloud.flowiseai.com/api/v1/prediction/4919fadf-112c-4393-93be-0eb7b16b1c40",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({"question": "Hey, how are you?"}).then((response) => {
    console.log(response);
});

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

  const showTypingIndicator = (container) => {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot typing-indicator";
    bubble.innerHTML = '<span></span><span></span><span></span>';
    bubble.id = "typing-indicator";
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  };

  const removeTypingIndicator = (container) => {
    const indicator = container.querySelector("#typing-indicator");
    if (indicator) indicator.remove();
  };

  const initChatbotUI = () => {
    const toggle = document.getElementById("chatToggle");
    const widget = document.getElementById("chatWidget");
    const closeBtn = document.getElementById("chatClose");
    const messages = document.getElementById("chatMessages");
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSend");

    console.log("[chatbot] init", {
      toggle: !!toggle,
      widget: !!widget,
      closeBtn: !!closeBtn,
      messages: !!messages,
      input: !!input,
      sendBtn: !!sendBtn,
    });

    if (!toggle || !widget || !messages || !input || !sendBtn) return;

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text) return;
      
      appendChatMessage(messages, "user", text);
      input.value = "";
      
      // Show typing indicator
      showTypingIndicator(messages);
      
      try {
        // Call Flowise API
        const response = await query({ question: text });
        removeTypingIndicator(messages);
        
        // Extract response text - Flowise returns various formats
        let botReply = "I'm not sure how to respond. Please try again.";
        
        if (response.text) {
          botReply = response.text;
        } else if (response.answer) {
          botReply = response.answer;
        } else if (response.response) {
          botReply = response.response;
        } else if (typeof response === 'string') {
          botReply = response;
        }
        
        appendChatMessage(messages, "bot", botReply);
      } catch (error) {
        removeTypingIndicator(messages);
        console.error("Flowise API error:", error);
        appendChatMessage(messages, "bot", "Sorry, I encountered an error. Please try again.");
      }
    };

    toggle.addEventListener("click", () => {
      console.log("[chatbot] toggle click");
      widget.classList.toggle("open");
      toggle.classList.toggle("open");
      if (widget.classList.contains("open")) {
        console.log("[chatbot] widget opened");
        input.focus();
        if (!messages.dataset.welcome) {
          appendChatMessage(messages, "bot", "Hi! I'm your Study Connect assistant. How can I help you today?");
          messages.dataset.welcome = "true";
        }
      } else {
        console.log("[chatbot] widget closed");
      }
    });

    closeBtn?.addEventListener("click", () => {
      console.log("[chatbot] close click");
      widget.classList.remove("open");
      toggle.classList.remove("open");
    });

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

  // ==================== NEW FUNCTIONALITY FOR STUDY CONNECT ====================

  // Initialize Preferences Page
  window.initPreferences = function() {
    const form = document.getElementById("preferencesForm");
    if (!form) return;

    // Load existing preferences if any
    const savedPrefs = localStorage.getItem("studyconnect_preferences");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      document.getElementById("studyStyle").value = prefs.studyStyle || "";
      document.getElementById("sessionLength").value = prefs.sessionLength || "";
      document.getElementById("studyLocation").value = prefs.studyLocation || "";
      
      // Set availability checkboxes
      if (prefs.availability) {
        prefs.availability.forEach(avail => {
          const checkbox = document.querySelector(`input[name="availability"][value="${avail}"]`);
          if (checkbox) checkbox.checked = true;
        });
      }

      // Set interests checkboxes
      if (prefs.interests) {
        prefs.interests.forEach(interest => {
          const checkbox = document.querySelector(`input[name="interests"][value="${interest}"]`);
          if (checkbox) checkbox.checked = true;
        });
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const studyStyle = document.getElementById("studyStyle").value;
      const sessionLength = document.getElementById("sessionLength").value;
      const studyLocation = document.getElementById("studyLocation").value;
      
      const availabilityBoxes = document.querySelectorAll('input[name="availability"]:checked');
      const availability = Array.from(availabilityBoxes).map(cb => cb.value);
      
      const interestBoxes = document.querySelectorAll('input[name="interests"]:checked');
      const interests = Array.from(interestBoxes).map(cb => cb.value);

      if (!studyStyle || !sessionLength || !studyLocation) {
        showToast("Please fill in all required fields");
        return;
      }

      if (availability.length === 0) {
        showToast("Please select at least one availability slot");
        return;
      }

      const preferences = {
        studyStyle,
        sessionLength,
        studyLocation,
        availability,
        interests
      };

      localStorage.setItem("studyconnect_preferences", JSON.stringify(preferences));
      showToast("Preferences saved successfully!");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);
    });
  };

  // Initialize Study Requests Page
  window.initRequests = async function() {
    const requestsGrid = document.getElementById("requestsGrid");
    if (!requestsGrid) return;

    try {
      const response = await fetch("data/study-requests.json");
      const requests = await response.json();
      
      let filteredRequests = [...requests];

      const renderRequests = () => {
        if (filteredRequests.length === 0) {
          requestsGrid.innerHTML = '<div class="empty-state"><p>No study requests found matching your filters.</p></div>';
          return;
        }

        requestsGrid.innerHTML = filteredRequests.map(req => `
          <article class="event-card">
            <div class="event-meta">${req.date} · ${req.time}</div>
            <h3>${req.title}</h3>
            <p><strong>By:</strong> ${req.author} · <strong>School:</strong> ${req.diploma}</p>
            <p>${req.description}</p>
            <p><strong>Location:</strong> ${req.location}</p>
            <p><strong>Participants:</strong> ${req.participants}</p>
            <div class="pill-row">
              ${req.interests.map(interest => `<span class="pill ghost">${interest}</span>`).join("")}
            </div>
            <button class="btn inline connect-btn" data-request-id="${req.id}">Connect</button>
          </article>
        `).join("");

        // Add event listeners to Connect buttons
        document.querySelectorAll(".connect-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const requestId = e.target.getAttribute("data-request-id");
            handleRequestConnect(requestId, requests);
            e.target.textContent = "Request Sent!";
            e.target.disabled = true;
          });
        });
      };

      // Filter functionality
      const filterSchool = document.getElementById("filterSchool");
      const filterSubject = document.getElementById("filterSubject");
      const resetBtn = document.getElementById("resetFiltersBtn");

      const applyFilters = () => {
        filteredRequests = requests.filter(req => {
          const schoolMatch = !filterSchool.value || req.school === filterSchool.value;
          const subjectMatch = !filterSubject.value || req.interests.includes(filterSubject.value);
          return schoolMatch && subjectMatch;
        });
        renderRequests();
      };

      if (filterSchool) filterSchool.addEventListener("change", applyFilters);
      if (filterSubject) filterSubject.addEventListener("change", applyFilters);
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (filterSchool) filterSchool.value = "";
          if (filterSubject) filterSubject.value = "";
          filteredRequests = [...requests];
          renderRequests();
        });
      }

      renderRequests();
    } catch (error) {
      console.error("Error loading study requests:", error);
      requestsGrid.innerHTML = '<div class="empty-state"><p>Error loading study requests. Please try again later.</p></div>';
    }
  };

  const handleRequestConnect = (requestId, requests) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    // Get current connections from localStorage
    let connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
    
    // Add this request to connections if not already there
    if (!connections.find(c => c.id === requestId)) {
      connections.push({
        id: requestId,
        name: request.author,
        type: "request",
        date: new Date().toISOString()
      });
      localStorage.setItem("studyconnect_connections", JSON.stringify(connections));
    }

    showToast(`Connected with ${request.author}!`);
  };

  // Initialize Messages Page
  window.initMessages = function() {
    const conversationsList = document.getElementById("conversationsList");
    const chatContent = document.getElementById("chatContent");
    const chatHeader = document.getElementById("chatHeader");
    const chatInput = document.getElementById("chatInput");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendMessageBtn");

    if (!conversationsList) return;

    // Get connections from localStorage
    const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
    
    // Sample messages data
    const messagesData = {
      partner1: [
        { sender: "Mia Chen", text: "Hey! Got the payment rails slides done", time: "9:10 AM" },
        { sender: "You", text: "nice! did u cover interchange fees?", time: "9:12 AM" },
        { sender: "Mia Chen", text: "yup slide 4, and i added instant vs card rails too", time: "9:13 AM" },
        { sender: "You", text: "Perfect, i'll go through it tonight", time: "9:14 AM" },
        { sender: "Mia Chen", text: "sounds good 👍", time: "9:15 AM" }
      ],
      partner2: [
        { sender: "Rajiv Nair", text: "dude the backtest is looking way better now", time: "Yesterday" },
        { sender: "You", text: "oh fr? what did you change", time: "Yesterday" },
        { sender: "Rajiv Nair", text: "capped drawdown at 5% and removed those low-liquidity stocks", time: "Yesterday" },
        { sender: "You", text: "smart move. sharpe ratio improved?", time: "Yesterday" },
        { sender: "Rajiv Nair", text: "yeah significantly. should we add a risk slide?", time: "Yesterday" },
        { sender: "You", text: "definitely, let's do it tmr", time: "Yesterday" }
      ],
      partner3: [
        { sender: "Aisha Rahman", text: "just finished reading the MAS eKYC stuff", time: "2:05 PM" },
        { sender: "You", text: "anything we need to include?", time: "2:06 PM" },
        { sender: "Aisha Rahman", text: "consent + record retention for sure", time: "2:07 PM" },
        { sender: "Aisha Rahman", text: "also transaction monitoring is pretty important", time: "2:08 PM" },
        { sender: "You", text: "cool i'll add those points to our slides", time: "2:10 PM" }
      ],
      partner4: [
        { sender: "Leo Tan", text: "finally cleaned up the dataset lol", time: "10:01 AM" },
        { sender: "You", text: "any crazy outliers?", time: "10:02 AM" },
        { sender: "Leo Tan", text: "removed 2 extreme ones", time: "10:03 AM" },
        { sender: "Leo Tan", text: "R squared jumped to 0.78", time: "10:04 AM" },
        { sender: "You", text: "that's solid, let's check VIF next", time: "10:05 AM" }
      ],
      partner5: [
        { sender: "Sara Lim", text: "uploaded the budget tracker prototype to figma", time: "11:30 AM" },
        { sender: "You", text: "just saw it, the category chips look clean", time: "11:32 AM" },
        { sender: "Sara Lim", text: "thanks! btw can u help with the savings goals copy?", time: "11:34 AM" },
        { sender: "You", text: "yeah sure, i'll write something short and friendly", time: "11:35 AM" },
        { sender: "Sara Lim", text: "appreciate it 🙏", time: "11:36 AM" }
      ]
    };

    // Always use sample conversations (default messaging for all users)
    let conversations = [
      { id: "partner1", name: "Mia Chen (Diploma in Financial Technology)", lastMessage: "sounds good 👍", time: "9:15 AM", unread: 0 },
      { id: "partner2", name: "Rajiv Nair (Diploma in Financial Technology)", lastMessage: "definitely, let's do it tmr", time: "Yesterday", unread: 1 },
      { id: "partner3", name: "Aisha Rahman (Diploma in Digital Banking)", lastMessage: "cool i'll add those points to our slides", time: "2:10 PM", unread: 0 },
      { id: "partner4", name: "Leo Tan (Diploma in Data Science)", lastMessage: "that's solid, let's check VIF next", time: "10:05 AM", unread: 0 },
      { id: "partner5", name: "Sara Lim (Diploma in UX for Finance)", lastMessage: "appreciate it 🙏", time: "11:36 AM", unread: 0 }
    ];

    // Check if there's an active chat from dashboard and add if not exists
    const activeChat = localStorage.getItem("studyconnect_active_chat");
    let activeChatId = null;
    
    if (activeChat) {
      try {
        const chatData = JSON.parse(activeChat);
        const displayName = `${chatData.name} (${chatData.diploma})`;
        
        // Check if conversation already exists
        let matchingConv = conversations.find(c => c.name.includes(chatData.name));
        
        if (!matchingConv) {
          // Add new conversation for this person
          const newId = `partner${conversations.length + 1}`;
          matchingConv = {
            id: newId,
            name: displayName,
            lastMessage: "Just connected!",
            time: "Just now",
            unread: 0
          };
          conversations.unshift(matchingConv); // Add to top
          
          // Add initial message
          messagesData[newId] = [
            { sender: chatData.name.split(" ")[0], text: "Hi! Looking forward to studying together!", time: "Just now" }
          ];
        }
        
        activeChatId = matchingConv.id;
        localStorage.removeItem("studyconnect_active_chat");
      } catch (e) {
        console.error("Error loading active chat:", e);
      }
    }

    // Render conversations list
    conversationsList.innerHTML = conversations.map(conv => `
      <div class="conversation-item ${conv.unread > 0 ? 'unread' : ''}" data-conversation-id="${conv.id}">
        <div class="conversation-avatar">${conv.name.charAt(0)}</div>
        <div class="conversation-info">
          <div class="conversation-name">${conv.name}</div>
          <div class="conversation-preview">${conv.lastMessage}</div>
        </div>
        <div class="conversation-meta">
          <div class="conversation-time">${conv.time}</div>
          ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
        </div>
      </div>
    `).join("");

    // Function to open a conversation
    const openConversation = (convId) => {
      const conv = conversations.find(c => c.id === convId);
      if (!conv) return;

      // Update active state
      document.querySelectorAll(".conversation-item").forEach(i => i.classList.remove("active"));
      const activeItem = document.querySelector(`[data-conversation-id="${convId}"]`);
      if (activeItem) {
        activeItem.classList.add("active");
        activeItem.classList.remove("unread");
      }

      // Show chat header
      chatHeader.innerHTML = `<h3>${conv.name}</h3>`;
      
      // Show messages
      const messages = messagesData[convId] || [
        { sender: conv.name.split(" ")[0], text: "Hi! Looking forward to studying together!", time: "Just now" }
      ];

      chatContent.innerHTML = messages.map(msg => `
        <div class="message ${msg.sender === 'You' ? 'sent' : 'received'}">
          <div class="message-bubble">
            <div class="message-text">${msg.text}</div>
            <div class="message-time">${msg.time}</div>
          </div>
        </div>
      `).join("");

      // Show input area
      chatInput.style.display = "flex";
    };

    // Handle conversation click
    document.querySelectorAll(".conversation-item").forEach(item => {
      item.addEventListener("click", () => {
        const convId = item.getAttribute("data-conversation-id");
        openConversation(convId);
      });
    });

    // Auto-open the active chat if coming from dashboard
    if (activeChatId) {
      openConversation(activeChatId);
    }

    // Handle send message
    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        const text = messageInput.value.trim();
        if (!text) return;

        const messageHTML = `
          <div class="message sent">
            <div class="message-bubble">
              <div class="message-text">${text}</div>
              <div class="message-time">Just now</div>
            </div>
          </div>
        `;

        chatContent.insertAdjacentHTML("beforeend", messageHTML);
        messageInput.value = "";
        chatContent.scrollTop = chatContent.scrollHeight;

        // Show typing indicator
        const typingHTML = `
          <div class="message received">
            <div class="message-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        `;
        chatContent.insertAdjacentHTML("beforeend", typingHTML);
        chatContent.scrollTop = chatContent.scrollHeight;

        // Simulate typing delay then reply
        setTimeout(() => {
          // Remove typing indicator
          const typingMsg = chatContent.querySelector(".typing-indicator")?.closest(".message");
          if (typingMsg) typingMsg.remove();

          // Context-aware replies based on user message
          const msgLower = text.toLowerCase();
          let reply;

          // Greetings
          if (msgLower.match(/^(hi|hey|hello|yo|sup|whats up|wassup)/)) {
            const greetings = ["hey!", "hi! what's up", "yo what's good", "hey how's it going?", "sup! u free to study?"];
            reply = greetings[Math.floor(Math.random() * greetings.length)];
          }
          // Questions about time/when
          else if (msgLower.includes("when") || msgLower.includes("what time") || msgLower.includes("meet")) {
            const timeReplies = ["im free after 3pm", "maybe around 4?", "anytime after class works", "how about tomorrow 2pm?", "when r u free?"];
            reply = timeReplies[Math.floor(Math.random() * timeReplies.length)];
          }
          // Questions about where/location
          else if (msgLower.includes("where") || msgLower.includes("library") || msgLower.includes("place")) {
            const placeReplies = ["library?", "let's do level 5 study room", "canteen?", "wherever works for u", "the usual spot?"];
            reply = placeReplies[Math.floor(Math.random() * placeReplies.length)];
          }
          // Help/questions
          else if (msgLower.includes("help") || msgLower.includes("?")) {
            const helpReplies = ["yeah sure what do u need?", "i got u, what's up?", "lemme check and get back to u", "for sure, send me the details", "yup i can help"];
            reply = helpReplies[Math.floor(Math.random() * helpReplies.length)];
          }
          // Thanks
          else if (msgLower.includes("thank") || msgLower.includes("thx") || msgLower.includes("tysm")) {
            const thanksReplies = ["np!", "no worries", "anytime bro", "gotchu", "np np 👍"];
            reply = thanksReplies[Math.floor(Math.random() * thanksReplies.length)];
          }
          // Study/homework/assignment mentions
          else if (msgLower.match(/study|homework|assignment|exam|test|quiz|notes/)) {
            const studyReplies = ["yeah i'm working on that too", "dude same i need to review that", "wanna study together?", "let me know if u need the notes", "we should go through it tgt"];
            reply = studyReplies[Math.floor(Math.random() * studyReplies.length)];
          }
          // Agreement/confirmation
          else if (msgLower.match(/^(ok|okay|sure|yeah|yep|cool|alright|sounds good)/)) {
            const confirmReplies = ["bet", "aight cool", "sounds good 👍", "perfect", "alright see u"];
            reply = confirmReplies[Math.floor(Math.random() * confirmReplies.length)];
          }
          // Default fallback
          else {
            const defaults = ["for sure", "yeah definitely", "oh fr?", "same tbh", "gotcha", "alright cool", "bet let's do it", "sounds good"];
            reply = defaults[Math.floor(Math.random() * defaults.length)];
          }

          const replyHTML = `
            <div class="message received">
              <div class="message-bubble">
                <div class="message-text">${reply}</div>
                <div class="message-time">Just now</div>
              </div>
            </div>
          `;
          chatContent.insertAdjacentHTML("beforeend", replyHTML);
          chatContent.scrollTop = chatContent.scrollHeight;
        }, 1000 + Math.random() * 1500);
      });

      messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendBtn.click();
        }
      });
    }
  };

  // Initialize Favourites Page
  window.initFavourites = async function() {
    const favouritesGrid = document.getElementById("favouritesGrid");
    const emptyState = document.getElementById("emptyState");
    if (!favouritesGrid) return;

    try {
      const response = await fetch("data/study-partners.json");
      const allPartners = await response.json();

      // Get favourites from localStorage
      const favouriteIds = JSON.parse(localStorage.getItem("studyconnect_favourites") || "[]");

      if (favouriteIds.length === 0) {
        favouritesGrid.style.display = "none";
        emptyState.style.display = "block";
        return;
      }

      const favouritePartners = allPartners.filter(p => favouriteIds.includes(p.id));

      favouritesGrid.innerHTML = favouritePartners.map(partner => `
        <article class="student-card">
          <div class="student-avatar">${partner.name.charAt(0)}</div>
          <h3>${partner.name}</h3>
          <p class="student-school">${partner.diploma}</p>
          <div class="pill-row">
            ${partner.interests.slice(0, 3).map(interest => `<span class="pill">${interest}</span>`).join("")}
          </div>
          <p class="student-bio">${partner.bio}</p>
          <div class="student-actions">
            <button class="btn primary message-btn" data-partner-id="${partner.id}">Message</button>
            <button class="btn ghost unfavourite-btn" data-partner-id="${partner.id}">Remove</button>
          </div>
        </article>
      `).join("");

      // Add event listeners
      document.querySelectorAll(".message-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          window.location.href = "messages.html";
        });
      });

      document.querySelectorAll(".unfavourite-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const partnerId = e.target.getAttribute("data-partner-id");
          const updatedFavourites = favouriteIds.filter(id => id !== partnerId);
          localStorage.setItem("studyconnect_favourites", JSON.stringify(updatedFavourites));
          showToast("Removed from favourites");
          
          // Reload page
          setTimeout(() => {
            window.location.reload();
          }, 800);
        });
      });

    } catch (error) {
      console.error("Error loading favourites:", error);
      favouritesGrid.innerHTML = '<div class="empty-state"><p>Error loading favourites. Please try again later.</p></div>';
    }
  };

  // Enhanced dashboard initialization with partners data
  window.initDashboardWithPartners = async function() {
    // Call original dashboard init
    window.initDashboard();

    // Initialize chatbot
    initChatbotUI();

    const studentsGrid = document.getElementById("studentsGrid");
    if (!studentsGrid) return;

    try {
      const response = await fetch("data/study-partners.json");
      const partners = await response.json();

      const profile = JSON.parse(localStorage.getItem("studyconnect_profile") || "{}");
      const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
      const favourites = JSON.parse(localStorage.getItem("studyconnect_favourites") || "[]");

      let filteredPartners = [...partners];

      const renderPartners = () => {
        if (filteredPartners.length === 0) {
          studentsGrid.innerHTML = '<div class="empty-state"><p>No study partners found matching your filters.</p></div>';
          return;
        }

        studentsGrid.innerHTML = filteredPartners.map(partner => {
          const isConnected = connections.some(c => c.id === partner.id);
          const isFavourite = favourites.includes(partner.id);

          return `
            <article class="student-card">
              <h3>${partner.name}</h3>
              <p class="student-school">${partner.diploma}</p>
              <div class="pill-row">
                ${partner.interests.slice(0, 3).map(interest => `<span class="pill">${interest}</span>`).join("")}
              </div>
              <p class="student-bio">${partner.bio}</p>
              <div class="student-actions">
                ${isConnected 
                  ? '<button class="btn primary message-btn" data-partner-id="' + partner.id + '">Message</button>'
                  : '<button class="btn primary connect-partner-btn" data-partner-id="' + partner.id + '">Connect</button>'
                }
                <button class="btn ghost favourite-btn ${isFavourite ? 'active' : ''}" data-partner-id="${partner.id}">
                  ${isFavourite ? '★' : '☆'}
                </button>
              </div>
            </article>
          `;
        }).join("");

        // Add event listeners
        document.querySelectorAll(".connect-partner-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const partnerId = e.target.getAttribute("data-partner-id");
            const partner = partners.find(p => p.id === partnerId);
            
            // Add to connections
            const updatedConnections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
            if (!updatedConnections.find(c => c.id === partnerId)) {
              updatedConnections.push({
                id: partnerId,
                name: partner.name,
                type: "partner",
                date: new Date().toISOString()
              });
              localStorage.setItem("studyconnect_connections", JSON.stringify(updatedConnections));
              
              showToast(`Connected with ${partner.name}!`);
              
              // Update button
              e.target.textContent = "Message";
              e.target.classList.remove("connect-partner-btn");
              e.target.classList.add("message-btn");
              
              // Reload to update state
              setTimeout(() => renderPartners(), 800);
            }
          });
        });

        document.querySelectorAll(".message-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const partnerId = btn.getAttribute("data-partner-id");
            const partner = partners.find(p => p.id === partnerId);
            
            // Store the selected partner for messages page
            localStorage.setItem("studyconnect_active_chat", JSON.stringify({
              id: partnerId,
              name: partner.name,
              diploma: partner.diploma
            }));
            
            window.location.href = "messages.html";
          });
        });

        document.querySelectorAll(".favourite-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const partnerId = e.target.getAttribute("data-partner-id");
            const currentFavourites = JSON.parse(localStorage.getItem("studyconnect_favourites") || "[]");
            
            if (currentFavourites.includes(partnerId)) {
              const updated = currentFavourites.filter(id => id !== partnerId);
              localStorage.setItem("studyconnect_favourites", JSON.stringify(updated));
              showToast("Removed from favourites");
            } else {
              currentFavourites.push(partnerId);
              localStorage.setItem("studyconnect_favourites", JSON.stringify(currentFavourites));
              showToast("Added to favourites");
            }
            
            setTimeout(() => renderPartners(), 600);
          });
        });
      };

      // Filter functionality
      const filterSchool = document.getElementById("filterSchool");
      const filterInterest = document.getElementById("filterInterest");
      const resetBtn = document.getElementById("resetFiltersBtn");

      const applyFilters = () => {
        filteredPartners = partners.filter(partner => {
          const schoolMatch = !filterSchool.value || partner.school === filterSchool.value;
          const interestMatch = !filterInterest.value || partner.interests.includes(filterInterest.value);
          return schoolMatch && interestMatch;
        });
        renderPartners();
      };

      if (filterSchool) filterSchool.addEventListener("change", applyFilters);
      if (filterInterest) filterInterest.addEventListener("change", applyFilters);
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (filterSchool) filterSchool.value = "";
          if (filterInterest) filterInterest.value = "";
          filteredPartners = [...partners];
          renderPartners();
        });
      }

      renderPartners();

    } catch (error) {
      console.error("Error loading partners:", error);
      studentsGrid.innerHTML = '<div class="empty-state"><p>Error loading study partners. Please try again later.</p></div>';
    }
  };

  // ==================== CREATE STUDY SESSION FUNCTIONALITY ====================

  // Initialize Create Session Page
  window.initCreateSession = function() {
    const form = document.getElementById("createSessionForm");
    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById("sessionDate");
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const title = document.getElementById("sessionTitle").value.trim();
      const subject = document.getElementById("subject").value;
      const date = document.getElementById("sessionDate").value;
      const time = document.getElementById("sessionTime").value;
      const duration = document.getElementById("duration").value;
      const location = document.getElementById("location").value;
      const maxParticipants = document.getElementById("maxParticipants").value;
      const description = document.getElementById("description").value.trim();
      
      const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
      const interests = Array.from(interestCheckboxes).map(cb => cb.value);

      // Clear all errors
      ["titleError", "subjectError", "dateError", "timeError", "durationError", "locationError", "participantsError", "interestsError"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
      });

      // Validation
      let isValid = true;

      if (!title) {
        showError("titleError", "Please enter a session title");
        isValid = false;
      }

      if (!subject) {
        showError("subjectError", "Please select a subject");
        isValid = false;
      }

      if (!date) {
        showError("dateError", "Please select a date");
        isValid = false;
      }

      if (!time) {
        showError("timeError", "Please select a time");
        isValid = false;
      }

      if (!duration) {
        showError("durationError", "Please select a duration");
        isValid = false;
      }

      if (!location) {
        showError("locationError", "Please select a location");
        isValid = false;
      }

      if (!maxParticipants || maxParticipants < 2) {
        showError("participantsError", "Must allow at least 2 participants");
        isValid = false;
      }

      if (interests.length === 0) {
        showError("interestsError", "Please select at least one study interest");
        isValid = false;
      }

      if (!isValid) return;

      // Get user profile
      const profile = JSON.parse(localStorage.getItem("studyconnect_profile") || "{}");
      if (!profile.name) {
        showToast("Please complete your profile first");
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1500);
        return;
      }

      // Create session object
      const sessionId = "session_" + Date.now();
      const session = {
        id: sessionId,
        title,
        subject,
        date,
        time,
        duration,
        location,
        maxParticipants: parseInt(maxParticipants),
        currentParticipants: 1,
        description: description || "No additional details provided.",
        interests,
        author: profile.name,
        authorEmail: profile.email,
        school: profile.school,
        schoolName: profile.schoolName,
        diploma: profile.diploma,
        createdAt: new Date().toISOString(),
        participants: [profile.name],
        requests: []
      };

      // Save to localStorage
      const existingSessions = JSON.parse(localStorage.getItem("studyconnect_sessions") || "[]");
      existingSessions.push(session);
      localStorage.setItem("studyconnect_sessions", JSON.stringify(existingSessions));

      showToast("Study session created successfully!");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);
    });
  };

  // Update initRequests to include user-created sessions
  const originalInitRequests = window.initRequests;
  window.initRequests = async function() {
    const requestsGrid = document.getElementById("requestsGrid");
    if (!requestsGrid) return;

    try {
      // Load both JSON requests and localStorage sessions
      const response = await fetch("data/study-requests.json");
      const jsonRequests = await response.json();
      
      const userSessions = JSON.parse(localStorage.getItem("studyconnect_sessions") || "[]");
      const sessionRequests = JSON.parse(localStorage.getItem("studyconnect_session_requests") || "{}");
      const profile = JSON.parse(localStorage.getItem("studyconnect_profile") || "{}");

      // Convert user sessions to request format
      const formattedSessions = userSessions.map(session => ({
        id: session.id,
        title: session.title,
        author: session.author,
        school: session.school,
        diploma: session.diploma,
        subject: session.subject,
        description: session.description,
        date: session.date,
        time: `${session.time} (${session.duration})`,
        location: session.location,
        participants: `${session.currentParticipants}/${session.maxParticipants}`,
        interests: session.interests,
        isUserCreated: true
      }));

      // Combine both arrays
      const allRequests = [...jsonRequests, ...formattedSessions];
      let filteredRequests = [...allRequests];

      const renderRequests = () => {
        if (filteredRequests.length === 0) {
          requestsGrid.innerHTML = '<div class="empty-state"><p>No study requests found matching your filters.</p></div>';
          return;
        }

        requestsGrid.innerHTML = filteredRequests.map(req => {
          const requestStatus = sessionRequests[req.id];
          let buttonHTML = '';
          
          if (req.isUserCreated && req.author === profile.name) {
            buttonHTML = '<button class="btn inline" disabled style="opacity: 0.6;">Your Session</button>';
          } else if (requestStatus === 'requested') {
            buttonHTML = '<button class="btn inline" disabled style="background: #fbbf24; border-color: #fbbf24;">Requested</button>';
          } else if (requestStatus === 'joined') {
            buttonHTML = '<button class="btn primary" disabled>Joined ✓</button>';
          } else {
            buttonHTML = `<button class="btn inline connect-btn" data-request-id="${req.id}">Request to Join</button>`;
          }

          return `
            <article class="event-card">
              <div class="event-meta">${req.date} · ${req.time}</div>
              <h3>${req.title}</h3>
              <p><strong>By:</strong> ${req.author} · <strong>School:</strong> ${req.diploma}</p>
              <p>${req.description}</p>
              <p><strong>Location:</strong> ${req.location}</p>
              <p><strong>Participants:</strong> ${req.participants}</p>
              <div class="pill-row">
                ${req.interests.map(interest => `<span class="pill ghost">${interest}</span>`).join("")}
              </div>
              ${buttonHTML}
            </article>
          `;
        }).join("");

        // Add event listeners to Request to Join buttons
        document.querySelectorAll(".connect-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const requestId = e.target.getAttribute("data-request-id");
            handleRequestToJoin(requestId, allRequests);
          });
        });
      };

      // Filter functionality
      const filterSchool = document.getElementById("filterSchool");
      const filterSubject = document.getElementById("filterSubject");
      const resetBtn = document.getElementById("resetFiltersBtn");

      const applyFilters = () => {
        filteredRequests = allRequests.filter(req => {
          const schoolMatch = !filterSchool.value || req.school === filterSchool.value;
          const subjectMatch = !filterSubject.value || req.interests.includes(filterSubject.value);
          return schoolMatch && subjectMatch;
        });
        renderRequests();
      };

      if (filterSchool) filterSchool.addEventListener("change", applyFilters);
      if (filterSubject) filterSubject.addEventListener("change", applyFilters);
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (filterSchool) filterSchool.value = "";
          if (filterSubject) filterSubject.value = "";
          filteredRequests = [...allRequests];
          renderRequests();
        });
      }

      renderRequests();
    } catch (error) {
      console.error("Error loading study requests:", error);
      requestsGrid.innerHTML = '<div class="empty-state"><p>Error loading study requests. Please try again later.</p></div>';
    }
  };

  // Handle Request to Join functionality
  const handleRequestToJoin = (requestId, allRequests) => {
    const request = allRequests.find(r => r.id === requestId);
    if (!request) return;

    // Save request status to localStorage
    const sessionRequests = JSON.parse(localStorage.getItem("studyconnect_session_requests") || "{}");
    sessionRequests[requestId] = 'requested';
    localStorage.setItem("studyconnect_session_requests", JSON.stringify(sessionRequests));

    showToast(`Request sent to join "${request.title}"!`);

    // Simulate acceptance after 2 seconds
    setTimeout(() => {
      sessionRequests[requestId] = 'joined';
      localStorage.setItem("studyconnect_session_requests", JSON.stringify(sessionRequests));
      
      // Add to connections if not already there
      const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
      if (!connections.find(c => c.id === requestId)) {
        connections.push({
          id: requestId,
          name: request.author,
          type: "session",
          date: new Date().toISOString()
        });
        localStorage.setItem("studyconnect_connections", JSON.stringify(connections));
      }

      showToast(`You've joined "${request.title}"! Check Messages to coordinate.`);
      
      // Reload the page to show updated status
      window.location.reload();
    }, 2000);
  };

})();
