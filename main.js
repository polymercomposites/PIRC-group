// PIRC shared site interactions and data-driven content

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

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) closeMenu();
        });
    }

    async function loadJson(path) {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.json();
    }

    function createStatus(message, isError = false) {
        const status = document.createElement('p');
        status.className = `data-status${isError ? ' error' : ''}`;
        status.textContent = message;
        return status;
    }

    async function initializeMembers() {
        const list = document.getElementById('members-list');
        if (!list) return;

        const search = document.getElementById('member-search');
        const count = document.getElementById('member-count');
        list.replaceChildren(createStatus('Loading researchers…'));

        try {
            const members = await loadJson('data/members.json');
            const cards = members.map((member) => {
                const article = document.createElement('article');
                article.className = 'person-card';
                article.dataset.search = [member.name, member.degree, member.role, member.research, member.affiliation]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();

                const media = document.createElement('div');
                media.className = 'person-media';

                if (member.image) {
                    const image = document.createElement('img');
                    image.src = member.image;
                    image.alt = member.name;
                    image.loading = 'lazy';
                    media.appendChild(image);
                } else {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'person-placeholder';
                    placeholder.setAttribute('aria-label', 'Photo not currently available');
                    placeholder.textContent = member.initials || member.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
                    media.appendChild(placeholder);
                }

                const body = document.createElement('div');
                body.className = 'person-body';

                const heading = document.createElement('h2');
                heading.textContent = `${member.name}${member.degree ? `, ${member.degree}` : ''}`;

                const role = document.createElement('p');
                role.className = 'person-role';
                role.textContent = member.role || 'Researcher';

                const research = document.createElement('p');
                research.textContent = member.research;

                const affiliation = document.createElement('div');
                affiliation.className = 'person-meta';
                affiliation.textContent = member.affiliation;

                body.append(heading, role, research, affiliation);
                article.append(media, body);
                return article;
            });

            list.replaceChildren(...cards);

            function applyFilter() {
                const query = (search?.value || '').trim().toLowerCase();
                let visible = 0;

                cards.forEach((card) => {
                    const matches = !query || card.dataset.search.includes(query);
                    card.hidden = !matches;
                    if (matches) visible += 1;
                });

                if (count) count.textContent = `${visible} researcher${visible === 1 ? '' : 's'}`;
            }

            search?.addEventListener('input', applyFilter);
            applyFilter();
        } catch (error) {
            list.replaceChildren(createStatus('Researcher data could not be loaded. Please refresh the page or try again later.', true));
            if (count) count.textContent = '';
            console.error(error);
        }
    }

    async function initializePublications() {
        const list = document.getElementById('publication-list');
        if (!list) return;

        const search = document.getElementById('publication-search');
        const yearFilter = document.getElementById('publication-year-filter');
        const count = document.getElementById('publication-count');
        list.replaceChildren(createStatus('Loading publications…'));

        try {
            const publications = await loadJson('data/publications.json');
            const years = [...new Set(publications.map((pub) => String(pub.year)))].sort((a, b) => Number(b) - Number(a));

            if (yearFilter) {
                years.forEach((year) => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearFilter.appendChild(option);
                });
            }

            const rows = publications.map((pub) => {
                const article = document.createElement('article');
                article.className = 'publication-row';
                article.dataset.year = String(pub.year);
                article.dataset.search = [pub.title, pub.authors, pub.journal, pub.details, pub.year]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();

                const yearWrap = document.createElement('div');
                const badge = document.createElement('span');
                badge.className = 'publication-year-badge';
                badge.textContent = pub.year;
                yearWrap.appendChild(badge);

                const details = document.createElement('div');
                const heading = document.createElement('h2');
                heading.textContent = pub.title;
                const authors = document.createElement('p');
                authors.className = 'publication-authors';
                authors.textContent = pub.authors;
                const meta = document.createElement('p');
                meta.className = 'publication-meta';
                const journal = document.createElement('em');
                journal.textContent = pub.journal;
                meta.append(journal);
                if (pub.details) meta.append(document.createTextNode(`, ${pub.details}`));
                details.append(heading, authors, meta);

                const doi = document.createElement('a');
                doi.className = 'publication-link';
                doi.href = pub.doi;
                doi.target = '_blank';
                doi.rel = 'noopener noreferrer';
                doi.textContent = 'DOI ↗';

                article.append(yearWrap, details, doi);
                return article;
            });

            list.replaceChildren(...rows);

            function applyFilters() {
                const query = (search?.value || '').trim().toLowerCase();
                const selectedYear = yearFilter?.value || '';
                let visible = 0;

                rows.forEach((row) => {
                    const matchesQuery = !query || row.dataset.search.includes(query);
                    const matchesYear = !selectedYear || row.dataset.year === selectedYear;
                    const matches = matchesQuery && matchesYear;
                    row.hidden = !matches;
                    if (matches) visible += 1;
                });

                if (count) count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
            }

            search?.addEventListener('input', applyFilters);
            yearFilter?.addEventListener('change', applyFilters);
            applyFilters();
        } catch (error) {
            list.replaceChildren(createStatus('Publication data could not be loaded. Please refresh the page or try again later.', true));
            if (count) count.textContent = '';
            console.error(error);
        }
    }

    initializeMembers();
    initializePublications();
});
