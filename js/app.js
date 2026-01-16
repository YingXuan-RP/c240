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
    },
    {
      id: "STU009",
      username: "Riley Johnson",
      school: "infocomm",
      schoolName: "School of Infocomm",
      diploma: "Cybersecurity & Digital Forensics",
      interests: ["Programming", "Research", "Exam Prep"]
    },
    {
      id: "STU010",
      username: "Avery Taylor",
      school: "engineering",
      schoolName: "School of Engineering",
      diploma: "Aerospace Engineering",
      interests: ["Research", "CAD Design", "Problem Solving"]
    },
    {
      id: "STU011",
      username: "Quinn Anderson",
      school: "appliedscience",
      schoolName: "School of Applied Science",
      diploma: "Pharmaceutical Science",
      interests: ["Research", "Lab Work", "Exam Prep"]
    },
    {
      id: "STU012",
      username: "Drew Martinez",
      school: "business",
      schoolName: "School of Business",
      diploma: "Entrepreneurship",
      interests: ["Business Strategy", "Entrepreneurship", "Group Projects"]
    },
    {
      id: "STU013",
      username: "Cameron White",
      school: "infocomm",
      schoolName: "School of Infocomm",
      diploma: "Business Information Systems",
      interests: ["Data Analysis", "Business Strategy", "Programming"]
    },
    {
      id: "STU014",
      username: "Skylar Thompson",
      school: "tech-arts",
      schoolName: "School of Technology for the Arts",
      diploma: "Media Production & Design",
      interests: ["Creative Projects", "Media Production", "Group Projects"]
    },
    {
      id: "STU015",
      username: "Dakota Garcia",
      school: "engineering",
      schoolName: "School of Engineering",
      diploma: "Electrical & Electronic Engineering",
      interests: ["Programming", "Problem Solving", "Research"]
    },
    {
      id: "STU016",
      username: "Sage Rodriguez",
      school: "appliedscience",
      schoolName: "School of Applied Science",
      diploma: "Environmental & Marine Science",
      interests: ["Research", "Lab Work", "Group Projects"]
    },
    {
      id: "STU017",
      username: "Reese Martinez",
      school: "business",
      schoolName: "School of Business",
      diploma: "Human Resource Management with Psychology",
      interests: ["Research", "Business Strategy", "Exam Prep"]
    },
    {
      id: "STU018",
      username: "Phoenix Lee",
      school: "tech-arts",
      schoolName: "School of Technology for the Arts",
      diploma: "Sonic Arts",
      interests: ["Creative Projects", "Media Production", "Research"]
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

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
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

  // Login form handling
  window.handleLogin = function() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Clear errors
    clearError("emailError");
    clearError("passwordError");
    clearError("loginError");

    let isValid = true;

    if (!email) {
      showError("emailError", "Please enter your email");
      isValid = false;
    } else if (!validateSchoolEmail(email)) {
      showError("emailError", "Use a valid school email (e.g., name@school.edu)");
      isValid = false;
    }

    if (!password) {
      showError("passwordError", "Please enter your password");
      isValid = false;
    }

    if (!isValid) return;

    // Store the email in localStorage for future logins
    localStorage.setItem("studyconnect_last_email", email);

    // Simulate login - in a real app, this would validate against a server
    // For now, we'll create a session entry
    const session = {
      email,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem("campusconnect_session", JSON.stringify(session));

    showToast("Login successful! Redirecting...");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  };

  // Populate login form with last used email if available
  window.populateLoginForm = function() {
    const emailInput = document.getElementById("email");
    if (emailInput) {
      const lastEmail = localStorage.getItem("studyconnect_last_email");
      if (lastEmail) {
        emailInput.value = lastEmail;
        console.log("Populated email from localStorage:", lastEmail);
      }
    }
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

    // Setup logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to logout?")) {
          // Clear current user's chat history
          const chatKey = getChatHistoryKey();
          localStorage.removeItem(chatKey);
          
          // Clear other data
          localStorage.removeItem("studyconnect_profile");
          localStorage.removeItem("studyconnect_connections");
          localStorage.removeItem("studyconnect_favourites");
          showToast("Logged out successfully");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 500);
        }
      });
    }

    // Note: Partner rendering is handled by initDashboardWithPartners to prevent design flashing
    // Do not call initStudentConnections here as it causes rendering conflicts
  };

  // Removed initStudentConnections - using initDashboardWithPartners only to prevent design flashing


// Flowise API integration
async function query(data) {
    // Add 8-second timeout to prevent long waits
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    try {
        const response = await fetch(
            "https://cloud.flowiseai.com/api/v1/prediction/7d1211ab-2aaa-47aa-bf76-08ada2e91841",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                signal: controller.signal
            }
        );
        clearTimeout(timeoutId);
        const result = await response.json();
        return result;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error("Sorry, it's taking too long. Please try again.");
        }
        throw error;
    }
}





  // Old hardcoded chatbot intents - DISABLED (now using Flowise only)
  // const chatbotIntents = [
  //   {
  //     keywords: ["find", "study partner", "match", "partner"],
  //     response: "To find a study partner, use the 'Find a Study Partner' section, filter by school/interest, and click Connect."
  //   },
  //   {
  //     keywords: ["calendar", "schedule", "events"],
  //     response: "Check the Calendar section to view upcoming study sessions and schedule your activities."
  //   },
  //   {
  //     keywords: ["what", "campusconnect", "do"],
  //     response: "CampusConnect centralises calendar, communities, and study partner matching with a proactive agent to guide you."
  //   },
  //   {
  //     keywords: ["help", "navigation", "where"],
  //     response: "Use the top navigation to jump to Calendar, Communities, Resources, or Connect for study partners."
  //   }
  // ];

  // window.chatbotResponse = function(message) {
  //   const msg = message.toLowerCase();
  //   const match = chatbotIntents.find((intent) => intent.keywords.some((k) => msg.includes(k)));
  //   return match
  //     ? match.response
  //     : "I'm here to help! Ask about study partners, calendar, or how to navigate CampusConnect.";
  // };

  const appendChatMessage = (container, role, text) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${role}`;
    
    // Auto-format numbered steps: detect patterns like "1. ... 2. ... 3. ..."
    let formattedText = text;
    if (role === "bot" || role === "assistant") {
      // Insert line break before each step number (except the first)
      formattedText = formattedText.replace(/([^\n])\s+(\d+\.\s)/g, '$1\n$2');
    }
    
    // Use innerText to preserve line breaks
    bubble.style.whiteSpace = "pre-wrap";
    bubble.textContent = formattedText;
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

  // Extract session data from chatbot response
  const extractSessionData = (botReply, userMessage) => {
    // Prefer extracting details from bot reply; fallback to user message
    const dateMatch = botReply.match(/\b(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4})\b/i) ||
                      userMessage.match(/\b(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4})\b/i);

    // Time range like "2 PM to 4 PM" or "10:00–12:00"
    const rangeMatch = botReply.match(/(\d{1,2}:\d{2}\s?(?:AM|PM)?|\d{1,2}\s?(?:AM|PM))\s*(?:–|-|to)\s*(\d{1,2}:\d{2}\s?(?:AM|PM)?|\d{1,2}\s?(?:AM|PM))/i) ||
                       userMessage.match(/(\d{1,2}:\d{2}\s?(?:AM|PM)?|\d{1,2}\s?(?:AM|PM))\s*(?:–|-|to)\s*(\d{1,2}:\d{2}\s?(?:AM|PM)?|\d{1,2}\s?(?:AM|PM))/i);

    const timeMatch = botReply.match(/\b(\d{1,2}:\d{2}(?:\s?[AP]M)?)\b/gi) || userMessage.match(/\b(\d{1,2}:\d{2}(?:\s?[AP]M)?)\b/gi);
    const locationMatch = botReply.match(/(?:location:?\s*)([^\n]+)|(?:\b(?:at|in)\b)\s+([^\n]+?)(?:\.|$)/i) ||
                          userMessage.match(/(?:location:?\s*)([^\n]+)|(?:\b(?:at|in)\b)\s+([^\n]+?)(?:\.|$)/i);
    
    // Extract title
    let title = "Study Session";
    const titleFromReply = botReply.match(/(?:title:?\s*)([^\n]+)/i) || botReply.match(/session\s+for\s+(.+?)(?:\s+on|\s+at|$)/i);
    const titleFromUser = userMessage.match(/(?:book|schedule|create)(?:\s+a)?\s+(?:session\s+for\s+)?(.+?)(?:\s+on|\s+at|$)/i);
    if (titleFromReply) {
      title = (titleFromReply[1] || titleFromReply[0]).trim();
    } else if (titleFromUser) {
      title = titleFromUser[1].trim();
    }
    
    // Parse date
    let date = new Date().toISOString().split("T")[0]; // default to today
    if (dateMatch) {
      // Manually parse date to avoid timezone shifts
      const parsedDate = parseLocalDate(dateMatch[1]);
      if (parsedDate) {
        date = parsedDate;
      }
    }
    
    // Parse times
    let startTime = "10:00";
    let endTime = "12:00";
    if (rangeMatch) {
      startTime = convertTo24Hour(rangeMatch[1]);
      endTime = convertTo24Hour(rangeMatch[2]);
    } else if (timeMatch && timeMatch.length >= 1) {
      startTime = convertTo24Hour(timeMatch[0]);
      if (timeMatch.length >= 2) {
        endTime = convertTo24Hour(timeMatch[1]);
      } else {
        const [hours, mins] = startTime.split(":");
        endTime = `${(parseInt(hours, 10) + 2).toString().padStart(2, "0")}:${mins}`;
      }
    }
    
    // Parse location
    let location = "";
    if (locationMatch) {
      location = (locationMatch[1] || locationMatch[2] || "").trim();
    }
    
    return {
      title,
      date,
      startTime,
      endTime,
      location,
      notes: `Created via chatbot: ${userMessage}`
    };
  };

  // Parse date string manually to avoid timezone shifts
  const parseLocalDate = (dateStr) => {
    // Try various date formats: "20 Jan 2026", "Jan 20 2026", "2026-01-20", "01/20/2026"
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    
    // Format: "20 Jan 2026" or "Jan 20 2026"
    const monthTextMatch = dateStr.match(/(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})/i) ||
                           dateStr.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{1,2}),?\s+(\d{4})/i);
    
    if (monthTextMatch) {
      let day, month, year;
      if (/^\d/.test(monthTextMatch[1])) {
        // "20 Jan 2026"
        day = parseInt(monthTextMatch[1], 10);
        month = monthNames.indexOf(monthTextMatch[2].toLowerCase());
        year = parseInt(monthTextMatch[3], 10);
      } else {
        // "Jan 20 2026"
        month = monthNames.indexOf(monthTextMatch[1].toLowerCase());
        day = parseInt(monthTextMatch[2], 10);
        year = parseInt(monthTextMatch[3], 10);
      }
      
      if (month >= 0 && day >= 1 && day <= 31 && year >= 1900) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
    
    // Format: "2026-01-20"
    const isoMatch = dateStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);
      if (year >= 1900 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
    
    // Format: "01/20/2026" or "1/20/2026"
    const slashMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (slashMatch) {
      const month = parseInt(slashMatch[1], 10);
      const day = parseInt(slashMatch[2], 10);
      const year = parseInt(slashMatch[3], 10);
      if (year >= 1900 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
    
    return null;
  };

  // Convert 12-hour time to 24-hour format
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.trim().split(/\s+/);
    let [hours, minutes] = time.split(":");
    
    if (!minutes) minutes = "00";
    
    if (modifier) {
      if (modifier.toUpperCase() === "PM" && hours !== "12") {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier.toUpperCase() === "AM" && hours === "12") {
        hours = "00";
      }
    }
    
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  // Extract session data from bot reply (new format for SAVE_TO_CALENDAR_NOW)
  const extractSessionDataFromBotReply = (botReply, userMessage) => {
    let title = "Study Session";
    let date = new Date().toISOString().split("T")[0];
    let startTime = "10:00";
    let endTime = "12:00";
    let location = "";
    let notes = "";

    // Extract Title: ...
    const titleMatch = botReply.match(/Title:\s*(.+?)(?:\n|$)/i);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }

    // Extract Date: ...
    const dateMatch = botReply.match(/Date:\s*(.+?)(?:\n|$)/i);
    if (dateMatch) {
      const dateStr = dateMatch[1].trim();
      // Manually parse date to avoid timezone shifts
      const parsedDate = parseLocalDate(dateStr);
      if (parsedDate) {
        date = parsedDate;
      }
    }

    // Extract Time: ... – ... or Time: ... to ...
    const timeMatch = botReply.match(/Time:\s*(.+?)\s*(?:–|-|to)\s*(.+?)(?:\n|$)/i);
    if (timeMatch) {
      startTime = convertTo24Hour(timeMatch[1].trim());
      endTime = convertTo24Hour(timeMatch[2].trim());
    }

    // Extract Location: ...
    const locationMatch = botReply.match(/Location:\s*(.+?)(?:\n|$)/i);
    if (locationMatch) {
      location = locationMatch[1].trim();
    }

    // Extract Notes: ...
    const notesMatch = botReply.match(/Notes:\s*(.+?)(?:\n|$)/i);
    if (notesMatch) {
      notes = notesMatch[1].trim();
    }

    return {
      title,
      date,
      startTime,
      endTime,
      location,
      notes: notes || `Created via chatbot: ${userMessage}`
    };
  };

  // Helper function to get user-specific chat history key
  const getChatHistoryKey = () => {
    const profile = JSON.parse(localStorage.getItem("studyconnect_profile") || "{}");
    const userEmail = profile.email || "guest";
    return `studyconnect_chat_history_${userEmail}`;
  };

  const initChatbotUI = () => {
    if (window.__chatbotInitialized) {
      console.log("[chatbot] already initialized");
      return;
    }
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

    if (!toggle || !widget || !messages || !input || !sendBtn) {
      console.error("[chatbot] Missing required elements");
      return;
    }

    // Load chat history from localStorage
    const loadChatHistory = () => {
      const key = getChatHistoryKey();
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    };

    // Save chat history to localStorage
    const saveChatHistory = (history) => {
      const key = getChatHistoryKey();
      localStorage.setItem(key, JSON.stringify(history));
    };

    // Restore persisted chat history to DOM on init
    const restorePersistedChat = () => {
      const history = loadChatHistory();
      history.forEach((msg) => {
        // Check if this is a bot message with SAVE_TO_CALENDAR_NOW trigger
        if (msg.role === "assistant" && msg.content.includes("SAVE_TO_CALENDAR_NOW")) {
          // Remove the trigger text from display
          const displayContent = msg.content.replace("SAVE_TO_CALENDAR_NOW", "").trim();
          
          // Extract session data from the message
          const sessionData = extractSessionDataFromBotReply(displayContent, "");
          
          // Create a special chat bubble with button
          const bubble = document.createElement("div");
          bubble.className = "chat-bubble bot";
          
          // Display the message text
          const msgDiv = document.createElement("div");
          msgDiv.textContent = displayContent;
          bubble.appendChild(msgDiv);
          
          // Create the "Add to Calendar" button
          const btn = document.createElement("button");
          btn.className = "chat-action-btn";
          btn.textContent = "Add to Calendar 📅";
          btn.style.marginTop = "12px";
          btn.style.padding = "8px 16px";
          btn.style.backgroundColor = "#6366f1";
          btn.style.color = "white";
          btn.style.border = "none";
          btn.style.borderRadius = "6px";
          btn.style.cursor = "pointer";
          btn.style.fontSize = "14px";
          btn.style.fontWeight = "600";
          btn.style.transition = "background-color 0.2s";
          
          btn.addEventListener("mouseover", () => {
            btn.style.backgroundColor = "#4f46e5";
          });
          btn.addEventListener("mouseout", () => {
            btn.style.backgroundColor = "#6366f1";
          });
          
          btn.addEventListener("click", () => {
            // Save to localStorage with unique ID
            const existingSessions = JSON.parse(localStorage.getItem("studyconnect_sessions") || "[]");
            sessionData.id = Date.now().toString();
            existingSessions.push(sessionData);
            localStorage.setItem("studyconnect_sessions", JSON.stringify(existingSessions));
            
            // Show toast
            showToast("Saved to calendar ✅");
            
            // Redirect to calendar after a short delay
            setTimeout(() => {
              window.location.href = "calendar.html";
            }, 500);
          });
          
          bubble.appendChild(btn);
          messages.appendChild(bubble);
          messages.scrollTop = messages.scrollHeight;
        } else {
          // Regular message without special trigger
          appendChatMessage(messages, msg.role, msg.content);
        }
      });
    };

    // Get current chat history from localStorage
    const getChatHistory = () => {
      return loadChatHistory();
    };

    // Clear chat history for current user
    const clearChatHistory = () => {
      const key = getChatHistoryKey();
      localStorage.removeItem(key);
      messages.innerHTML = "";
      showToast("Chat cleared ✅");
    };

    // Add Clear Chat button event listener if it exists
    const clearChatBtn = document.getElementById("clearChatBtn");
    if (clearChatBtn) {
      clearChatBtn.addEventListener("click", clearChatHistory);
    }

    // Clean markdown syntax from bot replies
    const cleanMarkdown = (text) => {
      // Remove **bold** markdown
      let cleaned = text.replace(/\*\*(.+?)\*\*/g, '$1');
      // Remove leftover single asterisks
      cleaned = cleaned.replace(/\*/g, '');
      return cleaned;
    };

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text) return;
      
      // Prevent double-send by disabling button
      sendBtn.disabled = true;
      sendBtn.style.opacity = "0.5";
      sendBtn.style.cursor = "not-allowed";
      
      // Append user message to UI
      appendChatMessage(messages, "user", text);
      input.value = "";
      
      // Show typing indicator immediately (no delay)
      showTypingIndicator(messages);
      
      try {
        // Call Flowise API with just the question
        const result = await query({ question: text });
        removeTypingIndicator(messages);
        
        // Log raw response for debugging
        console.log("FLOWISE RAW RESULT:", result);
        
        // Extract bot reply - check ALL possible fields
        const botReply = 
          result?.text ||
          result?.answer ||
          result?.response ||
          result?.data?.text ||
          result?.data?.answer ||
          result?.data?.response ||
          result?.message ||
          "";
        
        // If still empty, show error message
        if (!botReply || botReply.trim() === "") {
          appendChatMessage(messages, "bot", "Flowise returned empty response.");
          
          // Save to chat history
          const history = getChatHistory();
          history.push({ role: "user", content: text });
          history.push({ role: "assistant", content: "Flowise returned empty response." });
          saveChatHistory(history);
          return;
        }
        
        // Clean markdown syntax from bot reply
        const cleanedBotReply = cleanMarkdown(botReply);
        
        // Check if reply contains SAVE_TO_CALENDAR_NOW trigger
        if (cleanedBotReply.includes("SAVE_TO_CALENDAR_NOW")) {
          // Remove the trigger text from display
          const displayReply = cleanedBotReply.replace("SAVE_TO_CALENDAR_NOW", "").trim();
          
          // Extract session data from the bot reply
          const sessionData = extractSessionDataFromBotReply(displayReply, text);
          
          // Create a special chat bubble with button
          const bubble = document.createElement("div");
          bubble.className = "chat-bubble bot";
          
          // Display the message text
          const msgDiv = document.createElement("div");
          msgDiv.style.whiteSpace = "pre-wrap";
          msgDiv.textContent = displayReply;
          bubble.appendChild(msgDiv);
          
          // Create the "Add to Calendar" button
          const btn = document.createElement("button");
          btn.className = "chat-action-btn";
          btn.textContent = "Add to Calendar 📅";
          btn.style.marginTop = "12px";
          btn.style.padding = "8px 16px";
          btn.style.backgroundColor = "#6366f1";
          btn.style.color = "white";
          btn.style.border = "none";
          btn.style.borderRadius = "6px";
          btn.style.cursor = "pointer";
          btn.style.fontSize = "14px";
          btn.style.fontWeight = "600";
          btn.style.transition = "background-color 0.2s";
          
          btn.addEventListener("mouseover", () => {
            btn.style.backgroundColor = "#4f46e5";
          });
          btn.addEventListener("mouseout", () => {
            btn.style.backgroundColor = "#6366f1";
          });
          
          btn.addEventListener("click", () => {
            // Save to localStorage with unique ID
            const existingSessions = JSON.parse(localStorage.getItem("studyconnect_sessions") || "[]");
            sessionData.id = Date.now().toString();
            existingSessions.push(sessionData);
            localStorage.setItem("studyconnect_sessions", JSON.stringify(existingSessions));
            
            // Show toast
            showToast("Saved to calendar ✅");
            
            // Redirect to calendar after a short delay
            setTimeout(() => {
              window.location.href = "calendar.html";
            }, 500);
          });
          
          bubble.appendChild(btn);
          messages.appendChild(bubble);
          messages.scrollTop = messages.scrollHeight;
        } else {
          // Display normal bot reply (cleaned)
          appendChatMessage(messages, "bot", cleanedBotReply);
        }
        
        // Re-enable send button
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
        sendBtn.style.cursor = "pointer";
        
        // Save to chat history (save cleaned version)
        const history = getChatHistory();
        history.push({ role: "user", content: text });
        history.push({ role: "assistant", content: cleanedBotReply });
        saveChatHistory(history);
        
      } catch (error) {
        removeTypingIndicator(messages);
        
        // Re-enable send button
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
        sendBtn.style.cursor = "pointer";
        
        // Show the real error message instead of generic fallback
        const errorMessage = error?.message || String(error) || "Unknown error occurred";
        console.error("Flowise API error:", error);
        appendChatMessage(messages, "bot", `Error: ${errorMessage}`);
      }
    };

    toggle.addEventListener("click", () => {
      console.log("[chatbot] toggle click");
      widget.classList.toggle("open");
      toggle.classList.toggle("open");
      if (widget.classList.contains("open")) {
        console.log("[chatbot] widget opened");
        input.focus();
        // Show welcome message only once (persisted in localStorage)
        if (!localStorage.getItem("chatbot_welcome_shown")) {
          appendChatMessage(messages, "bot", "Hi! I'm your Study Connect assistant. How can I help you today?");
          localStorage.setItem("chatbot_welcome_shown", "true");
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

    // Restore persisted chat history from localStorage on init
    restorePersistedChat();

    // Mark as initialized to avoid duplicate bindings
    window.__chatbotInitialized = true;
  };

  // Expose for optional explicit calls from pages
  window.initChatbotUI = initChatbotUI;

  // Clear chat history
  window.clearChatHistory = function() {
    localStorage.removeItem("studyconnect_chat_history");
    localStorage.removeItem("chatbot_welcome_shown");
    const messages = document.getElementById("chatMessages");
    if (messages) {
      messages.innerHTML = "";
      appendChatMessage(messages, "bot", "Hi! I'm your Study Connect assistant. How can I help you today?");
      localStorage.setItem("chatbot_welcome_shown", "true");
    }
    showToast("Chat history cleared!");
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

  // Fallback: ensure chatbot initializes after full page load
  window.addEventListener("load", () => {
    try {
      initChatbotUI();
    } catch (e) {
      console.error("[chatbot] load init error", e);
    }
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

  // Enhanced dashboard initialization with partners data - SINGLE SOURCE OF TRUTH
  window.initDashboardWithPartners = async function() {
    // Call original dashboard init
    window.initDashboard();

    const studentsGrid = document.getElementById("studentsGrid");
    const paginationControls = document.getElementById("paginationControls");
    const paginationPages = document.getElementById("paginationPages");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");

    if (!studentsGrid) return;

    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;
    let allPartners = [];
    let filteredPartners = [];

    try {
      const response = await fetch("data/study-partners.json");
      allPartners = await response.json();

      const renderPagination = (totalItems) => {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        if (totalPages <= 1) {
          paginationControls.style.display = "none";
          return;
        }

        paginationControls.style.display = "flex";
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;

        paginationPages.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
          const pageBtn = document.createElement("button");
          pageBtn.className = `pagination-page ${i === currentPage ? "active" : ""}`;
          pageBtn.textContent = i;
          pageBtn.addEventListener("click", () => {
            currentPage = i;
            renderPartners();
          });
          paginationPages.appendChild(pageBtn);
        }
      };

      const renderPartners = () => {
        if (filteredPartners.length === 0) {
          studentsGrid.innerHTML = '<div class="empty-state"><p>No study partners found matching your filters.</p></div>';
          paginationControls.style.display = "none";
          return;
        }

        const totalPages = Math.ceil(filteredPartners.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) currentPage = 1;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const partnersToDisplay = filteredPartners.slice(startIndex, endIndex);

        const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
        const favourites = JSON.parse(localStorage.getItem("studyconnect_favourites") || "[]");

        studentsGrid.innerHTML = partnersToDisplay
          .map(partner => {
            const isConnected = connections.some(c => c.id === partner.id);
            const isFavourite = favourites.includes(partner.id);

            return `
              <div class="student-card" data-partner-id="${partner.id}">
                <div class="student-header">
                  <div class="student-id" style="color: #26a65b; font-weight: 600;">${partner.name}</div>
                  <div class="student-badge">${partner.id}</div>
                </div>
                <div class="student-info">
                  <div class="student-info-item"><span class="student-info-label">School:</span> ${partner.school}</div>
                  <div class="student-info-item"><span class="student-info-label">Course:</span> ${partner.diploma}</div>
                </div>
                <div class="student-interests">
                  ${partner.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join("")}
                </div>
                <div class="student-action">
                  <button class="connect-btn ${isConnected ? 'connected' : ''}" data-partner-id="${partner.id}" data-partner-name="${partner.name}">
                    ${isConnected ? 'Message' : 'Connect'}
                  </button>
                </div>
              </div>
            `;
          })
          .join("");

        // Wire up button events
        document.querySelectorAll(".connect-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const partnerId = btn.getAttribute("data-partner-id");
            const partnerName = btn.getAttribute("data-partner-name");
            const partner = allPartners.find(p => p.id === partnerId);
            const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
            const isConnected = connections.some(c => c.id === partnerId);
            
            if (isConnected) {
              // Already connected, go to messages
              localStorage.setItem("selectedPartner", JSON.stringify({
                id: partnerId,
                name: partnerName,
                school: partner.school,
                diploma: partner.diploma,
                interests: partner.interests
              }));
              window.location.href = "messages.html";
            } else {
              // First click - connect
              connections.push({
                id: partnerId,
                name: partnerName,
                date: new Date().toISOString()
              });
              localStorage.setItem("studyconnect_connections", JSON.stringify(connections));
              
              // Change button text to Message
              btn.textContent = "Message";
              btn.classList.add("connected");
              showToast(`Connected with ${partnerName}! Click Message to start chatting.`);
            }
          });
        });

        renderPagination(filteredPartners.length);
      };

      const applyFilters = () => {
        const schoolValue = document.getElementById("filterSchool")?.value || "";
        const interestValue = document.getElementById("filterInterest")?.value || "";

        filteredPartners = allPartners.filter(partner => {
          const schoolMatch = !schoolValue || partner.school === schoolValue;
          const interestMatch = !interestValue || partner.interests.includes(interestValue);
          return schoolMatch && interestMatch;
        });

        currentPage = 1;
        renderPartners();
      };

      // Wire filters
      const filterSchool = document.getElementById("filterSchool");
      const filterInterest = document.getElementById("filterInterest");
      const resetBtn = document.getElementById("resetFiltersBtn");

      if (filterSchool) filterSchool.addEventListener("change", applyFilters);
      if (filterInterest) filterInterest.addEventListener("change", applyFilters);
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (filterSchool) filterSchool.value = "";
          if (filterInterest) filterInterest.value = "";
          applyFilters();
        });
      }

      // Wire pagination buttons
      if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            renderPartners();
          }
        });
      }

      if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
          const totalPages = Math.ceil(filteredPartners.length / ITEMS_PER_PAGE);
          if (currentPage < totalPages) {
            currentPage++;
            renderPartners();
          }
        });
      }

      // Initial render
      filteredPartners = [...allPartners];
      renderPartners();

    } catch (error) {
      console.error("Error loading partners:", error);
      studentsGrid.innerHTML = '<div class="empty-state"><p>Error loading study partners. Please try again later.</p></div>';
    }

    // Initialize chatbot after all DOM elements are ready
    initChatbotUI();
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

        // Only display up to 6 requests at a time
        const displayRequests = filteredRequests.slice(0, 6);

        requestsGrid.innerHTML = displayRequests.map(req => {
          const requestStatus = sessionRequests[req.id];
          let buttonHTML = '';
          
          if (req.isUserCreated && req.author === profile.name) {
            buttonHTML = '<button class="connect-btn requested" disabled>Your Session</button>';
          } else if (requestStatus === 'requested') {
            buttonHTML = '<button class="connect-btn requested" disabled>Requested</button>';
          } else if (requestStatus === 'joined') {
            buttonHTML = '<button class="connect-btn requested" disabled>Joined ✓</button>';
          } else {
            buttonHTML = `<button class="connect-btn" data-request-id="${req.id}">Connect</button>`;
          }

          return `
            <div class="student-card" data-request-id="${req.id}">
              <div class="student-header">
                <div class="student-id" style="color: #26a65b; font-weight: 600;">${req.title}</div>
                <div class="student-badge">${req.date}</div>
              </div>
              <div class="student-info">
                <div class="student-info-item"><span class="student-info-label">By:</span> ${req.author}</div>
                <div class="student-info-item"><span class="student-info-label">Course:</span> ${req.diploma}</div>
                <div class="student-info-item"><span class="student-info-label">When:</span> ${req.date} · ${req.time}</div>
                <div class="student-info-item"><span class="student-info-label">Location:</span> ${req.location}</div>
                <div class="student-info-item"><span class="student-info-label">Participants:</span> ${req.participants}</div>
              </div>
              <div class="student-interests">
                ${req.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join("")}
              </div>
              <div class="student-action">
                ${buttonHTML}
              </div>
            </div>
          `;
        }).join("");

        // Add event listeners to Request to Join buttons
        document.querySelectorAll(".connect-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const requestId = e.target.getAttribute("data-request-id");
            handleRequestToJoin(requestId, allRequests);
            // Immediate visual feedback
            e.target.classList.add('requested');
            e.target.textContent = 'Requested';
            e.target.disabled = true;
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

  // Initialize Messaging Page
  window.initMessages = () => {
    const partnerNameEl = document.getElementById("partnerName");
    const partnerSchoolEl = document.getElementById("partnerSchool");
    const chatContentEl = document.getElementById("chatContent");
    const messageInputEl = document.getElementById("messageInput");
    const sendButtonEl = document.getElementById("sendMessageBtn");
    const conversationsListEl = document.getElementById("conversationsList");

    let currentPartnerId = null;
    let currentPartner = null;

    // Load all conversations from connections
    const loadConversations = () => {
      const connections = JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
      
      if (connections.length === 0) {
        conversationsListEl.innerHTML = '<p style="padding: 16px; text-align: center; color: #9ca3af;">No conversations yet</p>';
        return;
      }

      conversationsListEl.innerHTML = connections.map(conn => `
        <div class="conversation-item ${currentPartnerId === conn.id ? 'active' : ''}" data-partner-id="${conn.id}" data-partner-name="${conn.name}">
          <p class="conversation-name">${conn.name}</p>
          <p class="conversation-preview">Click to chat...</p>
        </div>
      `).join("");

      // Wire conversation clicks
      document.querySelectorAll(".conversation-item").forEach(item => {
        item.addEventListener("click", () => {
          currentPartnerId = item.getAttribute("data-partner-id");
          const partnerName = item.getAttribute("data-partner-name");
          
          // Find full partner data
          currentPartner = connections.find(c => c.id === currentPartnerId);
          
          // Update active state
          document.querySelectorAll(".conversation-item").forEach(i => i.classList.remove("active"));
          item.classList.add("active");
          
          // Load conversation
          loadConversation(currentPartnerId, partnerName);
        });
      });

      // Load first conversation by default
      if (connections.length > 0) {
        const firstConn = connections[0];
        currentPartnerId = firstConn.id;
        currentPartner = firstConn;
        loadConversation(firstConn.id, firstConn.name);
        document.querySelector(".conversation-item").classList.add("active");
      }
    };

    // Load conversation with a specific partner
    const loadConversation = (partnerId, partnerName) => {
      const messagesKey = `studyconnect_messages_${partnerId}`;
      const messages = JSON.parse(localStorage.getItem(messagesKey) || "[]");
      
      if (partnerNameEl) partnerNameEl.textContent = partnerName;
      if (partnerSchoolEl && currentPartner) {
        partnerSchoolEl.textContent = `${currentPartner.school || ''} • ${currentPartner.diploma || 'Study Partner'}`;
      }
      
      displayMessages(messages);
    };

    const displayMessages = (messages) => {
      chatContentEl.innerHTML = messages.map(msg => `
        <div class="chat-message ${msg.sender === 'user' ? 'user' : 'partner'}">
          <div class="message-content">
            <p>${msg.text}</p>
            <span class="message-time">${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      `).join("");
      
      // Scroll to bottom
      chatContentEl.scrollTop = chatContentEl.scrollHeight;
    };

    // Generate intelligent response based on user message
    const generateResponse = (userMessage) => {
      const msg = userMessage.toLowerCase().trim();
      
      // Greeting responses
      if (msg.match(/^(hi|hello|hey|hii|hiii|yo|sup)[\s!]*$/)) {
        return "Hi there! How are you doing? 😊";
      }
      
      if (msg.match(/how are you|how r you|how r u|how've you been|hows it going|whats up/)) {
        return "I'm doing great, thanks for asking! Ready to study together?";
      }

      // Time/Schedule questions
      if (msg.match(/when|what time|are you free|available|schedule|can we meet/)) {
        return "I'm pretty flexible with timing! What works best for you? Morning, afternoon, or evening?";
      }

      // Location/Meeting place
      if (msg.match(/where|meet|location|place|online|video call|zoom/)) {
        return "We could meet at the library or do an online session via Zoom - whatever is more convenient for you!";
      }

      // Study subject/topic
      if (msg.match(/subject|topic|course|study|focus on|what.*learn|exam|test/)) {
        return "I'm keen on learning more! What subject or topic would you like to focus on?";
      }

      // Thanks/Gratitude
      if (msg.match(/thanks|thank you|thx|appreciate|cheers/)) {
        return "You're very welcome! Happy to help! 😊";
      }

      // Agreement/Positive responses
      if (msg.match(/^(ok|okay|sure|sounds good|great|awesome|perfect|yes|yep|yup|cool|nice)[\s!]*$/)) {
        return "Awesome! Looking forward to studying with you! 📚";
      }

      // Farewell
      if (msg.match(/bye|goodbye|see you|catch you|talk later|gotta go|ttyl/)) {
        return "See you later! Good luck with your studies! 👋";
      }

      // Questions (ending with ?)
      if (msg.includes("?")) {
        const questionResponses = [
          "That's a great question! I'd love to discuss that with you.",
          "Hmm, let me think about that... Good point!",
          "That's something we should definitely cover when we study together!",
          "I've been wondering about that too! Let's work through it together."
        ];
        return questionResponses[Math.floor(Math.random() * questionResponses.length)];
      }

      // Default contextual responses
      const defaultResponses = [
        "I totally agree! When do you want to start?",
        "Sounds good to me! What's your next step?",
        "Yeah, I'm interested in that too!",
        "Let's make that happen! I'm ready when you are.",
        "Absolutely! That would be really helpful."
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    // Send message functionality
    const sendMessage = () => {
      if (!currentPartnerId) {
        showToast("Please select a conversation first");
        return;
      }

      const text = messageInputEl.value.trim();
      if (!text) return;

      const messagesKey = `studyconnect_messages_${currentPartnerId}`;
      const messages = JSON.parse(localStorage.getItem(messagesKey) || "[]");

      // Add user message
      const newMessage = {
        sender: 'user',
        text: text,
        timestamp: new Date().toISOString()
      };

      messages.push(newMessage);
      localStorage.setItem(messagesKey, JSON.stringify(messages));
      messageInputEl.value = "";
      displayMessages(messages);

      // Simulate partner response after 1 second
      setTimeout(() => {
        const partnerResponse = generateResponse(text);
        const partnerMessage = {
          sender: 'partner',
          text: partnerResponse,
          timestamp: new Date().toISOString()
        };

        messages.push(partnerMessage);
        localStorage.setItem(messagesKey, JSON.stringify(messages));
        displayMessages(messages);
      }, 800);
    };

    sendButtonEl.addEventListener("click", sendMessage);
    messageInputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "login.html";
      });
    }

    // Load conversations on page load
    loadConversations();

    // Check for selectedPartner from dashboard click
    const selectedPartnerData = localStorage.getItem("selectedPartner");
    if (selectedPartnerData) {
      const partner = JSON.parse(selectedPartnerData);
      currentPartnerId = partner.id;
      currentPartner = partner;
      loadConversation(partner.id, partner.name);
      
      // Update active state in list
      const item = document.querySelector(`[data-partner-id="${partner.id}"]`);
      if (item) {
        document.querySelectorAll(".conversation-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      }
      
      // Clear selectedPartner from localStorage
      localStorage.removeItem("selectedPartner");
    }
  };

  // Initialize Calendar Page
  window.initCalendar = () => {
    const createSessionBtn = document.getElementById("createSessionBtn");
    const sessionModal = document.getElementById("sessionModal");
    const sessionDetailsModal = document.getElementById("sessionDetailsModal");
    const sessionForm = document.getElementById("sessionForm");
    const cancelBtn = document.getElementById("cancelBtn");
    const closeModal = document.getElementById("closeModal");
    const closeDetailsModal = document.getElementById("closeDetailsModal");
    const closeDetailsBtn = document.getElementById("closeDetailsBtn");
    const listViewBtn = document.getElementById("listViewBtn");
    const calendarViewBtn = document.getElementById("calendarViewBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    let currentEditingSessionId = null;
    let currentDate = new Date();

    // Get all study sessions from localStorage
    const getSessions = () => {
      return JSON.parse(localStorage.getItem("studyconnect_sessions") || "[]");
    };

    // Save sessions to localStorage
    const saveSessions = (sessions) => {
      localStorage.setItem("studyconnect_sessions", JSON.stringify(sessions));
    };

    // Get all connected partners
    const getPartners = () => {
      return JSON.parse(localStorage.getItem("studyconnect_connections") || "[]");
    };

    // Populate partner dropdown
    const populatePartnerDropdown = () => {
      const partners = getPartners();
      const partnerSelect = document.getElementById("sessionPartner");
      const currentValue = partnerSelect.value;
      
      partnerSelect.innerHTML = '<option value="">Select a partner...</option>';
      partners.forEach(partner => {
        const option = document.createElement("option");
        option.value = partner.id;
        option.textContent = partner.name;
        partnerSelect.appendChild(option);
      });
      
      partnerSelect.value = currentValue;
    };

    // Format date for display
    const formatDate = (dateString) => {
      return new Date(dateString + "T00:00").toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };

    // Check if date is today
    const isToday = (dateString) => {
      const today = new Date().toISOString().split('T')[0];
      return dateString === today;
    };

    // Check if date is in the past
    const isPast = (dateString, timeString) => {
      const now = new Date();
      const sessionDateTime = new Date(dateString + "T" + timeString);
      return sessionDateTime < now;
    };

    // Render sessions list view
    const renderListView = () => {
      const sessions = getSessions();
      const sessionsList = document.getElementById("sessionsList");
      
      if (sessions.length === 0) {
        sessionsList.innerHTML = '<div class="empty-state"><p>No study sessions scheduled yet. Create one to get started!</p></div>';
        return;
      }

      // Sort by date
      sessions.sort((a, b) => new Date(a.date + "T" + a.startTime) - new Date(b.date + "T" + b.startTime));

      sessionsList.innerHTML = sessions.map(session => `
        <div class="session-card ${isPast(session.date, session.endTime) ? 'past' : ''}" data-session-id="${session.id}">
          <div class="session-time">${formatDate(session.date)} • ${session.startTime} - ${session.endTime}</div>
          <div class="session-title">${session.title}</div>
          <div class="session-meta">
            ${session.location ? `<div class="session-meta-item"><strong>📍</strong> ${session.location}</div>` : ''}
            ${session.partner ? `<div class="session-meta-item"><strong>👤</strong> ${session.partner}</div>` : ''}
          </div>
          ${session.notes ? `<div class="session-notes">"${session.notes}"</div>` : ''}
        </div>
      `).join("");

      // Add click listeners
      document.querySelectorAll(".session-card").forEach(card => {
        card.addEventListener("click", () => {
          const sessionId = card.getAttribute("data-session-id");
          showSessionDetails(sessionId);
        });
      });
    };

    // Render calendar view
    const renderCalendarView = () => {
      const sessions = getSessions();
      const calendarGrid = document.getElementById("calendarGrid");
      const currentMonth = document.getElementById("currentMonth");

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      currentMonth.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      // Create day labels
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      calendarGrid.innerHTML = dayLabels.map(day => `<div class="calendar-day-label">${day}</div>`).join("");

      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      // Add previous month's days
      for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarGrid.innerHTML += `<div class="calendar-day other-month">${day}</div>`;
      }

      // Add current month's days
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const today = new Date().toISOString().split('T')[0];
        const daySessions = sessions.filter(s => s.date === dateStr);
        const hasSessions = daySessions.length > 0;
        const isCurrentDay = dateStr === today;

        calendarGrid.innerHTML += `
          <div class="calendar-day ${isCurrentDay ? 'today' : ''} ${hasSessions ? 'has-sessions' : ''}" data-date="${dateStr}">
            <div class="day-number">${day}</div>
            ${hasSessions ? `<div class="session-indicators">${'•'.repeat(Math.min(daySessions.length, 3))}</div>` : ''}
          </div>
        `;
      }

      // Add next month's days
      const totalCells = calendarGrid.children.length;
      const remainingCells = 42 - totalCells; // 6 rows * 7 days
      for (let day = 1; day <= remainingCells; day++) {
        calendarGrid.innerHTML += `<div class="calendar-day other-month">${day}</div>`;
      }

      // Add click listeners to calendar days
      document.querySelectorAll(".calendar-day:not(.other-month)").forEach(dayEl => {
        dayEl.addEventListener("click", () => {
          const dateStr = dayEl.getAttribute("data-date");
          const daySessions = sessions.filter(s => s.date === dateStr);
          
          if (daySessions.length > 0) {
            // Show the first session's details (or can be enhanced to show a list)
            showSessionDetails(daySessions[0].id);
          } else {
            openCreateSessionModal(dateStr);
          }
        });
      });
    };

    // Open create session modal
    const openCreateSessionModal = (prefillDate = null) => {
      currentEditingSessionId = null;
      document.getElementById("modalTitle").textContent = "Create Study Session";
      document.getElementById("submitBtn").textContent = "Create Session";
      sessionForm.reset();

      if (prefillDate) {
        document.getElementById("sessionDate").value = prefillDate;
      } else {
        document.getElementById("sessionDate").value = new Date().toISOString().split('T')[0];
      }

      sessionModal.classList.add("active");
      populatePartnerDropdown();
    };

    // Show session details
    const showSessionDetails = (sessionId) => {
      const sessions = getSessions();
      const session = sessions.find(s => s.id === sessionId);
      
      if (!session) return;

      const detailsTitle = document.getElementById("detailsTitle");
      const sessionDetails = document.getElementById("sessionDetails");

      detailsTitle.textContent = session.title;
      sessionDetails.innerHTML = `
        <div class="detail-item">
          <span class="detail-label">Date</span>
          <span class="detail-value">${formatDate(session.date)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Time</span>
          <span class="detail-value">${session.startTime} - ${session.endTime}</span>
        </div>
        ${session.location ? `
          <div class="detail-item">
            <span class="detail-label">Location</span>
            <span class="detail-value">${session.location}</span>
          </div>
        ` : ''}
        ${session.partner ? `
          <div class="detail-item">
            <span class="detail-label">Partner</span>
            <span class="detail-value">${session.partner}</span>
          </div>
        ` : ''}
        ${session.notes ? `
          <div class="detail-item">
            <span class="detail-label">Notes</span>
            <span class="detail-value">${session.notes}</span>
          </div>
        ` : ''}
      `;

      // Set up edit and delete buttons
      document.getElementById("editSessionBtn").onclick = () => {
        editSession(sessionId);
      };

      document.getElementById("deleteSessionBtn").onclick = () => {
        if (confirm("Are you sure you want to delete this session?")) {
          deleteSession(sessionId);
        }
      };

      sessionDetailsModal.classList.add("active");
    };

    // Edit session
    const editSession = (sessionId) => {
      const sessions = getSessions();
      const session = sessions.find(s => s.id === sessionId);
      
      if (!session) return;

      currentEditingSessionId = sessionId;
      document.getElementById("modalTitle").textContent = "Edit Study Session";
      document.getElementById("submitBtn").textContent = "Save Changes";

      document.getElementById("sessionTitle").value = session.title;
      document.getElementById("sessionDate").value = session.date;
      document.getElementById("sessionStartTime").value = session.startTime;
      document.getElementById("sessionEndTime").value = session.endTime;
      document.getElementById("sessionLocation").value = session.location || "";
      document.getElementById("sessionPartner").value = session.partnerId || "";
      document.getElementById("sessionNotes").value = session.notes || "";

      sessionDetailsModal.classList.remove("active");
      sessionModal.classList.add("active");
      populatePartnerDropdown();
    };

    // Delete session
    const deleteSession = (sessionId) => {
      const sessions = getSessions();
      const updatedSessions = sessions.filter(s => s.id !== sessionId);
      saveSessions(updatedSessions);
      showToast("Session deleted");
      sessionDetailsModal.classList.remove("active");
      renderListView();
      renderCalendarView();
    };

    // Handle form submission
    sessionForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("sessionTitle").value;
      const date = document.getElementById("sessionDate").value;
      const startTime = document.getElementById("sessionStartTime").value;
      const endTime = document.getElementById("sessionEndTime").value;
      const location = document.getElementById("sessionLocation").value;
      const partnerId = document.getElementById("sessionPartner").value;
      const notes = document.getElementById("sessionNotes").value;

      if (!title || !date || !startTime || !endTime) {
        showToast("Please fill in all required fields");
        return;
      }

      if (startTime >= endTime) {
        showToast("End time must be after start time");
        return;
      }

      let sessions = getSessions();
      const partnerName = partnerId ? document.querySelector(`#sessionPartner option[value="${partnerId}"]`).textContent : "";

      if (currentEditingSessionId) {
        // Update existing session
        const index = sessions.findIndex(s => s.id === currentEditingSessionId);
        if (index > -1) {
          sessions[index] = {
            ...sessions[index],
            title,
            date,
            startTime,
            endTime,
            location,
            partnerId,
            partner: partnerName,
            notes
          };
          showToast("Session updated");
        }
      } else {
        // Create new session
        const newSession = {
          id: Date.now().toString(),
          title,
          date,
          startTime,
          endTime,
          location,
          partnerId,
          partner: partnerName,
          notes,
          createdAt: new Date().toISOString()
        };
        sessions.push(newSession);
        showToast("Session created successfully!");
      }

      saveSessions(sessions);
      sessionModal.classList.remove("active");
      renderListView();
      renderCalendarView();
    });

    // Event listeners
    createSessionBtn.addEventListener("click", () => openCreateSessionModal());
    cancelBtn.addEventListener("click", () => sessionModal.classList.remove("active"));
    closeModal.addEventListener("click", () => sessionModal.classList.remove("active"));
    closeDetailsModal.addEventListener("click", () => sessionDetailsModal.classList.remove("active"));
    closeDetailsBtn.addEventListener("click", () => sessionDetailsModal.classList.remove("active"));

    listViewBtn.addEventListener("click", () => {
      document.getElementById("listView").classList.add("active");
      document.getElementById("calendarView").classList.remove("active");
      listViewBtn.classList.add("active");
      calendarViewBtn.classList.remove("active");
      renderListView();
    });

    calendarViewBtn.addEventListener("click", () => {
      document.getElementById("calendarView").classList.add("active");
      document.getElementById("listView").classList.remove("active");
      calendarViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      renderCalendarView();
    });

    document.getElementById("prevMonth").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendarView();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendarView();
    });

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "login.html";
      });
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === sessionModal) {
        sessionModal.classList.remove("active");
      }
      if (e.target === sessionDetailsModal) {
        sessionDetailsModal.classList.remove("active");
      }
    });

    // Initial render
    renderListView();
  };

  // Helper: Save session to localStorage (same key as calendar)
  const saveSessionToLocalStorage = (session) => {
    try {
      const sessions = JSON.parse(localStorage.getItem("studyconnect_sessions") || "[]");
      
      const newSession = {
        id: Date.now().toString(),
        title: session.title || "Study Session",
        date: session.date || new Date().toISOString().split("T")[0],
        startTime: session.startTime || "10:00",
        endTime: session.endTime || "12:00",
        location: session.location || "",
        partnerId: session.partnerId || "",
        partner: session.partner || "",
        notes: session.notes || "",
        createdAt: new Date().toISOString()
      };

      sessions.push(newSession);
      localStorage.setItem("studyconnect_sessions", JSON.stringify(sessions));
      
      // Success feedback + redirect window (800–1200ms)
      showToast("Saved ✅ Redirecting…");
      setTimeout(() => {
        window.location.href = "calendar.html";
      }, 1000);
      
      return newSession;
    } catch (err) {
      console.error("[chatbot] save session failed", err);
      // Do not show a fake saved message on failure
      return null;
    }
  };

  // Expose helper globally
  window.saveSessionToLocalStorage = saveSessionToLocalStorage;

  // Chatbot integration for calendar session creation
  window.createSessionFromChatbot = (sessionData) => {
    return saveSessionToLocalStorage(sessionData);
  };

})();
