// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            // Allow normal navigation by not preventing default
        });
    });

    // Load publications if on publications page
    if (document.getElementById('publication-list')) {
// main.js

// Option 1: Add all your publications here as objects in the array
         const publications = [
    {
        authors: "Asare, E.K., Owusu, F., & Mensah, A.",
        year: 2024,
        title: "Polymer composites for sustainable development",
        journal: "Journal of Polymer Science",
        doi: "https://doi.org/10.1234/jps.2024.5678"
    },
    {
        authors: "Owusu, F., Asare, E.K.",
        year: 2023,
        title: "Advanced materials for green energy",
        journal: "Advanced Energy Materials",
        doi: "https://doi.org/10.5678/aem.2023.1234"
    },
    {
        authors: "Mensah, A. & Asare, E.K.",
        year: 2022,
        title: "Recycling of plastic waste in Africa",
        journal: "Waste Management",
        doi: "https://doi.org/10.4321/wm.2022.4321"
    }
    // Add more publication objects here as needed
];

// Dynamically populate the publications list on publications.html
document.addEventListener("DOMContentLoaded", function() {
    const pubList = document.getElementById('publication-list');
    if (pubList && Array.isArray(publications)) {
        pubList.innerHTML = '';
        publications.forEach(pub => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${pub.authors}</strong> (${pub.year}). 
                "${pub.title}." 
                <em>${pub.journal}</em>. 
                <a href="${pub.doi}" target="_blank">DOI</a>
            `;
            pubList.appendChild(li);
        });
    }

    // Navigation hamburger toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu_visible');
        });
    }
});
