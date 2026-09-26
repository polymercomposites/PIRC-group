// PIRC shared site interactions

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    function closeMenu() {
        if (!navToggle || !navMenu) return;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.querySelectorAll('.nav-menu a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });

        document.addEventListener('click', function (event) {
            if (!navMenu.classList.contains('active')) return;
            if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
            closeMenu();
        });
    }

    // Load publications on the publications page.
    const pubList = document.getElementById('publication-list');

    if (pubList) {
        const publications = [
            {
                authors: 'Issakah, O., Kayaba, A., Fiagbe, Y., Akromah, S., Kpare, J., & Asare, E.',
                year: 2025,
                title: 'Effect of Partial Replacement of CaCO3 with Palm Kernel Shell Particles on the Mechanical Properties of PKS/CaCO3/HDPE Hybrid Composites.',
                journal: 'Results in Materials',
                extra: '100668',
                doi: 'https://doi.org/10.1016/j.rinma.2025.100668'
            },
            {
                authors: 'Jephtah Ogyefo Acquah, Ezekiel Edward Nettey-Oppong, Emmanuel Essel Mensah, Abdul Manan Kayaba, Eric Asare.',
                year: 2025,
                title: 'Development and Characterization of Pineapple Fiber-Based Absorbent Cores for Eco-friendly Sanitary Pads.',
                journal: 'Fibers and Polymers',
                extra: '26, 3227–3241',
                doi: 'https://doi.org/10.1007/s12221-025-00162-y'
            },
            {
                authors: 'Abdul-Manan Kayaba, Obed Issakah, Stefania Akromah, E. E. Nettey-Oppong, Eric Kwame Anokye Asare.',
                year: 2025,
                title: 'Synergistic effects of micro- and macro-sized palm kernel shell fillers on the tensile properties of HDPE composites.',
                journal: 'Royal Society Open Science',
                extra: 'Volume 12, Issue 7',
                doi: 'https://doi.org/10.1098/rsos.241111'
            }
        ];

        pubList.innerHTML = '';

        publications.forEach((pub) => {
            const li = document.createElement('li');

            const authors = document.createElement('span');
            authors.textContent = `${pub.authors} (${pub.year}).`;

            const title = document.createElement('strong');
            title.textContent = pub.title;

            const journal = document.createElement('em');
            journal.textContent = `${pub.journal}${pub.extra ? `, ${pub.extra}` : ''}.`;

            const doi = document.createElement('a');
            doi.href = pub.doi;
            doi.target = '_blank';
            doi.rel = 'noopener noreferrer';
            doi.textContent = 'DOI';

            li.append(authors, document.createElement('br'), title, document.createElement('br'), journal, document.createTextNode(' '), doi);
            pubList.appendChild(li);
        });
    }
});
