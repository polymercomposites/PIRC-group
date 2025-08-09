// Toggle mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked (mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for anchor links (if used within pages)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamically load publications
const publications = [
    {
        authors: "Issakah, O., Kayaba, A., Fiagbe, Y., Akromah, S., Kpare, J., & Asare, E.",
        year: 2025,
        title: "Effect of Partial Replacement of CaCO3 with Palm Kernel Shell Particles on the Mechanical Properties of PKS/CaCO3/HDPE Hybrid Composites",
        journal: "Results in Materials, 100668",
        doi: "https://doi.org/10.1016/j.rinma.2025.100668"
    },
    {
        authors: "Jephtah Ogyefo Acquah, Ezekiel Edward Nettey-Oppong, Emmanuel Essel Mensah, Abdul Manan Kayaba, Eric Asare",
        year: 2025,
        title: "Development and Characterization of Pineapple Fiber-Based Absorbent Cores for Eco-friendly Sanitary Pads",
        journal: "Fibers Polym 26, 3227–3241",
        doi: "https://doi.org/10.1007/s12221-025-00162-y"
    },
    {
        authors: "Abdul-Manan Kayaba, Obed Issakah, Stefania Akromah, EE Nettey-Oppong, Eric Kwame Anokye Asare",
        year: 2025,
        title: "Synergistic effects of micro-and macro-sized palm kernel shell fillers on the tensile properties of HDPE composites",
        journal: "Royal Society Open Science, Volume 12, Issue 7",
        doi: "https://doi.org/10.1098/rsos.241111"
    }
];

function renderPublications() {
    const pubList = document.getElementById('publication-list');
    if (pubList) {
        pubList.innerHTML = '';
        publications.forEach(pub => {
            const li = document.createElement('li');
            li.innerHTML = `${pub.authors} (${pub.year}). "${pub.title}." <em>${pub.journal}</em>. <a href="${pub.doi}" target="_blank">DOI</a>`;
            pubList.appendChild(li);
        });
    }
}

// Uncomment to use dynamic rendering
// window.onload = renderPublications;
