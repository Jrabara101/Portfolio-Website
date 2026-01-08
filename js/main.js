 // Animated Canvas Background
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function animateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animateCanvas);
    }
    
    animateCanvas();
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Hamburger Menu with Animation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('mobile-hidden');
    });

    
    document.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Remove active from all nav links
        navItems.forEach(item => item.classList.remove('active'));
        // Add active to clicked nav link
        link.classList.add('active');
        
        document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
        });

        
        if (window.innerWidth <= 600) {
          navLinks.classList.add('mobile-hidden');
          hamburger.classList.remove('active');
        }
        
        // Update active state after scroll completes
        setTimeout(() => {
          activateNavLink();
        }, 500);
      });
    });

   
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('a.nav-link');

    function activateNavLink() {
      let scrollPos = window.scrollY + 200; // Offset for better detection

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Find corresponding nav link
        const navLink = document.querySelector(`a.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          // Remove active from all nav links
          navItems.forEach(item => item.classList.remove('active'));
          // Add active to current nav link
          navLink.classList.add('active');
        }
      });

      // Handle case when at the top of the page
      if (window.scrollY < 100) {
        navItems.forEach(item => item.classList.remove('active'));
        const aboutLink = document.querySelector('a.nav-link[href="#about"]');
        if (aboutLink) aboutLink.classList.add('active');
      }

      // Handle case when at the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        navItems.forEach(item => item.classList.remove('active'));
        const contactLink = document.querySelector('a.nav-link[href="#contact"]');
        if (contactLink) contactLink.classList.add('active');
      }
    }

    // Call on scroll
    window.addEventListener('scroll', activateNavLink);
    
    // Call on page load to set initial active state
    window.addEventListener('load', activateNavLink);
    
    // Call immediately to set initial state
    activateNavLink();

    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
          if (window.scrollY <= 300) {
            backToTopBtn.style.display = 'none';
          }
        }, 300);
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize back to top button
    backToTopBtn.style.transition = 'all 0.3s ease';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'translateY(20px)';

    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.carousel-card'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const carouselContainer = document.querySelector('.carousel-container');
    let currentIndex = 0;
    const cardsPerView = 3;
    let autoSwipeInterval;
    const autoSwipeDelay = 3000; // 3 seconds between auto-swipes

    // Enhanced carousel with smooth transitions
    function updateCarousel() {
      if (cards.length === 0) return;
      const cardWidth = cards[0].offsetWidth + 32;
      track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Auto-swipe function that loops infinitely
    function autoSwipe() {
      if (cards.length === 0) return;
      
      // Calculate max index based on visible cards
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      
      if (currentIndex < maxIndex) {
        // Move to next
        currentIndex++;
      } else {
        // Loop back to start
        currentIndex = 0;
      }
      
      updateCarousel();
    }

    // Start auto-swipe
    function startAutoSwipe() {
      if (autoSwipeInterval) {
        clearInterval(autoSwipeInterval);
      }
      autoSwipeInterval = setInterval(autoSwipe, autoSwipeDelay);
    }

    // Stop auto-swipe
    function stopAutoSwipe() {
      if (autoSwipeInterval) {
        clearInterval(autoSwipeInterval);
        autoSwipeInterval = null;
      }
    }

    // Pause auto-swipe on hover
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        stopAutoSwipe();
      });

      carouselContainer.addEventListener('mouseleave', () => {
        startAutoSwipe();
      });
    }

    prevBtn.addEventListener('click', () => {
      stopAutoSwipe();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // Loop to end
        currentIndex = Math.max(0, cards.length - cardsPerView);
      }
      updateCarousel();
      startAutoSwipe();
    });

    nextBtn.addEventListener('click', () => {
      stopAutoSwipe();
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        // Loop to start
        currentIndex = 0;
      }
      updateCarousel();
      startAutoSwipe();
    });

    window.addEventListener('resize', () => {
      updateCarousel();
    });
    
    // Initialize carousel after DOM is ready
    if (cards.length > 0) {
      updateCarousel();
      // Start auto-swipe after a short delay
      setTimeout(() => {
        startAutoSwipe();
      }, 1000);
    }

    function openProject(url) {
      window.open(url, '_blank');
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Animate section titles
          const title = entry.target.querySelector('.carousel-title');
          if (title) {
            title.classList.add('animated');
          }
          
          // Stagger animation for skills
          if (entry.target.id === 'skills') {
            const skillItems = entry.target.querySelectorAll('.skills > div');
            skillItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animated');
              }, index * 100);
            });
          }
          
          // Stagger animation for work cards
          if (entry.target.id === 'work') {
            const workCards = entry.target.querySelectorAll('.work-card');
            workCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animated');
              }, index * 150);
            });
          }
          
          // Stagger animation for contact buttons
          if (entry.target.id === 'contact') {
            const contactButtons = entry.target.querySelectorAll('.contact-icon-btn');
            contactButtons.forEach((btn, index) => {
              setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0) scale(1)';
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section.animate-on-scroll').forEach(section => {
      observer.observe(section);
    });

    // Initialize contact buttons
    document.querySelectorAll('.contact-icon-btn').forEach(btn => {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(30px) scale(0.9)';
      btn.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Smooth reveal on page load
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease-in';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });

    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        stopAutoSwipe();
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = Math.max(0, cards.length - cardsPerView);
        }
        updateCarousel();
        startAutoSwipe();
      } else if (e.key === 'ArrowRight') {
        stopAutoSwipe();
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
        startAutoSwipe();
      }
    });

    // Add touch/swipe support for mobile carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      stopAutoSwipe();
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      
      if (touchEndX < touchStartX - 50) {
        // Swipe left - go to next
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0; // Loop to start
        }
        updateCarousel();
      }
      if (touchEndX > touchStartX + 50) {
        // Swipe right - go to previous
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = maxIndex; // Loop to end
        }
        updateCarousel();
      }
      
      startAutoSwipe();
    }