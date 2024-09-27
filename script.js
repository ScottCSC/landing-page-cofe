document.addEventListener('DOMContentLoaded', () => {
    // Cargar testimonios
    const testimonios = [
        { nombre: 'María García', texto: 'El mejor café que he probado. ¡Totalmente recomendado!' },
        { nombre: 'Juan Pérez', texto: 'Excelente servicio y calidad. Siempre vuelvo por más.' },
        { nombre: 'Ana Rodríguez', texto: 'Me encanta la variedad de sabores. Café Aroma es mi favorito.' },
        { nombre: 'Carlos Sánchez', texto: 'El ambiente de la cafetería es inmejorable. ¡Un oasis en la ciudad!' },
        { nombre: 'Laura Martínez', texto: 'Los baristas son verdaderos artistas. Cada taza es una obra maestra.' }
    ];

    const testimonialSlider = document.querySelector('.testimonial-slider');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        const testimonialElements = testimonialSlider.querySelectorAll('.testimonial');
        testimonialElements.forEach(el => el.classList.remove('active'));
        testimonialElements[index].classList.add('active');
    }

    testimonios.forEach((testimonio, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.classList.add('testimonial');
        if (index === 0) testimonialElement.classList.add('active');
        testimonialElement.innerHTML = `
            <p>"${testimonio.texto}"</p>
            <strong>- ${testimonio.nombre}</strong>
        `;
        testimonialSlider.appendChild(testimonialElement);
    });

    const prevButton = document.querySelector('.testimonial-nav.prev');
    const nextButton = document.querySelector('.testimonial-nav.next');

    prevButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonios.length) % testimonios.length;
        showTestimonial(currentTestimonial);
    });

    nextButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonios.length;
        showTestimonial(currentTestimonial);
    });

    // Cargar preguntas frecuentes
    const faqs = [
        {
            pregunta: '¿Cuál es el origen de sus granos de café?',
            respuesta: 'Nuestros granos provienen de las mejores regiones cafeteras de Sudamérica y África. Trabajamos directamente con pequeños productores para garantizar la calidad y sostenibilidad de nuestro café.'
        },
        {
            pregunta: '¿Ofrecen envío gratuito?',
            respuesta: 'Sí, ofrecemos envío gratuito en pedidos superiores a 50.000. Para pedidos menores, se aplica una tarifa fija de 5.000 por envío.'
        },
        {
            pregunta: '¿Cómo debo almacenar el café?',
            respuesta: 'Recomendamos almacenar el café en un lugar fresco y seco, en un recipiente hermético. Evita la exposición a la luz directa y al aire. Para obtener el mejor sabor, consume el café dentro de las 2-3 semanas posteriores a la apertura del paquete.'
        },
        {
            pregunta: '¿Tienen opciones de café descafeinado?',
            respuesta: 'Sí, ofrecemos una selección de cafés descafeinados que mantienen todo el sabor y aroma de nuestros cafés regulares. Utilizamos un proceso natural de descafeinización para preservar la calidad del grano.'
        },
        {
            pregunta: '¿Puedo visitar su tostadero?',
            respuesta: 'Absolutamente. Organizamos visitas guiadas a nuestro tostadero los sábados por la mañana. Es necesario reservar con antelación a través de nuestra página web o llamando a nuestro número de atención al cliente.'
        }
    ];

    const faqContainer = document.querySelector('.faq-container');

    faqs.forEach(faq => {
        const faqElement = document.createElement('div');
        faqElement.classList.add('faq-item');
        faqElement.innerHTML = `
            <div class="faq-question">${faq.pregunta}</div>
            <div class="faq-answer">${faq.respuesta}</div>
        `;
        faqContainer.appendChild(faqElement);
    });

    // Agregar funcionalidad de acordeón a las preguntas
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Manejo de envío del formulario de suscripción
    const subscriptionForm = document.getElementById('subscription-form');
    subscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;

        // Validación de correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }

        alert(`Gracias por suscribirte con el correo: ${email}`);
        subscriptionForm.reset();
    });

    // Eliminar la función initMap y la asignación a window.initMap

    // Funcionalidad para la galería (ejemplo: lightbox)
    const galeriaImagenes = document.querySelectorAll('.galeria-imagen');
    galeriaImagenes.forEach(imagen => {
        imagen.addEventListener('click', () => {
            // Aquí se podría implementar un lightbox o una vista ampliada de la imagen
            console.log('Imagen clickeada:', imagen.src);
        });
    });

    // Navegación responsiva
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Cambiar el color del header al hacer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Inicializar el mapa
    const map = L.map('mapa').setView([-29.9027, -71.2519], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-29.9027, -71.2519]).addTo(map)
        .bindPopup('Café Aroma<br>Plaza de la Ciudadanía')
        .openPopup();

    // Función de desplazamiento suave
    function scrollToSection(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 100; // Ajusta este valor según la altura de tu header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Agregar evento de clic a los botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', scrollToSection);
    });

    // Opcional: Aplicar el mismo efecto a todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
});