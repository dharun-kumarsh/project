import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'leaflet/dist/leaflet.css';
import '../styles/main.scss';

import AOS from 'aos';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import L from 'leaflet';

// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
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
document.addEventListener('DOMContentLoaded', function() {
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
                // Add your events here
                {
                    title: 'Open Day',
                    start: '2025-01-15'
                },
                {
                    title: 'Tech Symposium',
                    start: '2025-02-20'
                }
            ]
        });
        calendar.render();
    }
});

// Faculty Filter
const facultyFilters = document.querySelectorAll('.faculty-filters button');
facultyFilters.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Remove active class from all buttons
        facultyFilters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter faculty members
        const facultyMembers = document.querySelectorAll('.faculty-member');
        facultyMembers.forEach(member => {
            if (filter === 'all' || member.getAttribute('data-department') === filter) {
                member.style.display = 'block';
            } else {
                member.style.display = 'none';
            }
        });
    });
});

// Contact Map

// Chat Widget
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');

chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('active');
});

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    });
});

// Search Functionality
const searchForm = document.querySelector('form[role="search"]');
searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = e.target.querySelector('input').value;
    // Implement search functionality
    console.log('Searching for:', searchTerm);
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    // Implement newsletter subscription
    console.log('Newsletter subscription for:', email);
});