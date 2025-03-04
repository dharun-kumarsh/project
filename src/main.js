import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'leaflet/dist/leaflet.css';
import './styles.css';

import AOS from 'aos';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import L from 'leaflet';

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Sticky Navigation
const navbar = document.querySelector('[data-nav]');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    navbar.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton?.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
});

// Achievements Carousel
new Swiper('.swiper-container', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Events Calendar
const calendarEl = document.getElementById('calendar');
if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        events: [
            {
                title: 'Tech Symposium',
                start: '2025-01-15',
                className: 'bg-primary-600'
            },
            {
                title: 'Campus Recruitment Drive',
                start: '2025-02-20',
                className: 'bg-primary-600'
            }
        ],
        eventDidMount: (info) => {
            info.el.classList.add('rounded-md', 'px-2', 'py-1', 'text-white', 'text-sm');
        }
    });
    calendar.render();
}

// Faculty Filter
const facultyFilters = document.querySelectorAll('[data-filter]');
const facultyGrid = document.getElementById('faculty-grid');

facultyFilters.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active state
        facultyFilters.forEach(btn => {
            btn.classList.remove('bg-primary-600', 'text-white');
            btn.classList.add('bg-white', 'text-gray-700');
        });
        button.classList.remove('bg-white', 'text-gray-700');
        button.classList.add('bg-primary-600', 'text-white');
        
        // Filter faculty members
        const facultyMembers = document.querySelectorAll('[data-department]');
        facultyMembers.forEach(member => {
            if (filter === 'all' || member.getAttribute('data-department') === filter) {
                member.classList.remove('hidden');
            } else {
                member.classList.add('hidden');
            }
        });
    });
});

// Contact Map
const mapEl = document.getElementById('map');
if (mapEl) {
    const map = L.map('map').setView([13.0827, 80.2707], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([13.0827, 80.2707]).addTo(map)
        .bindPopup('Meenakshi Sundararajan Engineering College')
        .openPopup();
}

// Chat Widget
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');

chatToggle?.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
});

// Form Validation and Submission
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Handle form submission
        const formData = new FormData(form);
        console.log('Form data:', Object.fromEntries(formData));
        
        // Show success message
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sent!';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
        }, 2000);
    });
});