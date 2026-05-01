
        // Dynamic data
        const skills = [
            { name: "JavaScript", icon: "fa-brands fa-js", level: 90 },
            { name: "Python", icon: "fa-brands fa-python", level: 85 },
            { name: "React", icon: "fa-brands fa-react", level: 88 },
            { name: "Node.js", icon: "fa-brands fa-node", level: 82 },
            { name: "HTML/CSS", icon: "fa-brands fa-html5", level: 95 },
            { name: "MongoDB", icon: "fa-solid fa-database", level: 75 }
        ];

        const projects = [
            {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce website with payment integration",
                tech: ["React", "Node.js", "MongoDB"],
                icon: "fa-solid fa-cart-shopping"
            },
            {
                title: "Task Manager App",
                description: "Productivity app with real-time updates",
                tech: ["Vue.js", "Firebase", "Tailwind"],
                icon: "fa-solid fa-tasks"
            },
            {
                title: "Portfolio Generator",
                description: "Dynamic portfolio builder for developers",
                tech: ["HTML", "CSS", "JavaScript"],
                icon: "fa-solid fa-folder-open"
            },
            {
                title: "Weather Dashboard",
                description: "Real-time weather tracking application",
                tech: ["React", "API", "Chart.js"],
                icon: "fa-solid fa-cloud-sun"
            },
            {
                title: "Chat Application",
                description: "Real-time messaging platform",
                tech: ["Socket.io", "Express", "MongoDB"],
                icon: "fa-solid fa-comments"
            },
            {
                title: "Portfolio Website",
                description: "Modern portfolio website template",
                tech: ["HTML", "CSS", "JavaScript"],
                icon: "fa-solid fa-code"
            }
        ];

        // Typing animation
        const roles = [
            "Full Stack Developer",
            "UI/UX Enthusiast",
            "Problem Solver",
            "Tech Innovator"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedTextElement = document.querySelector('.typed-text');

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();

        // Render skills
        function renderSkills() {
            const skillsGrid = document.getElementById('skills-grid');
            skillsGrid.innerHTML = skills.map(skill => `
                <div class="skill-card" data-skill="${skill.name}">
                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <h3>${skill.name}</h3>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" data-level="${skill.level}" style="width: 0"></div>
                    </div>
                    <p>${skill.level}%</p>
                </div>
            `).join('');
            
            // Animate progress bars on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target.querySelector('.skill-progress-bar');
                        const level = bar.dataset.level;
                        bar.style.width = level + '%';
                    }
                });
            });
            
            document.querySelectorAll('.skill-card').forEach(card => {
                observer.observe(card);
            });
        }

        // Render projects
        function renderProjects() {
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = projects.map((project, index) => `
                <div class="project-card" data-project-index="${index}">
                    <div class="project-image">
                        <i class="${project.icon}"></i>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Modal functionality
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        
        function openModal(title, description) {
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modal.style.display = 'flex';
        }
        
        document.querySelector('.close-modal').onclick = () => {
            modal.style.display = 'none';
        };
        
        window.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Project click handler
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const index = projectCard.dataset.projectIndex;
                const project = projects[index];
                openModal(project.title, `${project.description}\n\nTechnologies: ${project.tech.join(', ')}`);
            }
        });
        
        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        });
        
        // Mobile menu
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                navLinks.classList.remove('active');
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
        
        // Initialize
        renderSkills();
        renderProjects();