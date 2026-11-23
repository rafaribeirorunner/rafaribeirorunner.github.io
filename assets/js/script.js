document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');

    // Sequência da animação inicial
    setTimeout(() => {
        introOverlay.style.opacity = '0';

        setTimeout(() => {
            introOverlay.style.visibility = 'hidden';
            navbar.classList.add('visible');

            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
                heroContent.style.transition = 'all 1s ease-out';
            }, 300);
        }, 800);
    }, 2500);

    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.getElementById('hero-bg');
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    const mobilePlans = window.matchMedia('(max-width: 768px)');

    const setMobileAccordion = () => {
        accordionTriggers.forEach(trigger => {
            const panel = document.getElementById(trigger.getAttribute('aria-controls'));

            if (mobilePlans.matches) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.classList.remove('open');
                panel.style.removeProperty('--accordion-height');
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.classList.remove('open');
                panel.style.removeProperty('--accordion-height');
            }
        });
    };

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (!mobilePlans.matches) return;

            const panel = document.getElementById(trigger.getAttribute('aria-controls'));
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.classList.remove('open');
                return;
            }

            trigger.setAttribute('aria-expanded', 'true');
            panel.style.setProperty('--accordion-height', `${panel.scrollHeight}px`);
            panel.classList.add('open');
        });
    });

    setMobileAccordion();
    mobilePlans.addEventListener('change', setMobileAccordion);

    // Modal para fotos dos alunos e carreira
    const modal = document.getElementById('studentModal');
    const studentImages = document.querySelectorAll('.student-card img');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    studentImages.forEach(img => {
        img.addEventListener('click', function () {
            modal.classList.add('active');
            modalImage.src = this.src;
            modalImage.alt = this.alt;
        });
    });

    const careerImages = document.querySelectorAll('.race-img.clickable');
    careerImages.forEach(img => {
        img.addEventListener('click', function () {
            modal.classList.add('active');
            modalImage.src = this.src;
            modalImage.alt = this.alt || 'Imagem da carreira';
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });

    // Formulário de contato via WhatsApp
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const idade = document.getElementById('idade').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const plano = document.getElementById('plano').value;

            const planoNomes = {
                'assessoria-esportiva': 'Assessoria Esportiva',
                'personal-super': 'Personal Trainer Super',
                'personal-gold': 'Personal Trainer Gold',
                'consultoria-online': 'Consultoria Online'
            };

            let msg;
            if (plano === 'saber-mais') {
                msg = `Olá, Rafael! Me chamo ${nome} e gostaria de saber mais sobre seus serviços. Seguem meus dados para contato: telefone ${telefone}, email ${email}.`;
            } else {
                msg = `Olá, Rafael! Me chamo ${nome}, tenho ${idade} anos. Tenho interesse no plano ${planoNomes[plano]}. Seguem meus dados para contato: telefone ${telefone}, email ${email}.`;
            }

            const url = `https://wa.me/5524992569818?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');

            const successMsg = document.getElementById('successMessage');
            successMsg.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 6000);
        });
    }
});

window.onload = function () {
    window.scrollTo(0, 0);
};
