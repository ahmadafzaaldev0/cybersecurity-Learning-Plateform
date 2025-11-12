document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3D Card Hover Effect
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;

            // Add shine effect
            const shine = card.querySelector('.shine') || document.createElement('div');
            if (!card.contains(shine)) {
                shine.className = 'shine';
                card.appendChild(shine);
            }
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            const shine = card.querySelector('.shine');
            if (shine) shine.style.opacity = '0';
        });
    });

    // 3D Button Hover Effect
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // Interactive Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const validateField = (field) => {
            const parent = field.parentElement;
            const errorMessage = parent.querySelector('.error-message');
            if (field.checkValidity()) {
                parent.classList.remove('invalid');
            } else {
                parent.classList.add('invalid');
                errorMessage.textContent = field.validationMessage;
            }
        };

        nameInput.addEventListener('input', () => validateField(nameInput));
        emailInput.addEventListener('input', () => validateField(emailInput));
        messageInput.addEventListener('input', () => validateField(messageInput));

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (this.checkValidity()) {
                // Add loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                // Simulate form submission
                setTimeout(() => {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = `
                        <h3>Message Sent!</h3>
                        <p>Thank you for your message. We'll get back to you shortly.</p>
                    `;

                    this.parentNode.replaceChild(successMessage, this);
                    successMessage.style.display = 'block';
                }, 1500);
            } else {
                validateField(nameInput);
                validateField(emailInput);
                validateField(messageInput);
            }
        });
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Add hover effect to nav links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Add active class to current section in viewport
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    const highlightNavigation = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial call

    // Quiz
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    if (quizContainer && quizResult) {
        const questions = [
            {
                question: "What is phishing?",
                options: [
                    "A type of fishing sport",
                    "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity",
                    "A method to clean your computer",
                    "A type of computer virus"
                ],
                answer: 1
            },
            {
                question: "What does MFA stand for?",
                options: [
                    "Multi-Factor Authentication",
                    "Multiple-Form Authentication",
                    "Mega-File Access",
                    "My First App"
                ],
                answer: 0
            },
            {
                question: "Which of the following is the strongest password?",
                options: [
                    "password123",
                    "12345678",
                    "P@$$w0rd!",
                    "MyP@s$w0rdIsV3ryStr0ng!"
                ],
                answer: 3
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        function loadQuiz() {
            quizContainer.innerHTML = '';
            if (currentQuestion < questions.length) {
                const q = questions[currentQuestion];
                const questionEl = document.createElement('div');
                questionEl.classList.add('question');
                questionEl.innerHTML = `<h3>${q.question}</h3>`;

                const optionsEl = document.createElement('div');
                optionsEl.classList.add('options');

                q.options.forEach((option, index) => {
                    const optionEl = document.createElement('div');
                    optionEl.classList.add('option');
                    optionEl.textContent = option;
                    optionEl.addEventListener('click', () => {
                        if (index === q.answer) {
                            score++;
                        }
                        currentQuestion++;
                        loadQuiz();
                    });
                    optionsEl.appendChild(optionEl);
                });

                quizContainer.appendChild(questionEl);
                quizContainer.appendChild(optionsEl);
            } else {
                showResult();
            }
        }

        function showResult() {
            quizContainer.style.display = 'none';
            quizResult.style.display = 'block';
            quizResult.innerHTML = `
                <h2>Quiz Complete!</h2>
                <p>You scored ${score} out of ${questions.length}</p>
                <button id="restart-quiz" class="btn">Restart Quiz</button>
            `;

            document.getElementById('restart-quiz').addEventListener('click', () => {
                currentQuestion = 0;
                score = 0;
                quizContainer.style.display = 'block';
                quizResult.style.display = 'none';
                loadQuiz();
            });
        }

        loadQuiz();
    }

    // 3D Globe
    const globeContainer = document.getElementById('globe-container');
    if (globeContainer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, globeContainer.clientWidth / globeContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        globeContainer.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg'),
            bumpMap: new THREE.TextureLoader().load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthbump1k.jpg'),
            bumpScale: 0.05,
            specularMap: new THREE.TextureLoader().load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthspec1k.jpg'),
            specular: new THREE.Color('grey'),
        });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);
        scene.add(light);

        camera.position.z = 10;

        const animate = function () {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
            camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
            camera.updateProjectionMatrix();
        });
    }

    // Intermittent Glitch Effect
    const heroTitle = document.getElementById('cyber-title');
    if(heroTitle) {
        setInterval(() => {
            heroTitle.classList.add('glitch');
            setTimeout(() => {
                heroTitle.classList.remove('glitch');
            }, 300);
        }, 3000);
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500);
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
});
