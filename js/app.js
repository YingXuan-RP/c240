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
        { sender: "Alice Zhang", text: "Hey! Ready for the ML study session tomorrow?", time: "10:30 AM" },
        { sender: "You", text: "Yes! I've prepared notes on supervised learning", time: "10:35 AM" },
        { sender: "Alice Zhang", text: "Perfect! See you at the library.", time: "10:36 AM" }
      ],
      partner2: [
        { sender: "Ben Tan", text: "Can you help me with React hooks?", time: "Yesterday" },
        { sender: "You", text: "Sure! Let's meet at the lab tomorrow", time: "Yesterday" }
      ]
    };

    // Create sample conversations from connections
    const conversations = connections.length > 0 
      ? connections.map((conn, idx) => ({
          id: `partner${idx + 1}`,
          name: conn.name,
          lastMessage: "Let's schedule our next study session",
          time: "2 hours ago",
          unread: idx === 0 ? 1 : 0
        }))
      : [
          { id: "partner1", name: "Alice Zhang", lastMessage: "Perfect! See you at the library.", time: "10:36 AM", unread: 0 },
          { id: "partner2", name: "Ben Tan", lastMessage: "Sure! Let's meet at the lab tomorrow", time: "Yesterday", unread: 1 }
        ];

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

    // Handle conversation click
    document.querySelectorAll(".conversation-item").forEach(item => {
      item.addEventListener("click", () => {
        const convId = item.getAttribute("data-conversation-id");
        const conv = conversations.find(c => c.id === convId);
        
        // Update active state
        document.querySelectorAll(".conversation-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        item.classList.remove("unread");

        // Show chat header
        chatHeader.innerHTML = `<h3>${conv.name}</h3>`;
        
        // Show messages
        const messages = messagesData[convId] || [
          { sender: conv.name, text: "Hi! Looking forward to studying together!", time: "Just now" }
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
      });
    });

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
              <div class="student-avatar">${partner.name.charAt(0)}</div>
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

})();
