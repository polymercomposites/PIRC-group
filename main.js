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
        const publications = [
            {
                authors: "Issakah, O., Kayaba, A., Fiagbe, Y., Akromah, S., Kpare, J., & Asare, E.",
                year: 2025,
                title: "Effect of Partial Replacement of CaCO3 with Palm Kernel Shell Particles on the Mechanical Properties of PKS/CaCO3/HDPE Hybrid Composites",
                journal: "Results in Materials, 100668",
                doi: "https://doi.org/10.1016/j.rinma.2025.100668"
            },
            // Add other publications here
        ];

        const pubList = document.getElementById('publication-list');
        pubList.innerHTML = '';
        publications.forEach(pub => {
            const li = document.createElement('li');
            li.innerHTML = `${pub.authors} (${pub.year}). "${pub.title}." <em>${pub.journal}</em>. <a href="${pub.doi}" target="_blank">DOI</a>`;
            pubList.appendChild(li);
        });
    }
});
