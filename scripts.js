 function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Fade in animation on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run on page load

        // Product modal
        function openModal(product) {
            const modal = document.getElementById('productModal');
            const modalContent = document.getElementById('modalContent');
            
            const productInfo = {
                eggs: {
                    title: 'Farm Fresh Eggs',
                    description: 'Our premium eggs come from free-range hens that roam freely on our pastures. Each egg is carefully collected daily to ensure maximum freshness and quality.',
                    details: [
                        'Available in small, medium, large, and extra-large sizes',
                        'Brown and white varieties',
                        'Organic and conventional options',
                        'Packed in recyclable cartons',
                        'Delivery available within 50 miles'
                    ],
                    price: 'Starting at $4.50/dozen'
                },
                meat: {
                    title: 'Premium Chicken Meat',
                    description: 'Our chickens are raised naturally without hormones or antibiotics. They enjoy a healthy diet and plenty of space to roam, resulting in tender, flavorful meat.',
                    details: [
                        'Whole chickens and individual cuts available',
                        'Fresh and frozen options',
                        'Custom processing available',
                        'Vacuum-sealed for freshness',
                        'Bulk orders welcome'
                    ],
                    price: 'Starting at $3.99/lb'
                },
                processed: {
                    title: 'Artisan Processed Foods',
                    description: 'Our processed chicken products are made using traditional recipes combined with modern food safety standards. Perfect for quick meals or gourmet cooking.',
                    details: [
                        'Chicken sausages (various flavors)',
                        'Smoked chicken products',
                        'Ready-to-cook marinated items',
                        'Chicken jerky and snacks',
                        'Custom processing services'
                    ],
                    price: 'Starting at $6.99/lb'
                }
            };

            const info = productInfo[product];
            modalContent.innerHTML = `
                <h2>${info.title}</h2>
                <p style="margin: 1rem 0; color: #666; font-size: 1.1rem;">${info.description}</p>
                <h3 style="color: #8B4513; margin: 1.5rem 0 1rem 0;">Product Details:</h3>
                <ul style="margin-bottom: 1.5rem;">
                    ${info.details.map(detail => `<li style="margin: 0.5rem 0; color: #555;">${detail}</li>`).join('')}
                </ul>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                    <strong style="color: #FF6B35; font-size: 1.2rem;">${info.price}</strong>
                </div>
                <div style="text-align: center; margin-top: 1.5rem;">
                    <button class="cta-button" onclick="closeModal(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});">
                        Order Now
                    </button>
                </div>
            `;
            
            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('productModal').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('productModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Form submission
        function submitForm(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert(`Thank you, ${data.name}! We've received your message and will contact you soon.`);
            
            // Reset form
            event.target.reset();
        }

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }

        // Trigger counter animation when stats section is visible
        const statsSection = document.querySelector('.stats');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });

        if (statsSection) {
            observer.observe(statsSection);
        }