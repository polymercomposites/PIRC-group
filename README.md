# PIRC Group Website

Official website of the **Polymer Innovation Research & Consultancy (PIRC) Group** at the Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana.

The site presents the group’s research, people, publications, funding partners, opportunities, news, gallery and collaboration contact information. It is intentionally lightweight: plain HTML, CSS and JavaScript deployed through GitHub Pages.

## Production site

https://polymercomposites.github.io/PIRC-group/

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- JSON content files for frequently updated data
- GitHub Pages / GitHub Actions
- No framework or runtime dependency required in production

## Project structure

```text
PIRC-group/
├── index.html                 # Homepage
├── pi.html                    # Principal Investigator
├── members.html               # Searchable people directory
├── research.html              # Research themes
├── publications.html          # Searchable publications
├── funding.html               # Opportunities and funding
├── news.html                  # Group news
├── gallery.html               # Gallery
├── contact.html               # Contact and collaboration routes
├── 404.html                   # GitHub Pages 404 page
├── style.css                  # Main design system
├── pages.css                  # Interior-page styles
├── enhancements.css           # Search/filter + accessibility enhancements
├── main.js                    # Navigation + data rendering
├── data/
│   ├── members.json           # People data
│   ├── publications.json      # Publication data
│   └── news.json              # News/update data
├── assets/people/             # Optimized member portraits
├── scripts/check-site.mjs     # Zero-dependency site integrity checker
├── favicon.svg                # PIRC favicon
├── site.webmanifest           # Web app metadata
├── robots.txt                 # Search crawler rules
├── sitemap.xml                # Search sitemap
└── .github/workflows/         # Pages deployment + quality checks
```

## Updating people

Edit `data/members.json`.

```json
{
  "name": "Example Researcher",
  "degree": "PhD",
  "role": "Researcher",
  "image": "assets/people/example.webp",
  "initials": "ER",
  "research": "Research interests and expertise.",
  "affiliation": "Institution, Country"
}
```

If a photo is not available, set `image` to `null`; the site will display the initials placeholder instead.

## Updating publications

Edit `data/publications.json`.

```json
{
  "year": 2026,
  "title": "Publication title",
  "authors": "Author One, Author Two",
  "journal": "Journal Name",
  "details": "Volume, issue, pages",
  "doi": "https://doi.org/..."
}
```

The publications page automatically builds its search index and year filter from this file. The homepage also displays the latest three entries from the same data.

## Updating news

Edit `data/news.json`.

```json
{
  "date": "2026-09",
  "label": "September 2026",
  "title": "News headline",
  "summary": "Short description of the update.",
  "url": null,
  "linkLabel": null
}
```

Use an HTTPS URL and link label when an update should link to a paper or external page. The news page and homepage latest-updates section both read from this file.

## Updating other content

- Research themes: `research.html`
- Opportunities and funding partners: `funding.html`
- Gallery captions/images: `gallery.html`
- Principal Investigator profile: `pi.html`
- Contact details and enquiry routes: `contact.html`
- Homepage research/capability copy: `index.html`

## Codespaces or local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open port `8000` in the browser. In GitHub Codespaces, use the **Ports** panel to open the forwarded URL.

Because members, publications and news are loaded with `fetch()`, preview the site through an HTTP server rather than opening the HTML files directly with `file://`.

## Quality checks

Run the site integrity checker before merging:

```bash
node scripts/check-site.mjs
```

It checks:

- required website files
- broken internal `href` and `src` references
- duplicate element IDs
- core page metadata
- member/publication/news JSON validity
- member image references
- DOI URL format
- sitemap/robots consistency
- oversized images (reported as non-blocking warnings)

The same checker runs automatically in GitHub Actions on the V2 branch, on `main`, and on pull requests targeting `main`.

## Development workflow

Production is deployed from `main`. Make larger changes on a feature branch, preview and review them there, and merge only after approval.

For the current redesign, development is taking place on:

```text
upgrade/pirc-website-v2
```

## Accessibility and SEO

The V2 site includes:

- keyboard-accessible mobile navigation
- skip links
- visible focus behavior
- reduced-motion support
- responsive layouts
- descriptive image alt text
- canonical URLs
- Open Graph metadata
- structured data on the homepage, PI and contact pages
- `robots.txt`
- `sitemap.xml`
- custom 404 page

## Image performance

Member and gallery images should be compressed before adding them to the repository. As a general target, keep normal web images below roughly **300 KB** where practical and use modern formats such as WebP for large photographs.

The two largest member portraits from the original site are already replaced by optimized WebP versions under `assets/people/`. Non-critical page images use lazy loading.

## Deployment

The repository is configured for GitHub Pages deployment. Changes merged to `main` are published through the existing Pages workflow.

Before merging a large redesign:

```bash
git status
git pull
node scripts/check-site.mjs
python3 -m http.server 8000
```

Review every page at desktop and mobile widths, then merge the feature branch into `main` only after approval.

## Contact

**Polymer Innovation Research & Consultancy Group**  
Department of Materials Engineering  
Kwame Nkrumah University of Science and Technology  
Kumasi, Ghana

Email: [ekaasare@knust.edu.gh](mailto:ekaasare@knust.edu.gh)
