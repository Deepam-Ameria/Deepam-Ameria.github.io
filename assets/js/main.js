// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateSliderState(currentTheme);
    
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateSliderState(newTheme);
    });
    
    function updateSliderState(theme) {
        themeToggle.checked = theme === 'light';
    }
});

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    
    // Project data
    const projectData = {
        'lunar-roadster': {
            title: 'Lunar ROADSTER',
            subtitle: 'Autonomous Lunar Surface Grooming Technology',
            description: 'Pioneering autonomous lunar surface grooming technology for future space exploration. This cutting-edge rover system is designed to create traversable surface trails on the Moon, enabling sustainable transportation and logistics for human colonization.',
            contributions: [
                'Designed and prototyped a novel dozer blade mechanism for lunar regolith manipulation',
                'Developed inverse kinematics and control algorithms for precise tool-ground interaction',
                'Integrated sensor feedback for autonomous operation and obstacle avoidance',
                'Implemented path planning algorithms for efficient surface grooming operations'
            ],
            technologies: ['Space Robotics', 'Autonomous Systems', 'Mechanical Design', 'Path Planning', 'ROS', 'C++'],
            images: [
                'images/LR Cover.png',
                'images/Lunar_ROADSTER.png',
                'images/pic01.jpg'
            ],
            github: 'https://github.com/Deepam-Ameria/lunar-roadster',
            website: 'https://mrsdprojects.ri.cmu.edu/2025teami/',
            advisor: 'Dr. William "Red" Whittaker'
        },
        'robot-swordfighting': {
            title: 'Motion Tracking Robot Swordfighting',
            subtitle: 'Real-time Robotic Defense System',
            description: 'Developed a real-time motion tracking and robotic control system for dynamic sword defense using a Franka Panda robot arm. The system uses computer vision to track incoming sword movements and generates defensive responses in real-time.',
            contributions: [
                'Implemented real-time motion tracking using OpenCV and computer vision techniques',
                'Developed control algorithms for dynamic robotic responses to sword movements',
                'Integrated sensor fusion for accurate pose estimation and trajectory prediction',
                'Optimized system latency for real-time performance requirements'
            ],
            technologies: ['Computer Vision', 'Motion Tracking', 'Real-time Control', 'OpenCV', 'Python', 'ROS'],
            images: [
                'images/Autonomy Cover.png',
                'images/pic02.jpg',
                'images/pic03.jpg'
            ],
            github: 'https://github.com/Deepam-Ameria/robot-swordfighting',
            website: null,
            advisor: 'Dr. Howie Choset'
        },
        'self-balancing': {
            title: 'Self-Balancing Droid',
            subtitle: 'Advanced Control Systems Robot',
            description: 'Built an advanced self-balancing robot demonstrating PID control and mechatronic design principles. The robot uses an IMU sensor and motor control to maintain balance while navigating various terrains.',
            contributions: [
                'Designed and implemented PID control algorithms for balance maintenance',
                'Developed sensor fusion techniques for accurate orientation estimation',
                'Created mechanical design for optimal weight distribution and stability',
                'Implemented wireless communication for remote control and monitoring'
            ],
            technologies: ['Control Systems', 'PID Control', 'Embedded Systems', 'Arduino', 'C++', 'Mechatronics'],
            images: [
                'images/Self-Balancing Droid.png',
                'images/pic04.jpg',
                'images/pic05.jpg'
            ],
            github: 'https://github.com/Deepam-Ameria/self-balancing-droid',
            website: null,
            advisor: 'Dr. Matthew Travers'
        },
        'drag-reduction': {
            title: 'Automatic Drag-Reduction System',
            subtitle: 'Intelligent Aerodynamic Optimization',
            description: 'Designed and implemented an intelligent aerodynamic system for high-performance vehicles with real-time optimization. The system automatically adjusts aerodynamic elements based on driving conditions to minimize drag.',
            contributions: [
                'Conducted CFD analysis to optimize aerodynamic performance',
                'Developed adaptive control algorithms for real-time drag reduction',
                'Implemented sensor integration for dynamic system adjustment',
                'Created simulation models for performance validation'
            ],
            technologies: ['Aerodynamics', 'CFD Analysis', 'Adaptive Control', 'MATLAB', 'Simulink', 'Sensors'],
            images: [
                'images/DRS.png',
                'images/pic06.jpg',
                'images/pic01.jpg'
            ],
            github: 'https://github.com/Deepam-Ameria/drag-reduction-system',
            website: null,
            advisor: 'Dr. Rajat Mittal'
        },
        'fsae-battery': {
            title: 'High-Voltage Li-Po Battery Pack (FSAE)',
            subtitle: 'Formula SAE Electric Race Car Power System',
            description: 'Designed and built a 600V lithium-polymer battery pack for Formula SAE electric race car competition. The system includes advanced battery management, safety systems, and thermal management for high-performance racing.',
            contributions: [
                'Designed 600V battery pack architecture with 144 cells in series-parallel configuration',
                'Implemented advanced battery management system (BMS) for cell monitoring and protection',
                'Developed thermal management system for optimal performance and safety',
                'Created safety systems including contactors, fuses, and emergency shutdown'
            ],
            technologies: ['Power Systems', 'Battery Management', 'FSAE Competition', 'High Voltage', 'Thermal Design', 'Safety Systems'],
            images: [
                'images/pic03.jpg',
                'images/pic04.jpg',
                'images/pic05.jpg'
            ],
            github: 'https://github.com/Deepam-Ameria/fsae-battery-pack',
            website: null,
            advisor: 'Dr. Venkat Viswanathan'
        }
    };
    
    // Add click listeners to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });
    
    // Close modal functionality
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    function showProjectModal(project) {
        modalContent.innerHTML = `
            <div class="modal-project">
                <div class="modal-header">
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-subtitle">${project.subtitle}</p>
                </div>
                
                <div class="modal-body">
                    <div class="modal-description">
                        <h3>Project Overview</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="modal-contributions">
                        <h3>My Contributions</h3>
                        <ul>
                            ${project.contributions.map(contribution => `<li>${contribution}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-images">
                        <h3>Project Images</h3>
                        <div class="image-gallery">
                            ${project.images.map(img => `
                                <div class="gallery-item">
                                    <img src="${img}" alt="${project.title}" />
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-links">
                        <h3>Project Links</h3>
                        <div class="link-buttons">
                            <a href="${project.github}" target="_blank" class="btn btn-primary">
                                <span>📱</span> View on GitHub
                            </a>
                            ${project.website ? `
                                <a href="${project.website}" target="_blank" class="btn btn-secondary">
                                    <span>🌐</span> Project Website
                                </a>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${project.advisor ? `
                        <div class="modal-advisor">
                            <h3>Advisor</h3>
                            <p>${project.advisor}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Resume Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');
    
    // Open resume modal
    resumeBtn.addEventListener('click', function() {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close resume modal
    resumeModalClose.addEventListener('click', closeResumeModal);
    resumeModal.addEventListener('click', function(e) {
        if (e.target === resumeModal) {
            closeResumeModal();
        }
    });
    
    // Close resume modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });
    
    function closeResumeModal() {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add fade-in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
