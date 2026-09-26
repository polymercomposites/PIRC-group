# PIRC Group Website

Official website of the **Polymer Innovation Research & Consultancy (PIRC) Group** at the Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana.

The site presents the group’s research, people, publications, funding partners, opportunities, news and gallery. It is intentionally lightweight: plain HTML, CSS and JavaScript deployed through GitHub Pages.

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
├── members.html               # People directory
├── research.html              # Research themes
├── publications.html          # Searchable publications
├── funding.html               # Opportunities and funding
├── news.html                  # Group news
├── gallery.html               # Gallery
├── 404.html                   # GitHub Pages 404 page
├── style.css                  # Main design system
├── pages.css                  # Interior-page styles
├── enhancements.css           # Search/filter + accessibility enhancements
├── main.js                    # Navigation + data rendering
├── data/
│   ├── members.json           # People data
│   └── publications.json      # Publication data
├── favicon.svg                # PIRC favicon
├── site.webmanifest           # Web app metadata
├── robots.txt                 # Search crawler rules
├── sitemap.xml                # Search sitemap
└── .github/                   # GitHub Pages workflow
```

## Updating people

Edit `data/members.json`.

Each member supports these fields:

```json
{
  "name": "Example Researcher",
  "degree": "PhD",
  "role": "Researcher",
  "image": "example.jpg",
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

The publications page automatically builds the year filter and search index from this file.

## Updating other content

- Research themes: `research.html`
- Opportunities and funding partners: `funding.html`
- News and awards: `news.html`
- Gallery captions/images: `gallery.html`
- Principal Investigator profile: `pi.html`
- Homepage featured content: `index.html`

## Local or Codespaces preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open port `8000` in the browser. In GitHub Codespaces, use the **Ports** panel to open the forwarded URL.

Because members and publications are loaded with `fetch()`, preview the site through an HTTP server rather than opening the HTML files directly with `file://`.

## Development workflow

Production is deployed from `main`. Make larger changes on a feature branch, preview and review them there, and merge only after approval.

Example:

```bash
git switch -c upgrade/example-change
git push -u origin upgrade/example-change
```

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
- structured data on the homepage and PI page
- `robots.txt`
- `sitemap.xml`
- custom 404 page

## Image performance

Member and gallery images should be compressed before adding them to the repository. As a general target, keep normal web images below roughly **300 KB** where practical and use modern formats such as WebP for large photographs.

All non-critical page images should use `loading="lazy"`.

## Deployment

The repository is configured for GitHub Pages deployment. Changes merged to `main` are published through the existing Pages workflow.

Before merging a large redesign:

```bash
git status
git pull
python3 -m http.server 8000
```

Review every page at desktop and mobile widths, then merge the feature branch into `main`.

## Contact

**Polymer Innovation Research & Consultancy Group**  
Department of Materials Engineering  
Kwame Nkrumah University of Science and Technology  
Kumasi, Ghana

Email: [ekaasare@knust.edu.gh](mailto:ekaasare@knust.edu.gh)

## License

See the repository `LICENSE` file for licensing information.
