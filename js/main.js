 const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-hidden');
    });

    
    document.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
        });

        
        if (window.innerWidth <= 600) {
          navLinks.classList.add('mobile-hidden');
        }
      });
    });

   
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('a.nav-link');

    function activateNavLink() {
      let scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          navItems.forEach(item => item.classList.remove('active'));
          navItems[index].classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', activateNavLink);

    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.carousel-card'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentIndex = 0;
    const cardsPerView = 3;

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth + 32; // card width + gap
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - cardsPerView) {
        currentIndex++;
        updateCarousel();
      }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    function openProject(url) {
      window.open(url, '_blank');
    }