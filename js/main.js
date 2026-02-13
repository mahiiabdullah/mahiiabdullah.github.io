// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    githubUsername: 'mahiiabdullah',
    typingWords: ['Full Stack Developer', 'Flutter Developer', 'Python Enthusiast', 'Problem Solver', 'Creative Coder'],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000
};

// ============================================
// PARTICLES CONFIGURATION
// ============================================
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#6366f1"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6366f1",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    cursor: document.querySelector('.cursor'),
    cursorFollower: document.querySelector('.cursor-follower'),
    navbar: document.querySelector('.navbar'),
    hamburger: document.getElementById('hamburger'),
    mobileMenu: document.getElementById('mobileMenu'),
    themeToggle: document.getElementById('themeToggle'),
    typingText: document.getElementById('typingText'),
    projectsGrid: document.getElementById('projectsGrid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
    contactForm: document.getElementById('contactForm'),
    statNumbers: document.querySelectorAll('.stat-number'),
    skillProgress: document.querySelectorAll('.skill-progress')
};

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
    
    // Initialize all features
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initCounterAnimation();
    initSkillsAnimation();
    loadGitHubProjects();
    initProjectFilters();
    initContactForm();
    initSmoothScroll();
});

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    if (!elements.cursor || !elements.cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse instantly
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        elements.cursor.style.left = cursorX + 'px';
        elements.cursor.style.top = cursorY + 'px';
        
        // Follower has delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        elements.cursorFollower.style.left = followerX + 'px';
        elements.cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            elements.cursor.classList.add('hover');
            elements.cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            elements.cursor.classList.remove('hover');
            elements.cursorFollower.classList.remove('hover');
        });
    });
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            elements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    elements.hamburger?.addEventListener('click', () => {
        elements.hamburger.classList.toggle('active');
        elements.mobileMenu.classList.toggle('active');
        document.body.style.overflow = elements.mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    elements.mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            elements.hamburger.classList.remove('active');
            elements.mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    elements.themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = elements.themeToggle?.querySelector('i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    if (!elements.typingText) return;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = CONFIG.typingWords[wordIndex];
        
        if (isDeleting) {
            elements.typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            elements.typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = CONFIG.pauseDuration;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % CONFIG.typingWords.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skill-card, .contact-content, .highlight');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    elements.statNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ============================================
// SKILLS ANIMATION
// ============================================
function initSkillsAnimation() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    elements.skillProgress.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ============================================
// GITHUB PROJECTS
// ============================================
async function loadGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        
        const repos = await response.json();
        displayProjects(repos);
    } catch (error) {
        console.error('Error loading projects:', error);
        elements.projectsGrid.innerHTML = `
            <div class="loading-projects">
                <p>Unable to load projects. Please check back later.</p>
            </div>
        `;
    }
}

function displayProjects(repos) {
    // Filter out forked repos and the github.io repo
    const filteredRepos = repos.filter(repo => 
        !repo.fork && 
        !repo.name.includes('.github.io') &&
        repo.name !== 'Portfolio'
    );
    
    if (filteredRepos.length === 0) {
        elements.projectsGrid.innerHTML = `
            <div class="loading-projects">
                <p>No projects found.</p>
            </div>
        `;
        return;
    }
    
    elements.projectsGrid.innerHTML = filteredRepos.map((repo, index) => {
        const description = repo.description || 'A project by Mahi Abdullah';
        const language = repo.language || 'Code';
        const icon = getLanguageIcon(language);
        const gradient = getLanguageGradient(language);
        
        return `
            <div class="project-card" data-language="${language}" style="animation-delay: ${index * 0.1}s">
                <div class="project-image" style="background: ${gradient}">
                    <i class="${icon}"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${formatProjectName(repo.name)}</h3>
                    <p class="project-description">${description}</p>
                    <div class="project-tags">
                        <span class="project-tag">${language}</span>
                        ${repo.stargazers_count > 0 ? `<span class="project-tag">⭐ ${repo.stargazers_count}</span>` : ''}
                        ${repo.forks_count > 0 ? `<span class="project-tag">🍴 ${repo.forks_count}</span>` : ''}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i>
                            View Code
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="project-link">
                                <i class="fas fa-external-link-alt"></i>
                                Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update project count in stats
    const projectCountEl = document.querySelector('.stat-number[data-target]');
    if (projectCountEl && projectCountEl.getAttribute('data-target') === '6') {
        projectCountEl.setAttribute('data-target', filteredRepos.length.toString());
    }
}

function formatProjectName(name) {
    return name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getLanguageIcon(language) {
    const icons = {
        'Python': 'fab fa-python',
        'JavaScript': 'fab fa-js-square',
        'TypeScript': 'fab fa-js-square',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'Dart': 'fas fa-bullseye',
        'Flutter': 'fab fa-flutter',
        'C++': 'fas fa-code',
        'C': 'fas fa-code',
        'Java': 'fab fa-java',
        'PHP': 'fab fa-php',
        'Ruby': 'fas fa-gem',
        'Go': 'fab fa-golang',
        'Rust': 'fab fa-rust',
        'Swift': 'fab fa-swift',
        'Kotlin': 'fab fa-android'
    };
    return icons[language] || 'fas fa-code';
}

function getLanguageGradient(language) {
    const gradients = {
        'Python': 'linear-gradient(135deg, #3776ab 0%, #ffd43b 100%)',
        'JavaScript': 'linear-gradient(135deg, #f7df1e 0%, #323330 100%)',
        'TypeScript': 'linear-gradient(135deg, #3178c6 0%, #235a97 100%)',
        'HTML': 'linear-gradient(135deg, #e34c26 0%, #f06529 100%)',
        'CSS': 'linear-gradient(135deg, #264de4 0%, #2965f1 100%)',
        'Dart': 'linear-gradient(135deg, #00d2b8 0%, #0175c2 100%)',
        'C++': 'linear-gradient(135deg, #00599c 0%, #004482 100%)',
        'Java': 'linear-gradient(135deg, #007396 0%, #ed8b00 100%)',
        'PHP': 'linear-gradient(135deg, #777bb4 0%, #4f5b93 100%)',
        'Ruby': 'linear-gradient(135deg, #cc342d 0%, #a91401 100%)',
        'Go': 'linear-gradient(135deg, #00add8 0%, #00a29c 100%)',
        'Swift': 'linear-gradient(135deg, #fa7343 0%, #fd2d2d 100%)'
    };
    return gradients[language] || 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)';
}

// ============================================
// PROJECT FILTERS
// ============================================
function initProjectFilters() {
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const language = project.getAttribute('data-language');
        
        if (filter === 'all' || language === filter) {
            project.style.display = 'block';
            project.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            project.style.display = 'none';
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    elements.contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(elements.contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', data);
        
        // Show success feedback
        const submitBtn = elements.contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        elements.contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent features
    if (window.innerWidth > 900) {
        elements.hamburger?.classList.remove('active');
        elements.mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// Preloader (optional - removes if exists)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 500);
    }
});
