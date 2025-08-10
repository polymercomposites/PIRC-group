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
    const pubList = document.getElementById('publication-list');
    if (pubList) {
        // Publication list updated to match publication.html
        const publications = [
            {
                authors: "Issakah, O., Kayaba, A., Fiagbe, Y., Akromah, S., Kpare, J., & Asare, E.",
                year: 2025,
                title: "Effect of Partial Replacement of CaCO3 with Palm Kernel Shell Particles on the Mechanical Properties of PKS/CaCO3/HDPE Hybrid Composites.",
                journal: "Results in Materials",
                extra: "100668",
                doi: "https://doi.org/10.1016/j.rinma.2025.100668"
            },
            {
                authors: "Jephtah Ogyefo Acquah, Ezekiel Edward Nettey-Oppong, Emmanuel Essel Mensah, Abdul Manan Kayaba, Eric Asare.",
                year: 2025,
                title: "Development and Characterization of Pineapple Fiber-Based Absorbent Cores for Eco-friendly Sanitary Pads.",
                journal: "Fibers Polym",
                extra: "26, 3227–3241",
                doi: "https://doi.org/10.1007/s12221-025-00162-y"
            },
            {
                authors: "Abdul-Manan Kayaba, Obed Issakah, Stefania Akromah, EE Nettey-Oppong, Eric Kwame Anokye Asare.",
                year: 2025,
                title: "Synergistic effects of micro-and macro-sized palm kernel shell fillers on the tensile properties of HDPE composites.",
                journal: "Royal Society Open Science",
                extra: "Volume 12, Issue 7",
                doi: "https://doi.org/10.1098/rsos.241111"
            }
            // Add more publication objects here as needed
        ];

        // Dynamically populate the publications list on publications.html
        pubList.innerHTML = '';
        publications.forEach(pub => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${pub.authors} (${pub.year}).<br>
                "${pub.title}"<br>
                <em>${pub.journal}</em>${pub.extra ? ', ' + pub.extra : ''}. 
                <a href="${pub.doi}" target="_blank">DOI</a>
            `;
            pubList.appendChild(li);
        });
    }
});
