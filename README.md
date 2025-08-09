# Research Group Website

This is the official website for the Research Group at University XYZ, showcasing our Principal Investigator, team members, research, publications, funding, and news.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/research-group-website.git
   ```

2. **Customize Content**:
   - Update HTML files (`index.html`, `pi.html`, `members.html`, `research.html`, `publications.html`, `funding.html`, `news.html`) with your group's details.
   - Add member images to the `images/` folder (recommended: 150x150px, JPEG).
   - Replace `images/favicon.ico` with your group's or institution’s favicon.
   - Modify `css/style.css` for colors or styling (e.g., change `#003087` to your institution’s color).
   - Optionally, use `js/main.js` to load publications dynamically from a JSON file or API.

3. **Host on GitHub Pages**:
   - Push the repository to GitHub:
     ```bash
     git add .
     git commit -m "Initial commit"
     git push -u origin main
     ```
   - Go to repository settings, scroll to "GitHub Pages," and select the `main` branch as the source.
   - Your website will be live at `https://your-username.github.io/research-group-website`.

4. **Dependencies**:
   - No external dependencies. Uses plain HTML, CSS, and JavaScript.

## Folder Structure
```
research-group-website/
├── index.html          # Homepage
├── pi.html             # Principal Investigator page
├── members.html        # Group Members page
├── research.html       # Research page
├── publications.html   # Publications page
├── funding.html        # Funding and Openings page
├── news.html           # News page
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── main.js         # JavaScript for interactivity
├── images/             # Store member images and favicon
└── README.md           # This file
```

## Making It Functional for Visitors
- **Content Updates**: Regularly update the publications, funding, and news pages to keep information current.
- **Accessibility**: Images have `alt` text, and the site is keyboard-navigable. Ensure high-contrast colors for readability.
- **SEO**: Meta tags are included in each HTML file. Update the description and keywords to reflect your group.
- **Images**: Optimize images (e.g., compress to <100KB) and use `loading="lazy"` for faster page loads.
- **Analytics**: Add Google Analytics to each HTML file:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
  <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'YOUR-GA-ID');
  </script>
  ```
- **Contact Form**: Optionally, add a Formspree form to `funding.html` or a new contact page:
  ```html
  <form action="https://formspree.io/f/your-form-id" method="POST">
      <label>Name: <input type="text" name="name" required></label>
      <label>Email: <input type="email" name="email" required></label>
      <label>Message: <textarea name="message" required></textarea></label>
      <button type="submit">Send</button>
  </form>
  ```
- **Dynamic Content**: Use `main.js` to fetch publications or news from a JSON file or API.

## Customization Tips
- Replace placeholder images in `images/` with real member photos.
- Update colors in `style.css` to match your institution’s branding (e.g., change `#003087` to your color).
- Add a favicon (`images/favicon.ico`) for branding.
- Extend `main.js` to fetch data dynamically (e.g., publications or news from a Google Sheet or API).

## License
MIT License. See LICENSE file for details.
