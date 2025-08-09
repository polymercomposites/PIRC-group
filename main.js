// Toggle section visibility for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            // Show the target section
            targetSection.classList.add('active');
            // Scroll to top to ensure visibility (optional, as only one section is shown)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        // Close the menu on mobile after clicking a link
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Toggle hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Dynamically load publications
const publications = [
    {
        authors: "Smith J., Doe J.",
        year: 2025,
        title: "Advances in Computational Biology",
        journal: "Journal of Science, 45(3), 123-134",
        doi: "https://doi.org/10.1000/science.123"
    },
    {
        authors: "Johnson M., Doe J.",
        year: 2024,
        title: "Machine Learning in Genomics",
        journal: "Nature Biotech, 12(5), 56-67",
        doi: "https://doi.org/10.1000/nbt.456"
    }
];

// Function to render publications dynamically
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

// Show the home section and render publications on page load
window.onload = () => {
    document.querySelector('#home').classList.add('active');
    renderPublications();
};
