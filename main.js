// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example: Dynamically load publications (optional, e.g., from a JSON file or API)
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

// Uncomment to use dynamic rendering
// window.onload = renderPublications;
